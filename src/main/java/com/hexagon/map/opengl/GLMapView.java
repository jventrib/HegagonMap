/**
 *
 */
package com.hexagon.map.opengl;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL;
import javax.microedition.khronos.opengles.GL10;

import android.content.Context;
import android.graphics.Paint;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.opengl.GLU;
import android.util.DisplayMetrics;
import android.view.SurfaceHolder;

import com.hexagon.map.MapActivity;
import com.hexagon.map.preference.Preferences;

/**
 * Main view class
 *
 * @author Jerome
 */
public class GLMapView extends GLSurfaceView implements SurfaceHolder.Callback {

    public class GlRenderer implements Renderer {

        @Override
        public void onDrawFrame(GL10 gl) {
            GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT);

            // Set the camera position (View matrix)
            // Matrix.setLookAtM(mVMatrix, 0, 0, 0, -3, 0f, 0f, 0f, 0f, 1.0f,
            // 0.0f);

            // Calculate the projection and view transformation
            // Matrix.multiplyMM(mMVPMatrix, 0, mProjMatrix, 0, mVMatrix, 0);

            // gl.glTranslatef(100.0f, 100.0f, 0.0f);

            // mSquare.draw(gl);

            queueEvent(new Runnable() {
                @Override
                public void run() {
                    mapActivity.viewport.handleAnimations();
                }
            });
            mapActivity.viewport.draw(gl);


        }

        @Override
        public void onSurfaceChanged(GL10 gl, int width, int height) {
            gl.glViewport(0, 0, width, height);
            gl.glMatrixMode(GL10.GL_PROJECTION);
            gl.glLoadIdentity();

            // GLU.gluPerspective(gl, 45.0f, (float) width / (float) height,
            // 0.1f,
            // 100.0f);

            GLU.gluOrtho2D(gl, 0, width, height, 0);
            gl.glMatrixMode(GL10.GL_MODELVIEW);
            gl.glLoadIdentity();

            float ratio = (float) width / height;

            gl.glEnable(GL10.GL_BLEND);
            gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);

            mapActivity.viewport.initTextures(gl);
//
            Thread.currentThread().setPriority(Thread.MAX_PRIORITY);
        }

        @Override
        public void onSurfaceCreated(GL10 gl, EGLConfig config) {
            gl.glClearColor(0.0f, 0.0f, 0.0f, 1.0f);

        }

    }

    public static int loadShader(int type, String shaderCode) {

        // create a vertex shader type (GLES20.GL_VERTEX_SHADER)
        // or a fragment shader type (GLES20.GL_FRAGMENT_SHADER)
        int shader = GLES20.glCreateShader(type);

        // add the source code to the shader and compile it
        GLES20.glShaderSource(shader, shaderCode);
        GLES20.glCompileShader(shader);

        return shader;
    }

    // private static final String TAG = "MapView";

    /**
     *
     */
    private final MapActivity mapActivity;

    Paint paint;

    DisplayMetrics dm;

    private int iteration;

    private long startTime;

    private Long fps;

    public GLMapView(MapActivity mapActivity, Context context) {
        super(context);
        this.mapActivity = mapActivity;
        // getHolder().addCallback(this);
        // mapActivity.surfaceHolder = getHolder();
//		setEGLContextClientVersion(2);
        setRenderer(new GlRenderer());
        setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }
        /*
	 * @Override protected void onDraw(Canvas canvas) { if (canvas == null) {
	 * return; } iteration++; iteration = iteration % 50; if (iteration == 0) {
	 * startTime = System.currentTimeMillis(); }
	 * 
	 * mapActivity.viewport.draw(canvas, paint);
	 * 
	 * if (iteration == 49) { long endTime = System.currentTimeMillis(); long
	 * duration = endTime - startTime; fps = 50000 / duration; }
	 * 
	 * boolean showFps = Preferences.isShowFps(); if (fps != null && showFps) {
	 * paint.setTextSize(40); canvas.drawText(fps.toString() + "fps",
	 * mapActivity.dm.widthPixels - 120, 40, paint); }
	 * 
	 * }
	 */
}