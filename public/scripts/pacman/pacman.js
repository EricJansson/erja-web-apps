
var gameblock = document.getElementById("gameblock");
var myGamePiece;
const PACMAN_IMG = "./images/pacman/pacman.png";
const FIELD_W = 320;
const FIELD_H = 352;
const FIELD_TILE_PIXEL_SIZE = 32;
const FIELD_TILE_W = FIELD_W / FIELD_TILE_PIXEL_SIZE;
const FIELD_TILE_H = FIELD_H / FIELD_TILE_PIXEL_SIZE;

var coords = document.getElementById("gameCoords");


document.body.onload = function() {
    myGameArea.start();
    myGamePiece = new component(32, 32, PACMAN_IMG, 160, 256, "image");
}

// make tons of myGameArea.fieldTiles
// with function fieldTile(up, down, left, right) with booleans for each wall

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
        this.background = new Image();
        this.background.src = "./images/pacman/field.png";
        // Make sure the image is loaded first otherwise nothing will draw.
        // this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
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
    this.direction = "right";
    this.pressedDirection = "right";
    this.activeTile;
    this.stepX = x;
    this.stepY = y;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(myGameArea.background, 0, 0, 320, 352);
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }, 
    this.stopMovement = function() {
        this.speedX = 0;
        this.speedY = 0;
        this.moving = "false";
    },
    this.updateStep = function(coorXorY) {
        if (coorXorY == "x") {
            this.stepX = this.x;
            return 
        } else if (coorXorY == "y") {
            this.stepY = this.y;
            return 
        }
        this.stepX = this.x;
        this.stepY = this.y;
    },
    this.newPos = function() {
        if (this.direction == "up" && this.y < 1) {
            this.updateStep("y");
            this.activeTile = myGameArea.fieldTiles[(this.stepY / 32)][(this.stepX / 32)];
            coords.innerHTML = "Xcoor: " + this.x + "<br>Ycoor: " + this.y + "<br>Last Xcoor: " + (this.stepX / 32) + "<br>Last Ycoor: " + (this.stepY / 32)
            // left wall
            // this.stopMovement();
        } else if (this.direction == "down" && this.y > 319) {
            this.updateStep("y");
            this.activeTile = myGameArea.fieldTiles[(this.stepY / 32)][(this.stepX / 32)];
            coords.innerHTML = "Xcoor: " + this.x + "<br>Ycoor: " + this.y + "<br>Last Xcoor: " + (this.stepX / 32) + "<br>Last Ycoor: " + (this.stepY / 32)
            // left wall
            // this.stopMovement();
        } else if (this.direction == "left" && this.x < 1) {
            this.updateStep("x");
            this.activeTile = myGameArea.fieldTiles[(this.stepY / 32)][(this.stepX / 32)];
            coords.innerHTML = "Xcoor: " + this.x + "<br>Ycoor: " + this.y + "<br>Last Xcoor: " + (this.stepX / 32) + "<br>Last Ycoor: " + (this.stepY / 32)
            // left wall
            // this.stopMovement();
        } else if (this.direction == "right" && this.x > 287) {
            this.updateStep("x");
            this.activeTile = myGameArea.fieldTiles[(this.stepY / 32)][(this.stepX / 32)];
            coords.innerHTML = "Xcoor: " + this.x + "<br>Ycoor: " + this.y + "<br>Last Xcoor: " + (this.stepX / 32) + "<br>Last Ycoor: " + (this.stepY / 32)
            // left wall
            // this.stopMovement();
        } else {
            if (this.direction == "right" && this.x >= (this.stepX + FIELD_TILE_PIXEL_SIZE)) {
                this.stopMovement();
                this.updateStep("x");
            } else if (this.direction == "left" && this.x <= (this.stepX - FIELD_TILE_PIXEL_SIZE)) {
                this.tileMovementCheck();
                //this.stopMovement();
                this.updateStep("x");
            } else if (this.direction == "down" && this.y >= (this.stepY + FIELD_TILE_PIXEL_SIZE)) {
                this.stopMovement();
                this.updateStep("y");
            } else if (this.direction == "up" && this.y <= (this.stepY - FIELD_TILE_PIXEL_SIZE)) {
                this.stopMovement();
                this.updateStep("y");
            }
            this.x += this.speedX;
            this.y += this.speedY;
            this.activeTile = myGameArea.fieldTiles[(this.stepY / 32)][(this.stepX / 32)];
        }
        coords.innerHTML = "Xcoor: " + this.x + "<br>Ycoor: " + this.y + "<br>Last Xcoor: " + (this.stepX / 32) + "<br>Last Ycoor: " + (this.stepY / 32)
    },
    this.tileMovementCheck = function() {
        if (this.pressedDirection == "up" && activeTile.up) {
            // kolla om activeTile.up == true
            this.direction = "up";
            moveup();
        }
        
        myGamePiece.direction = "up"
        myGamePiece.direction = "up"
    }
}


//      Keyboard functions (Control)         
document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if (keyCode == 38 || keyCode == 87) { pressup(); }
    if (keyCode == 40 || keyCode == 83) { pressdown(); }
    if (keyCode == 37 || keyCode == 65) { moveleft(); }
    if (keyCode == 39 || keyCode == 68) { moveright(); }
}


updateGameArea = () => {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

pressup = () => {
    myGamePiece.pressedDirection = "up";
}

/*
pressup = () => {
    if ( myGamePiece.moving == "down" ) {
        myGamePiece.moving = "up";
        moveup();
    } else if (myGamePiece.activeTile.up) {
        myGamePiece.moving = "up";
        moveup();
    } else {
        console.log("Up is blocked");
    }
}
pressdown = () => {
    if ( myGamePiece.moving == "up" ) {
        myGamePiece.moving = "down";
        movedown();
    } else if (myGamePiece.activeTile.down) {
        myGamePiece.moving = "down";
        movedown();
    } else {
        console.log("Down is blocked");
    }
}
*/


moveup = () => { myGamePiece.speedY = -2; myGamePiece.direction = "up"; }
movedown = () => { myGamePiece.speedY = 2; myGamePiece.direction = "down"; }
moveleft = () => { myGamePiece.speedX = -2; myGamePiece.direction = "left"; }
moveright = () => { myGamePiece.speedX = 2; myGamePiece.direction = "right"; }

