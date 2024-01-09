// select canvas element
const canvas = document.getElementById("pong");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

const scale = 10;

const obstacles = [
    [76, 28, 8, 18],
    [76, 82, 8, 18],
    [44, 59, 16, 10],
    [100, 59, 16, 10],
    [20, 50, 8, 5],
    [20, 73, 8, 5],
    [24, 55, 4, 18],
    [132, 50, 8, 5],
    [132, 73, 8, 5],
    [132, 55, 4, 18]];

const rotateLeftMap = new Map([
    ['n', 'nnw'],
    ['nnw', 'nw'],
    ['nw', 'wnw'],
    ['wnw', 'w'],
    ['w', 'wsw'],
    ['wsw', 'sw'],
    ['sw', 'ssw'],
    ['ssw', 's'],
    ['s', 'sse'],
    ['sse', 'se'],
    ['se', 'ese'],
    ['ese', 'e'],
    ['e', 'ene'],
    ['ene', 'ne'],
    ['ne', 'nne'],
    ['nne', 'n']
]);

const rotateRightMap = new Map([
    ['n', 'nne'],
    ['nne', 'ne'],
    ['ne', 'ene'],
    ['ene', 'e'],
    ['e', 'ese'],
    ['ese', 'se'],
    ['se', 'sse'],
    ['sse', 's'],
    ['s', 'ssw'],
    ['ssw', 'sw'],
    ['sw', 'wsw'],
    ['wsw', 'w'],
    ['w', 'wnw'],
    ['wnw', 'nw'],
    ['nw', 'nnw'],
    ['nnw', 'n']
]);

const moveXMap = new Map([
    ['n', 0],
    ['nne', 0.45],
    ['ne', 1],
    ['ene', 0.9],
    ['e', 1],
    ['ese', 0.9],
    ['se', 1],
    ['sse', 0.45],
    ['s', 0],
    ['ssw', -0.45],
    ['sw', -1],
    ['wsw', -0.9],
    ['w', -1],
    ['wnw', -0.9],
    ['nw', -1],
    ['nnw', -0.45]
]);

const moveYMap = new Map([
    ['n', -1],
    ['nne', -0.9],
    ['ne', -1],
    ['ene', -0.45],
    ['e', 0],
    ['ese', 0.45],
    ['se', 1],
    ['sse', 0.9],
    ['s', 1],
    ['ssw', 0.9],
    ['sw', 1],
    ['wsw', 0.45],
    ['w', 0],
    ['wnw', -0.45],
    ['nw', -1],
    ['nnw', -0.9]
]);



function drawBoarder() {
    ctx.fillStyle = "#286898";
    ctx.fillRect(0, 8 * scale, 160 * scale, 112 * scale);
    ctx.clearRect(4 * scale, 13 * scale, 152 * scale, 102 * scale);
}

function drawObstacles() {
    ctx.fillStyle = "#286898";

    for (const [x, y, w, h] of obstacles) {

        ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
    }
}

class Player {
    constructor(x, y) {
        this.x = 10 * scale;
        this.y = 61 * scale;
        this.score = 0;
        this.color = '#b0e070';
        this.dir = 'e';

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

    moveForward() {
        var newX = this.x + (moveXMap.get(this.dir) * scale);
        var newY = this.y + (moveYMap.get(this.dir) * scale);
        if (newX < 0 || newY < 0 || newY + (scale * 8) > canvas.height || newX + (scale * 8) > canvas.width) {
            this.x -= 2 * moveXMap.get(this.dir) * scale;
            this.y -= 2 * moveYMap.get(this.dir) * scale;
        } else {
            this.x = newX;
            this.y = newY;
        }

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

    }



}


document.onkeydown = function (e) {
    console.log(e.key)
    switch (e.key.toLowerCase()) {
        case 'a':
            p1.rotateLeft();
            break;
        case 'd':
            p1.rotateRight();
            break;
        case 'w':
            p1.moveForward();
            break;
    }

};






function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoarder();
    drawObstacles();
    p1.drawPlayer();
}
function game() {
    //update();
    render();
    window.requestAnimationFrame(game);
}


const p1 = new Player(64, 366);
window.requestAnimationFrame(game);


// cmd option r!
// right player: d0d040


