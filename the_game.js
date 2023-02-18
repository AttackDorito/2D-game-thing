
const playfieldDimensions = 2048

const scaleFactor = 1

const viewObj = {
    posX        : 200,
    posY        : 200,
    velocityVect: [0,0], //velocity vector
    direction   : 0,         //facing direction (radians)
    thrust      : function thrust(){
        this.velocityVect[0] += Math.sin(this.direction);
        this.velocityVect[1] += Math.cos(this.direction);
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

        this.screen1 = convertPoint(this.v1);
        this.screen2 = convertPoint(this.v2);
        this.screen3 = convertPoint(this.v3);
        this.screen4 = convertPoint(this.v4);
    }

    drawObj(){
        this.screen1 = convertPoint(this.v1);
        this.screen2 = convertPoint(this.v2);
        this.screen3 = convertPoint(this.v3);
        this.screen4 = convertPoint(this.v4);
        fill(51);
        quad(this.screen1[0],this.screen1[1],this.screen2[0],this.screen2[1],this.screen3[0],this.screen3[1],this.screen4[0],this.screen4[1])
    }
}

function convertPoint(vert){
    var vertOut = []
    vertOut[0] = Math.floor((vert[0] - viewObj.posX) * scaleFactor) + Math.floor(screen_width / 2)
    vertOut[1] = Math.floor((vert[1] - viewObj.posY) * scaleFactor) + Math.floor(screen_height / 2)
    return vertOut;
}