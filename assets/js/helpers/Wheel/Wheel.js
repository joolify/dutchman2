/**
 *  Author: Max Block
 *          mabl8223@student.uu.se
 *
 *  Relevant methods:
 *  Wheel/3         (constructor)
 *  draw/1          (drawing a frame, and enters loop)
 *  show/0, hide/0  (showing/hiding)
 */

/**
 * Creates a wheel object
 * @constructor
 * @param {String} canvasId
 * @param {Number} diameter
 * @param {Number} numSpokes
 */
function Wheel(canvasId, diameter, numSpokes) {
    this.id = canvasId || 'wheel';
    this.diameter = diameter || 50;
    this.canvas = document.getElementById(canvasId);
    this.numSpokes = numSpokes || 8;
    this.outerRimRadius = this.diameter/3.75;
    this.innerRimRadius = this.diameter/4.5;
    this.spokeRadius = this.diameter/2.3;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.ctx = this.canvas.getContext('2d');

    /**
     * Draws a frame and invokes itself at next screen update
     * @param time
     */
    Wheel.prototype.draw = function(time) {
        _time = time || 0;
        var _this = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawRim();
        this.drawSpokes(_time);
        window.requestAnimationFrame(
          function(timestamp){
            _this.draw(timestamp);
            });
    }

    /**
     * Draws the rings constituting the frame of the wheel.
     */
    Wheel.prototype.drawRim = function() {
        // Drawing mid circle
        this.drawCircle(this.centerX, this.centerY, this.diameter/12);
        this.ctx.fill();

        // Outer ring
        this.drawCircle(this.centerX, this.centerY, this.outerRimRadius);
        this.ctx.lineWidth = this.diameter/40;
        this.ctx.stroke();

        // Inner ring
        this.drawCircle(this.centerX, this.centerY, this.innerRimRadius);
        this.ctx.lineWidth = this.diameter/24;
        this.ctx.stroke();
    }

    /**
     * Draws the spokes, rotated according to the time.
     * @param time
     */
    Wheel.prototype.drawSpokes = function(time) {
        for (i = 0; i < this.numSpokes; i++) {
            var angle = i * (2 * Math.PI / this.numSpokes) + time / 628;
            this.spoke(this.spokeRadius, angle);
        }
    }

    /**
     * Draws a spoke, including handle.
     * Angle 0 is positive x-axis.
     * @param radius
     * @param angle
     */
    Wheel.prototype.spoke = function(radius, angle) {
        var targetX = this.centerX + radius * Math.cos(angle),
            targetY = this.centerY + radius * Math.sin(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(targetX, targetY);
        this.ctx.lineWidth = this.diameter/24;
        this.ctx.stroke();

        this.drawCircle(targetX, targetY, this.diameter/24);
        this.ctx.fill();
        this.drawCircle(targetX - radius*0.3 * Math.cos(angle), targetY - radius*0.3 * Math.sin(angle), this.diameter/40);
        this.ctx.stroke();
    }

    /**
     * Draws a circle with center in (x, y) with given radius.
     * @param x
     * @param y
     * @param radius
     */
    Wheel.prototype.drawCircle = function(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    }
}

Wheel.prototype.show = function() {
  document.getElementById(this.id).style.visibility = "visible";
}

Wheel.prototype.hide = function() {
  document.getElementById(this.id).style.visibility = "hidden";
}
