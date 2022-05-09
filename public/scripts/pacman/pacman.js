
var gameblock = document.getElementById("gameblock");
var myGamePiece;
const PACMAN_IMG = "./images/pacman/pacman.png";
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
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
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
            // ctx.drawImage(myGameArea.background, 0, 0, 320, 352);
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    this.moveOneTile = function() {
        if (!this.moving) {
            var speedY = this.speedY;
            var speedX = this.speedX;
            this.activeTile = myGameArea.fieldTiles[(this.y / FIELD_TILE_PIXEL_SIZE)][(this.x / FIELD_TILE_PIXEL_SIZE)];
            if (!this.tileMovementCheck(this.pressedDirection)) {
                if (!this.tileMovementCheck(this.direction)) {
                    this.speedY = 0;
                    this.speedX = 0;
                    this.tileMovementCheck(this.direction);
                    console.log("tileMovementCheck() didn't pass.");
                    return
                }
            }
            this.moving = true;
        }
        switch (myGamePiece.direction) {
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
            this.moving = false;
            return;
        }
    },
    this.tileMovementCheck = function(directionPressed) {
        var x = directionPressed;
        var tile = this.activeTile;
        if (directionPressed == "up" && this.activeTile.up) {
            this.direction = directionPressed;
            return true;
        } else if (directionPressed == "down" && this.activeTile.down) {
            this.direction = directionPressed;
            return true;
        } else if (directionPressed == "left" && this.activeTile.left) {
            this.direction = directionPressed;
            return true;
        } else if (directionPressed == "right" && this.activeTile.right) {
            this.direction = directionPressed;
            return true;
        };
        return false;
    }
}


//      Keyboard functions (Control)         
document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if (keyCode == 38 || keyCode == 87) { 
        keyPressDirection("up");
    }
    if (keyCode == 40 || keyCode == 83) { 
        keyPressDirection("down");
    }
    if (keyCode == 37 || keyCode == 65) { 
        keyPressDirection("left");
    }
    if (keyCode == 39 || keyCode == 68) { 
        keyPressDirection("right");
    }
    // press E
    if (keyCode == 69) { myGameArea.stop(); }
}

keyPressDirection = (direction) => {
    myGamePiece.pressedDirection = direction;
}

updateGameArea = () => {
    myGameArea.clear();
    // myGamePiece.newPos();
    myGamePiece.moveOneTile();
    myGamePiece.update();
    myXcor = (myGamePiece.x / FIELD_TILE_PIXEL_SIZE)
    myYcor = (myGamePiece.y / FIELD_TILE_PIXEL_SIZE)
    coords.innerHTML = "Xcoor: " + myGamePiece.x + "<br>Ycoor: " + myGamePiece.y + "<br>Last Xcoor: " + (myGamePiece.stepX + 1) +  "<br>Last Ycoor: " + (myGamePiece.stepY + 1);
    coords.innerHTML += "<br>SpeedY: " + myGamePiece.speedY + "<br>SpeedX: " + myGamePiece.speedX;
}


