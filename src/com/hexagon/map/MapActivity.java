package com.hexagon.map;

import java.io.File;
import java.util.Calendar;
import java.util.Date;

import android.annotation.TargetApi;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Looper;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.LruCache;
import android.view.GestureDetector;
import android.view.GestureDetector.OnDoubleTapListener;
import android.view.GestureDetector.OnGestureListener;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.view.ScaleGestureDetector.OnScaleGestureListener;
import android.view.SurfaceHolder;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.widget.ZoomButtonsController;
import android.widget.ZoomButtonsController.OnZoomListener;

import com.actionbarsherlock.app.SherlockActivity;
import com.hexagon.map.async.AsyncTaskCompleteListener;
import com.hexagon.map.download.HttpBitmapDownloadService;
import com.hexagon.map.geo.Point;
import com.hexagon.map.location.SearchService;
import com.hexagon.map.preference.MapPreferenceActivity;
import com.hexagon.map.preference.Preferences;
import com.hexagon.map.util.JveLog;
import com.jhlabs.map.awt.Point2D;

public class MapActivity extends SherlockActivity implements OnGestureListener,
		OnDoubleTapListener, SensorEventListener {

	private static final int CACHE_TIMEOUT_MINUTE = 10;
	private static final String TAG = "IGNMapActivity";
	MapView main;
	GestureDetector gestureScanner;
	Viewport viewport;
	DisplayMetrics dm;
	private ZoomButtonsController controller;
	private LocationManager locationManager;
	private com.actionbarsherlock.view.MenuItem locationButton;
	public SurfaceHolder surfaceHolder;
	// private ImageButton searchButton;
	// private AdView adView;
	public static File cacheDir;

	private ScaleGestureDetector mScaleDetector;
	private boolean pinchDone = false;
	private SensorManager mSensorManager;
	private Sensor mSensor;
	private ImageButton fsLocationButton;
	private Date stopTime;
	public long pinchDoneTime;

	// /////////////////////////////////////////////////////////////////
	// Lifecycle
	// /////////////////////////////////////////////////////////////////

	@TargetApi(12)
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		HttpBitmapDownloadService.getInstance().setActivity(this);
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
			// Get memory class of this device, exceeding this amount will throw
			// an
			// OutOfMemory exception.
			final int memClass = ((ActivityManager) getSystemService(Context.ACTIVITY_SERVICE))
					.getMemoryClass();

			// Use 1/8th of the available memory for this memory cache.
			final int cacheSize = 1024 * 1024 * memClass / 8;

			Viewport.mMemoryCache = new LruCache<String, Bitmap>(cacheSize) {
				@Override
				protected int sizeOf(String key, Bitmap bitmap) {
					// The cache size will be measured in bytes rather than
					// number
					// of items.
					return bitmap.getByteCount();
				}
			};
		}

		// Init the cache directory
		cacheDir = getCacheDir();

		Preferences.init(this);

		clearCache();
		// build the display : main display, zoom controller.
		initDisplay();

		// Init of the context at startup : default zoom, default position...
		initIGNStartupContext();

		initLocationManager();
		// enableLocation();

	}

	@Override
	protected void onStart() {
		super.onStart();
		// layer.startLoadThread();

		boolean rescalePinchZoom = Preferences.isRescalePinchZoom();
		mScaleDetector = new ScaleGestureDetector(this,
				new GestureListenerFactory()
						.getGestureListener(rescalePinchZoom));
		clearTimedCache();
	}

	@Override
	protected void onResume() {
		super.onResume();
		requestLocationUpdate(viewport);
	}

	@Override
	protected void onPause() {
		super.onPause();
		locationManager.removeUpdates(viewport);
		mSensorManager.unregisterListener(this);
	}

	@Override
	protected void onStop() {
		super.onStop();
		markTimedCache();
		// layer.stopLoadThread();

		SharedPreferences settings = getPreferences(0);
		SharedPreferences.Editor editor = settings.edit();
		editor.putFloat("currentX", viewport.coordX);
		editor.putFloat("currentY", viewport.coordY);
		editor.putInt("scale", viewport.scale);
		editor.commit();
		// clearCache();
	}

	/**
	 * Mark the time when the application has been stopped.
	 */
	private void markTimedCache() {
		stopTime = new Date(System.currentTimeMillis());
	}

	/**
	 * Clear the Tile cache.
	 */
	@TargetApi(12)
	private void clearCache() {
		if (!Preferences.isDevMode()) {
			deleteCache(this);
			cacheDir.mkdirs();

			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB
					&& Viewport.mMemoryCache != null) {
				// Also reset LRU Cache
				Viewport.mMemoryCache.evictAll();
			}

			if (viewport != null) {
				// And reset viewport
				viewport.refresh();
			}
		}
	}

	/**
	 * Clean cache if application had been stop for more than 10 minutes. This
	 * is to conform to IGN free license which prohibit persistent cache.
	 */
	private void clearTimedCache() {

		if (stopTime != null) {
			Date restartTime = new Date(System.currentTimeMillis());
			Calendar c = Calendar.getInstance();
			c.setTime(restartTime);
			c.add(Calendar.SECOND, -CACHE_TIMEOUT_MINUTE);
			Date restartMinusTen = c.getTime();
			if (stopTime.before(restartMinusTen)) {
				// More than 10 min, cache has be cleaned
				Log.d(TAG, "Application stopped for too long, cleaning cache");
				clearCache();
			}
		}

	}

	@Override
	protected void onDestroy() {
		// adView.destroy();
		super.onDestroy();
		clearCache();
		HttpBitmapDownloadService.getInstance().launchUpdateCount();
		// layer.stopLoadThread();
	}

	/**
	 * Delete the cache files
	 * 
	 * @param context
	 */
	public static void deleteCache(Context context) {
		try {
			File dir = cacheDir;
			if (dir != null && dir.isDirectory()) {
				deleteDir(dir);
			}
		} catch (Exception e) {
		}
	}

	/**
	 * Recursive method to delete all files and dir in the application cache.
	 * 
	 * @param dir
	 * @return
	 */
	public static boolean deleteDir(File dir) {
		if (dir != null && dir.isDirectory()) {
			String[] children = dir.list();
			for (int i = 0; i < children.length; i++) {
				boolean success = deleteDir(new File(dir, children[i]));
				if (!success) {
					return false;
				}
			}
		}
		return dir.delete();
	}

	// /////////////////////////////////////////////////////////////////
	// Inits
	// /////////////////////////////////////////////////////////////////

	private void restorePreferences() {
		SharedPreferences settings = getPreferences(0);
		viewport.coordX = settings.getFloat("currentX", 2.0298096E7f);
		viewport.coordY = settings.getFloat("currentY", 1.3787438E7f);

		viewport.scale = settings.getInt("scale", 12);
	}

	private void initLocationManager() {
		locationManager = (LocationManager) this
				.getSystemService(Context.LOCATION_SERVICE);
		// locationListener = new AbstractLocationListener(this);

		fsLocationButton = (ImageButton) findViewById(R.id.fsLocationButton);
		fsLocationButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				enableLocation();
				hideKeyboard(findViewById(R.id.menuSearch));
			}

		});

		mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
		mSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_ORIENTATION);
	}

	private void initSearch() {
		// searchButton = (ImageButton) findViewById(R.id.searchButton);
		// searchButton.setOnClickListener(new OnClickListener() {
		// @Override
		// public void onClick(View v) {
		// doSearch();
		// }
		// });

		// EditText editText = (EditText) findViewById(R.id.addressField);
		// editText.setOnEditorActionListener(new OnEditorActionListener() {
		// @Override
		// public boolean onEditorAction(TextView v, int actionId,
		// KeyEvent event) {
		// boolean handled = false;
		// if (actionId == EditorInfo.IME_ACTION_SEARCH) {
		// doSearch();
		// handled = true;
		// }
		// return handled;
		// }
		// });
	}

	/**
	 * Init the display screen. This method is called at application startup and
	 * for each orientation change.
	 */
	private void initDisplay() {
		gestureScanner = new GestureDetector(this);
		dm = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(dm);

		main = new MapView(this, this);

		setContentView(R.layout.main);
		LinearLayout content = (LinearLayout) findViewById(R.id.mapLayout);

		content.addView(main);

		initSearch();

		// adView = (AdView) findViewById(R.id.ad);
		// adView.setVisibility(View.VISIBLE);
		// adView.loadAd(new AdRequest());

		handleFullScreen(Preferences.isFullScreen());

		initZoomController();

	}

	private void initZoomController() {
		controller = new ZoomButtonsController(main);
		controller.setOnZoomListener(new OnZoomListener() {

			public void onZoom(boolean zoomIn) {
				if (zoomIn) {
					zoomIn();
				} else {
					zoomOut();
				}
			}

			public void onVisibilityChanged(boolean visible) {
				controller.setVisible(visible);
			}
		});
		// controller.setVisible(true);
		controller.setAutoDismissed(true);
	}

	/**
	 * Initialisation of the tiles fetcher
	 * 
	 * @return
	 */
	private void initIGNStartupContext() {
		viewport = new Viewport(this, dm);
		viewport.scale = 12;
		restorePreferences();

		handleIntent();
		viewport.initPosition();
	}

	// /////////////////////////////////////////////////////////////////
	// Events
	// /////////////////////////////////////////////////////////////////

	public boolean onDoubleTap(MotionEvent e) {
		// center on tapped point
		float distX = e.getX() - (dm.widthPixels / 2);
		float distY = e.getY() - (dm.heightPixels / 2);
		viewport.mouseDragAnimated(Math.round(distX), Math.round(distY));
		zoomIn();
		return true;
	}

	public boolean onDoubleTapEvent(MotionEvent e) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean onSingleTapConfirmed(MotionEvent e) {
		// TODO Auto-generated method stub
		return false;
	}

	private void zoomIn() {
		if (!viewport.isZoomMax() && !viewport.zoomOnGoing) {
			JveLog.d(TAG, "zoom in");
			JveLog.d(TAG, "scale : " + viewport.scale);
			viewport.zoomInAnimated();
			handleZoomControl();
		}
	}

	private void zoomOut() {
		if (!viewport.isZoomMin() && !viewport.zoomOnGoing) {
			JveLog.d(TAG, "zoom out");
			JveLog.d(TAG, "scale : " + viewport.scale);
			viewport.zoomOutAnimated();
			handleZoomControl();
		}
	}

	private void zoom(int zoomOffset) {
		if (zoomOffset > 0 && !viewport.isZoomMax()) {
			viewport.zoomAnimated(zoomOffset);
		}
		if (zoomOffset < 0 && !viewport.isZoomMin()) {
			viewport.zoomAnimated(zoomOffset);
		}
		handleZoomControl();
	}

	private void handleZoomControl() {
		controller.setZoomInEnabled(!viewport.isZoomMax());
		controller.setZoomOutEnabled(!viewport.isZoomMin());
	}

	// private void doSearch() {
	// final EditText addressField = (EditText) findViewById(R.id.addressField);
	// String address = addressField.getText().toString();
	// doSearch(addressField, address);
	// }

	private void doSearch(String address) {
		doSearch(null, address);
	}

	private void doSearch(final EditText addressField, String address) {
		if (address != null && !address.equals("")) {
			if (address.equals("Dev Mode")) {
				Preferences.setDevMode(!Preferences.isDevMode());
				Toast.makeText(this, "dev Mode : " + Preferences.isDevMode(),
						Toast.LENGTH_SHORT).show();

			}
			SearchService searchService = new SearchService(MapActivity.this,
					new AsyncTaskCompleteListener<Point2D.Float>() {
						@Override
						public void onTaskComplete(Point2D.Float result) {
							moveToPos(result);
							if (addressField != null) {
								hideKeyboard(addressField);
							} else {
								hideKeyboard(findViewById(R.id.menuSearch));
							}
						}
					});
			searchService.submit(address);

		}
	}

	private void moveToPos(Point2D.Float pos) {
		viewport.moveToPositionAnimated(pos, true);
		disableLocation();
	}

	private void enableLocation() {
		locationButton.setIcon(android.R.drawable.ic_menu_compass);
		fsLocationButton.setImageResource(android.R.drawable.ic_menu_compass);
		viewport.lock();
		viewport.moveToLocation(viewport.getCurrentBestLocation());
	}

	private void disableLocation() {
		// locationButton.setImageResource(R.drawable.gps_lpi_v2_tr);
		locationButton.setIcon(android.R.drawable.ic_menu_mylocation);
		fsLocationButton
				.setImageResource(android.R.drawable.ic_menu_mylocation);
		// Unregister the listener with the Location Manager
		// locationManager.removeUpdates(locationListener);
		viewport.unlock();
	}

	@Override
	public void onDetachedFromWindow() {
		super.onDetachedFromWindow();
		controller.setVisible(false);
	}

	private void handleIntent() {
		Uri data = getIntent().getData();
		if (data != null) {

			String schemeSpecificPart = data.getSchemeSpecificPart();
			if (schemeSpecificPart.contains("@")) {
				schemeSpecificPart = schemeSpecificPart.split("@")[1];
			}
			String[] c = schemeSpecificPart.split(",");
			java.lang.Float cx = java.lang.Float.parseFloat(c[1]);
			java.lang.Float cy = java.lang.Float.parseFloat(c[0]);
			viewport.targetPoint = new Point();

			viewport.targetPoint.moveToPosition(cx, cy);
		}
		System.out.println(data);
	}

	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
		JveLog.d(TAG, "screen orientation changed");
		controller.setVisible(false);
		initDisplay();
		viewport.init(this, dm);
		viewport.initPosition();

	}

	private void requestLocationUpdate(LocationListener listener) {
		try {
			locationManager.requestLocationUpdates(
					LocationManager.NETWORK_PROVIDER, 0, 0, listener);
			locationManager.requestLocationUpdates(
					LocationManager.GPS_PROVIDER, 0, 0, listener);
			mSensorManager.registerListener(this, mSensor,
					SensorManager.SENSOR_DELAY_NORMAL);
		} catch (Exception e) {
			Log.w(TAG, "Provider Error", e);
		}

	}

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		outState.putFloat("currentX", viewport.coordX);
		outState.putFloat("currentY", viewport.coordY);
	}

	@Override
	public boolean onTouchEvent(MotionEvent me) {
		final int action = me.getAction();
		final int fingersCount = me.getPointerCount();
		if ((action == MotionEvent.ACTION_POINTER_UP) && (fingersCount == 2)) {
			onTwoFingersTap();
			return true;
		}

		mScaleDetector.onTouchEvent(me);
		viewport.resetInertiaScroll();
		// zoom control are reset to visible at each touch on the screen
		controller.setVisible(true);
		return gestureScanner.onTouchEvent(me);
	}

	private void onTwoFingersTap() {
		zoomOut();
	}

	public boolean onScroll(MotionEvent e1, MotionEvent e2,
			final float distanceX, final float distanceY) {
		disableLocation();
		viewport.handleScroll(distanceX, distanceY);
		return true;
	}

	public boolean onDown(MotionEvent e) {
		return true;
	}

	public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
			float velocityY) {
		viewport.handleInertiaScroll(velocityX, velocityY);
		return true;
	}

	public void onLongPress(MotionEvent e) {
		// zoomOut();
	}

	public void onShowPress(MotionEvent e) {
	}

	public boolean onSingleTapUp(MotionEvent e) {
		return true;
	}

	private void hideKeyboard(View view) {
		InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
		imm.hideSoftInputFromWindow(view.getApplicationWindowToken(), 0);
	}

	public void disableFullScreen(View v) {
		Preferences.setFullScreen(false);
		handleFullScreen(false);

	}

	// /////////////////////////////////////////////////////////////////
	// Option menu
	// /////////////////////////////////////////////////////////////////

	@Override
	public boolean onCreateOptionsMenu(com.actionbarsherlock.view.Menu menu) {

		com.actionbarsherlock.view.MenuInflater inflater = getSupportMenuInflater();

		inflater.inflate(R.menu.main_menu, menu);
		com.actionbarsherlock.widget.SearchView searchView = (com.actionbarsherlock.widget.SearchView) menu
				.findItem(R.id.menuSearch).getActionView();
		searchView.setSubmitButtonEnabled(true);
		searchView
				.setOnQueryTextListener(new com.actionbarsherlock.widget.SearchView.OnQueryTextListener() {

					@Override
					public boolean onQueryTextSubmit(String query) {
						doSearch(query);
						return true;
					}

					@Override
					public boolean onQueryTextChange(String newText) {
						return false;
					}
				});

		locationButton = (com.actionbarsherlock.view.MenuItem) menu
				.findItem(R.id.myLocation);
		locationButton
				.setOnMenuItemClickListener(new com.actionbarsherlock.view.MenuItem.OnMenuItemClickListener() {

					@Override
					public boolean onMenuItemClick(
							com.actionbarsherlock.view.MenuItem item) {
						enableLocation();
						hideKeyboard(findViewById(R.id.menuSearch));
						return true;
					}
				});
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(
			com.actionbarsherlock.view.MenuItem item) {
		// Handle item selection
		switch (item.getItemId()) {

		case R.id.fullScreen:
			Preferences.setFullScreen(!Preferences.isFullScreen());
			handleFullScreen(Preferences.isFullScreen());
			return true;
			// case R.id.useCacheItem:
			// Preferences.useCache = !Preferences.useCache;
			// Toast.makeText(this, "use cache : " + Preferences.useCache,
			// Toast.LENGTH_SHORT).show();
			// return true;
		case R.id.preferences:
			Intent intent = new Intent(this, MapPreferenceActivity.class);
			startActivity(intent);

			return true;
		default:
			return super.onOptionsItemSelected(item);
		}
	}

	private void handleFullScreen(boolean fullScreen) {
		if (fullScreen) {
			getSupportActionBar().hide();

		} else {
			getSupportActionBar().show();
		}

		// LinearLayout topBar = (LinearLayout) findViewById(R.id.topBar);
		// topBar.setVisibility(fullScreen ? View.GONE : View.VISIBLE);
		ImageButton locationButton = (ImageButton) findViewById(R.id.fsLocationButton);
		locationButton.setVisibility(fullScreen ? View.VISIBLE : View.GONE);
		ImageButton fsOffButton = (ImageButton) findViewById(R.id.fsOffButton);
		fsOffButton.setVisibility(fullScreen ? View.VISIBLE : View.GONE);
		initZoomController();
	}

	// /////////////////////////////////////////////////////////////////
	// View
	// /////////////////////////////////////////////////////////////////

	/**
	 * 
	 * Dedicated Render thread, following standard Android pattern.
	 * 
	 * @author Jerome
	 * 
	 */
	class MapRenderThread extends Thread {
		private MapView mapView;
		private boolean run = false;

		public MapRenderThread(SurfaceHolder surfaceHolder, MapView mv) {
			MapActivity.this.surfaceHolder = surfaceHolder;
			mapView = mv;

		}

		public void setRunning(boolean run) {
			this.run = run;
		}

		@Override
		public void run() {
			Looper.prepare();
			Canvas c;
			while (run) {
				c = null;
				try {
					c = surfaceHolder.lockCanvas(null);
					synchronized (surfaceHolder) {
						mapView.onDraw(c);
					}
				} finally {
					// do this in a finally so that if an exception is thrown
					// during the above, we don't leave the Surface in an
					// inconsistent state
					if (c != null) {
						surfaceHolder.unlockCanvasAndPost(c);
					}
				}
			}
		}
	}

	public class InstantReScaleGestureListener implements
			OnScaleGestureListener {

		private float initialScaleFactor;

		@Override
		public void onScaleEnd(ScaleGestureDetector detector) {
			// zoom(zoomOffset);
			// viewport.zoomScale = 1.0f;
		}

		@Override
		public boolean onScaleBegin(ScaleGestureDetector detector) {
			viewport.copyGrid();
			initialScaleFactor = 1.0f;
			return true;
		}

		@Override
		public boolean onScale(ScaleGestureDetector detector) {
			JveLog.d(TAG, "zoom ongoing, scale: " + detector.getScaleFactor());
			float scaleDelta = detector.getScaleFactor() - initialScaleFactor;
			pinchDone = true;
			int zoomOffset = viewport.scale + Math.round(scaleDelta);
			viewport.correctScale();
			handleZoomControl();
			if (viewport.scale != zoomOffset) {
				viewport.scale = zoomOffset;
				initialScaleFactor = detector.getScaleFactor();
				viewport.refresh();
			}
			viewport.zoomScale = scaleDelta + 1.0f;

			return false;
		}

	}

	public class TouchUpReScaleGestureListener implements
			OnScaleGestureListener {

		private static final float ZOOM_OUT_THESHOLD = 0.5f;
		private static final float ZOOM_IN_THESHOLD = 2.0f;

		@Override
		public void onScaleEnd(ScaleGestureDetector detector) {
			int zoomOffset = Math.round(viewport.zoomScale) - 1;
			Log.d(TAG, "zoom offset : " + zoomOffset);

			if (zoomOffset > 1)
				zoomOffset = 1;
			if (zoomOffset < -1)
				zoomOffset = -1;
			zoom(zoomOffset);
			if (zoomOffset == 0) {
				viewport.zoomReset(null);
			}
			float oldScale = viewport.zoomScale;
			// if (viewport.zoomScale < ZOOM_OUT_THESHOLD) {
			// oldScale = ZOOM_OUT_THESHOLD;
			//
			// } else if (viewport.zoomScale > ZOOM_IN_THESHOLD) {
			// oldScale = ZOOM_IN_THESHOLD;
			// }
			viewport.zoomScale = 1.0f;
			// viewport.refresh();
			if (zoomOffset != 0) {
				viewport.zoomReset(oldScale);
			}

			pinchDone = true;
			pinchDoneTime = System.currentTimeMillis();
		}

		@Override
		public boolean onScaleBegin(ScaleGestureDetector detector) {
			if (viewport.zoomOnGoing) {
				return true;
			}
			viewport.copyGrid();
			return true;
		}

		@Override
		public boolean onScale(ScaleGestureDetector detector) {
			if (!viewport.zoomOnGoing) {
				return true;
			}

			JveLog.d(TAG, "zoom ongoing, scale: " + detector.getScaleFactor());
			viewport.zoomScale *= detector.getScaleFactor();
			pinchDone = true;
			return true;
		}

	}

	public class GestureListenerFactory {

		public OnScaleGestureListener getGestureListener(boolean instant) {

			if (instant) {
				return new InstantReScaleGestureListener();
			} else {
				return new TouchUpReScaleGestureListener();
			}

		}

	}

	@Override
	public void onAccuracyChanged(Sensor sensor, int accuracy) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onSensorChanged(SensorEvent event) {
		viewport.azimuth_angle = event.values[0];
	}

}