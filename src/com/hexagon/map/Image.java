package com.hexagon.map;

import org.apache.http.client.methods.HttpGet;

import android.graphics.Bitmap;
import android.os.Build;

import com.hexagon.map.download.CacheBitmapDownloadService;
import com.hexagon.map.enums.LoadState;
import com.hexagon.map.preference.Preferences;
import com.hexagon.map.util.JveLog;

public class Image implements Cloneable {

	public volatile LoadState state = LoadState.LOADING;

	public volatile HttpGet method;

	private volatile String src;

	private volatile String cacheFileName;

	public Bitmap bmp;

	public int alpha = 255;

	public Tile tile;


//	public boolean visibleOnTop = false;

	public Image(String src, String cacheFileName, boolean fadeIn, Tile tile) {
		update(src, cacheFileName, fadeIn, tile);
	}

	public Image() {
		// TODO Auto-generated constructor stub
	}

	public synchronized void update(String src, String cacheFileName, boolean fadeIn, Tile tile) {
		this.src = src;
		this.cacheFileName = cacheFileName;
		this.tile = tile;
		startLoadBitmap();
		if (fadeIn) {
			alpha = 0;
		}
	}

	public void setSrc(String src) {
		this.src = src;
	}

	public String getSrc() {
		return src;
	}

	private void startLoadBitmap() {
		if (Build.VERSION.SDK_INT >= 12 && Preferences.useCache) {
			Bitmap bitmapFromMemCache = Viewport
					.getBitmapFromMemCache(cacheFileName);
			if (bitmapFromMemCache != null) {
				bmp = bitmapFromMemCache;
				tile.loadGLTexture(bmp);
				state = LoadState.LOADED;
				tile.visibleOnTop = true;
				JveLog.d("Image", "Loaded from LRU Cache");
				return;
			}
		}
		// JveLog.d("Image", "NOT Loaded from LRU Cache");
		state = LoadState.LOADING;

		CacheBitmapDownloadService.getInstance().submit(this);
	}

	@Override
	public String toString() {
		String srcFileName = src.substring(src.length() - 18, src.length());
		return "Image [" + srcFileName + "]";
	}

	public void abortDownload() {
		state = LoadState.CLEARED;
		if (method != null) {
			method.abort();
		}

	}

	public String getCacheFileName() {
		return cacheFileName;
	}

	public void setCacheFileName(String cacheFileName) {
		this.cacheFileName = cacheFileName;
	}
	
	public void clear() {
		state = LoadState.CLEARED;
	}

	public boolean isCleared() {
		return (state == LoadState.CLEARED);
	}
	
	@Override
	protected Image clone() throws CloneNotSupportedException {
		Image clone = (Image) super.clone();
		if (bmp != null && !bmp.isRecycled()) {
//			clone.bmp = Bitmap.createBitmap(bmp);
			clone.bmp = Bitmap.createBitmap(bmp, 0, 0, bmp.getWidth()/2, bmp.getHeight(), null, true);
			clone.bmp = bmp.copy(bmp.getConfig(), false);
		}
		return clone;
	}

	public boolean isLoaded() {
		return (state == LoadState.LOADED);
	}

}
