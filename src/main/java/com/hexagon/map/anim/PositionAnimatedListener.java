package com.hexagon.map.anim;

import android.animation.ValueAnimator;

import com.hexagon.map.Viewport;

/**
* Created by smartwave_jv on 20.05.2014.
*/
public class PositionAnimatedListener implements ValueAnimator.AnimatorUpdateListener{
    private Viewport viewport;

    public PositionAnimatedListener(Viewport viewport) {
        this.viewport = viewport;
    }

    @Override
    public void onAnimationUpdate(ValueAnimator valueAnimator) {
        Position p = (Position) valueAnimator.getAnimatedValue();
        viewport.setPosition(p.x, p.y);
    }
}
