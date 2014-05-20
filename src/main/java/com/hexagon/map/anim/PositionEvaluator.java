package com.hexagon.map.anim;

import android.animation.TypeEvaluator;

import com.hexagon.map.Viewport;

/**
* Created by smartwave_jv on 20.05.2014.
*/
public class PositionEvaluator implements TypeEvaluator<Position> {
    private Viewport viewport;

    public PositionEvaluator(Viewport viewport) {
        this.viewport = viewport;
    }

    @Override
    public Position evaluate(float fraction, Position startValue, Position endValue) {
        float x = startValue.x + (endValue.x - startValue.x) * fraction;
        float y = startValue.y + (endValue.y - startValue.y) * fraction;
        return new Position(x, y);

    }
}
