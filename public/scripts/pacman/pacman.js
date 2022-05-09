
var gameblock = document.getElementById("gameblock");
var myGamePiece;
var myGamePiece2;
var myGamePiece3;
const PACMAN_IMG = "./images/pacman/pacman.png";
const RED_GHOST_IMG = "./images/pacman/red_ghost.png";
const PINK_GHOST_IMG = "./images/pacman/pink_ghost.png";
const BLUE_GHOST_IMG = "./images/pacman/blue_ghost.png";
const YELLOW_GHOST_IMG = "./images/pacman/yellow_ghost.png";
const PIXEL_SPEED = 1;
const MILLIS_FRAMERATE = 15; // lower = faster
const FIELD_W = 320;
const FIELD_H = 352;
const FIELD_TILE_PIXEL_SIZE = 32;
const FIELD_TILE_W = FIELD_W / FIELD_TILE_PIXEL_SIZE;
const FIELD_TILE_H = FIELD_H / FIELD_TILE_PIXEL_SIZE;

var coords = document.getElementById("gameCoords");

document.body.onload = function() {
    myGameArea.start();
    gameBackground.start();
    myGamePiece = new component(32, 32, PACMAN_IMG, 160, 256, "image");
    myGamePiece2 = new component(32, 32, RED_GHOST_IMG, 128, 160, "image");
    myGamePiece3 = new component(32, 32, BLUE_GHOST_IMG, 160, 160, "image");
}

var gameBackground = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.height = 352;
        this.canvas.width = 320;
        this.canvas.id = "backgroundCanvas";
        var ctx = this.canvas.getContext("2d");
        gameblock.insertBefore(this.canvas, gameblock.childNodes[0]);
        var img = new Image();
        img.src = "./images/pacman/field.png";
        img.onload = function() {
            ctx.drawImage(img, 0, 0, 320, 352);
        }
    }
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    fieldTiles : [],
    start : function() {
        generateMapTiles(this.fieldTiles, 10, 11);
        this.canvas.height = 352;
        this.canvas.width = 320;
        this.canvas.id = "myCanvas";
        this.context = this.canvas.getContext("2d");
        gameblock.insertBefore(this.canvas, gameblock.childNodes[0]);
        // Make sure the image is loaded first otherwise nothing will draw.
        // this.frameNo = 0;
        this.interval = setInterval(updateGameArea, MILLIS_FRAMERATE);
    }, 
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}




