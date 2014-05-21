package com.hexagon.map;

import java.util.HashMap;

import javax.microedition.khronos.opengles.GL10;

import android.animation.ValueAnimator;
import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.location.Location;
import android.location.LocationListener;
import android.opengl.GLES10;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.LruCache;
import android.view.animation.AccelerateDecelerateInterpolator;

import com.hexagon.map.anim.Position;
import com.hexagon.map.anim.PositionAnimatedListener;
import com.hexagon.map.anim.PositionEvaluator;
import com.hexagon.map.anim.Velocity;
import com.hexagon.map.anim.VelocityAnimatedListener;
import com.hexagon.map.anim.VelocityEvaluator;
import com.hexagon.map.anim.ZoomAnimatedListener;
import com.hexagon.map.geo.AbstractPositionableElement;
import com.hexagon.map.geo.LocationablePoint;
import com.hexagon.map.geo.Point;
import com.hexagon.map.opengl.Circle;
import com.hexagon.map.opengl.Matrix4;
import com.jhlabs.map.awt.Point2D;
import com.jhlabs.map.proj.MercatorProjection;

public class Viewport extends AbstractPositionableElement implements
        LocationListener {

    private static final String TAG = "Viewport";

    // Make this bigger will preload more tiles surrounding the screen, making
    // less checkboard tile, but more bitmap to move, increasing bandwith
    // requirement. 2 is fastest
    private static final int PRELOAD_SIZE = 2;

    public static final float ALPHA_OFFSET = 1.5f;


    public static String type = "jpg";

    private static final int MIN_ZOOM = 3;

    private static final int MAX_ZOOM = 18;

    // private static final String TAG = "Viewport";

    public static float[] zoomRatios = {156543.0339280410f, 78271.5169640205f,
            39135.7584820102f, 19567.8792410051f, 9783.9396205026f,
            4891.9698102513f, 2445.9849051256f, 1222.9924525628f,
            611.4962262814f, 305.7481131407f, 152.8740565704f, 76.4370282852f,
            38.2185141426f, 19.1092570713f, 9.5546285356f, 4.7773142678f,
            2.3886571339f, 1.1943285670f, 0.5971642835f, 0.2985821417f,
            0.1492910709f, 0.0746455354f};

    // float coordX;
    // float coordY;
    public int scale;

    int nbTileX;

    int nbTileY;

    int marginX;

    int marginY;

    public int mapScreenWidth;

    public int mapScreenHeight;

    public float centerX;

    public float centerY;

    public boolean running = true;

    HashMap<String, Bitmap> imageCache = new HashMap<String, Bitmap>();

    boolean alreadyRunning;

    boolean vis = true;

    public Bitmap noSrcBmp;

    public boolean tileLoading;

    public static LruCache<String, Bitmap> mMemoryCache;

    boolean lock;


//    private ScreenZoomAnimation screenZoomAnimation;

    Context context;

    AbstractLocationListener listener;

    private float zoomScale = 1.0f;

    public float azimuth_angle;

    private Matrix4 m = new Matrix4();

    private Matrix4 mLocation = new Matrix4();

    public LocationablePoint locationPoint = new LocationablePoint();

    Point targetPoint;

    public volatile boolean zoomOnGoing;

    public GL10 gl;

    private Object frame = new Object();

    private Matrix4 mMScaled = new Matrix4();

    private TileMatrix currentTM;

    private TileMatrix preselectTM;

    int[] mTextures;
    private ValueAnimator screenScrollingAnimator;
    private ValueAnimator screenZoomAnimator;
    private ValueAnimator locationChangedAnimator;
    private ZoomAnimatedListener zoomAnimatedListener;
    private PositionAnimatedListener positionAnimatedListener;
    private VelocityAnimatedListener velocityAnimatedListener;


    // //////////////////////////////////////////////////////////////

    public Location getCurrentBestLocation() {
        return listener.getCurrentBestLocation();
    }

    public Viewport() {
    }

    public Viewport(Context context, DisplayMetrics dm) {
        init(context, dm);
    }

    public void init(Context context, DisplayMetrics dm) {

        this.context = context;

        //Init animations
        zoomAnimatedListener = new ZoomAnimatedListener(this);
        velocityAnimatedListener = new VelocityAnimatedListener(this);
        positionAnimatedListener = new PositionAnimatedListener(this);

        screenZoomAnimator = new ValueAnimator();
        screenZoomAnimator.addUpdateListener(zoomAnimatedListener);
        screenZoomAnimator.addListener(zoomAnimatedListener);
        screenZoomAnimator.setDuration(300L);

        locationChangedAnimator = new ValueAnimator();
        locationChangedAnimator.addUpdateListener(positionAnimatedListener);
        locationChangedAnimator.setDuration(1000L);
        locationChangedAnimator.setEvaluator(new PositionEvaluator(this));
        locationChangedAnimator.setInterpolator(new AccelerateDecelerateInterpolator());

        marginX = 0;
        marginY = 0;

        mapScreenWidth = dm.widthPixels;
        // mapScreenHeight = dm.heightPixels - 75;
        mapScreenHeight = dm.heightPixels;

        centerX = mapScreenWidth / 2;
        centerY = mapScreenHeight / 2;

        currentTM = new TileMatrix(this, context);
        preselectTM = new TileMatrix(this, context);

        BitmapFactory.Options opt = new BitmapFactory.Options();
        // opt.inDither = true;
        opt.inPreferredConfig = Bitmap.Config.RGB_565; //
        noSrcBmp = BitmapFactory.decodeResource(context.getResources(),
                R.drawable.nosrc, opt);

        listener = new AbstractLocationListener() {

            @Override
            public void onLocationChanged(Location location) {

                if (isBetterLocation(location, getCurrentBestLocation())) {
                    currentBestLocation = location;
                    // mapActivity.locationPoint.moveToPosition(location);
                    moveToLocation(location);
                    locationPoint.onLocationChanged(location);
                }

            }
        };

        Drawable blankDrawable = context.getResources().getDrawable(
                R.drawable.arrow);
        locationPoint.bmp = ((BitmapDrawable) blankDrawable).getBitmap();

    }

    public synchronized void mouseDrag(int l, int m) {
        coordX = calcMapDeltaX(coordX, l);
        coordY = calcMapDeltaY(coordY, m);
//        move();
        update();
    }


    @Override
    public void setPosition(float coordX, float coordY) {
        super.setPosition(coordX, coordY);
        update();
    }

    private void update() {
        currentTM.update();
        if (zoomScale != 1.0f) {
            refresh();
//            preselectTM.update();
        }
    }


    public void mouseDragAnimated(int l, int m) {
        float newCoordX = calcMapDeltaX(coordX, l);
        float newCoordY = calcMapDeltaY(coordY, m);
        com.jhlabs.map.awt.Point2D.Float pos = new com.jhlabs.map.awt.Point2D.Float(newCoordX,
                newCoordY);
        moveToPositionAnimated(pos, false);
    }

    public void initPosition() {
        refresh();
        // move(0, 0);
    }

    private float calcMapDeltaX(float initiaPos, int delta) {
        return initiaPos + delta * zoomRatios[scale] / getZoomScale();
    }

    private float calcMapDeltaY(float initialPos, int delta) {
        return initialPos + delta * zoomRatios[scale] / getZoomScale();
    }

    public synchronized void refresh() {
//        Ion ion = Ion.getDefault(context);
//        ion.dump();
//        ion.getBitmapCache().clear();
        if (zoomOnGoing) {
            return;
        }

        int offsetX = nbTileX / 2;
        int offsetY = nbTileY / 2;
        centerX = mapScreenWidth / 2;
        centerY = mapScreenHeight / 2;

        currentTM.scale = scale;
        if (currentTM.scale == preselectTM.scale) {
            //Swap TileMatrix
            TileMatrix tmp = currentTM;
            currentTM = preselectTM;
            preselectTM = tmp;
//            currentTM.copyFrom(preselectTM);
        } else {
            currentTM.refresh();
            currentTM.update();
        }
        currentTM.zoomScale = 1.0f;
        zoomScale  = 1.0f;
    }


    private void preselectZoomIn() {
        currentTM.zoomScale = 1.0f;
        zoomScale  = 1.0f;
//        scale = preselectTM.scale;
        preselectTM.scale = scale + 1;
        preselectTM.zoomScale = 0.5f;
        preselectTM.refresh();
        preselectTM.update();
    }

    private void preselectZoomOut() {
        currentTM.zoomScale = 1.0f;
        zoomScale  = 1.0f;
//        scale = preselectTM.scale;
        preselectTM.scale = scale - 1;
        preselectTM.zoomScale = 2.0f;
        preselectTM.refresh();
        preselectTM.update();
    }


    @TargetApi(12)
    public static void addBitmapToMemoryCache(String key, Bitmap bitmap) {
        if (getBitmapFromMemCache(key) == null) {
            Viewport.mMemoryCache.put(key, bitmap);
        }
    }

    @TargetApi(12)
    public static Bitmap getBitmapFromMemCache(String key) {
        return Viewport.mMemoryCache.get(key);
    }

    public void moveToLocation(Location location) {
        if (location != null) {
            if (lock) {
                float longitude = new java.lang.Float(location.getLongitude());
                float latitude = new java.lang.Float(location.getLatitude());
                Point2D.Float pos = new Point2D.Float(longitude, latitude);
                moveToPositionAnimated(pos, true);
            }
        }
    }

    public void lock() {
        lock = true;
    }

    public void unlock() {
        lock = false;
    }

    public float getZoomScale() {
        return zoomScale;
    }

    public void setZoomScale(float zoomScale) {
        this.zoomScale = zoomScale;
        currentTM.zoomScale = zoomScale;
        if (zoomScale > 1.0f) {
            preselectTM.zoomScale = zoomScale / 2;
        }
        if (zoomScale < 1.0f) {
            preselectTM.zoomScale = zoomScale * 2;
        }
    }

    public void initTextures(GL10 gl) {
        int texIndex = 0;
        int nbTextures = currentTM.nbTileX * currentTM.nbTileY * 3;
        mTextures = new int[nbTextures];

        GLES10.glGenTextures(nbTextures, mTextures, 0);

        texIndex = currentTM.initTextures(gl, texIndex);
        texIndex = preselectTM.initTextures(gl, texIndex);

    }

/*
    public class LocationChangedAnimation extends Animation {

        public float initialX;

        public float initialY;

        public float finalX;

        public float finalY;

        public LocationChangedAnimation() {
            setInterpolator(new AccelerateDecelerateInterpolator());
            setDuration(1000L);
        }

        @Override
        protected void applyTransformation(float interpolatedTime,
                                           Transformation t) {
            float deltaX = finalX - initialX;
            float deltaY = finalY - initialY;

            float pX = deltaX * interpolatedTime + initialX;
            float pY = deltaY * interpolatedTime + initialY;
            setPosition(pX, pY);
//            move();

        }

    }
*/


    public void handleScroll(float distX, float distY) {
//		synchronized (getMapActivity().surfaceHolder) {
        mouseDrag(Math.round(distX), Math.round(distY));
//		}
    }

    public void handleInertiaScroll(float velocityX, float velocityY) {
        screenScrollingAnimator = ValueAnimator.ofObject(new VelocityEvaluator(this), new Velocity(-velocityX / 40, -velocityY / 40), new Velocity(0, 0));
        screenScrollingAnimator.cancel();
        screenScrollingAnimator.addUpdateListener(velocityAnimatedListener);
        screenScrollingAnimator.setDuration(1000L);
        screenScrollingAnimator.start();
    }

    public void moveToPositionAnimated(Point2D.Float pos, boolean project) {
        if (pos != null) {
            if (!locationChangedAnimator.isRunning()) {
                if (project) {
                    pos = MercatorProjection.getInstance().project(pos);
                }
                locationChangedAnimator.setObjectValues(new Position(coordX, coordY), new Position(pos.x, pos.y));
                locationChangedAnimator.setEvaluator(new PositionEvaluator(this));
                locationChangedAnimator.start();
            }
        }
    }

    public synchronized void zoomInAnimated() {
        zoomOnGoing = true;
        scale++;
        preselectZoomIn();

        screenZoomAnimator.setFloatValues(1.0f, 2.0f);
        screenZoomAnimator.start();

    }

    public synchronized void zoomOutAnimated() {
        zoomOnGoing = true;
        scale--;
        preselectZoomOut();
        screenZoomAnimator.setFloatValues(1.0f, 0.5f);
        screenZoomAnimator.start();

    }

    public void zoomReset(Float oldScale) {

        Float start;
        float end;
        if (oldScale != null) {
            start = oldScale;
            end = Math.round(oldScale);
        } else {
            start = getZoomScale();
            end = Math.round(getZoomScale());
        }


        if (end < 0.5f) {
            end = 0.5f;
        }
        if (end > 2.0f) {
            end = 2.0f;
        }
        screenZoomAnimator.setFloatValues(start, end);
        screenZoomAnimator.start();

    }

    public void moveToLastLocation() {
        moveToLocation(getCurrentBestLocation());
    }

    @Override
    public void onLocationChanged(Location location) {
        listener.onLocationChanged(location);

    }

    @Override
    public void onProviderDisabled(String provider) {
        listener.onProviderDisabled(provider);
    }

    @Override
    public void onProviderEnabled(String provider) {
        listener.onProviderEnabled(provider);
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
        listener.onStatusChanged(provider, status, extras);
    }

    public void correctScale() {
        if (scale > MAX_ZOOM) {
            scale = MAX_ZOOM;
        }
        if (scale < MIN_ZOOM) {
            scale = MIN_ZOOM;
        }

    }


    /**
     * Draw the viewport, including the tiles, the location Point and the target
     * point
     */
    public synchronized void draw(GL10 gl) {
//        handleAnimations();
        m.init();
//            float tmAlpha = (2 - zoomScale) * ALPHA_OFFSET;
        float tmAlpha = 1.0f;
        currentTM.draw(gl, tmAlpha);
//        preselectTM.draw(gl, 0.5f);
//        tmB.draw(gl, 0.5f);
        if (zoomScale > 1.0f) {
            float tmZoomInAlpha = (zoomScale - 1) * ALPHA_OFFSET;
            preselectTM.draw(gl, tmZoomInAlpha);
        }
        if (zoomScale < 1.0f) {
            float tmZoomOutAlpha = (1 / zoomScale - 1) * ALPHA_OFFSET;
            preselectTM.draw(gl, tmZoomOutAlpha);
        }

        Point p = locationPoint;
        p.getPosFromCoord(this);

        Circle c = new Circle();
        mLocation.init();
//            mLocation.set(zoomOnGoing ? m1 : m);
        mLocation.translate(mapScreenWidth / 2, mapScreenHeight / 2);

        mLocation
                .scale(getZoomScale(), getZoomScale(), mapScreenWidth / 2, mapScreenHeight / 2);
        mLocation.translate(p.posx, p.posy);
//            mLocation.preRotate(azimuth_angle, locationPoint.bmp.getWidth() / 2,
//                    locationPoint.bmp.getHeight() / 2);
        c.draw(gl, mLocation.m);

    }


    private MapActivity getMapActivity() {
        return (MapActivity) context;
    }

    boolean isZoomMax() {
        return scale >= MAX_ZOOM;
    }

    boolean isZoomMin() {
        return scale <= MIN_ZOOM;
    }


    public synchronized void zoomAnimated(int zoomOffset) {
        scale += zoomOffset;

    }


}
