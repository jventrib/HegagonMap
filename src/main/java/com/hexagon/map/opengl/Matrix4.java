package com.hexagon.map.opengl;

import android.opengl.Matrix;

/**
 * Created by jventribout on 11.04.14.
 */
public class Matrix4 {


    public float[] m = new float[16];

    public Matrix4(float[] m) {
        this.m = m;
    }

    public Matrix4() {
        Matrix.setIdentityM(m, 0);
    }

    public Matrix4(Matrix4 matrix) {
        this.m = matrix.m;
    }

    public void preTranslate(int posx, int posy) {
        Matrix.setIdentityM(m, 0);
        Matrix.translateM(m, 0, posx, posy, 0.0f);
    }

    public void setScale(float zoomScale, float zoomScale1, int i, int i1) {
//        Matrix.scaleM(m, 0, zoomScale, zoomScale1, 1.0f);
    }
}
