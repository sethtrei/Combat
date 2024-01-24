
class Player {
    constructor(startX, startY, color, startDir, forward, right, left, fire) {
        this.x = startX * SCALE;
        this.y = startY * SCALE;
        this.score = 0;
        this.color = color;
        this.dir = startDir;
        this.shotMoveAnimation = 0;
        this.shotRotateAnimation = 0;
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

    willCollideObstacle(x, y, hitbox) {

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

    willCollidePlayer(x, y, hitbox, thisPlayer, otherPlayer) {

        // friendly fire purposely allowed ?
        let victim = null;

        if (!victim && otherPlayer != thisPlayer && x < otherPlayer.x + otherPlayer.hitbox &&
            x + hitbox > otherPlayer.x &&
            y < otherPlayer.y + otherPlayer.hitbox &&
            y + hitbox > otherPlayer.y) {
            victim = otherPlayer;

        }


        return victim;

    }


    drawShapes(shapes, ctx) {
        for (const [x, y, w, h] of shapes) {
            ctx.fillRect(this.x + (x * SCALE), this.y + (y * SCALE), w * SCALE, h * SCALE);
        }

    }
    drawPlayer(ctx, otherPlayer) {

        ctx.fillStyle = this.color;

        if (this.shotMoveAnimation != 0) {
            this.moveForward(otherPlayer);
            this.shotMoveAnimation--;
        } else if (this.shotRotateAnimation != 0) {
            this.rotateRightotherPlayer

            if (--this.shotRotateAnimation == 0) {
                inputActive = true;
            }
        }


        this.drawShapes(this.dir, ctx);
        this.drawBullet(otherPlayer);

    }

    initBullet() {
        if (this.bullet.remainingDistance == 0) {
            this.bullet.x = this.x + (SCALE * BULLET_COORDS.get(this.dir)[0]);
            this.bullet.y = this.y + (SCALE * BULLET_COORDS.get(this.dir)[1]);
            this.bullet.dir = this.dir;
            this.bullet.remainingDistance = BULLET_DISTANCE;
        }
    }
    drawBullet(otherPlayer) {

        if (this.bullet.remainingDistance > 0) {



            let newX = this.bullet.x + (MOVE_X_MAP.get(this.bullet.dir) * SCALE * BULLET_SPEED);
            let newY = this.bullet.y + (MOVE_Y_MAP.get(this.bullet.dir) * SCALE * BULLET_SPEED);

            let playerShot = willCollidePlayer(newX, newY, this.bullet.hitbox, otherPlayer);

            if (playerShot) {
                this.bullet.remainingDistance = 0;
                this.rotateLeft();
                inputActive = false;
                playerShot.shotMoveAnimation = SHOT_DISTANCE;
                playerShot.shotRotateAnimation = SHOT_ROTATION_COUNT;

                //newDirAngle = Math.min(Math.floor((Math.abs(DEGREE_MAP.get(this.dir) - DEGREE_MAP.get(playerShot.dir)) / 2)) + Math.min(DEGREE_MAP.get(this.dir), DEGREE_MAP.get(playerShot.dir)))
                // FINISH ANGLE!
                //playerShot.dir = Math.floor((Math.abs(DEGREE_MAP.get(this.dir) - DEGREE_MAP.get(playerShot.dir))/2) + )
                // ANGLE ON BACKBURNER

            } else if (willCollideObstacle(newX, newY, this.bullet.hitbox)) {
                this.bullet.remainingDistance = 0;
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





    moveForward(otherPlayer) {

        let newX = this.x + (MOVE_X_MAP.get(this.dir) * SCALE * PLAYER_SPEED);
        let newY = this.y + (MOVE_Y_MAP.get(this.dir) * SCALE * PLAYER_SPEED);
        if (this.willCollideObstacle(newX, newY, this.hitbox) || this.willCollidePlayer(newX, newY, this.hitbox, this, otherPlayer)) {
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


class CombatGame extends netplayjs.Game {
    // NetplayJS games use a fixed timestep.
    static timestep = 1000 / 60;

    // NetplayJS games use a fixed canvas size.
    static canvasSize = { width: 1600, height: 1200 };

    // Initialize the game state.
    constructor(canvas, players) {
        super();
        this.players = [new Player(10, 61, "#b0e070", E, 'w', 'd', 'a', 'c'), new Player(141, 60, "#d0d040", W, 'p', "'", 'l', ',')];
    }

    // Tick the game state forward given the inputs for each player.
    tick(playerInputs) {
        // right now doesnt matter what player presses what key but will need to fix eventually
        for (const [player, input] of playerInputs.entries()) {
            if (input.keysHeld.w) {
                this.players[0].moveForward(this.players[1]);
            }
            if (input.keysHeld.d) {
                this.players[0].rotateRight();
            }
            if (input.keysHeld.a) {
                this.players[0].rotateLeft();
            }
            if (input.keysHeld.i) {
                this.players[1].moveForward(this.players[0]);
            }
            if (input.keysHeld.l) {
                this.players[1].rotateRight();
            }
            if (input.keysHeld.j) {
                this.players[1].rotateLeft();
            }
        }
    }

    // Draw the current state of the game to a canvas.
    draw(canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        this.drawObstacles(canvas.getContext('2d'));

        this.players[0].drawPlayer(canvas.getContext('2d'), this.players[1]);
        this.players[1].drawPlayer(canvas.getContext('2d'), this.players[0]);
    }

    // Serialize the state of a game to JSON-compatible value.
    serialize() {
        const myObj = { p1x: this.players[0].x, p2x: this.players[1].x, p1y: this.players[0].y, p2y: this.players[1].y, p1d: this.players[0].dir, p2d: this.players[1].dir };
        return JSON.stringify(myObj);
    }

    // Load the state of a game from a serialized JSON value.
    deserialize(value) {
        const obhdf = JSON.parse(value);
        this.players[0].x = obhdf.p1x;
        this.players[0].y = obhdf.p1y;
        this.players[0].dir = obhdf.p1d;
        this.players[1].x = obhdf.p2x;
        this.players[1].y = obhdf.p2y;
        this.players[1].dir = obhdf.p2d;


    }

    drawObstacles(ctx) {
        ctx.fillStyle = OBSTACLE_COLOR;

        for (const [x, y, w, h] of OBSTACLES) {

            ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
        }
    }



}


new netplayjs.LockstepWrapper(CombatGame).start();