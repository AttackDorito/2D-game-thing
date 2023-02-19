
const playfieldDimensions = 2048

const scaleFactor = 1

const playerObj = {
    posX        : 200,
    posY        : 200,
    velocityVect: [0,0], //velocity vector
    direction   : 0,         //facing direction (radians)
    friction    : 0.99,

    thrust      : function(){
        this.velocityVect[0] += Math.sin(this.direction) * 0.1;
        this.velocityVect[1] -= Math.cos(this.direction) * 0.1;
    },
    move        : function(){
        this.posX += this.velocityVect[0]
        this.posY += this.velocityVect[1]
    },
    update      : function(){
        if(keyIsDown(LEFT_ARROW)){
            this.direction -= 0.1;
        }
        if(keyIsDown(UP_ARROW)){
            this.thrust();
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.direction += 0.1;
        }
        this.velocityVect[0] *= this.friction;
        this.velocityVect[1] *= this.friction;
        translate(screen_width/2, screen_height/2);
        rotate(this.direction);
        fill(255);
        triangle(0,-50, -50,50, 50,50)
    }
}

function callDraw(objectToDraw){
    objectToDraw.drawObj();
}

class objQuad {
    constructor(v1,v2,v3,v4) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.v4 = v4;
    }

    drawObj(){
        this.screen1 = convertPoint(this.v1);
        this.screen2 = convertPoint(this.v2);
        this.screen3 = convertPoint(this.v3);
        this.screen4 = convertPoint(this.v4);
        quad(this.screen1[0],this.screen1[1],this.screen2[0],this.screen2[1],this.screen3[0],this.screen3[1],this.screen4[0],this.screen4[1]);
    }
}

class objLine {
    constructor(v1,v2) {
        this.v1 = v1
        this.v2 = v2
        this.screen1 = convertPoint(this.v1);
        this.screen2 = convertPoint(this.v2);

    }

    drawObj(){
        this.screen1 = convertPoint(this.v1);
        this.screen2 = convertPoint(this.v2);
        strokeWeight(1);
        stroke(255);
        line(this.screen1[0],this.screen1[1],this.screen2[0],this.screen2[1])
        strokeWeight(0);
    }
}

class speedParticle {
    constructor(decayFrames, randomRange){
        this.decayState = 0;
        this.decayFrames = decayFrames;
        this.pos = [playerObj.posX + Math.random()*randomRange, playerObj.posY + Math.random()*randomRange];
        this.size = Math.random()*5
        gameObjects.push(this);
    }

    drawObj(){
        this.screen1 = convertPoint(this.pos);
        fill(255,255,255, (Math.abs(this.decayFrames - this.decayState - (this.decayFrames/2))+this.decayFrames/2))/this.decayFrames * 255;
        circle(this.screen1[0],this.screen1[1],this.size + 5);
        fill(255)
        this.decayState ++;
        if (this.decayState >= this.decayFrames){
            gameObjects.splice(gameObjects.findIndex(function(value){
                if (value == this){
                    return true;
                }
                else{
                    return false;
                }
            }),1);
        }
    }


}

function convertPoint(vert){
    var vertOut = [];
    vertOut[0] = Math.floor((vert[0] - playerObj.posX) * scaleFactor) + Math.floor(screen_width / 2);
    vertOut[1] = Math.floor((vert[1] - playerObj.posY) * scaleFactor) + Math.floor(screen_height / 2);
    return vertOut;
}

function convertBack(vert){
    var vertOut = [];
    vertOut[0] = vert[0] - Math.floor(screen_width / 2) * 1/scaleFactor + playerObj.posX;
    vertOut[0] = vert[1] - Math.floor(screen_height / 2) * 1/scaleFactor + playerObj.posY;
    return vertOut;
}