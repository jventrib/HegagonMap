package com.hexagon.map.anim;

import android.animation.TypeEvaluator;

import com.hexagon.map.Viewport;

/**
* Created by smartwave_jv on 20.05.2014.
*/
public class VelocityEvaluator implements TypeEvaluator<Velocity> {
    private Viewport viewport;

    public VelocityEvaluator(Viewport viewport) {
        this.viewport = viewport;
    }

    @Override
    public Velocity evaluate(float fraction, Velocity startValue, Velocity endValue) {
        float vX = startValue.vX + (endValue.vX - startValue.vX) * fraction;
        float vY = startValue.vY + (endValue.vY - startValue.vY) * fraction;
        return new Velocity(vX, vY);

    }
}
