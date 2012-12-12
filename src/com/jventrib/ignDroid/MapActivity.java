package com.jventrib.ignDroid;

import java.io.File;

import android.annotation.TargetApi;
import android.app.Activity;
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
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.view.ScaleGestureDetector.OnScaleGestureListener;
import android.view.SurfaceHolder;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.TextView.OnEditorActionListener;
import android.widget.Toast;
import android.widget.ZoomButtonsController;
import android.widget.ZoomButtonsController.OnZoomListener;

import com.jhlabs.map.awt.Point2D;
import com.jventrib.ignDroid.async.AsyncTaskCompleteListener;
import com.jventrib.ignDroid.location.SearchService;
import com.jventrib.ignDroid.preference.IgnPreferenceActivity;
import com.jventrib.ignDroid.util.JveLog;

public class MapActivity extends Activity implements OnGestureListener,
		OnDoubleTapListener, SensorEventListener {

	private static final String TAG = "IGNMapActivity";
	MapView main;
	GestureDetector gestureScanner;
	Viewport viewport;
	DisplayMetrics dm;
	private ZoomButtonsController controller;
	private LocationManager locationManager;
	private ImageButton locationButton;
	public SurfaceHolder surfaceHolder;
	private ImageButton searchButton;
	// private AdView adView;
	public static File cacheDir;

	private ScaleGestureDetector mScaleDetector;
	private boolean pinchDone = false;
	private SensorManager mSensorManager;
	private Sensor mSensor;
	private ImageButton fsLocationButton;

	// /////////////////////////////////////////////////////////////////
	// Lifecycle
	// /////////////////////////////////////////////////////////////////

	@TargetApi(12)
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		if (Build.VERSION.SDK_INT >= 12) {
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
		cacheDir = getExternalCacheDir();

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

		// clearCache();
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
		// layer.stopLoadThread();

		SharedPreferences settings = getPreferences(0);
		SharedPreferences.Editor editor = settings.edit();
		editor.putFloat("currentX", viewport.coordX);
		editor.putFloat("currentY", viewport.coordY);
		editor.putInt("scale", viewport.scale);
		editor.commit();
		// clearCache();
	}

	private void clearCache() {
		if (!Preferences.isDevMode()) {
			deleteCache(this);
			cacheDir.mkdirs();
		}
	}

	@Override
	protected void onDestroy() {
		// adView.destroy();
		super.onDestroy();
		clearCache();
		// layer.stopLoadThread();
	}

	public static void deleteCache(Context context) {
		try {
			File dir = cacheDir;
			if (dir != null && dir.isDirectory()) {
				deleteDir(dir);
			}
		} catch (Exception e) {
		}
	}

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

		locationButton = (ImageButton) findViewById(R.id.locationButton);
		locationButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				enableLocation();
				hideKeyboard((EditText) findViewById(R.id.addressField));
			}

		});

		fsLocationButton = (ImageButton) findViewById(R.id.fsLocationButton);
		fsLocationButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				enableLocation();
				hideKeyboard((EditText) findViewById(R.id.addressField));
			}

		});

		mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
		mSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_ORIENTATION);
	}

	private void initSearch() {
		searchButton = (ImageButton) findViewById(R.id.searchButton);
		searchButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				doSearch();
			}
		});

		EditText editText = (EditText) findViewById(R.id.addressField);
		editText.setOnEditorActionListener(new OnEditorActionListener() {
			@Override
			public boolean onEditorAction(TextView v, int actionId,
					KeyEvent event) {
				boolean handled = false;
				if (actionId == EditorInfo.IME_ACTION_SEARCH) {
					doSearch();
					handled = true;
				}
				return handled;
			}
		});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.main_menu, menu);
		return true;
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

		controller = new ZoomButtonsController(main);
		controller.setOnZoomListener(new OnZoomListener() {

			public void onZoom(boolean zoomIn) {
				if (zoomIn) {
					zoomIn();
				} else {
					zoomOut();
				}
			}

			public void onVisibilityChanged(boolean arg0) {

			}
		});
		controller.setVisible(true);
		controller.setAutoDismissed(true);

		setContentView(R.layout.main);
		LinearLayout content = (LinearLayout) findViewById(R.id.mapLayout);

		content.addView(main);

		initSearch();

		// adView = (AdView) findViewById(R.id.ad);
		// adView.setVisibility(View.VISIBLE);
		// adView.loadAd(new AdRequest());

		handleFullScreen(Preferences.isFullScreen());

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
		viewport.mouseDrag(Math.round(distX), Math.round(distY));
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
		if (!viewport.isZoomMax()) {
			JveLog.d(TAG, "zoom in");
			JveLog.d(TAG, "scale : " + viewport.scale);
			viewport.zoomInAnimated();
			handleZoomControl();
		}
	}

	private void zoomOut() {
		JveLog.d(TAG, "zoom out");
		JveLog.d(TAG, "scale : " + viewport.scale);
		viewport.zoomOutAnimated();
		handleZoomControl();
	}

	private void zoom(int zoomOffset) {
		if (zoomOffset > 0 && !viewport.isZoomMax()) {
			viewport.scale += zoomOffset;
		}
		if (zoomOffset < 0 && !viewport.isZoomMin()) {
			viewport.scale += zoomOffset;
		}
		handleZoomControl();
	}

	private void handleZoomControl() {
		controller.setZoomInEnabled(!viewport.isZoomMax());
		controller.setZoomOutEnabled(!viewport.isZoomMin());
	}

	private void doSearch() {
		final EditText addressField = (EditText) findViewById(R.id.addressField);
		String address = addressField.getText().toString();
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
							hideKeyboard(addressField);
						}
					});
			searchService.submit(address);

		}
	}

	private void moveToPos(Point2D.Float pos) {
		viewport.moveToPositionAnimated(pos);
		disableLocation();
	}

	private void enableLocation() {
		locationButton.setImageResource(R.drawable.gps_lpi_v2);
		fsLocationButton.setImageResource(R.drawable.gps_lpi_v2);
		viewport.lock();
		viewport.moveToLocation(viewport.getCurrentBestLocation());
	}

	private void disableLocation() {
		locationButton.setImageResource(R.drawable.gps_lpi_v2_tr);
		fsLocationButton.setImageResource(R.drawable.gps_lpi_v2_tr);
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
		locationManager.requestLocationUpdates(
				LocationManager.NETWORK_PROVIDER, 0, 0, listener);
		locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0,
				0, listener);
		mSensorManager.registerListener(this, mSensor,
				SensorManager.SENSOR_DELAY_NORMAL);

	}

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		outState.putFloat("currentX", viewport.coordX);
		outState.putFloat("currentY", viewport.coordY);
	}

	@Override
	public boolean onTouchEvent(MotionEvent me) {

		if (me.getAction() == MotionEvent.ACTION_POINTER_UP
				|| me.getAction() == MotionEvent.ACTION_UP) {
			pinchDone = false;
		}
		mScaleDetector.onTouchEvent(me);
		if (pinchDone) {
			return true;
		}
		viewport.resetInertiaScroll();
		// zoom control are reset to visible at each touch on the screen
		controller.setVisible(true);
		return gestureScanner.onTouchEvent(me);
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

	private void hideKeyboard(EditText editText) {
		InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
		imm.hideSoftInputFromWindow(editText.getApplicationWindowToken(), 0);
	}

	// /////////////////////////////////////////////////////////////////
	// Option menu
	// /////////////////////////////////////////////////////////////////

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
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
			Intent intent = new Intent(this, IgnPreferenceActivity.class);
			startActivity(intent);

			return true;
		default:
			return super.onOptionsItemSelected(item);
		}
	}

	private void handleFullScreen(boolean fullScreen) {
		LinearLayout topBar = (LinearLayout) findViewById(R.id.topBar);
		ImageButton locationButton = (ImageButton) findViewById(R.id.fsLocationButton);
		topBar.setVisibility(fullScreen ? View.GONE : View.VISIBLE);
		locationButton.setVisibility(fullScreen ? View.VISIBLE : View.GONE);
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

		@Override
		public void onScaleEnd(ScaleGestureDetector detector) {
			int zoomOffset = Math.round(viewport.zoomScale) - 1;
			zoom(zoomOffset);
			viewport.zoomScale = 1.0f;
			viewport.refresh();
		}

		@Override
		public boolean onScaleBegin(ScaleGestureDetector detector) {
			return true;
		}

		@Override
		public boolean onScale(ScaleGestureDetector detector) {
			Log.d(TAG, "zoom ongoing, scale: " + detector.getScaleFactor());
			viewport.zoomScale = detector.getScaleFactor();
			pinchDone = true;

			return false;
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