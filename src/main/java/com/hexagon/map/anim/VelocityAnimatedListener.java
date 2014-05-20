package com.hexagon.map.anim;

import android.animation.ValueAnimator;

import com.hexagon.map.Viewport;

/**
* Created by smartwave_jv on 20.05.2014.
*/
public class VelocityAnimatedListener implements ValueAnimator.AnimatorUpdateListener{
    private Viewport viewport;

    public VelocityAnimatedListener(Viewport viewport) {
        this.viewport = viewport;
    }

    @Override
    public void onAnimationUpdate(ValueAnimator valueAnimator) {
        Velocity v = (Velocity) valueAnimator.getAnimatedValue();
        viewport.handleScroll(v.vX, v.vY);
    }
}
