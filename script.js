// select canvas element
const canvas = document.getElementById("pong");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

const scale = 10;

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
    ['nne', 1],
    ['ne', 1],
    ['ene', 2],
    ['e', 1],
    ['ese', 2],
    ['se', 1],
    ['sse', 1],
    ['s', 0],
    ['ssw', -1],
    ['sw', -1],
    ['wsw', -2],
    ['w', -1],
    ['wnw', -2],
    ['nw', -1],
    ['nnw', -1]
]);

const moveYMap = new Map([
    ['n', -1],
    ['nne', -2],
    ['ne', -1],
    ['ene', -1],
    ['e', 0],
    ['ese', 1],
    ['se', 1],
    ['sse', 2],
    ['s', 1],
    ['ssw', 2],
    ['sw', 1],
    ['wsw', 1],
    ['w', 0],
    ['wnw', -1],
    ['nw', -1],
    ['nnw', -2]
]);





class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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


        }

    }

    rotateLeft() {
        this.dir = rotateLeftMap.get(this.dir);
    }

    rotateRight() {
        this.dir = rotateRightMap.get(this.dir);
    }

    moveForward() {
        this.x += moveXMap.get(this.dir) * scale;
        this.y += moveYMap.get(this.dir) * scale;
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
    p1.drawPlayer();
    console.log('rendering');
}
function game() {
    //update();
    render();

    window.requestAnimationFrame(game);
}


const p1 = new Player(64, 366);
window.requestAnimationFrame(game);

