
var gameblock = document.getElementById("gameblock");
var killAble = true;
var pacman;
var myGamePiece2;
var myGamePiece3;
var myGamePiece4;
var myGamePiece5;
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

const PACMAN_FRAME_SPEED = [3, 10, 15, 20, 25, 30, 32];
const PACMAN_FRAME_PIXEL = [32, 0, 32, 64, 96, 64, 32];
const GHOST_FRAME_SPEED = [8, 16, 24, 32];
const GHOST_FRAME_PIXEL = [0, 32, 0, 32];

var coords = document.getElementById("gameCoords");
var isMobile = false;
var myGameArea;


function mobileSettings() {
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }
    if (isMobile) {
        document.getElementById("arrowKeyBlock").style.display = "flex";
    }
}

function toggleInvincibilty() {
    killAble = !killAble;
    if (!killAble) {
        document.getElementById("invinceBox").innerText = "✓"
        document.getElementById("invinceBox").style.background = "#01dd01";
    } else {
        document.getElementById("invinceBox").innerText = "X"
        document.getElementById("invinceBox").style.background = "red";
    }
}

document.body.onload = function() {
    myGameArea = new gameArea;
    myGameArea.start();
    component.prototype.hero = [];
    component.prototype.enemy = [];
    gameBackground.start();
    mobileSettings();
}

startNewGame = function() {
    myGameArea.clear();
    myGameArea.stop();
    myGameArea = new gameArea;
    myGameArea.start();
    component.prototype.hero = [];
    component.prototype.enemy = [];
    gameBackground.start();

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

        pacman = new component(32, 32, PACMAN_IMG, 160, 256, "hero", PACMAN_FRAME_SPEED, PACMAN_FRAME_PIXEL);
        myGamePiece2 = new component(32, 32, RED_GHOST_IMG, 128, 128, "enemy", GHOST_FRAME_SPEED, GHOST_FRAME_PIXEL);
        myGamePiece3 = new component(32, 32, BLUE_GHOST_IMG, 160, 128, "enemy", GHOST_FRAME_SPEED, GHOST_FRAME_PIXEL);
        myGamePiece4 = new component(32, 32, YELLOW_GHOST_IMG, 160, 128, "enemy", GHOST_FRAME_SPEED, GHOST_FRAME_PIXEL);
        myGamePiece5 = new component(32, 32, PINK_GHOST_IMG, 128, 128, "enemy", GHOST_FRAME_SPEED, GHOST_FRAME_PIXEL);
    }
}


/*
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
*/
class gameArea {
    constructor() {
        this.canvas = document.createElement("canvas")
        this.fieldTiles = []
    }
    start = function() {
        generateMapTiles(this.fieldTiles, 10, 11);
        this.canvas.height = 352;
        this.canvas.width = 320;
        this.canvas.id = "myCanvas";
        this.context = this.canvas.getContext("2d");
        gameblock.insertBefore(this.canvas, gameblock.childNodes[0]);
        // Make sure the image is loaded first otherwise nothing will draw.
        // this.frameNo = 0;
        this.interval = setInterval(updateGameArea, MILLIS_FRAMERATE);
    } 
    clear = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    stop = function() {
        clearInterval(this.interval);
    }
}



updateGameArea = () => {
    myGameArea.clear();
    pacman.move();
    pacman.update();
    pacman.deathCheck(killAble);

    myGamePiece2.move();
    myGamePiece2.update();
    
    myGamePiece3.move();
    myGamePiece3.update();
    
    myGamePiece4.move();
    myGamePiece4.update();

    myGamePiece5.move();
    myGamePiece5.update();

    myXcor = (pacman.x / FIELD_TILE_PIXEL_SIZE)
    myYcor = (pacman.y / FIELD_TILE_PIXEL_SIZE)
    coords.innerHTML = "Xcoor: " + pacman.x + "<br>Ycoor: " + pacman.y + "<br>Last Xcoor: " + (pacman.stepX + 1) +  "<br>Last Ycoor: " + (pacman.stepY + 1);
    coords.innerHTML += "<br>SpeedY: " + pacman.speedY + "<br>SpeedX: " + pacman.speedX;
}

setTimeout(()=>{
    keyPressDirection(myGamePiece2, "right");
    keyPressDirection(myGamePiece3, "left");
    keyPressDirection(myGamePiece4, "right");
    keyPressDirection(myGamePiece5, "left");
}, 100);
