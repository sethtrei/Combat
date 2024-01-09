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