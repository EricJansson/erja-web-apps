// [up, down, left, right]

// Dead-end
const a1 = [1,0,0,0];
const a2 = [0,1,0,0];
const a3 = [0,0,1,0];
const a4 = [0,0,0,1];

// Curve
const b1 = [0,1,0,1];
const b2 = [0,1,1,0];
const b3 = [1,0,0,1];
const b4 = [1,0,1,0];

// Straight path
const b5 = [0,0,1,1];
const b6 = [1,1,0,0];

// 3x crossroad
const c1 = [1,1,0,1];
const c2 = [0,1,1,1];
const c3 = [1,0,1,1];
const c4 = [1,1,1,0];

// 4x crossroad
const d1 = [1,1,1,1];

// unreachable
const e1 = [0,0,0,0];

// up, down, left, right
const defaultMap = [
    [b1, b5, c2, b5, b2, b1, b5, c2, b5, b2],
    [b6, e1, b6, e1, b6, b6, e1, b6, e1, b6],
    [c1, b5, d1, c2, c3, c3, c2, d1, b5, c4],
    [b3, b5, c4, b3, b2, b1, b4, c1, b5, b4],
    [e1, e1, b6, b1, c3, c3, b2, b6, e1, e1],
    [b5, b5, d1, c4, a4, a3, c1, d1, b5, b5],
    [e1, e1, b6, c1, b5, b5, c4, b6, e1, e1],
    [b1, b5, d1, c3, b2, b1, c3, d1, b5, b2], 
    [b3, b2, c1, c2, c3, c3, c2, c4, b1, b4], 
    [b1, c3, b4, b3, b2, b1, b4, b3, c3, b2], 
    [b3, b5, b5, b5, c3, c3, b5, b5, b5, b4]
];


function fieldTile(up, down, left, right) {
    
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    if (up == 1) {
        this.up = true;
    }
    if (down == 1) {
        this.down = true;
    }
    if (left == 1) {
        this.left = true;
    }
    if (right == 1) {
        this.right = true;
    }
}

function generateMapTiles(arrToFill, tileWidth, tileHeight) {
    for (yy=0; yy<tileHeight; yy++) {
        arrToFill.push([]);
        for (xx=0; xx<tileWidth; xx++) {
    
            arrToFill[yy].push(
                new fieldTile(defaultMap[yy][xx][0], defaultMap[yy][xx][1], defaultMap[yy][xx][2], defaultMap[yy][xx][3])
            );
        }
    }
}
