let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
var gameObjects = []
var decayList = []

function setup() {
  createCanvas(screen_width, screen_height);
  gameObjects = [new objQuad([0,0],[100,0],[100,100],[0,100]), new objLine([0,0],[1000,1000])];
  strokeWeight(0);
  while (decayList.length < 100){
    new speedParticle(500*Math.random()+ 20, screen_width);
  }
}

function draw() {
  background(0);
  gameObjects.forEach(function(gameObject) {
    gameObject.drawObj();
  })
  decayList.forEach(function(particleObject){
    particleObject.drawObj();
  })
  playerObj.move();
  playerObj.update();
}
