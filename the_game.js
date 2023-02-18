
const playfieldDimensions = 2048

class objQuad {
    constructor(v1,v2,v3,v4) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.v4 = v4;
    }

}

var gameObjects = []

const scaleFactor = 50

const camera = {
    posX: 0,
    posY: 0
}

function convertPoint(x,y){
    x = Math.floor(x - camera.posX/scaleFactor) + Math.floor(screen_width / 2)
    y = Math.floor(y- camera.posY/scaleFactor) + Math.floor(screen_height / 2)
}