function component(width, height, color, x, y, type) {
    this.type = type;
    this.imgSrc = color;
    if (type == "image") {
        this.image = new Image();
        this.image.src = this.imgSrc;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = "none";
    this.pressedDirection = "none";
    this.moving = false;
    this.activeTile;
    this.stepX = x / FIELD_TILE_PIXEL_SIZE;
    this.stepY = y / FIELD_TILE_PIXEL_SIZE;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            /*
            // ctx.drawImage(myGameArea.background, 0, 0, 320, 352);
            // drawImage(image, canvas.width / 2, canvas.height / 2, 1, - Math.PI / 2);
            ctx.save(); // save current state
            ctx.translate(-x, -y)
            ctx.translate(myGameArea.canvas.width/2, myGameArea.canvas.height/2)
            // ctx.rotate(Math.PI / 1); // rotate
            ctx.rotate(0.01); // rotate
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.restore(); // restore original states (no rotation etc)
            */
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    this.swapDir = function() {
        if (this.imgSrc == PACMAN_IMG) {
            // dont swapDir with pacman
            return
        }
        switch (this.direction) {
            case "up": 
                this.direction = "down"
                this.pressedDirection = "down"
                this.speedY = PIXEL_SPEED;
                this.speedX = 0;
                break;
            case "down": 
                this.direction = "up"
                this.pressedDirection = "up"
                this.speedY = -PIXEL_SPEED;
                this.speedX = 0;
                break;
            case "left": 
                this.direction = "right"
                this.pressedDirection = "right"
                this.speedX = PIXEL_SPEED;
                this.speedY = 0;
                break;
            case "right": 
                this.direction = "left"
                this.pressedDirection = "left"
                this.speedX = -PIXEL_SPEED;
                this.speedY = 0;
                break;
        }
    },
    this.moveOneTile = function() {
        if (!this.moving) {
            this.activeTile = myGameArea.fieldTiles[(this.y / FIELD_TILE_PIXEL_SIZE)][(this.x / FIELD_TILE_PIXEL_SIZE)];
            if (!this.tileMovementCheck(this.pressedDirection)) {
                if (!this.tileMovementCheck(this.direction)) {
                    this.speedY = 0;
                    this.speedX = 0;
                    this.tileMovementCheck(this.direction);
                    console.log("tileMovementCheck() didn't pass.");
                    this.swapDir();
                    return
                }
            }
            this.moving = true;
        }
        switch (this.direction) {
            case "up": 
                this.speedY = -PIXEL_SPEED;
                this.speedX = 0;
                break;
            case "down": 
                this.speedY = PIXEL_SPEED;
                this.speedX = 0;
                break;
            case "left": 
                this.speedX = -PIXEL_SPEED;
                this.speedY = 0;
                break;
            case "right": 
                this.speedX = PIXEL_SPEED;
                this.speedY = 0;
                break;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x % FIELD_TILE_PIXEL_SIZE == 0 && this.y % FIELD_TILE_PIXEL_SIZE == 0) {
            // One tile moved.
            this.stepX = this.x / FIELD_TILE_PIXEL_SIZE;
            this.stepY = this.y / FIELD_TILE_PIXEL_SIZE;
            if (this.stepX == 10) {
                this.x = -32;
            } else if (this.stepX == -1) {
                this.x = 320;
            } else {
                this.moving = false;
            }
            return;
        }
    },
    this.tileMovementCheck = function(directionPressed) {
        var dir = directionPressed;
        var tile = this.activeTile;
        // exception for wall teleportation
        if (this.stepX == 10 || this.stepX == -1) {
            return true;
        }
        if (dir == "up" && tile.up) {
            this.direction = dir;
            return true;
        } else if (dir == "down" && tile.down) {
            this.direction = dir;
            return true;
        } else if (dir == "left" && tile.left) {
            this.direction = dir;
            return true;
        } else if (dir == "right" && tile.right) {
            this.direction = dir;
            return true;
        };
        return false;
    },
    this.hardTurn = function(directionPressed) {
        if (this.stepX == 10 || this.stepX == -1) {
            return;
        }
        this.direction = directionPressed;
        this.pressedDirection = directionPressed;
        switch (directionPressed) {
            case "up": 
                this.speedY = -PIXEL_SPEED;
                this.speedX = 0;
                break;
            case "down": 
                this.speedY = PIXEL_SPEED;
                this.speedX = 0;
                break;
            case "left": 
                this.speedX = -PIXEL_SPEED;
                this.speedY = 0;
                break;
            case "right": 
                this.speedX = PIXEL_SPEED;
                this.speedY = 0;
                break;
        }
    }
}


//      Keyboard functions (Control)         
document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if (keyCode == 38 || keyCode == 87) { 
        keyPressDirection(myGamePiece, "up");
    }
    if (keyCode == 40 || keyCode == 83) { 
        keyPressDirection(myGamePiece, "down");
    }
    if (keyCode == 37 || keyCode == 65) { 
        keyPressDirection(myGamePiece, "left");
    }
    if (keyCode == 39 || keyCode == 68) { 
        keyPressDirection(myGamePiece, "right");
    }
    // press E
    if (keyCode == 69) { myGameArea.stop(); }
}

keyPressDirection = (unit, direction) => {
    var uDir = unit.direction;
    if ( !(unit.stepX == 10 || unit.stepX == -1) && 
    ((uDir == "left" && direction == "right") || (uDir == "right" && direction == "left") ||
    (uDir == "up" && direction == "down") || (uDir == "down" && direction == "up")) ) {
        unit.hardTurn(direction);
    } else {
        unit.pressedDirection = direction;
    }
}


updateGameArea = () => {
    myGameArea.clear();
    myGamePiece.moveOneTile();
    myGamePiece.update();

    myGamePiece2.moveOneTile();
    myGamePiece2.update();
    
    myGamePiece3.moveOneTile();
    myGamePiece3.update();
    
    myXcor = (myGamePiece.x / FIELD_TILE_PIXEL_SIZE)
    myYcor = (myGamePiece.y / FIELD_TILE_PIXEL_SIZE)
    coords.innerHTML = "Xcoor: " + myGamePiece.x + "<br>Ycoor: " + myGamePiece.y + "<br>Last Xcoor: " + (myGamePiece.stepX + 1) +  "<br>Last Ycoor: " + (myGamePiece.stepY + 1);
    coords.innerHTML += "<br>SpeedY: " + myGamePiece.speedY + "<br>SpeedX: " + myGamePiece.speedX;
}
setTimeout(()=>{
    keyPressDirection(myGamePiece2, "right");
    keyPressDirection(myGamePiece3, "left");
}, 100);

