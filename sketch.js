let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
var gameObjects = []
let theShader;

function preload() {
  theShader = loadShader('shader.vert','shader.frag');
}

function setup() {
  createCanvas(screen_width, screen_height);
  gameObjects = [new objQuad([0,0],[100,0],[100,100],[0,100])];
  console.log(gameObjects[0])
}

function draw() {
  theShader.setUniform("iResolution", [screen_width, screen_height]);

  background(0);
  gameObjects.forEach(function(gameObject) {
    gameObject.drawObj();
  })
  playerObj.move();
  playerObj.update();
}
