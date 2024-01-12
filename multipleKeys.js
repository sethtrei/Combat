// Scrap file

const executeMoves = () => {
    Object.keys(controller).forEach(key => {
        controller[key].pressed && controller[key].func.call(controller[key].p)
    })
}


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    executeMoves();
    p1.drawPlayer();
}




const controller = {
    'w': { pressed: false, func: p1.moveForward, p: p1 },
    'a': { pressed: false, func: p1.rotateLeft, p: p1 },
    'd': { pressed: false, func: p1.rotateRight, p: p1 }
}



document.addEventListener("keydown", (e) => {
    if (controller[e.key.toLowerCase()]) {
        controller[e.key.toLowerCase()].pressed = true
    }
})
document.addEventListener("keyup", (e) => {
    if (controller[e.key.toLowerCase()]) {
        controller[e.key.toLowerCase()].pressed = false
        console.log(e.key);

    }
})





document.onkeydown = function (e) {
    //  console.log(e.key)
    switch (e.key.toLowerCase()) {
        case 'a':
            players[0].rotateLeft();
            break;
        case 'd':
            players[0].rotateRight();
            break;
        case 'w':
            players[0].moveForward();
            break;
        case 'l':
            players[1].rotateLeft();
            break;
        case "'":
            players[1].rotateRight();
            break;
        case 'p':
            players[1].moveForward();
            break;
    }

};