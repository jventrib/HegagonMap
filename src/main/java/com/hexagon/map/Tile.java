package com.hexagon.map;

import javax.microedition.khronos.opengles.GL10;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.net.Uri;

import com.hexagon.map.enums.LoadState;
import com.hexagon.map.geo.AbstractPositionableElement;
import com.hexagon.map.opengl.Matrix4;
import com.hexagon.map.opengl.Square;
import com.hexagon.map.preference.Preferences;
import com.hexagon.map.util.JveLog;
import com.koushikdutta.async.future.Future;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.UrlConnectionDownloader;

import java.io.IOException;
import java.net.HttpURLConnection;

import rx.Observable;
import rx.Subscriber;
import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Action1;
import rx.schedulers.Schedulers;

public class Tile extends AbstractPositionableElement implements Cloneable {

    private static final String TAG = "Tile";

    LoadState state;

    int indexX;

    int indexY;

    public int mapTileX;

    public int mapTileY;

    public Bitmap bmp;

    public boolean visible = true;

    public boolean visibleOnTop = true;

    private final Viewport viewport;

    private Matrix4 m = new Matrix4();

    private Square square = new Square();

    private Future<Bitmap> mBitmapFuture;

    private boolean mLoading;

    // public AbstractPositionableElement position = new Point();

    public Tile(Viewport layer, int ix, int iy) {
        this.viewport = layer;
        indexX = ix;
        indexY = iy;
    }
/*

    public void draw(Canvas canvas, int scrollX, int scrollY, Paint paint) {
        int x = posx;
        int y = posy;
        if (visible && Preferences.drawMap) {
            if (image != null && image.bmp != null && image.isLoaded()) {
                canvas.drawBitmap(image.bmp, x, y, paint);
            } else {
                canvas.drawBitmap(viewport.noSrcBmp, x, y, paint);
            }
        }
//		if (Preferences.isDrawInfos()) {
//			drawDebugInfos(canvas, paint, x, y);
//		}

        List<? super String> l = new ArrayList<String>();
        l.add("test");
    }
        public void draw(Canvas canvas, Matrix scaleM, Paint paint) {
		int x = posx;
		int y = posy;
		if (visible && Preferences.drawMap) {
			m = new Matrix(scaleM);
			m.preTranslate(posx, posy);
			if (image != null && image.bmp != null && m != null
					&& image.isLoaded()) {
				if (image.alpha < 255) {
					Paint paintAlpha = new Paint(paint);
					// canvas.drawBitmap(layer.noSrcBmp, m, paint);
					image.alpha = image.alpha + 30;

					if (image.alpha > 255)
						image.alpha = 255;
					paintAlpha.setAlpha(image.alpha);
					canvas.drawBitmap(image.bmp, m, paintAlpha);
				} else {
					paint.setAlpha(255);
					canvas.drawBitmap(image.bmp, m, paint);
				}
			} else {
				canvas.drawBitmap(viewport.noSrcBmp, m, paint);
				// BitmapDrawable bd = new BitmapDrawable(layer.noSrcBmp);
				// bd.draw(canvas);
			}
		}
		if (Preferences.isDrawInfos()) {
			drawDebugInfos(canvas, paint, x, y);
		}
	}
*/


    public synchronized void draw(GL10 gl, Matrix4 scaleM) {

        int x = posx;
        int y = posy;
        if (visible && Preferences.drawMap) {
            m = new Matrix4(scaleM);
            m.preTranslate(posx, posy);
            if (isLoaded() && !isUploaded()) {
                square.loadGLTexture(bmp);
                state = LoadState.UPLOADED;
            }
            if (isUploaded()) {
                square.draw(gl, m);
            }
        }

    }


    /**
     * Draw some debug infos on tile. Infos including : - TileX, TileY - Src of
     * the bitmap - Tile object reference
     */
    private void drawDebugInfos(Canvas canvas, int x, int y) {
        Paint paint = new Paint();
        paint.setColor(Color.WHITE);
        paint.setTextSize(20);
        canvas.drawText("TileX : " + mapTileX + "/ TileY : " + mapTileY, x,
                y + 40, paint);
        canvas.drawText("x : " + x + "/ y: " + y, x, y + 60, paint);
        canvas.drawText("visible : " + visible, x, y + 80, paint);

    }

