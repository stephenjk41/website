var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d"); //c is the context

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: undefined,
  y: undefined,
  wheelX: undefined,
  wheelY: undefined
};

var maxRadius = 40;
var minRadius = 4;

var colorArray = [
  "rgb(176, 255, 255, 0.4)", //light blue1
  "rgb(150, 255, 255, 0.4)", //light blue2
  "rgb(179, 110, 70, 0.4)", //orange 1
  "rgb(255, 189, 150,0.4)" //orange 2
];

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

window.addEventListener("mousewheel", function(event) {
  mouse.wheelX = event.wheelDeltaX;
  mouse.wheelY = event.wheelDeltaY;
});

//Circle object
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  //draws a circle
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  //move the circle
  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //INTERACTIVITY
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray = [];

for (var i = 0; i < 1200; i++) {
  var x = Math.random() * (window.innerWidth - radius * 2) + radius;
  var y = Math.random() * (window.innerHeight - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 0.5;
  var dy = (Math.random() - 0.5) * 0.5;
  var radius = Math.random() * 3 + 1;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function init() {
  circleArray = [];

  for (var i = 0; i < 1200; i++) {
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 0.5;
    var dy = (Math.random() - 0.5) * 0.5;
    var radius = Math.random() * 3 + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

init();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
