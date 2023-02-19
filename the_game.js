
const playfieldDimensions = 2048

const scaleFactor = 1

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}


const playerObj = {
    posX        : 200,
    posY        : 200,
    velocityVect: [0,0],     //velocity vector
    direction   : 0,         //facing direction (radians)
    friction    : 0.975,
    thrustValue : 0.3,
    thrustWindup: 0,
    rotWindup   : 0,

    thrust      : function(){
        this.velocityVect[0] += Math.sin(this.direction) * this.thrustValue;
        this.velocityVect[1] -= Math.cos(this.direction) * this.thrustValue;
        this.thrustWindup += 3
        this.thrustWindup = clamp(this.thrustWindup, 0, 50)
    },
    move        : function(){
        this.posX += this.velocityVect[0]
        this.posY += this.velocityVect[1]
    },
    update      : function(){
        if(keyIsDown(LEFT_ARROW)){
            this.rotWindup --;

        }
        else if(!keyIsDown(RIGHT_ARROW)){
            if(this.rotWindup < -0.5){
                this.rotWindup += 0.5;
            }
            else if(this.rotWindup < 0){
                this.rotWindup = 0;
            }

        }
        if(keyIsDown(RIGHT_ARROW)){
            this.rotWindup ++;
        }
        else if(!keyIsDown(LEFT_ARROW)){
            if(this.rotWindup > 0.5){
                this.rotWindup -= 0.5;
            }
            else if(this.rotWindup > 0){
                this.rotWindup = 0;
            }
            
        }

        this.rotWindup = clamp(this.rotWindup, -5, 5);
        this.direction += this.rotWindup * 0.02 ;

        this.velocityVect[0] *= this.friction;
        this.velocityVect[1] *= this.friction;
        translate(screen_width/2, screen_height/2);
        rotate(this.direction);
        fill(255);
        triangle(0,-50, -50,50, 50,50)
        fill(255,200,0,this.thrustWindup * 5);
        triangle(-10,50,10,50,0,80);
        fill(255);
        if(keyIsDown(UP_ARROW)){
            this.thrust();
        }
        else {
            this.thrustWindup -= 3
        }
        this.move();
    },

    get vertexPoints () {
        const rotation_matrix = v => [
            v[0] * cos(this.direction) - v[1] * sin(this.direction),
            v[0] * sin(this.direction) + v[1] * cos(this.direction)
        ];
        return [
            [0,-50],
            [-50,50],
            [50,50]
        ].map(rotation_matrix).map(x => [x[0] + this.posX, x[1] + this.posY]);
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
        this.randomRange = randomRange;
        this.decayState = -decayFrames;
        this.decayFrames = decayFrames;
        this.pos = [playerObj.posX + this.random()*randomRange, playerObj.posY + this.random()*randomRange];
        this.size = Math.random()*5
        decayList.push(this);
    }

    random(){
        return (Math.random() * 2 - 1);
    }

    drawObj(){
        var opacity = 1 - Math.abs(this.decayState) / this.decayFrames;
        this.screen1 = convertPoint(this.pos);
        if (this.decayState >= this.decayFrames||this.screen1[0]<-screen_height||this.screen1[1]<-screen_height||this.screen1[0]>2*screen_width||this.screen1[1]>2*screen_height){
            this.decayState = -this.decayFrames;
            this.pos = [playerObj.posX + this.random()*this.randomRange, playerObj.posY + this.random()*this.randomRange];
        }
        fill(255,255,255,255*opacity);
        circle(this.screen1[0],this.screen1[1],this.size + 5);
        fill(255)
        this.decayState ++;
    }

}

function convertPoint(vert){
    var vertOut = [];
    vertOut[0] = ((vert[0] - playerObj.posX) * scaleFactor) + Math.floor(screen_width / 2);
    vertOut[1] = ((vert[1] - playerObj.posY) * scaleFactor) + Math.floor(screen_height / 2);
    return vertOut;
}

function convertBack(vert){
    var vertOut = [];
    vertOut[0] = vert[0] - Math.floor(screen_width / 2) * 1/scaleFactor + playerObj.posX;
    vertOut[0] = vert[1] - Math.floor(screen_height / 2) * 1/scaleFactor + playerObj.posY;
    return vertOut;
}
function rotateVect(vectIn, angle){
    vectOut = vectIn; //placeholder
    return vectOut;
}

function straightTile(tileOrigin, tileRotation){
    v1 = rotateVect([tileOrigin[0]-300,tileOrigin[1]],tileRotation);
    v2 = rotateVect([tileOrigin[0]-300,tileOrigin[1]+2500],tileRotation);
    v3 = rotateVect([tileOrigin[0]+300,tileOrigin[1]],tileRotation);
    v4 = rotateVect([tileOrigin[0]+300,tileOrigin[1]+2500],tileRotation);
    return[[new objLine(v1,v2), new objLine(v3,v4)],[rotateVect([tileOrigin[0],tileOrigin[1]+2500],tileRotation),tileRotation]];
}