let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
var gameObjects = []
var decayList = []
let over;

function setup() {
  createCanvas(screen_width, screen_height);
  strokeWeight(0);
  while (decayList.length < 300){
    new speedParticle(100*Math.random()+ 20, 2 * screen_width);
  }
}

function draw() {
  background(0);
  textSize(60);
  text(`Score: ${tileCounter}`, 20, 80);
  gameObjects.forEach(function(gameObject) {
    gameObject.drawObj();
  })
  decayList.forEach(function(particleObject){
    particleObject.drawObj();
  })
  playerObj.update();
  gameObjects.filter(check_collide_line).map(handle_line_collision);
  if(((playerObj.posX - nextTile[0][0])**2)+((playerObj.posY - nextTile[0][1])**2) < 10000000){
    gay_erasure();
    tileList[Math.floor(Math.random()*(tileList.length))](nextTile[0],nextTile[1]);
  }
}