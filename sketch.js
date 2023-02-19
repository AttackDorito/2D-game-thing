let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
var gameObjects = []

function setup() {
  createCanvas(screen_width, screen_height);
  gameObjects = [new objQuad([0,0],[100,0],[100,100],[0,100]), new objLine([0,0],[1000,1000])];
  strokeWeight(0);
}

function draw() {
  background(0);
  gameObjects.forEach(function(gameObject) {
    gameObject.drawObj();
  })
  playerObj.move();
  playerObj.update();
}
