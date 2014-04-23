package com.hexagon.map.opengl;

import com.hexagon.map.util.JveLog;

import android.opengl.Matrix;

import java.util.Arrays;

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
        for (int i = 0; i < matrix.m.length; i++) {
            m[i] = matrix.m[i];
        }
    }

    public void preTranslate(int posx, int posy) {
//        Matrix.setIdentityM(m, 0);
        Matrix.translateM(m, 0, posx, posy, 0.0f);
    }

    public void setScale(float zoomScale, float zoomScale1, int i, int i1) {
        Matrix.translateM(m, 0, i, i1, 0.0f);
        Matrix.scaleM(m, 0, zoomScale, zoomScale1, 1.0f);
        Matrix.translateM(m, 0, -i, -i1, 0.0f);
    }


    @Override
    public String toString() {
        return "Matrix4{" +
                "m=" + Arrays.toString(m) +
                '}';
    }

    public static void copy(Matrix4 src, Matrix4 target) {
        for (int i = 0; i < src.m.length; i++) {
            target.m[i] = src.m[i];
        }
    }
}
