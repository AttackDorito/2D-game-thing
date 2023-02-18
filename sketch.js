let screen_width = window.innerWidth;
let screen_height = window.innerHeight;

function setup() {
  createCanvas(screen_width, screen_height);
}

function draw() {
  background(220);
  ellipse(screen_width/2,screen_height/2,80,80);
}
