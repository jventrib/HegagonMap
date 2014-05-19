package com.hexagon.map.opengl;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;

import javax.microedition.khronos.opengles.GL10;


import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.opengl.GLES10;
import android.opengl.GLUtils;
import android.util.DisplayMetrics;

public class Square {

    private FloatBuffer vertexBuffer; // buffer holding the vertices

    private FloatBuffer textureBuffer; // buffer holding the texture coordinates

    /** The texture pointer */

    private float vertices[] = {0.0f, 0.0f, 0.0f, // V1 - bottom left
            0.0f, 256.0f, 0.0f, // V2 - top left
            256.0f, 0.0f, 0.0f, // V3 - bottom right
            256.0f, 256.0f, 0.0f // V4 - top right
    };

    private float texture[] = {
            // Mapping coordinates for the vertices
            0.0f, 0.0f, // top left (V2)
            0.0f, 1.0f, // bottom left (V1)
            1.0f, 0.0f, // top right (V4)
            1.0f, 1.0f // bottom right (V3)
    };

    private Bitmap bitmap;

    private int mTexIndex;

    public Square() {
        // a float has 4 bytes so we allocate for each coordinate 4 bytes
        ByteBuffer byteBuffer = ByteBuffer.allocateDirect(vertices.length * 4);
        byteBuffer.order(ByteOrder.nativeOrder());

        // allocates the memory from the byte buffer
        vertexBuffer = byteBuffer.asFloatBuffer();

        // fill the vertexBuffer with the vertices
        vertexBuffer.put(vertices);

        // set the cursor position to the beginning of the buffer
        vertexBuffer.position(0);

        byteBuffer = ByteBuffer.allocateDirect(texture.length * 4);
        byteBuffer.order(ByteOrder.nativeOrder());
        textureBuffer = byteBuffer.asFloatBuffer();
        textureBuffer.put(texture);
        textureBuffer.position(0);



    }

    public synchronized void loadGLTexture(Bitmap bitmap, int[] textures) {
        if (bitmap == null || bitmap.isRecycled()) {
            return;
        }
        this.bitmap = bitmap;
        // generate one texture pointer
//        if (textures[0] == 0) {
//            GLES10.glGenTextures(1, textures, 0);
//        }

        // ...and bind it to our array
        GLES10.glBindTexture(GL10.GL_TEXTURE_2D, textures[mTexIndex]);

        // create nearest filtered texture
        GLES10.glTexParameterf(GL10.GL_TEXTURE_2D, GL10.GL_TEXTURE_MIN_FILTER,
                GL10.GL_NEAREST);
        GLES10.glTexParameterf(GL10.GL_TEXTURE_2D, GL10.GL_TEXTURE_MAG_FILTER,
                GL10.GL_LINEAR);

        // Use Android GLUtils to specify a two-dimensional texture image from
        // our bitmap
        GLUtils.texImage2D(GL10.GL_TEXTURE_2D, 0, bitmap, 0);

        // Clean up

        if (bitmap != null && !bitmap.isRecycled()) {
//			bitmap.recycle();
//			bitmap = null;
//            System.gc(); 
        }
//		 bitmap.recycle();
    }

    /**
     * The draw method for the square with the GL context
     */
    public synchronized void draw(GL10 gl, int[] textures, Matrix4 m, float alpha) {
        gl.glEnable(GL10.GL_TEXTURE_2D);
        gl.glBindTexture(GL10.GL_TEXTURE_2D, textures[mTexIndex]);


        gl.glLoadMatrixf(m.m, 0);

        gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
        gl.glEnableClientState(GL10.GL_TEXTURE_COORD_ARRAY);

        // Set the face rotation
        gl.glFrontFace(GL10.GL_CW);

        // Point to our vertex buffer
        gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertexBuffer);
        gl.glTexCoordPointer(2, GL10.GL_FLOAT, 0, textureBuffer);
        gl.glColor4f(1.0f, 1.0f, 1.0f, alpha);

        // Draw the vertices as triangle strip
        gl.glDrawArrays(GL10.GL_TRIANGLE_STRIP, 0, vertices.length / 3);

        // Disable the client state before leaving
        gl.glDisableClientState(GL10.GL_VERTEX_ARRAY);
        gl.glDisableClientState(GL10.GL_TEXTURE_COORD_ARRAY);

    }

    public void initTexture(GL10 gl, int texIndex) {
        mTexIndex = texIndex;
    }
}
