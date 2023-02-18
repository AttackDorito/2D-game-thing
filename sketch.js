let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
var gameObjects = []

function setup() {
  createCanvas(screen_width, screen_height);
  gameObjects = [new objQuad([0,0],[100,0],[100,100],[0,100])];
  console.log(gameObjects[0])
}

function draw() {
  background(220);
  ellipse(screen_width/2,screen_height/2,80,80);
  gameObjects.forEach(function(gameObject) {
    gameObject.drawObj();
  })
}
