requirejs(['animation-controller'], function(AnimationController) {
    'use strict';

    var pavilionDepth = 100;
    var pavilionAngle = Math.PI / 4;
    var crownHeight = 30;
    var crownAngle = Math.PI / 4;
    var facetCount = 5;

    // The smallest amount of radians the diamond needs to be turned to appear the same again
    var symmetricAngle = Math.PI / facetCount;

    // For terminology, see https://en.wikipedia.org/wiki/Diamond_cut#/media/File:Diamond_facets.svg
    var leftEdge = -Math.tan(Math.PI / 2 - pavilionAngle) * pavilionDepth;
    var tableLeft = leftEdge + crownHeight / Math.tan(crownAngle);







    /**
     * Square that has its pivot point at its center, and an imaginary pendulum fixed to it so that it swings.
     */
    function Diamond() {
        this.rotationalVel = 0;
        this.rotation = 0;
    }

    Diamond.prototype.update = function(deltaTimeSeconds) {

        var rotationalAcc = pendulum.cross(forcePerpendicular) / Math.max(10, this.rotatingPart.width() / 10);

        this.rotationalVel += rotationalAcc * deltaTimeSeconds;
        this.rotation += this.rotationalVel * deltaTimeSeconds;
        this.rotationalVel *= 0.97; // Slowly halt the rotation/swigning
        // TODO: Depend on deltaTime

        // To prevent rounding errors when the rotation is very big, make sure to remove whole rotations
        var twoPi = 2 * Math.PI;
        var fullRotations = (this.rotation / twoPi) | 0;
        this.rotation -= fullRotations * twoPi;

        var degrees = this.rotation * 180 / Math.PI;
        var rotateTransform = 'rotate(' + degrees + 'deg)';
        this.rotatingPart.css({
            transform: rotateTransform,
            '-msTransform': rotateTransform,
            '-webkitTransform': rotateTransform
        });
    }

    Diamond.prototype.isStandingStill = function() {
        return Math.abs(this.rotation) < 0.015 && Math.abs(this.rotationalVel) < 0.1;
    }

    Diamond.prototype.kickstartRotation = function() {
        this.rotationalVel += 15;

    }

    // Setup code to keep track of all components that shall rotate
    var diamonds = [];

    var diaond = new Diamond();
    dimaonds.push(diamond);

    var animationController = new AnimationController(window, diamonds);












    var c2 = document.getElementById('logo').getContext('2d');
    c2.fillStyle = '#f00';

    c2.translate(500.5, 500.5);

    c2.beginPath();
    c2.moveTo(0, pavilionDepth);
    c2.lineTo(leftEdge, 0);
    c2.lineTo(tableLeft, -crownHeight);
    c2.lineTo(-tableLeft, -crownHeight);
    c2.lineTo(-leftEdge, 0);
    c2.closePath();
    c2.stroke();

    function drawPavilionFacet(leftStart, leftEnd, color) {

    }

    })();
});
