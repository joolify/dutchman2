/**
 *  Author: Max Block
 *          mabl8223@student.uu.se
 *
 *  Public methods:
 *  Wheel/1         (constructor)
 *  init/0          (initialising)
 *  show/0, hide/0  (showing/hiding)
 */
function Wheel(canvasId) {
    this.id = canvasId;
    this.canvas = document.getElementById(canvasId);
    this.numSpokes = 6;
    this.outerRimRadius = 40;
    this.innerRimRadius = 35;
    this.spokeRadius = 60;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.ctx = this.canvas.getContext('2d');

    Wheel.prototype.draw = function(time) {
        var _this = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawRim();
        this.drawSpokes(time);
        window.requestAnimationFrame(
          function(timestamp){
            _this.draw(timestamp);
            });
    }

    Wheel.prototype.drawRim = function() {
        // Drawing mid circle
        this.drawCircle(this.centerX, this.centerY, 10);
        this.ctx.fill();

        // Outer ring
        this.drawCircle(this.centerX, this.centerY, this.outerRimRadius);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        // Inner ring
        this.drawCircle(this.centerX, this.centerY, this.innerRimRadius);
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }

    Wheel.prototype.drawSpokes = function(time) {
        for (i = 0; i < this.numSpokes; i++) {
            var angle = i * (2 * Math.PI / this.numSpokes) + time / 628;
            this.spoke(this.spokeRadius, angle);
        }
    }

    Wheel.prototype.spoke = function(radius, angle) {
        var targetX = this.centerX + radius * Math.cos(angle),
            targetY = this.centerY + radius * Math.sin(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(targetX, targetY);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.drawCircle(targetX, targetY, 5);
        this.ctx.fill();
        this.drawCircle(targetX - 17 * Math.cos(angle), targetY - 17 * Math.sin(angle), 3);
        this.ctx.stroke();
    }

    Wheel.prototype.drawCircle = function(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    }
}

Wheel.prototype.init = function() {
    var _this = this;
    window.requestAnimationFrame(
      function(timestamp){
        _this.draw(timestamp);
        });
}

Wheel.prototype.show = function() {
  document.getElementById(this.id).style.visibility = "visible";
}

Wheel.prototype.hide = function() {
  document.getElementById(this.id).style.visibility = "hidden";
}
