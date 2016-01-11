/*
 * Copyright (c) 2015 Martin Nordholts
 * All rights reserved.
 * 
 *
 * This file contains some code copied from http://victorjs.org/, which
 * is licensed  as follows:
 *
 * MIT License
 * 
 * Copyright (c) 2011 Max Kueng, George Crabtree
 *  
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *  
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
 (function(win) {
'use strict';


// Part of http://victorjs.org/ library. Licence above.

function Victor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Victor.prototype.subtract = function (vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
};

Victor.prototype.multiplyScalar = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
};

Victor.prototype.copyX = function (vec) {
    this.x = vec.x;
    return this;
};

Victor.prototype.copyY = function (vec) {
    this.y = vec.y;
    return this;
};

Victor.prototype.copy = function (vec) {
    this.copyX(vec);
    this.copyY(vec);
    return this;
};

Victor.prototype.dot = function (vec2) {
    return this.x * vec2.x + this.y * vec2.y;
};

Victor.prototype.cross = function (vec2) {
    return (this.x * vec2.y ) - (this.y * vec2.x );
};

Victor.prototype.rotate = function (angle) {
    var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
    var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

    this.x = nx;
    this.y = ny;

    return this;
};



/**
 * Square that has its pivot point at its center, and an imaginary pendulum fixed to it so that it swings.
 */
function PendulumSquare(rotatingPart) {
    this.rotatingPart = rotatingPart;

    this.pendulumLength = rotatingPart.html().length / 7;

    this.rotationalVel = 0;
    this.rotation = 0;
}

// Pre-allocated objects to avoid object creation each frame
var pendulum = new Victor();
var forceNormal = new Victor();
var forcePerpendicular = new Victor();
var GRAVITY = new Victor(0, 200);

PendulumSquare.prototype.applyForce = function(forceVector, deltaTimeSeconds) {
    // rotation = 0 => pendulum points downwards (hangs still)
    pendulum.x = 0;
    pendulum.y = 1;
    pendulum.rotate(this.rotation);

    forceNormal.copy(pendulum);
    forceNormal.multiplyScalar(pendulum.dot(forceVector));

    forcePerpendicular.copy(forceVector);
    forcePerpendicular.subtract(forceNormal);

    var rotationalAcc = pendulum.cross(forcePerpendicular) / this.pendulumLength;

    this.rotationalVel += rotationalAcc * deltaTimeSeconds;
    this.rotation += this.rotationalVel * deltaTimeSeconds;
    this.rotationalVel *= 0.97; // Slowly halt the rotation/swigning
    // TODO: Depend on deltaTime

    // To prevent rounding errors when the rotation is very big, make sure to remove whole rotations
    var twoPi = 2 * Math.PI;
    var fullRotations = (this.rotation / twoPi) | 0;
    this.rotation -= fullRotations * twoPi;

    // TODO: Add initial rotation
    var degrees = this.rotation * 180 / Math.PI;
    this.rotatingPart.css({
        transform: 'rotate(' + degrees + 'deg)'
    });
}

PendulumSquare.prototype.isStandingStill = function() {
    return Math.abs(this.rotation) < 0.015 && Math.abs(this.rotationalVel) < 0.1;
}

PendulumSquare.prototype.kickstartRotation = function() {
    this.rotationalVel += 15;
}


/**
 * Clever starting and stopping of the animation is taken care of by this class,
 * as well as running the animation itself.
 */
function AnimationController(win) {
    this.win = win;
    this.framesWithoutMovement = 0;
    this.animationRunning = false;
    this.lastTimeStamp = null;
}

AnimationController.prototype.ensureRunning = function() {
    if (!this.animationRunning) {
        this.win.requestAnimationFrame(this.runFrame.bind(this));
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
    rotatingParts.forEach(function(pendulumSquare) {
        pendulumSquare.applyForce(GRAVITY, deltaTimeMs / 1000);

        if (!pendulumSquare.isStandingStill()) {
            animationStandingStill = false;
        }
    });

    if (animationStandingStill) {
        this.framesWithoutMovement++;
    } else {
        this.framesWithoutMovement = 0;
    }

    if (this.framesWithoutMovement < 10) {
        win.requestAnimationFrame(this.runFrame.bind(this));    
    } else {
        this.animationRunning = false;
    }
}


// Setup code to keep track of all components that shall rotate
var rotatingParts = [];
$('.sos-set-of-skills > span').each(function() {
    rotatingParts.push(new PendulumSquare($(this)));
})

var animationController = new AnimationController(win);

// Trigger animation on click
// TODO: touch/mouse down event for responsiveness
$('.sos-of').click(function() {
    rotatingParts.forEach(function(pendulumSquare) {
        pendulumSquare.kickstartRotation();
    });
    animationController.ensureRunning();
});

})(window);
