package com.hexagon.map;

import com.google.android.gms.internal.io;

import org.apache.http.client.methods.HttpGet;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.net.Uri;
import android.os.Build;

import com.hexagon.map.download.CacheBitmapDownloadService;
import com.hexagon.map.enums.LoadState;
import com.hexagon.map.preference.Preferences;
import com.hexagon.map.util.JveLog;
import com.koushikdutta.async.future.Future;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;
import com.squareup.picasso.OkHttpDownloader;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.UrlConnectionDownloader;

import java.io.IOException;
import java.net.HttpURLConnection;

import rx.Observable;
import rx.Subscriber;
import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Action1;
import rx.schedulers.Schedulers;

public class Image implements Cloneable {

    public volatile LoadState state = LoadState.LOADING;

    public volatile HttpGet method;

    private volatile String src;

    private volatile String cacheFileName;

    public Bitmap bmp;

    public int alpha = 255;

    public Tile tile;

//	public boolean visibleOnTop = false;

    public Image(String src, String cacheFileName, boolean fadeIn, Tile tile, Context context) {
        update(src, cacheFileName, fadeIn, tile, context);
    }

    public Image() {
        // TODO Auto-generated constructor stub
    }

    public synchronized void update(final String src, String cacheFileName, boolean fadeIn,
            final Tile tile,
            final Context context) {
        this.src = src;
        this.cacheFileName = cacheFileName;
        this.tile = tile;

        //TEST ONLY
//        bmp = Bitmap.createBitmap(256, 256, Bitmap.Config.ARGB_4444);
//        bmp.eraseColor(Color.rgb(random256(), random256(), random256()));
//        bmp.eraseColor(Color.rgb((tile.mapTileX % 32) *8, (tile.mapTileY % 32) * 8, 128));
//        state = LoadState.LOADED;
//        tile.visibleOnTop = true;
//
//        loadImageWithPicasso(src, tile, context);
        loadImageWithIon(src, tile, context);
//            startLoadBitmap();
//		if (fadeIn) {
//			alpha = 0;
//		}
    }


    private void loadImageWithPicasso(final String src, final Tile tile, final Context context) {
        Observable.create(new Observable.OnSubscribe<Bitmap>() {
                              @Override
                              public void call(Subscriber<? super Bitmap> subscriber) {
                                  try {
                                      Picasso.Builder builder = new Picasso.Builder(context);
                                      Picasso picasso = builder
                                              .downloader(new UrlConnectionDownloader(context) {
                                                              @Override
                                                              protected HttpURLConnection openConnection(
                                                                      Uri uri)
                                                                      throws IOException {
                                                                  HttpURLConnection
                                                                          connection = super
                                                                          .openConnection(uri);
                                                                  connection.setRequestProperty(
                                                                          "user-agent",
                                                                          "Android");
                                                                  connection.setRequestProperty(
                                                                          "referer",
                                                                          "HexagonMap.fr");

                                                                  return connection;
                                                              }
                                                          }
                                              ).build();

                                      Bitmap tmpBmp = picasso.load(src).get();
                                      bmp = tmpBmp;
                                      state = LoadState.LOADED;
                                      tile.visibleOnTop = true;

                                      subscriber.onNext(tmpBmp);
                                  } catch (IOException e) {
                                      e.printStackTrace();
                                  }

                              }
                          }
        ).subscribeOn(Schedulers.io()).
                observeOn(AndroidSchedulers.mainThread()
                ).subscribe(new Action1<Bitmap>() {
                                @Override
                                public void call(Bitmap o) {

                                }
                            }
        );
    }


    private void loadImageWithIon(final String src, final Tile tile, final Context context) {
        Future<Bitmap> fb = Ion.with(context, src)
                .setHeader("user-agent",
                        "Android").setHeader("referer",
                        "HexagonMap.fr").withBitmap().asBitmap();
        fb.setCallback(new FutureCallback<Bitmap>() {
            @Override
            public void onCompleted(Exception e, Bitmap result) {
                bmp = result;
                state = LoadState.LOADED;
                tile.visibleOnTop = true;
            }
        });
    }


    private int random256() {
        return (int) Math.round(Math.random() * 256);
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
            clone.bmp = Bitmap
                    .createBitmap(bmp, 0, 0, bmp.getWidth() / 2, bmp.getHeight(), null, true);
            clone.bmp = bmp.copy(bmp.getConfig(), false);
        }
        return clone;
    }

    public boolean isLoaded() {
        return (state == LoadState.LOADED);
    }

}
