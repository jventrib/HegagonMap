package com.hexagon.map.anim;

import android.animation.Animator;
import android.animation.ValueAnimator;

import com.hexagon.map.Viewport;
import com.hexagon.map.util.JveLog;

/**
* Created by smartwave_jv on 20.05.2014.
*/
public class ZoomAnimatedListener implements ValueAnimator.AnimatorUpdateListener, Animator.AnimatorListener {

    private Viewport viewport;

    public ZoomAnimatedListener(Viewport viewport) {
        this.viewport = viewport;
    }

    @Override
    public void onAnimationUpdate(ValueAnimator valueAnimator) {
        viewport.setZoomScale((Float) valueAnimator.getAnimatedValue());
    }

    @Override
    public void onAnimationStart(Animator animator) {

    }

    @Override
    public void onAnimationEnd(Animator animator) {
        viewport.zoomOnGoing = false;
//        viewport.scale = viewport.newScale;
//        viewport.refresh();
//        viewport.setZoomScale(1.0f);
//        viewport.swapTM();
        viewport.readyForSwap = true;

    }

    @Override
    public void onAnimationCancel(Animator animator) {

    }

    @Override
    public void onAnimationRepeat(Animator animator) {
        viewport.zoomOnGoing = true;
    }
}
