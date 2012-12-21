package com.hexagon.map;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.location.Location;
import android.location.LocationListener;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.FloatMath;
import android.util.LruCache;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.Animation;
import android.view.animation.Animation.AnimationListener;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.Transformation;

import com.hexagon.map.geo.AbstractPositionableElement;
import com.hexagon.map.geo.LocationablePoint;
import com.hexagon.map.geo.Point;
import com.jhlabs.map.awt.Point2D;
import com.jhlabs.map.proj.MercatorProjection;

public class Viewport extends AbstractPositionableElement implements
		LocationListener {

	// Make this bigger will preload more tiles surrounding the screen, making
	// less checkboard tile, but more bitmap to move, increasing bandwith
	// requirement. 2 is fastest
	private static final int PRELOAD_SIZE = 2;
	public static final int tileWidth = 256;
	public static final int tileHeight = 256;
	public static String type = "jpg";

	private static final int MIN_ZOOM = 3;
	private static final int MAX_ZOOM = 18;

	// private static final String TAG = "Viewport";

	public static float[] zoomRatios = { 156543.0339280410f, 78271.5169640205f,
			39135.7584820102f, 19567.8792410051f, 9783.9396205026f,
			4891.9698102513f, 2445.9849051256f, 1222.9924525628f,
			611.4962262814f, 305.7481131407f, 152.8740565704f, 76.4370282852f,
			38.2185141426f, 19.1092570713f, 9.5546285356f, 4.7773142678f,
			2.3886571339f, 1.1943285670f, 0.5971642835f, 0.2985821417f,
			0.1492910709f, 0.0746455354f };

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
	private Tile[][] images;

	public boolean running = true;

	HashMap<String, Bitmap> imageCache = new HashMap<String, Bitmap>();
	boolean alreadyRunning;

	boolean vis = true;
	public Bitmap noSrcBmp;
	public boolean tileLoading;

	public static LruCache<String, Bitmap> mMemoryCache;

	boolean lock;

	private ScreenScrollAnimation screenScrollingAnimation;
	private LocationChangedAnimation locationChangedAnimation;
	private ScreenZoomAnimation screenZoomAnimation;
	Context context;

	AbstractLocationListener listener;
	private int newScale;
	public float zoomScale = 1.0f;
	public float azimuth_angle;

	private Matrix m = new Matrix();
	private Matrix mLocation = new Matrix();

	public LocationablePoint locationPoint = new LocationablePoint();
	Point targetPoint;

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
		screenScrollingAnimation = new ScreenScrollAnimation();
		locationChangedAnimation = new LocationChangedAnimation();
		screenZoomAnimation = new ScreenZoomAnimation();

		marginX = 0;
		marginY = 0;

		mapScreenWidth = dm.widthPixels;
		mapScreenHeight = dm.heightPixels - 75;

		int tempX = mapScreenWidth + 2 * marginX;
		int tempY = mapScreenHeight + 2 * marginY;

		nbTileX = tempX / tileWidth + PRELOAD_SIZE;
		nbTileY = tempY / tileHeight + PRELOAD_SIZE;

		centerX = mapScreenWidth / 2;
		centerY = mapScreenHeight / 2;
		images = new Tile[nbTileX][nbTileY];
		for (int ix = 0; ix < this.nbTileX; ix++) {
			images[ix] = new Tile[nbTileY];
			for (int iy = 0; iy < this.nbTileY; iy++) {
				this.images[ix][iy] = createTile(ix, iy);
			}

		}
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

	private Tile createTile(int ix, int iy) {
		return new Tile(this, ix, iy);
	}

	public static String encodeFileName(String fileName) {
		byte[] tmp = fileName.getBytes();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < tmp.length; i++) {
			byte b = tmp[i];
			sb.append(b);
		}
		String encoded = sb.toString();
		return encoded;
	}

	float calcMapTileWidth() {
		return tileWidth * zoomRatios[this.scale];
	}

	float calcMapTileHeight() {
		return tileHeight * zoomRatios[this.scale];
	}

	int calcNumTileX(float coordX) {
		float calcMapTileWidth = this.calcMapTileWidth();
		return Math.round(FloatMath.floor(coordX / calcMapTileWidth));
	}

	int calcNumTileY(float coordY) {
		float calcMapTileHeight = this.calcMapTileHeight();
		return Math.round(FloatMath.floor(coordY / calcMapTileHeight));
	}

	public void mouseDrag(int l, int m) {
		setCoordX(calcMapDeltaX(getcoordX(), l));
		setCoordY(calcMapDeltaY(getcoordY(), m));
		move();
	}

	public void initPosition() {
		refresh();
		// move(0, 0);
	}

	public void move() {
		for (int ix = 0; ix < nbTileX; ix++) {
			for (int iy = 0; iy < nbTileY; iy++) {
				Tile t = images[ix][iy];
				t.positionImage();
				t.correctMapImage();
				if (!t.visible) {
					// Out of syncro, scrolling was too quick, need to recompute
					// all tiles
					refresh();
					return;
				}
			}
		}
	}

	int calcPixelX(float _3c) {
		return Math.round(centerX + (_3c - coordX) / zoomRatios[scale]);
	}

	int calcPixelY(float _3c) {
		return Math.round(centerY + (_3c - coordY) / zoomRatios[scale]);
	}

	private float calcMapDeltaX(float initiaPos, int delta) {
		return initiaPos + delta * zoomRatios[scale];
	}

	private float calcMapDeltaY(float initialPos, int delta) {
		return initialPos + delta * zoomRatios[scale];
	}

	public void moveToScreenCoord(float sx, float sy) {
		coordX = sx * zoomRatios[scale];
		coordY = sy * zoomRatios[scale];
	}

	/**
	 * Test intersection of two rectangle
	 * 
	 * @param x1
	 *            first x of rectangle 1
	 * @param x2
	 *            second x of rectangle 1
	 * @param y1
	 *            first y of rectangle 1
	 * @param y2
	 *            second y of rectangle 1
	 * @param X1
	 *            first x of rectangle 2
	 * @param X2
	 *            second x of rectangle 2
	 * @param Y1
	 *            first y of rectangle 2
	 * @param Y2
	 *            second y of rectangle 2
	 * @return
	 */
	static boolean rectIntersectRect(int x1, int x2, int y1, int y2, int X1,
			int X2, int Y1, int Y2) {
		if (x1 > X2) {
			return false;
		}
		if (x2 < X1) {
			return false;
		}
		if (y1 > Y2) {
			return false;
		}
		if (y2 < Y1) {
			return false;
		}
		return true;
	}

	private int calcPixelX(int _3c) {
		return Math.round(this.centerX + (_3c - this.getcoordX())
				/ zoomRatios[scale]);
	}

	private int calcPixelY(int _3f) {
		return Math.round(this.centerY + (_3f - this.getcoordY())
				/ zoomRatios[scale]);
	}

	public void setCoordX(float coordX) {
		this.coordX = coordX;
	}

	public float getcoordX() {
		return coordX;
	}

	public void setCoordY(float coordY) {
		this.coordY = coordY;
	}

	public float getcoordY() {
		return coordY;
	}

	public List<Tile> getTilesList() {
		List<Tile> result = new ArrayList<Tile>();
		for (int ix = 0; ix < this.nbTileX; ix++) {
			for (int iy = 0; iy < this.nbTileY; iy++) {
				result.add(images[ix][iy]);
			}
		}
		return result;

	}

	public void refresh() {
		newScale = scale;

		int offsetX = nbTileX / 2;
		int offsetY = nbTileY / 2;
		centerX = mapScreenWidth / 2;
		centerY = mapScreenHeight / 2;
		int numTileX = this.calcNumTileX(coordX);
		int numTileY = this.calcNumTileY(coordY);
		for (int ix = 0; ix < this.nbTileX; ix++) {
			for (int iy = 0; iy < this.nbTileY; iy++) {
				Tile t = this.images[ix][iy];
				int tileOffsetX = numTileX + ix - offsetX;
				int tileOffsetY = numTileY + iy - offsetY;
				t.clearImage();
				t.fillImage(tileOffsetX, tileOffsetY);
				t.correctMapImage();
				t.updateMapImage();
			}
		}
	}

	public void zoomIn() {
		scale++;
		refresh();
	}

	public void zoomOut() {
		scale--;
		refresh();
	}

	public void positionPoint(AbstractPositionableElement p) {
		p.posx = calcPixelX(p.mapx);
		p.posy = calcPixelY(p.mapy);
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
				moveToPositionAnimated(pos);
			}
		}
	}

	public void lock() {
		lock = true;
	}

	public void unlock() {
		lock = false;
	}

	private class ScreenScrollAnimation extends Animation {
		public float vY;
		public float vX;

		public ScreenScrollAnimation() {
			setInterpolator(new DecelerateInterpolator());
			setDuration(1000L);
		}

		@Override
		protected void applyTransformation(float interpolatedTime,
				Transformation t) {
			float tX = -vX * (1.0f - interpolatedTime) / 40;
			float tY = -vY * (1.0f - interpolatedTime) / 40;
			handleScroll(tX, tY);
		}
	}

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
			synchronized (getMapActivity().surfaceHolder) {
				setPosition(pX, pY);
			}
			move();

		}

	}

	public class ScreenZoomAnimation extends Animation implements
			AnimationListener {
		public float finalZoom;
		public float initialZoom;

		public ScreenZoomAnimation() {
			setInterpolator(new AccelerateDecelerateInterpolator());
			setDuration(300L);
			setAnimationListener(this);
		}

		@Override
		protected void applyTransformation(float interpolatedTime,
				Transformation t) {
			float deltaZoom = finalZoom - initialZoom;

			synchronized (getMapActivity().surfaceHolder) {
				zoomScale = deltaZoom * interpolatedTime + initialZoom;
			}

		}

		@Override
		public void onAnimationEnd(Animation animation) {
			scale = newScale;
			refresh();
			zoomScale = 1.0f;
		}

		@Override
		public void onAnimationRepeat(Animation animation) {
		}

		@Override
		public void onAnimationStart(Animation animation) {
		}

	}

	/**
	 * Handle screen scrolling animation step
	 */
	public void handleAnimations() {
		if (screenScrollingAnimation != null
				&& screenScrollingAnimation.isInitialized()
				&& !screenScrollingAnimation.hasEnded()) {
			screenScrollingAnimation.getTransformation(
					System.currentTimeMillis(), null);
		}
		if (locationChangedAnimation != null
				&& locationChangedAnimation.isInitialized()
				&& !locationChangedAnimation.hasEnded()) {
			locationChangedAnimation.getTransformation(
					System.currentTimeMillis(), null);
		}
		if (screenZoomAnimation != null && screenZoomAnimation.isInitialized()
				&& !screenZoomAnimation.hasEnded()) {
			screenZoomAnimation.getTransformation(System.currentTimeMillis(),
					null);
		}

	}

	public void handleScroll(float distX, float distY) {
		synchronized (getMapActivity().surfaceHolder) {
			mouseDrag(Math.round(distX), Math.round(distY));
		}
	}

	public void handleInertiaScroll(float velocityX, float velocityY) {
		screenScrollingAnimation.vX = velocityX;
		screenScrollingAnimation.vY = velocityY;
		screenScrollingAnimation.initialize(0, 0, 0, 0);
		screenScrollingAnimation.start();
	}

	public void resetInertiaScroll() {
		if (screenScrollingAnimation != null
				&& screenScrollingAnimation.hasStarted()) {
			screenScrollingAnimation.reset();

		}

	}

	public void moveToPositionAnimated(Point2D.Float pos) {
		if (pos != null) {
			if (locationChangedAnimation.hasEnded()
					|| !locationChangedAnimation.hasStarted()) {
				locationChangedAnimation.initialX = getcoordX();
				locationChangedAnimation.initialY = getcoordY();
				pos = MercatorProjection.getInstance().project(pos);
				locationChangedAnimation.finalX = pos.x;
				locationChangedAnimation.finalY = pos.y;
				locationChangedAnimation.initialize(0, 0, 0, 0);
				locationChangedAnimation.start();
			}
		}
	}

	public void zoomInAnimated() {
		newScale++;
		screenZoomAnimation.initialZoom = 1.0f;
		screenZoomAnimation.finalZoom = 2.0f;
		screenZoomAnimation.initialize(0, 0, 0, 0);
		screenZoomAnimation.start();
	}

	public void zoomOutAnimated() {
		newScale--;
		screenZoomAnimation.initialZoom = 1.0f;
		screenZoomAnimation.finalZoom = 0.5f;
		screenZoomAnimation.initialize(0, 0, 0, 0);
		screenZoomAnimation.start();
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
	 * 
	 * @param canvas
	 * @param paint
	 */
	public void draw(Canvas canvas, Paint paint) {
		handleAnimations();
		paint.setColor(Color.LTGRAY);
		canvas.drawRect(0, 0, mapScreenWidth, mapScreenHeight, paint);
		List<Tile> tiles = getTilesList();
		m.setScale(zoomScale, zoomScale, mapScreenWidth / 2,
				mapScreenHeight / 2);

		for (Tile t : tiles) {
			if (t.visible) {
				// t.draw(canvas, mapActivity.scrollX, mapActivity.scrollY,
				// paint);
				t.draw(canvas, m, paint);
			}
		}
		Point p = locationPoint;
		p.getPosFromCoord(this);
		paint.setColor(Color.RED);
		mLocation.set(m);
		mLocation.preTranslate(p.posx, p.posy);
		mLocation.preRotate(azimuth_angle, locationPoint.bmp.getWidth() / 2,
				locationPoint.bmp.getHeight() / 2);

		canvas.drawBitmap(locationPoint.bmp, mLocation, paint);

		// canvas.drawCircle(p.posx, p.posy, 10.0f, paint);

		Point tp = targetPoint;
		if (tp != null) {
			tp.getPosFromCoord(this);
			paint.setColor(Color.BLUE);
			canvas.drawCircle(tp.posx, tp.posy, 10.0f, paint);
		}

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

}
