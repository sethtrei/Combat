// select canvas element
const canvas = document.getElementById("pong");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

const scale = 20;

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

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.score = 0;
        this.color = '#b0e070';
        this.dir = 'e';

    }

    drawPoint(x, y) {
        ctx.fillRect(this.x + (x * scale), this.y + (y * scale), 1 * scale, 1 * scale);
    }
    drawPlayer() {
        ctx.fillStyle = this.color;
        switch (this.dir) {
            case 'e':
                ctx.fillRect(this.x, this.y, 6 * scale, 2 * scale);
                ctx.fillRect(this.x, this.y + (5 * scale), 6 * scale, 2 * scale);
                ctx.fillRect(this.x + (2 * scale), this.y + (2 * scale), 3 * scale, 3 * scale);
                ctx.fillRect(this.x + (5 * scale), this.y + (3 * scale), 3 * scale, 1 * scale);
                break;
            case 'w':
                ctx.fillRect(this.x + (2 * scale), this.y, 6 * scale, 2 * scale);
                ctx.fillRect(this.x + (2 * scale), this.y + (5 * scale), 6 * scale, 2 * scale);
                ctx.fillRect(this.x + (3 * scale), this.y + (2 * scale), 3 * scale, 3 * scale);
                ctx.fillRect(this.x, this.y + (3 * scale), 3 * scale, 1 * scale);
                break;
            case 's':
                ctx.fillRect(this.x, this.y, 2 * scale, 6 * scale);
                ctx.fillRect(this.x + (5 * scale), this.y, 2 * scale, 6 * scale);
                ctx.fillRect(this.x + (2 * scale), this.y + (2 * scale), 3 * scale, 3 * scale);
                ctx.fillRect(this.x + (3 * scale), this.y + (5 * scale), 1 * scale, 3 * scale);
                break;
            case 'n':
                ctx.fillRect(this.x, this.y + (2 * scale), 2 * scale, 6 * scale);
                ctx.fillRect(this.x + (5 * scale), this.y + (2 * scale), 2 * scale, 6 * scale);
                ctx.fillRect(this.x + (2 * scale), this.y + (3 * scale), 3 * scale, 3 * scale);
                ctx.fillRect(this.x + (3 * scale), this.y, 1 * scale, 3 * scale);
                break;
            case 'ne':
                ctx.fillRect(this.x + (3 * scale), this.y + (3 * scale), 5 * scale, 2 * scale);
                ctx.fillRect(this.x + (3 * scale), this.y, 2 * scale, 3 * scale);
                ctx.fillRect(this.x + (1 * scale), this.y + (2 * scale), 2 * scale, 2 * scale);
                ctx.fillRect(this.x + (4 * scale), this.y + (5 * scale), 2 * scale, 2 * scale);
                ctx.fillRect(this.x, this.y + (4 * scale), 2 * scale, 1 * scale);
                ctx.fillRect(this.x + (3 * scale), this.y + (6 * scale), 1 * scale, 2 * scale);
                this.drawPoint(2, 1);
                this.drawPoint(0, 3);
                this.drawPoint(5, 2);
                this.drawPoint(6, 1);
                this.drawPoint(7, 0);
                this.drawPoint(6, 5);
                this.drawPoint(4, 7);
                break;

        }

    }

    rotateLeft() {
        this.dir = rotateLeftMap.get(this.dir);
    }



}


document.onkeydown = function (e) {
    console.log(e.key)
    switch (e.key.toLowerCase()) {
        case 'a':
            p1.rotateLeft();
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

