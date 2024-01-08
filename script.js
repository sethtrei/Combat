// select canvas element
const canvas = document.getElementById("pong");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');



class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.score = 0;
        this.color = "#b0e070";
        this.h = 40
        this.w = 40
    }

    drawPlayer() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    rotateRight() {
        // PICK UP HERE!
    }
}


document.onkeydown = function (e) {
    console.log(e.key)
    switch (e.key.toLowerCase()) {
        case 'd':
            p1.rotateRight();
            break;
    }

};

const p1 = new Player(64, 366);
p1.drawPlayer();

