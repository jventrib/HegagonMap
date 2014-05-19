package com.hexagon.map.opengl;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;

import android.util.Log;

import javax.microedition.khronos.opengles.GL10;

public class Circle {

    private int points = 360;

    private float vertices[] = {0.0f, 0.0f, 0.0f};

    private FloatBuffer vertBuff;

    public Circle() {

        vertices = new float[(points + 1) * 3];
        for (int i = 3; i < (points + 1) * 3; i += 3) {
            double rad = (i * 360 / points * 3) * (3.14 / 180);
            vertices[i] = (float) Math.cos(rad);
            vertices[i + 1] = (float) Math.sin(rad);
            vertices[i + 2] = 0;
        }
        ByteBuffer bBuff = ByteBuffer.allocateDirect(vertices.length * 4);
        bBuff.order(ByteOrder.nativeOrder());
        vertBuff = bBuff.asFloatBuffer();
        vertBuff.put(vertices);
        vertBuff.position(0);


    }


    public void draw(GL10 gl, float[] mvpMatrix) {

        gl.glPushMatrix();
//        gl.glTranslatef(0, 0, 0);
        gl.glLoadMatrixf(mvpMatrix, 0);
        gl.glScalef(20, 20, 1.0f);
        gl.glColor4f(1.0f, 0.0f, 0.0f, 1.0f);
        gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertBuff);
        gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
        gl.glDrawArrays(GL10.GL_TRIANGLE_FAN, 0, points / 2);
        gl.glDisableClientState(GL10.GL_VERTEX_ARRAY);
        gl.glPopMatrix();


    }

}