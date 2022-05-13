
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
        this.hardTurn();
    },
    this.moveOneTile = function() {
        if (!this.moving) {
            this.activeTile = myGameArea.fieldTiles[(this.y / FIELD_TILE_PIXEL_SIZE)][(this.x / FIELD_TILE_PIXEL_SIZE)];
            if (!this.tileMovementCheck(this.pressedDirection)) {
                if (!this.tileMovementCheck(this.direction)) {
                    this.speedY = 0;
                    this.speedX = 0;
                    this.tileMovementCheck(this.direction);
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
        if (this.x % FIELD_TILE_PIXEL_SIZE == 0 && this.y % FIELD_TILE_PIXEL_SIZE == 0) { // One tile moved.
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
        let dir = directionPressed;
        let tile = this.activeTile;
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
    this.hardTurn = function() {
        // hardTurn disabled during teleportation between left/right side.
        if (this.stepX == 10 || this.stepX == -1) {
            return;
        }
        let newDirection;
        let speedX = 0;
        let speedY = 0;
        switch (this.direction) {
            case "up":
                newDirection = "down"
                speedY = PIXEL_SPEED;
                break;
            case "down": 
                newDirection = "up"
                speedY = -PIXEL_SPEED;
                break;
            case "left": 
                newDirection = "right"
                speedX = PIXEL_SPEED;
                break;
            case "right": 
                newDirection = "left"
                speedX = -PIXEL_SPEED;
                break;
        }
        this.direction = newDirection
        this.pressedDirection = newDirection
        this.speedY = speedY;
        this.speedX = speedX;
    },
    // returns a distanceNum
    this.calcDistance = function([startYcor, startXcor], [targetYcor, targetXcor]) {
        let deltaY = targetYcor - startYcor
        let deltaX = targetXcor - startXcor
        let vectorLength = Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2))
        return vectorLength;
    },
    // returns a direction string "up", "down", ...
    this.shortestDirection = function() {

    }
}
