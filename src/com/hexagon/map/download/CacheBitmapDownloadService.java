package com.hexagon.map.download;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.SocketException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.util.Log;

import com.hexagon.map.Image;
import com.hexagon.map.MapActivity;
import com.hexagon.map.Viewport;
import com.hexagon.map.enums.LoadState;
import com.hexagon.map.preference.Preferences;

public class CacheBitmapDownloadService {

	private static final String TAG = "Tile";
	// private File cacheDir;

	private ExecutorService cacheGetExecutor;
	private static ThreadLocal<byte[]> imageData = new ThreadLocal<byte[]>();
	private static CacheBitmapDownloadService instance;

	public static CacheBitmapDownloadService getInstance() {
		if (instance == null) {
			instance = new CacheBitmapDownloadService();
		}
		return instance;

	}

	private CacheBitmapDownloadService() {
		// cacheDir = new File(Environment.getExternalStorageDirectory(),
		// "/Android/data/com.jventrib.ignDroid/cache/");
		// cacheDir.mkdirs();

		cacheGetExecutor = Executors.newFixedThreadPool(1, new ThreadFactory() {
			@Override
			public Thread newThread(Runnable r) {
				Thread thread = new Thread(r);
				thread.setName("CacheDispatcher");
				thread.setPriority(Thread.MIN_PRIORITY);
				return thread;
			}
		});

	}

	/**
	 * get the Bitmap of the tile. If the bitmap is found in cache, it will be
	 * loaded from. Overwise, the bitmap is downloaded from the geoportail
	 * server, and the cache is updated. If the geoportail return a 503 error,
	 * the token cookie has to be set.
	 * 
	 * @param t
	 *            the tile
	 * @return the bitmap for the tile
	 */
	public void getTileBitmap(Image image) {
		try {
			if (image.state == LoadState.CLEARED)
				return;
			// File dir = new File(sdCard.getAbsolutePath() +
			// "/data/igndroid");
			// dir.mkdirs();

			// 2.3 Only
			// File dir = context.getExternalCacheDir();
			// < 2.3
			final String fileName;
			fileName = image.getCacheFileName();
			String ciFileName = fileName + ".jpg";
			// File file = new File(dir, fileName);
			File ciFile = new File(MapActivity.cacheDir, ciFileName);
			InputStream is;
			int length;
			if (Preferences.useCache && ciFile.exists()) {
				// Log.d(TAG, this + "- getting image in cache");

				is = new FileInputStream(ciFile);
				length = Long.valueOf(ciFile.length()).intValue();

				int buffersize = (int) Math.ceil(length / (double) 100);
				int downloaded = 0;
				int read;

				if (image.state == LoadState.CLEARED)
					return;

				if (imageData.get() == null) {
					imageData.set(new byte[50000]);
				}
				byte[] b = imageData.get();

				while (downloaded < length) {
					if (length < buffersize) {
						read = is.read(b, downloaded, length);
					} else if ((length - downloaded) <= buffersize) {
						read = is.read(b, downloaded, length - downloaded);
					} else {
						read = is.read(b, downloaded, buffersize);
					}
					downloaded += read;
				}

				if (image.state == LoadState.CLEARED)
					return;
				BitmapFactory.Options opt = new BitmapFactory.Options();
				// opt.inDither = true;
				opt.inPreferredConfig = Bitmap.Config.RGB_565; //
				Bitmap bitmap = BitmapFactory
						.decodeByteArray(b, 0, length, opt);
				is.close();
				synchronized (image) {
					image.bmp = bitmap;
					image.state = LoadState.LOADED;
					image.visibleOnTop = true;
					if (Build.VERSION.SDK_INT >= 12) {
						Viewport.addBitmapToMemoryCache(
								image.getCacheFileName(), bitmap);
					}
				}
			} else {
				HttpBitmapDownloadService.getInstance().submit(image);
			}

		} catch (MalformedURLException e) {
			if (Preferences.isLogging()) {
				Log.e(TAG, "Malformed exception: ", e);
			}
		} catch (SocketException e) {
			image.state = LoadState.ABORTED;
			if (Preferences.isLogging()) {
				Log.d(TAG, this + "- httpget aborted");
			}
			return;
		} catch (IOException e) {
			image.state = LoadState.ABORTED;
			if (Preferences.isLogging()) {
				Log.d(TAG, this + "- httpget aborted : IOException");
			}
			return;
		} catch (Exception e) {
			if (Preferences.isLogging()) {
				Log.e(TAG, this + "-Exception: ", e);
			}
		}
	}

	public void submit(Image image) {
		Runnable task = new DownloadAsyncTask(image);
		cacheGetExecutor.submit(task);

	}

	private final class DownloadAsyncTask implements Runnable {

		Image image;

		public DownloadAsyncTask(Image image) {
			super();
			this.image = image;
		}

		@Override
		public void run() {
			// synchronized (image) {
			getTileBitmap(image);
			// }
		}
	}

}
