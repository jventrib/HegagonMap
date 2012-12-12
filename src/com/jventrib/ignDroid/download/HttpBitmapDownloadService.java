package com.jventrib.ignDroid.download;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.params.ClientPNames;
import org.apache.http.client.params.CookiePolicy;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.BufferedHttpEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreProtocolPNames;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;

import com.jventrib.ignDroid.Viewport;
import com.jventrib.ignDroid.Image;
import com.jventrib.ignDroid.LoadState;
import com.jventrib.ignDroid.MapActivity;
import com.jventrib.ignDroid.Preferences;
import com.jventrib.ignDroid.util.JveLog;

public class HttpBitmapDownloadService {

	private static final String TAG = "Tile";
	// private HttpGet method;
	private boolean alreadyRunning;
	private String token;
	private Object lock = new Object();
	// private File cacheDir;

	private ExecutorService httpGetExecutor;
	private static ThreadLocal<byte[]> imageData = new ThreadLocal<byte[]>();
	private static HttpBitmapDownloadService instance;

	public static HttpBitmapDownloadService getInstance() {
		if (instance == null) {
			instance = new HttpBitmapDownloadService();
		}
		return instance;

	}

	private HttpBitmapDownloadService() {
		// cacheDir = new File(Environment.getExternalStorageDirectory(),
		// "/Android/data/com.jventrib.ignDroid/cache/");
		// cacheDir = new File(Environment.getExternalStorageDirectory(),
		// "/Android/data/com.jventrib.ignDroid/cache/");
		// cacheDir.mkdirs();

		httpGetExecutor = Executors.newFixedThreadPool(2, new ThreadFactory() {
			@Override
			public Thread newThread(Runnable r) {
				Thread thread = new Thread(r);
				thread.setName("HttpGetExecutor");
				thread.setPriority(Thread.MIN_PRIORITY);
				return thread;
			}
		});
	}

	public void getHttpBitmap(Image image) {
		if (image.state == LoadState.CLEARED)
			return;
		InputStream is = null;

		try {
			DefaultHttpClient httpClient = new DefaultHttpClient();
			httpClient.getParams().setParameter(CoreProtocolPNames.USER_AGENT,
					"HexagonMap");
			
			
			httpClient.getParams().setParameter(ClientPNames.COOKIE_POLICY,
					CookiePolicy.RFC_2109);
			HttpResponse response;
			image.method = new HttpGet(new URI(image.getSrc()));
			image.method.addHeader("Referer", "HexagonMap.fr");
			// image.method.addHeader("Cookie", "jknch=hcnkj; ign=" +
			// getToken());
			// method.addHeader("Cookie", "jknch=hcnkj; ign=");

			if (image.state == LoadState.CLEARED)
				return;

			synchronized (lock) {
				if (Preferences.isLogging()) {
					JveLog.d(TAG, this + "-performing get " + image.getSrc()
							+ ". Method : " + image.method);
				}
			}
			response = httpClient.execute(image.method);
			// if (Parameters.logging) {
			// JveLog.d(TAG, this + "- get done or aborted " + getSrc()
			// + ". Method : " + method);
			// }
			boolean imageOk = true;
			if (response.getStatusLine().getStatusCode() == 403) {
				if (Preferences.isLogging()) {
					JveLog.d(TAG, "get failed, initializing cookie... ");
				}

				if (image.state == LoadState.CLEARED)
					return;

				if (alreadyRunning) {
					synchronized (this) {
						wait();
					}
				} else {
					// initGeoCookie();
				}
				image.method = new HttpGet(new URI(image.getSrc()));
				// image.method.addHeader("Cookie", "jknch=hcnkj; ign="
				// + getToken());

				if (image.state == LoadState.CLEARED)
					return;

				response = httpClient.execute(image.method);
				if (response.getStatusLine().getStatusCode() == 403) {
					imageOk = false;
				}
			}
			if (image.state == LoadState.CLEARED)
				return;

			BufferedHttpEntity entity = new BufferedHttpEntity(
					response.getEntity());
			if (Preferences.isLogging()) {
			}
			is = (InputStream) entity.getContent();

			if (image.state == LoadState.CLEARED) {
				is.close();
				return;
			}
			if (imageData.get() == null) {
				imageData.set(new byte[50000]);
			}
			BitmapFactory.Options opt = new BitmapFactory.Options();
			opt.inPreferredConfig = Bitmap.Config.RGB_565; //

			Bitmap bitmap = BitmapFactory.decodeStream(is, null, opt);

			FileOutputStream os = null;
			if (imageOk) {
				final String fileName;
				fileName = image.getCacheFileName();
				String ciFileName = fileName + ".jpg";

				File ciFile = new File(MapActivity.cacheDir, ciFileName);

				os = new FileOutputStream(ciFile);
				// os.write(b);
				entity.writeTo(os);
			}

			is.close();
			if (os != null) {
				os.close();
			}

			// synchronized (monitor) {
			if (image.state == LoadState.CLEARED) {
				if (Preferences.isLogging()) {
					JveLog.d(TAG, this + "-outdated, state=loaded");
				}
			} else {
				image.state = LoadState.LOADED;
				if (Preferences.isLogging()) {
					// JveLog.d(TAG, this + "-state=loaded, src = " + getSrc());
				}
			}
			// }
			image.bmp = bitmap;
			if (Build.VERSION.SDK_INT >= 12) {
				Viewport.addBitmapToMemoryCache(image.getCacheFileName(),
						bitmap);
			}
			// return null;
		} catch (Exception e) {
			JveLog.d(TAG, "Error while getting image by http" + e.getMessage());
			try {
				is.close();
			} catch (IOException e1) {
				JveLog.e(TAG, "Error while closing stream", e1);
			}
		}
	}

	public void initGeoCookie() {
		// if (alreadyRunning) {
		// return;
		// }
		// if (alreadyRunning) {
		// return;
		// }
		alreadyRunning = true;
		DefaultHttpClient httpclient = new DefaultHttpClient();
		try {

			HttpGet httpgetInitCookie = new HttpGet("http://www.geoportail.fr");

			HttpResponse initResponse = httpclient.execute(httpgetInitCookie);
			JveLog.d(TAG, "executed or aborted");
			HttpEntity initEntity = initResponse.getEntity();

			if (initEntity != null) {
				initEntity.consumeContent();
			}
			JveLog.d(TAG, "Initial set of cookies:");
			List<Cookie> cookies = httpclient.getCookieStore().getCookies();
			if (cookies.isEmpty()) {
				JveLog.d(TAG, "None");
			} else {
				for (int i = 0; i < cookies.size(); i++) {
					JveLog.d(TAG, "- " + cookies.get(i).toString());
					if (cookies.get(i).getName().equals("ign")) {
						setToken(cookies.get(i).getValue());
					}
				}
			}
		} catch (ClientProtocolException e) {
			JveLog.e(TAG, e.getMessage());
		} catch (IOException e) {
			JveLog.e(TAG, e.getMessage());
		} finally {
			synchronized (this) {
				alreadyRunning = false;
				notifyAll();
			}
		}
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void submit(Image image) {
		Runnable task = new DownloadAsyncTask(image);
		httpGetExecutor.submit(task);

	}

	private final class DownloadAsyncTask implements Runnable {

		Image image;

		public DownloadAsyncTask(Image image) {
			super();
			this.image = image;
		}

		@Override
		public void run() {
			getHttpBitmap(image);
		}
	}

}
