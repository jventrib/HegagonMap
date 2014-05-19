package com.hexagon.map;

import android.animation.ObjectAnimator;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.drawable.Drawable;
import android.view.animation.Animation;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.Transformation;
import android.widget.ImageView;

import com.hexagon.map.download.PicassoFactory;
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
import com.squareup.picasso.Target;

import java.io.IOException;

import rx.Observable;
import rx.Subscriber;
import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Action1;
import rx.schedulers.Schedulers;

public class Tile extends AbstractPositionableElement implements Cloneable {

    private static final String TAG = "Tile";

    private static final long FADE_DURATION = 200;

    LoadState state;

    int indexX;

    int indexY;

    public int mapTileX;

    public int mapTileY;

    public Bitmap bmp;

    public boolean visible = true;

    public boolean visibleOnTop = true;

    private final Viewport viewport;

    Matrix4 m = new Matrix4();

    Square square = new Square();

    private Future<Bitmap> mBitmapFuture;

    private boolean mLoading;

    private Target mTarget;

    float alpha = 1.0f;

    private TileMatrix mTileMatrix;

    private int loadX;

    private int loadY;

    private long fadeInTimerStart;

    private long fadeInTimerCurrent;

    // public AbstractPositionableElement position = new Point();

    public Tile(Viewport layer, TileMatrix tileMatrix, int ix, int iy) {
        this.viewport = layer;
        mTileMatrix = tileMatrix;
        indexX = ix;
        indexY = iy;
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


    /**
     * clear the selected Tile. set it not to display, flush the bitmap and the
     * src url.
     */
    synchronized void clearImage() {

        //For ION
        if (mBitmapFuture != null && !mBitmapFuture.isDone()) {
            mBitmapFuture.cancel(true);
//            mBitmapFuture = null;
        }

        //For Picasso
        if (mTarget != null) {
            PicassoFactory.getInstance(viewport.context).getPicasso().cancelRequest(mTarget);
        }

        if (bmp != null) {
            bmp.recycle();
        }

        state = LoadState.CLEARED;
        visible = false;
//        JveLog.d(TAG, this + "-task cancelled");
        // }
//        alpha = 0f;
    }


    public synchronized String calcTileSrc(int scale) {
        String src;
        if (Preferences.isDevServer()) {
            src = viewport.context.getString(R.string.tileUrlDev);
        } else {
            src = viewport.context.getString(R.string.tileUrl);
        }
        String scaleString = Integer.toString(scale);
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


    void loadImageWithIon(final String src, final Context context) {
        if (isLoading()) {
            JveLog.d(TAG, "Already Loading !");
            return;
        }

        state = LoadState.LOADING;
        setLoading(true);
        Ion ion = Ion.getDefault(context);
//        ion.configure().setLogging("ion", Log.DEBUG);

        loadX = mapTileX;
        loadY = mapTileY;

        mBitmapFuture = ion.with(context, src).noCache()
                .setHeader("user-agent",
                        "Android").setHeader("referer",
                        "HexagonMap.fr").withBitmap().asBitmap();
        mBitmapFuture.setCallback(new FutureCallback<Bitmap>() {
            @Override
            public void onCompleted(Exception e, Bitmap result) {

                //Check if coords have changed since loading
                if (mapTileX != loadX || mapTileY != loadY) {
//                    JveLog.d(TAG, "Tile changed while loading ! " + this);
//                    clearImage();
                }

                //TEST ONLY
                bmp = result;
                state = LoadState.LOADED;
                setLoading(false);
                visibleOnTop = true;
                visible = true;
//                drawDebugInfo();

                fadeInStart();
//                mTileMatrix.cache.put(new TilePos(mapTileX, mapTileY), result);
            }
        });
    }


    void loadImageWithPicasso(final String src, final Context context) {
        Picasso.Builder builder = new Picasso.Builder(context);
        Picasso picasso = PicassoFactory.getInstance(context).getPicasso();

        final ImageView iv = new ImageView(context);
        mTarget = new Target() {
            @Override
            public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
                bmp = bitmap;
//                drawDebugInfo();
                state = LoadState.LOADED;
                visibleOnTop = true;
                visible = true;

            }

            @Override
            public void onBitmapFailed(Drawable errorDrawable) {

            }

            @Override
            public void onPrepareLoad(Drawable placeHolderDrawable) {

            }
        };
        picasso.load(src).into(mTarget);


    }


    void drawDebugInfo() {

        if (bmp == null) {
            bmp = Bitmap.createBitmap(256, 256, Bitmap.Config.ARGB_4444);
            bmp.eraseColor(Color.rgb((mapTileX % 32) * 8, (mapTileY % 32) * 8, 128));
//            bmp.eraseColor(Color.rgb(random256(), random256(), random256()));
        } else {
            bmp = bmp.copy(Bitmap.Config.RGB_565, true);
        }
        Canvas canvas = new Canvas(bmp);
        Paint paint = new Paint();
        paint.setColor(Color.BLACK);
        paint.setTextSize(40);
        canvas.drawText("Tile : " + toString(), 5,
                50, paint);

        canvas.drawText("TileX : " + mapTileX, 5,
                130, paint);
        canvas.drawText("TileY : " + mapTileY, 5,
                180, paint);
        visible = true;
        state = LoadState.LOADED;
        setLoading(false);
        visibleOnTop = true;

    }

//    /////////////////////////

    //    STATE METHODS
    private void loadImageWithPicasso2(final String src, final Context context) {
        Observable.create(new Observable.OnSubscribe<Bitmap>() {
                              @Override
                              public void call(Subscriber<? super Bitmap> subscriber) {
                                  try {
                                      Picasso picasso = PicassoFactory.getInstance(context)
                                              .getPicasso();

                                      Bitmap tmpBmp = picasso.load(src).get();
                                      bmp = tmpBmp;
                                      state = LoadState.LOADED;
                                      visibleOnTop = true;

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
//    /////////////////////////


    boolean isLoaded() {
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

    boolean isUploaded() {
        return state == LoadState.UPLOADED;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tile)) {
            return false;
        }

        Tile tile = (Tile) o;

        if (mapTileX != tile.mapTileX) {
            return false;
        }
        if (mapTileY != tile.mapTileY) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        int result = mapTileX;
        result = 31 * result + mapTileY;
        return result;
    }


    private void fadeInStart() {
        fadeInTimerStart = System.currentTimeMillis();
    }


    void handleAlpha() {
        if (alpha == 1.0f) {
            return;
        }
        long timer = System.currentTimeMillis() - fadeInTimerStart;
        if (timer > FADE_DURATION) {
            alpha = mTileMatrix.mAlpha;
            return;
        }
        float c = timer * mTileMatrix.mAlpha / (float) FADE_DURATION;
        alpha = c;
    }

}
