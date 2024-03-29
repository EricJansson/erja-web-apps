
const DIR_LEFT = 0;
const DIR_UP = 32;
const DIR_RIGHT = 64;
const DIR_DOWN = 96;



class component {
    constructor(width, height, imgSrc, x, y, unitType, frameSpeed, framePixel) {
        this.priorityQue = ["up", "right", "down", "left"];
        this.imgDirection = DIR_LEFT;
        this.imgFrame = 0;
        this.frameSpeed = frameSpeed;
        this.framePixel = framePixel;
        this.imgSrc = imgSrc;
        this.img = new Image();
        this.img.src = this.imgSrc;
        this.unitType = unitType;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.direction = "none";
        this.pressedDirection = "none";
        this.moving = false;
        this.activeTile;
        this.moveTarget = [128, 160];
        this.stepX = x / FIELD_TILE_PIXEL_SIZE;
        this.stepY = y / FIELD_TILE_PIXEL_SIZE;
        this.x = x;
        this.y = y;

        if (unitType == "enemy") {
            this.direction = "left";
            this.pressedDirection = "left";
            if (!this.enemy) {
                component.prototype.enemy = [this];
            } else {
                component.prototype.enemy.push(this);
            }
        } else if (unitType == "hero") {
            if (!this.hero) {
                component.prototype.hero = [this];
            } else {
                component.prototype.hero.push(this);
            }
        }
    }
    
    update = function() {
        this.ctx = myGameArea.context;
        this.updateImg();

        this.ctx.drawImage(this.img, this.imgFrame, this.imgDirection, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    updateImg = function() {
        switch (this.direction) {
            case "up":
                this.imgDirection = DIR_UP;
                break;
            case "right":
                this.imgDirection = DIR_RIGHT;
                break;
            case "down":
                this.imgDirection = DIR_DOWN;
                break;
            case "left":
                this.imgDirection = DIR_LEFT;
                break;
            default:
                break;
        }
        if (this.direction == "left" || this.direction == "right") {
            this.updateImgFrame(this.stepX, this.x);
        } else if (this.direction == "up" || this.direction == "down") {
            this.updateImgFrame(this.stepY, this.y);
        }
    }
    
    updateImgFrame = function(directionStep, directionCord) {
        let stepPixel = directionStep * FIELD_TILE_PIXEL_SIZE;
        let deltaPixel = Math.abs(stepPixel - directionCord);
        if (deltaPixel >= 320) { deltaPixel -= 320; } // Fixes teleport visual bug
        let frame;
        for (let ii = 0; ii < this.frameSpeed.length; ii++) {
            if (deltaPixel <= this.frameSpeed[ii]) {
                frame = this.framePixel[ii];
                break;
            }
        }
        this.imgFrame = frame;
    }

    deathCheck = function(killAble) {
        if (this.unitType == "hero") {
            for (let ii = 0; ii < this.enemy.length; ii++) {
                let deltaX = Math.abs(this.x - this.enemy[ii].x)
                let deltaY = Math.abs(this.y - this.enemy[ii].y)
                if (deltaX + deltaY < 6) {
                    if (killAble) { 
                        let heroList = component.prototype.hero;
                        if (heroList.length <= 1) { // when last pacman dies -> game over
                            myGameArea.stop();
                        }
                        // remove pacman from game
                        for (let ii = 0; ii < heroList.length; ii++) {
                            if (this == heroList[ii]) {
                                heroList.splice(ii, 1);
                            }
                        }
                    }
                }
            }
        }
    }

    moveOneTile = function() {
        if (this.moving) {
            this.setSpeed(this.direction)
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
                    this.speedY = 0;
                    this.speedX = 0;
                    this.moving = false;
                }
                return;
            }
        }
    }
    
    move = function() {
        if (!this.moving) {
            this.activeTile = myGameArea.fieldTiles[this.stepY][this.stepX];
            if (this.unitType == "enemy") { // auto select new direction
                // seek pacman
                if (this == this.enemy[0]) {
                    this.setTarget([this.hero[0].x, this.hero[0].y])
                } else if (this == this.enemy[1]) {
                    this.setTarget([90, 128])
                } else if (this == this.enemy[2]) {
                    this.setTarget([224, 128])
                } else if (this == this.enemy[3]) {
                    this.setTarget([160, 160])
                }
                this.pressedDirection = this.shortestDirection(); // HERE
            }
            if (!this.tileMovementCheck(this.pressedDirection, this.activeTile)) {
                if (!this.tileMovementCheck(this.direction, this.activeTile)) {
                    this.speedY = 0;
                    this.speedX = 0;
                    this.tileMovementCheck(this.direction, this.activeTile);
                    return
                }
            }
            this.moving = true;
        }
        this.moveOneTile();
    }
    
