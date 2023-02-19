let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
var gameObjects = []
var decayList = []

function setup() {
  createCanvas(screen_width, screen_height);
  //gameObjects = [new objLine([0,500],[1000,1000]), new objLine([800,-200],[-500,-900])];
  gameObjects = straightTile([0,0],2)[0];
  strokeWeight(0);
  while (decayList.length < 300){
    new speedParticle(100*Math.random()+ 20, 2 * screen_width);
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
  playerObj.update();
  gameObjects.filter(check_collide_line).map(handle_line_collision);
}
