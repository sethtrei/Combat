

const canvas = document.getElementById("pong");

const ctx = canvas.getContext('2d');

const pressedKeys = new Set();
const keyActionMap = new Map();




function drawObstacles() {
    ctx.fillStyle = "#286898";

    for (const [x, y, w, h] of obstacles) {

        ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
    }
}

class Player {
    constructor(startX, startY, color, startDir, fKey, rrKey, rlKey) {
        this.x = startX * scale;
        this.y = startY * scale;
        this.score = 0;
        this.color = color;
        this.dir = startDir;
        this.hitbox = 9 * scale;
        this.fKey = fKey;
        this.rrKey = rrKey;
        this.rlKey = rlKey;

    }

    initializeActionMap() {
        keyActionMap.set(this.fKey, [this, this.moveForward]);
        keyActionMap.set(this.rrKey, [this, this.rotateRight]);
        keyActionMap.set(this.rlKey, [this, this.rotateLeft]);
    }


    drawShapes(shapes) {
        for (const [x, y, w, h] of shapes) {
            ctx.fillRect(this.x + (x * scale), this.y + (y * scale), w * scale, h * scale);
        }

    }
    drawPlayer() {
        ctx.fillStyle = this.color;
        this.drawShapes(this.dir);


    }

    rotateLeft() {
        this.dir = rotateLeftMap.get(this.dir);
    }

    rotateRight() {
        this.dir = rotateRightMap.get(this.dir);
    }

    willCollideObstacle(x, y) {

        for (const [obstX, obstY, obstW, obstH] of obstacles) {
            if (x < obstX * scale + obstW * scale &&
                x + this.hitbox - scale > obstX * scale &&
                y < obstY * scale + obstH * scale &&
                y + this.hitbox - scale > obstY * scale) {
                return true;
            }
        }

        return false;

    }

    willCollideWall(x, y) {

        for (const [obstX, obstY, obstW, obstH] of obstacles) {
            if (x < obstX * scale + obstW * scale &&
                x + this.hitbox - scale > obstX * scale &&
                y < obstY * scale + obstH * scale &&
                y + this.hitbox - scale > obstY * scale) {
                return true;
            }
        }

        return false;

    }

    willCollidePlayer(x, y) {

        const thisPlayer = this;
        let collision = false;
        players.forEach(function (otherPlayer) {

            if (!collision && otherPlayer != thisPlayer && x < otherPlayer.x + otherPlayer.hitbox &&
                x + thisPlayer.hitbox > otherPlayer.x &&
                y < otherPlayer.y + otherPlayer.hitbox &&
                y + thisPlayer.hitbox > otherPlayer.y) {
                collision = true;
            }
        });

        return collision;

    }



    moveForward() {

        let newX = this.x + (moveXMap.get(this.dir) * scale);
        let newY = this.y + (moveYMap.get(this.dir) * scale);

        if (this.willCollideObstacle(newX, newY) || this.willCollideWall(newX, newY) || this.willCollidePlayer(newX, newY)) {
            this.x -= 3 * moveXMap.get(this.dir) * scale;
            this.y -= 3 * moveYMap.get(this.dir) * scale;
        } else {
            this.x = newX;
            this.y = newY;
        }

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

    }





}


document.onkeydown = function (e) {
    pressedKeys.add(e.key.toLowerCase());
};

document.onkeyup = function (e) {
    pressedKeys.delete(e.key.toLowerCase());
};


function processKeys() {
    pressedKeys.forEach(function (key) {
        if (keyActionMap.has(key)) {
            keyActionMap.get(key)[1].call(keyActionMap.get(key)[0])
        }
    });
}




function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObstacles();
    processKeys();

    players.forEach(function (player) {
        player.drawPlayer();
    });
}
function game() {
    render();
    setTimeout(() => {
        window.requestAnimationFrame(game);
    }, 80);
}


const players = [new Player(10, 61, "#b0e070", e, 'w', 'd', 'a'), new Player(141, 60, "#d0d040", w, 'p', "'", "l")];
players.forEach(function (player) {
    player.initializeActionMap();
});
window.requestAnimationFrame(game);


// cmd option r!



