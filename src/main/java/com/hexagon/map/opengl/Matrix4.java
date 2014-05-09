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
        init();
    }

    public void init() {
        Matrix.setIdentityM(m, 0);
    }

    public Matrix4(Matrix4 matrix) {
        for (int i = 0; i < matrix.m.length; i++) {
            m[i] = matrix.m[i];
        }
    }

    public void translate(int posx, int posy) {
//        Matrix.setIdentityM(m, 0);
        Matrix.translateM(m, 0, posx, posy, 0.0f);
    }

    public void scale(float zoomScale, float zoomScale1, int offsetX, int offsetY) {
//        Matrix.translateM(m, 0, offsetX, offsetY, 0.0f);
        Matrix.scaleM(m, 0, zoomScale, zoomScale1, 1.0f);
//        Matrix.translateM(m, 0, -offsetX, -offsetY, 0.0f);
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

    public static void Multiply(Matrix4 one, Matrix4  two, Matrix4 result) {
        Matrix.multiplyMM(result.m, 0, two.m, 0, two.m, 0);
    }
}