    void correctMapImage(boolean fadeIn, Context context) {
        int rotateOffsetX = 0;
        int rotateOffsetY = 0;

        // Anti rebound value. Value too low will cause several rebounds of tile
        // offset rotation !
        int m = 50;
        if (posx > viewport.mapScreenWidth + viewport.marginX + m) {
            rotateOffsetX = -viewport.nbTileX;
        } else {
            if (posx < -viewport.marginX - Viewport.tileWidth - m) {
                rotateOffsetX = viewport.nbTileX;
            }
        }
        if (posy > viewport.mapScreenHeight + viewport.marginY + m) {
            rotateOffsetY = -viewport.nbTileY;
        } else {
            if (posy < -viewport.marginY - Viewport.tileHeight - m) {
                rotateOffsetY = viewport.nbTileY;
            }
        }
        if (rotateOffsetX != 0 || rotateOffsetY != 0) {
            fillImage(mapTileX + rotateOffsetX, mapTileY + rotateOffsetY);
            clearImage();
        }
        updateMapImage(fadeIn, context);
    }

    void fillImage(int tileX, int tileY) {
        mapTileX = tileX;
        mapTileY = tileY;
        float tw = viewport.calcMapTileWidth();
        float th = viewport.calcMapTileHeight();
        mapx = Math.round(tw * tileX + tw / 2);
        mapy = Math.round(th * tileY + th / 2);
        positionImage();
    }

    void fillImage() {
        float tw = viewport.calcMapTileWidth();
        float th = viewport.calcMapTileHeight();
        mapx = Math.round(tw * mapTileX + tw / 2);
        mapy = Math.round(th * mapTileY + th / 2);
        positionImage();
    }

    void positionImage() {
        posx = viewport.calcPixelX(0) + Viewport.tileWidth * mapTileX;
        posy = viewport.calcPixelY(0) + Viewport.tileHeight * mapTileY;
    }

    void positionOldImage() {
        posx = viewport.calcOldPixelX(0) + Viewport.tileWidth * mapTileX;
        posy = viewport.calcOldPixelY(0) + Viewport.tileHeight * mapTileY;
    }

    /**
     * clear the selected Tile. set it not to display, flush the bitmap and the
     * src url.
     */
    synchronized void clearImage() {
        if (mBitmapFuture != null) {
            mBitmapFuture.cancel(true);
        }
        if (bmp != null) {
//            bmp.recycle();
        }

        state = LoadState.CLEARED;
        visible = false;
//        JveLog.d(TAG, this + "-task cancelled");
        // }
    }

    private synchronized void updateMapImage(boolean fadeIn, Context context) {
        int horizontalMargin = 2;
        int verticalMargin = 2;
        int x1, x2, y1, y2, tw, th;
        x1 = posx;
        x2 = posx + Viewport.tileWidth;
        y1 = posy;
        y2 = posy + Viewport.tileHeight;
        tw = Viewport.tileWidth;
        th = Viewport.tileHeight;

//        JveLog.d(TAG, this + "-x1 : " + x1);
//        JveLog.d(TAG, this + "-x2 : " + x2);
//        JveLog.d(TAG, this + "-y1 : " + y1);
//        JveLog.d(TAG, this + "-y2 : " + y2);

        boolean vis = Viewport.rectIntersectRect(x1, x2, y1, y2,
                -horizontalMargin - tw, viewport.mapScreenWidth
                        + horizontalMargin + tw, -verticalMargin - th,
                viewport.mapScreenHeight + verticalMargin + th
        );
        if (!vis) {
            if (visible) {
                visible = false;
            }
            JveLog.d(TAG, this + "-Visible : false");
        } else {

            if (isCleared()) {
                String calcTileSrc = calcTileSrc();
                loadImageWithIon(calcTileSrc, context);
//                loadImageWithPicasso(calcTileSrc, context);
//                mCanvas = new Canvas(image.bmp);
                // image = new Image(calcTileSrc, cacheFileName);
                // Log.d(TAG, "cache name : " + cacheFileName);
//                square.loadGLTexture(image.bmp);

//                Was aborted during fetch, need to retry
//                if (isAborted()) {
//                    JveLog.d(TAG, "Was aborted, retrying");
//                    loadImageWithIon(calcTileSrc, context);
//                }
            }
            if (Preferences.isDrawInfos()) {
//                if (mCanvas == null) {
//                drawDebugInfos(mCanvas, 0, 0);
//                }
            }
//            square.loadGLTexture(image.bmp);

            if (!visible) {
                visible = true;
            }
        }
    }


