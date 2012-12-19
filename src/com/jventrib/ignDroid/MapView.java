/**
 * 
 */
package com.jventrib.ignDroid;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.util.DisplayMetrics;
import android.view.SurfaceHolder;
import android.view.SurfaceView;

import com.jventrib.ignDroid.MapActivity.MapRenderThread;
import com.jventrib.ignDroid.preference.Preferences;

/**
 * Main view class
 * 
 * @author Jerome
 * 
 */
class MapView extends SurfaceView implements SurfaceHolder.Callback {

//	private static final String TAG = "MapView";
	/**
	 * 
	 */
	private final MapActivity mapActivity;
	public MapRenderThread thread;
	Paint paint;
	DisplayMetrics dm;
	private int iteration;
	private long startTime;
	private Long fps;

	public MapView(MapActivity mapActivity, Context context) {
		super(context);
		this.mapActivity = mapActivity;
		getHolder().addCallback(this);
		paint = new Paint();
	}

	@Override
	protected void onDraw(Canvas canvas) {
		if (canvas == null) {
			return;
		}
		// JveLog.d(TAG, "HW Accelerated : " + canvas.isHardwareAccelerated());
		iteration++;
		iteration = iteration % 50;
		if (iteration == 0) {
			startTime = System.currentTimeMillis();
		}

		mapActivity.viewport.draw(canvas, paint);

		if (iteration == 49) {
			long endTime = System.currentTimeMillis();
			long duration = endTime - startTime;
			fps = 50000 / duration;
		}

		boolean showFps = Preferences.isShowFps();
		if (fps != null && showFps) {
			paint.setTextSize(40);
			canvas.drawText(fps.toString() + "fps",
					mapActivity.dm.widthPixels - 120, 40, paint);
		}

	}

	public void surfaceChanged(SurfaceHolder holder, int format, int width,
			int height) {
		// TODO Auto-generated method stub

	}

	public void surfaceCreated(SurfaceHolder holder) {
		thread = mapActivity.new MapRenderThread(getHolder(), this);
		thread.setName("renderViewThread");
		thread.setRunning(true);
		thread.start();
	}

	public void surfaceDestroyed(SurfaceHolder holder) {
		boolean retry = true;
		thread.setRunning(false);
		while (retry) {
			try {
				thread.join();
				retry = false;
			} catch (InterruptedException e) {
				// we will try it again and again...
			}
		}
	}

}