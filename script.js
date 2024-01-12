

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

    drawPoint(x, y) {
        this.drawShape(x, y, 1, 1);
    }

    drawShape(x, y, w, h) {
        ctx.fillRect(this.x + (x * scale), this.y + (y * scale), w * scale, h * scale);
    }
    drawPlayer() {
        ctx.fillStyle = this.color;
        switch (this.dir) {
            case 'e':
                this.drawShape(0, 0, 6, 2);
                this.drawShape(0, 5, 6, 2);
                this.drawShape(2, 2, 3, 3);
                this.drawShape(5, 3, 3, 1);
                break;
            case 'w':
                this.drawShape(2, 0, 6, 2);
                this.drawShape(2, 5, 6, 2);
                this.drawShape(3, 2, 3, 3);
                this.drawShape(0, 3, 3, 1);
                break;
            case 's':
                this.drawShape(0, 0, 2, 6);
                this.drawShape(5, 0, 2, 6);
                this.drawShape(2, 2, 3, 3);
                this.drawShape(3, 5, 1, 3);
                break;
            case 'n':
                this.drawShape(0, 2, 2, 6);
                this.drawShape(5, 2, 2, 6);
                this.drawShape(2, 3, 3, 3);
                this.drawShape(3, 0, 1, 3);
                break;
            case 'ne':
                this.drawShape(3, 3, 5, 2);
                this.drawShape(3, 0, 2, 3);
                this.drawShape(1, 2, 2, 2);
                this.drawShape(4, 5, 2, 2);
                this.drawShape(0, 4, 2, 1);
                this.drawShape(3, 6, 1, 2);
                this.drawPoint(2, 1);
                this.drawPoint(0, 3);
                this.drawPoint(5, 2);
                this.drawPoint(6, 1);
                this.drawPoint(7, 0);
                this.drawPoint(6, 5);
                this.drawPoint(4, 7);
                break;
            case 'nw':
                this.drawShape(3, 0, 2, 5);
                this.drawShape(0, 3, 3, 2);
                this.drawShape(2, 5, 2, 2);
                this.drawShape(5, 2, 2, 2);
                this.drawShape(6, 4, 2, 1);
                this.drawShape(4, 6, 1, 2);
                this.drawPoint(0, 0);
                this.drawPoint(1, 1);
                this.drawPoint(2, 2);
                this.drawPoint(5, 1);
                this.drawPoint(7, 3);
                this.drawPoint(1, 5);
                this.drawPoint(3, 7);
                break;
            case 'sw':
                this.drawShape(0, 3, 5, 2);
                this.drawShape(3, 5, 2, 3);
                this.drawShape(2, 1, 2, 2);
                this.drawShape(5, 4, 2, 2);
                this.drawShape(4, 0, 1, 2);
                this.drawShape(6, 3, 2, 1);
                this.drawPoint(3, 0);
                this.drawPoint(1, 2);
                this.drawPoint(7, 4);
                this.drawPoint(5, 6);
                this.drawPoint(0, 7);
                this.drawPoint(1, 6);
                this.drawPoint(2, 5);
                break;
            case 'se':
                this.drawShape(3, 3, 2, 5);
                this.drawShape(5, 3, 3, 2);
                this.drawShape(4, 1, 2, 2);
                this.drawShape(1, 4, 2, 2);
                this.drawShape(3, 0, 1, 2);
                this.drawShape(0, 3, 2, 1);
                this.drawPoint(4, 0);
                this.drawPoint(6, 2);
                this.drawPoint(0, 4);
                this.drawPoint(2, 6);
                this.drawPoint(5, 5);
                this.drawPoint(6, 6);
                this.drawPoint(7, 7);
                break;
            case 'nnw':
                this.drawShape(0, 3, 8, 2);
                this.drawShape(1, 5, 3, 2);
                this.drawShape(5, 1, 2, 2);
                this.drawShape(2, 0, 1, 2);
                this.drawShape(3, 2, 2, 1);
                for (const [x, y] of
                    [
                        [0, 2],
                        [5, 0],
                        [6, 5],
                        [2, 7]]) {
                    this.drawPoint(x, y);
                }
                break;
            case 'wsw':
                for (const [x, y, w, h] of
                    [
                        [3, 0, 2, 8],
                        [5, 4, 2, 3],
                        [1, 1, 2, 2],
                        [2, 3, 1, 2],
                        [0, 5, 2, 1]]) {
                    this.drawShape(x, y, w, h);
                }
                for (const [x, y] of
                    [
                        [5, 1],
                        [0, 2],
                        [2, 7],
                        [7, 5]]) {
                    this.drawPoint(x, y);
                }
                break;
            case 'sse':
                for (const [x, y, w, h] of
                    [
                        [0, 3, 8, 2],
                        [4, 1, 3, 2],
                        [1, 5, 2, 2],
                        [3, 5, 2, 1],
                        [5, 6, 1, 2]]) {
                    this.drawShape(x, y, w, h);
                }
                for (const [x, y] of
                    [
                        [5, 0],
                        [1, 2],
                        [2, 7],
                        [7, 5]]) {
                    this.drawPoint(x, y);
                }
                break;
            case 'ene':
                for (const [x, y, w, h] of
                    [
                        [3, 0, 2, 8],
                        [1, 1, 2, 3],
                        [5, 5, 2, 2],
                        [6, 2, 2, 1],
                        [5, 3, 1, 2]]) {
                    this.drawShape(x, y, w, h);
                }
                for (const [x, y] of
                    [
                        [5, 0],
                        [0, 2],
                        [7, 5],
                        [2, 6]]) {
                    this.drawPoint(x, y);
                }
                break;
            case 'wnw':
                for (const [x, y, w, h] of
                    [
                        [3, 0, 2, 8],
                        [5, 1, 2, 3],
                        [1, 5, 2, 2],
                        [0, 2, 2, 1],
                        [2, 3, 1, 2]]) {
                    this.drawShape(x, y, w, h);
                }
                for (const [x, y] of
                    [
                        [2, 0],
                        [7, 2],
                        [0, 5],
                        [5, 6]]) {
                    this.drawPoint(x, y);
                }
                break;
            case 'ssw':
                for (const [x, y, w, h] of
                    [
                        [0, 3, 8, 2],
                        [1, 1, 3, 2],
                        [5, 5, 2, 2],
                        [3, 5, 2, 1],
                        [2, 6, 1, 2]]) {
                    this.drawShape(x, y, w, h);
                }
                for (const [x, y] of
                    [
                        [2, 0],
                        [6, 2],
                        [0, 5],
                        [5, 7]]) {
                    this.drawPoint(x, y);
                }
                break;
            case 'ese':
                for (const [x, y, w, h] of
                    [
                        [3, 0, 2, 8],
                        [1, 4, 2, 3],
                        [5, 1, 2, 2],
                        [5, 3, 1, 2],
                        [6, 5, 2, 1]]) {
                    this.drawShape(x, y, w, h);
                }
                for (const [x, y] of
                    [
                        [2, 1],
                        [7, 2],
                        [0, 5],
                        [5, 7]]) {
                    this.drawPoint(x, y);
                }
                break;
            case 'nne':
                for (const [x, y, w, h] of
                    [
                        [0, 3, 8, 2],
                        [4, 5, 3, 2],
                        [1, 1, 2, 2],
                        [3, 2, 2, 1],
                        [5, 0, 1, 2]]) {
                    this.drawShape(x, y, w, h);
                }
                for (const [x, y] of
                    [
                        [2, 0],
                        [7, 2],
                        [1, 5],
                        [5, 7]]) {
                    this.drawPoint(x, y);
                }
                break;


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


const players = [new Player(10, 61, "#b0e070", 'e', 'w', 'd', 'a'), new Player(141, 60, "#d0d040", 'w', 'p', 'l', "'")];
players.forEach(function (player) {
    player.initializeActionMap();
});
window.requestAnimationFrame(game);


// cmd option r!