    public synchronized String calcTileSrc() {
        String src;
        if (Preferences.isDevServer()) {
            src = viewport.context.getString(R.string.tileUrlDev);
        } else {
            src = viewport.context.getString(R.string.tileUrl);
        }
        String scaleString = Integer.toString(viewport.scale);
        String mapTileXS = Integer.valueOf(Math.abs(mapTileX)).toString();
        String mapTileYS = Integer.valueOf(Math.abs(mapTileY)).toString();
        src = src.replaceAll("!SCALE!", scaleString)
                .replaceAll("!ROW!", mapTileYS).replaceAll("!COL!", mapTileXS);
//        JveLog.d(TAG, this + "-src : " + src);

        return src;
    }

    public String toString() {
        return "Tile" + "-" + indexX + "-" + indexY;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {

        Tile clone = (Tile) super.clone();
//        if (image != null) {
//            clone.image = (Image) this.image.clone();
//        }
        return clone;

    }

    public void loadGLTexture(Bitmap bmp) {
//		square.loadGLTexture(bmp);

    }


    private void loadImageWithIon(final String src, final Context context) {
        if (isLoading()) {
            JveLog.d(TAG, "Already Loading !");
            return;
        }

        state = LoadState.LOADING;
        setLoading(true);
        mBitmapFuture = Ion.with(context, src)
                .setHeader("user-agent",
                        "Android").setHeader("referer",
                        "HexagonMap.fr").withBitmap().asBitmap();
        mBitmapFuture.setCallback(new FutureCallback<Bitmap>() {
            @Override
            public synchronized void onCompleted(Exception e, Bitmap result) {

                if (isCleared()) {
                    JveLog.d(TAG, "Cleared, Aborting !");
//                    state= LoadState.ABORTED;
                    updateMapImage(false, context);
                    return;
                }

                //TEST ONLY
                bmp = result;

//                drawDebugInfo();
                state = LoadState.LOADED;
                setLoading(false);
                visibleOnTop = true;
            }
        });
    }


    private void loadImageWithPicasso(final String src, final Context context) {
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
//                                      bmp = tmpBmp;
//                                      state = LoadState.LOADED;
//                                      tile.visibleOnTop = true;

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
                                    if (isCleared()) {
                                        JveLog.d(TAG, "Cleared, Aborting !");
//                    state= LoadState.ABORTED;
                                        updateMapImage(false, context);
                                        return;
                                    }

                                    //TEST ONLY
                                    bmp = o;

//                drawDebugInfo();
                                    state = LoadState.LOADED;
                                    visibleOnTop = true;
                                }
                            }
        );
    }


    private void drawDebugInfo() {
        if (bmp != null) {
            bmp = bmp.copy(Bitmap.Config.RGB_565, true);
//                bmp = Bitmap.createBitmap(256, 256, Bitmap.Config.ARGB_4444);
//                bmp.eraseColor(Color.rgb(random256(), random256(), random256()));
//                bmp.eraseColor(Color.rgb((mapTileX % 32) * 8, (mapTileY % 32) * 8, 128));

//            Canvas canvas = new Canvas(bmp);
//            Paint paint = new Paint();
//            paint.setColor(Color.BLACK);
//            paint.setTextSize(40);
//            canvas.drawText("TileX : " + mapTileX, 5,
//                    50, paint);
//            canvas.drawText("TileY : " + mapTileY, 5,
//                    130, paint);
        }
    }

//    /////////////////////////
//    STATE METHODS
//    /////////////////////////


    private boolean isLoaded() {
        return state == LoadState.LOADED;
    }

    private boolean isLoading() {
        return mLoading == true;

    }

    private void setLoading(boolean loading) {
        mLoading = loading;

    }

    private boolean isAborted() {
        return state == LoadState.ABORTED;
    }

    private boolean isCleared() {
        return state == LoadState.CLEARED;
    }

    private boolean isUploaded() {
        return state == LoadState.UPLOADED;
    }

}
