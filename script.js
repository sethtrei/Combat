

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
    constructor(startX, startY, color, startDir, forward, right, left, fire) {
        this.x = startX * scale;
        this.y = startY * scale;
        this.score = 0;
        this.color = color;
        this.dir = startDir;
        this.hitbox = 9 * scale;
        this.forward = forward;
        this.right = right;
        this.left = left;
        this.fire = fire;

        this.bullet = {
            x: null,
            y: null,
            dir: null,
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
            ctx.fillRect(this.x + (x * scale), this.y + (y * scale), w * scale, h * scale);
        }

    }
    drawPlayer() {
        ctx.fillStyle = this.color;
        this.drawShapes(this.dir);
        this.drawBullet();
    }

    initBullet() {
        this.bullet.x = this.x;
        this.bullet.y = this.y;
        this.bullet.dir = this.dir;
        this.bullet.remainingDistance = 30;
    }
    drawBullet() {

        let speed = 1
        if (this.bullet.remainingDistance > 0) {



            let newX = this.bullet.x + (moveXMap.get(this.bullet.dir) * scale * speed);
            let newY = this.bullet.y + (moveYMap.get(this.bullet.dir) * scale * speed);

            if (this.willCollideObstacle(newX, newY)) {
                this.bullet.remainingDistance = 0;
            } else if (this.willCollidePlayer(newX, newY)) {
                // handle collission
            } else {
                this.bullet.x = Math.floor(newX);
                this.bullet.y = Math.floor(newY);

                ctx.fillRect(this.bullet.x, this.bullet.y, scale, scale);

                this.bullet.remainingDistance--;
            }

            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);



        }
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
        let speed = 0.75;

        let newX = this.x + (moveXMap.get(this.dir) * scale * speed);
        let newY = this.y + (moveYMap.get(this.dir) * scale * speed);

        if (this.willCollideObstacle(newX, newY) || this.willCollidePlayer(newX, newY)) {
            this.x -= 3 * moveXMap.get(this.dir) * scale * speed;
            this.y -= 3 * moveYMap.get(this.dir) * scale * speed;
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


const players = [new Player(10, 61, "#b0e070", e, 'w', 'd', 'a', 'c'), new Player(141, 60, "#d0d040", w, 'p', "'", 'l', ',')];
players.forEach(function (player) {
    player.initializeActionMap();
});
window.requestAnimationFrame(game);


// cmd option r!



