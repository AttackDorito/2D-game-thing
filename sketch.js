let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
var gameObjects = []
let theShader;
let cam;

function preload() {
  theShader = loadShader('shader.vert','shader.frag');
}

function setup() {
  createCanvas(screen_width, screen_height, WEBGL);
  gameObjects = [new objQuad([0,0],[100,0],[100,100],[0,100])];
  console.log(gameObjects[0])
}

function draw() {
  shader(theShader);
  theShader.setUniform("iResolution", [screen_width, screen_height]);
  theShader.setUniform("iChannel0", createImageBitmap(screen))
  background(0);
  gameObjects.forEach(function(gameObject) {
    gameObject.drawObj();
  })
  playerObj.move();
  playerObj.update();
}