    turnRight = function(returnIndex) {
        let currentIndex = this.priorityQue.indexOf(this.direction);
        if (currentIndex == 3) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        if (returnIndex) { return currentIndex; }
        this.pressedDirection = this.priorityQue[currentIndex];
        // this.direction = this.priorityQue[currentIndex];
        // this.setSpeed(this.direction)
    }

    turnLeft = function(returnIndex) {
        let currentIndex = this.priorityQue.indexOf(this.direction);
        if (currentIndex == 0) {
            currentIndex = 3;
        } else {
            currentIndex--;
        }
        if (returnIndex) { return currentIndex; }
        this.pressedDirection = this.priorityQue[currentIndex];
        // this.direction = this.priorityQue[currentIndex];
        // this.setSpeed(this.direction)
    }
    
    setSpeed = function(direction) {
        let speedX = 0;
        let speedY = 0;
        switch (direction) {
            case "up":
                speedY = -PIXEL_SPEED;
                break;
            case "down": 
                speedY = PIXEL_SPEED;
                break;
            case "left": 
                speedX = -PIXEL_SPEED;
                break;
            case "right": 
                speedX = PIXEL_SPEED;
                break;
        }
        this.speedX = speedX;
        this.speedY = speedY;
    }

    tileMovementCheck = function(pressedDirection, tileToCheck) {
        let dir = pressedDirection;
        let tile = tileToCheck;
        // exception for wall teleportation
        if (this.stepX == 10 || this.stepX == -1) {
            return true;
        }
        if (this.tileAccessCheck(pressedDirection, tileToCheck)) {
            this.direction = dir;
            return true;
        }
        return false;
    }

    tileAccessCheck = function(pressedDirection, tileToCheck) {
        let dir = pressedDirection;
        let tile = tileToCheck;
        if (dir == "up" && tile.up) {
            return true;
        } else if (dir == "down" && tile.down) {
            return true;
        } else if (dir == "left" && tile.left) {
            return true;
        } else if (dir == "right" && tile.right) {
            return true;
        } 
        return false;
    }

    hardTurn = function() {
        // hardTurn disabled during teleportation between left/right side.
        if (this.stepX == 10 || this.stepX == -1) {
            return;
        }
        let index = this.priorityQue.indexOf(this.direction);
        index += 2; // priorityQue changes direction by 90deg per index
        if (index > 3) {
            index -= 4;
        }
        let newDirection = this.priorityQue[index];
        this.setSpeed(newDirection)
        this.direction = newDirection
        this.pressedDirection = newDirection
    }

    // returns a distanceNum
    calcDistance = function([startXcor, startYcor], [targetXcor, targetYcor]) {
        let deltaY = targetYcor - startYcor
        let deltaX = targetXcor - startXcor
        let vectorLength = Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2))
        return vectorLength;
    }

    getNeighborCords = function(direction) {
        let returnArr = [this.x, this.y];
        switch (direction) {
            case "up":
                returnArr[1] -= 32;
                break;
            case "down":
                returnArr[1] += 32;
                break;
            case "left":
                returnArr[0] -= 32;
                break;
            case "right":
                returnArr[0] += 32;
                break;
        }
        return returnArr;
    }
    // returns a direction string "up", "down", ...
    shortestDirection = function() {
        let tileFront = this.tileAccessCheck(this.direction, this.activeTile);
        let tileToLeft = this.tileAccessCheck(this.priorityQue[this.turnLeft(true)], this.activeTile);
        let tileToRight = this.tileAccessCheck(this.priorityQue[this.turnRight(true)], this.activeTile);
        let frontDistance = 9999;
        let toLeftDistance = 9999;
        let toRightDistance = 9999;
        if (!tileFront && !tileToLeft && !tileToRight) { // Dead end
            this.hardTurn();
            return;
        }
        if (tileFront) {
            frontDistance = this.calcDistance(this.getNeighborCords(this.direction), this.moveTarget)
        }
        if (tileToLeft) {
            toLeftDistance = this.calcDistance(this.getNeighborCords(this.priorityQue[this.turnLeft(true)]), this.moveTarget)
        }
        if (tileToRight) {
            toRightDistance = this.calcDistance(this.getNeighborCords(this.priorityQue[this.turnRight(true)]), this.moveTarget)
        }
        let min = frontDistance;
        if (toLeftDistance < min) { min = toLeftDistance }
        if (toRightDistance < min) { min = toRightDistance }
        if (min == toLeftDistance) {
            return this.priorityQue[this.turnLeft(true)]
        } else if (min == toRightDistance) {
            return this.priorityQue[this.turnRight(true)]
        } else if (min == frontDistance) {
            return this.direction
        }
    }

    setTarget = function([targetXcor, targetYcor]) {
        this.moveTarget = [targetXcor, targetYcor];
    }
}

component.prototype.totUnits = 0;
