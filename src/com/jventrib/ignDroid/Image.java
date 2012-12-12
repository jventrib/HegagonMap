package com.jventrib.ignDroid;

import org.apache.http.client.methods.HttpGet;

import android.graphics.Bitmap;
import android.os.Build;

import com.jventrib.ignDroid.download.CacheBitmapDownloadService;
import com.jventrib.ignDroid.util.JveLog;

public class Image {

	public volatile LoadState state = LoadState.LOADING;

	public volatile HttpGet method;

	private String src;

	private String cacheFileName;

	public Bitmap bmp;

	public int alpha = 255;

	public Image(String src, String cacheFileName) {
		update(src, cacheFileName);
	}

	public void update(String src, String cacheFileName) {
		this.src = src;
		this.cacheFileName = cacheFileName;
		state = LoadState.LOADING;
		startLoadBitmap();
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
				JveLog.d("Image", "Loaded from LRU Cache");
				return;
			}
		}
		// JveLog.d("Image", "NOT Loaded from LRU Cache");

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

}
