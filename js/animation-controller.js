/*
 * Copyright (c) 2015 Martin Nordholts
 * All rights reserved.
 */

define([], function() {
    /**
     * Clever starting and stopping of the animation is taken care of by this class,
     * as well as running the animation itself.
     */
    function AnimationController(animator, animatables) {
        this.animator = animator;
        this.animatables = animatables;
        this.framesWithoutMovement = 0;
        this.animationRunning = false;
        this.lastTimeStamp = null;
    }

    AnimationController.prototype.ensureRunning = function() {
        if (!this.animationRunning) {
            this.animator.requestAnimationFrame(this.runFrame.bind(this));
            this.animationRunning = true;
            this.framesWithoutMovement = 0;
        }
    }

    AnimationController.prototype.runFrame = function(timestamp) {
        // Handle special case of first invocation
        if (!this.lastTimeStamp) {
            this.lastTimeStamp = timestamp;
        }

        var deltaTimeMs = timestamp - this.lastTimeStamp;
        this.lastTimeStamp = timestamp;

        // Prevent weird delta times due to e.g. low prio or slow devices
        deltaTimeMs = Math.max(0, deltaTimeMs);
        deltaTimeMs = Math.min(100, deltaTimeMs);

        var animationStandingStill = true;

        this.animatables.forEach(function(animatable) {
            animatable.update(deltaTimeMs / 1000);

            if (!animatable.isStandingStill()) {
                animationStandingStill = false;
            }
        });

        if (animationStandingStill) {
            this.framesWithoutMovement++;
        } else {
            this.framesWithoutMovement = 0;
        }

        if (this.framesWithoutMovement < 10) {
            this.animator.requestAnimationFrame(this.runFrame.bind(this));    
        } else {
            this.animationRunning = false;
        }
    }

    return AnimationController;
});
