

const canvas = document.getElementById("pong");

const ctx = canvas.getContext('2d');

const pressedKeys = new Set();
const keyActionMap = new Map();




function drawObstacles() {
    ctx.fillStyle = OBSTACLE_COLOR;

    for (const [x, y, w, h] of OBSTACLES) {

        ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
    }
}


function willCollideObstacle(x, y, hitbox) {

    for (const [obstX, obstY, obstW, obstH] of OBSTACLES) {
        if (x < obstX * SCALE + obstW * SCALE &&
            x + hitbox - SCALE > obstX * SCALE &&
            y < obstY * SCALE + obstH * SCALE &&
            y + hitbox - SCALE > obstY * SCALE) {
            return true;
        }
    }

    return false;

}



function willCollidePlayer(x, y, hitbox, thisPlayer) {

    // friendly fire purposely allowed ?
    let collision = false;
    players.forEach(function (otherPlayer) {

        if (!collision && otherPlayer != thisPlayer && x < otherPlayer.x + otherPlayer.hitbox &&
            x + hitbox > otherPlayer.x &&
            y < otherPlayer.y + otherPlayer.hitbox &&
            y + hitbox > otherPlayer.y) {
            collision = true;
        }
    });

    return collision;

}


class Player {
    constructor(startX, startY, color, startDir, forward, right, left, fire) {
        this.x = startX * SCALE;
        this.y = startY * SCALE;
        this.score = 0;
        this.color = color;
        this.dir = startDir;
        this.hitbox = PLAYER_HITBOX * SCALE;
        this.forward = forward;
        this.right = right;
        this.left = left;
        this.fire = fire;

        this.bullet = {
            x: null,
            y: null,
            dir: null,
            hitbox: BULLET_HITBOX * SCALE,
            remainingDistance: 0
        }

    }

    initializeActionMap() {
        keyActionMap.set(this.forward, [this, this.moveForward]);
        keyActionMap.set(this.right, [this, this.rotateRight]);
        keyActionMap.set(this.left, [this, this.rotateLeft]);
        keyActionMap.set(this.fire, [this, this.initBullet]);
    }


    drawShapes(shapes) {
        for (const [x, y, w, h] of shapes) {
            ctx.fillRect(this.x + (x * SCALE), this.y + (y * SCALE), w * SCALE, h * SCALE);
        }

    }
    drawPlayer() {
        ctx.fillStyle = this.color;
        this.drawShapes(this.dir);
        this.drawBullet();
    }

    initBullet() {
        if (this.bullet.remainingDistance == 0) {
            this.bullet.x = this.x + (SCALE * BULLET_COORDS.get(this.dir)[0]);
            this.bullet.y = this.y + (SCALE * BULLET_COORDS.get(this.dir)[1]);
            this.bullet.dir = this.dir;
            this.bullet.remainingDistance = BULLET_DISTANCE;
        }
    }
    drawBullet() {

        if (this.bullet.remainingDistance > 0) {



            let newX = this.bullet.x + (MOVE_X_MAP.get(this.bullet.dir) * SCALE * BULLET_SPEED);
            let newY = this.bullet.y + (MOVE_Y_MAP.get(this.bullet.dir) * SCALE * BULLET_SPEED);

            if (willCollideObstacle(newX, newY, this.bullet.hitbox)) {
                this.bullet.remainingDistance = 0;
            } else if (willCollidePlayer(newX, newY, this.bullet.hitbox, this)) {
                // handle
            } else {
                this.bullet.x = Math.floor(newX);
                this.bullet.y = Math.floor(newY);

                ctx.fillRect(this.bullet.x, this.bullet.y, SCALE, SCALE);

                this.bullet.remainingDistance--;
            }





        }
    }

    rotateLeft() {
        this.dir = ROTATE_LEFT_MAP.get(this.dir);
    }

    rotateRight() {
        this.dir = ROTATE_RIGHT_MAP.get(this.dir);
    }





    moveForward() {

        let newX = this.x + (MOVE_X_MAP.get(this.dir) * SCALE * PLAYER_SPEED);
        let newY = this.y + (MOVE_Y_MAP.get(this.dir) * SCALE * PLAYER_SPEED);

        if (willCollideObstacle(newX, newY, this.hitbox) || willCollidePlayer(newX, newY, this.hitbox, this)) {
            this.x -= 3 * MOVE_X_MAP.get(this.dir) * SCALE * PLAYER_SPEED;
            this.y -= 3 * MOVE_Y_MAP.get(this.dir) * SCALE * PLAYER_SPEED;
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


const players = [new Player(10, 61, "#b0e070", E, 'w', 'd', 'a', 'c'), new Player(141, 60, "#d0d040", W, 'p', "'", 'l', ',')];
players.forEach(function (player) {
    player.initializeActionMap();
});
window.requestAnimationFrame(game);


// cmd option r!



