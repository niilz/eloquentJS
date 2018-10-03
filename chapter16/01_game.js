// ###### LEVEL #######
class Level {
    constructor(plan) {
        // cut away white-space, seperate level-string at each line-break
        let rows = plan.trim().split("\n").map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];

        this.rows = rows.map((row, y) => { // go through every row (its idx = y)
            return row.map((ch, x) => { // go through each char (its idx = x)
                let type = levelChars[ch]; // get type from levelChar-object
                if (typeof type == "string") return type; // if str return it
                this.startActors.push( // else add a position (x and y coordinate) and the char to the Actor-Array
                    type.create(new Vec(x, y), ch)); // create is a static-method on the Actor-classes
                return "empty"; // or return empty
            })
        })
    }
}
// handling Motion (touches is used by "State")
Level.prototype.touches = function(pos, size, type) {
    var xStart = Math.floor(pos.x);
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);

    for (var y = yStart; y < yEnd; y++) {
        for (var x = xStart; x < xEnd; x++) {
            let isOutside = x < 0 || x >= this.width ||
                            y < 0 || y >= this.height;
            let here = isOutside ? "wall" : this.rows[y][x];
            if (here == type) return true;
        }
    }
    return false;
};

// ##### STATE ######
// manage STATE because things can become "empty" (e.g. coins dissapear)
class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }
    // remember: static methods can only be called by the class, not by the instance
    static start(level) {
        return new State(level, level.startActors, "playing");
    }

    get player() {
        return this.actors.find(a => a.type == "player");
    }
 }
 State.prototype.update = function(time, keys) {
    let actors = this.actors
        .map(actor => actor.update(time, this, keys)); // defined on the actors
    let newState = new State(this.level, actors, this.status);
    // reload newState if not-playing;
    if (newState.status != "playing") {
        return newState;
    }

    let player = newState.player;
    // if player touches lava -> game is lost
    if (this.level.touches(player.pos, player.size, "lava")) {
        return new State(this.level, actors, "lost");
    }

    for (let actor of actors) {
        // find the other actors (not player) that are overlapping
        // with the actor and return their state
        if (actor != player && overlap(actor, player)) {
            newState = actor.collide(newState);
        }
    }
    return newState
 };

 // overlap function to check if two actors overlap
 // eachother (used by "State.prototype.update" above)
 function overlap(actor1, actor2) {
     return actor1.pos.x + actor1.size.x > actor2.pos.x &&
            actor1.pos.x < actor2.pos.x + actor2.size.x &&
            actor1.pos.y + actor1.size.y > actor2.pos.y &&
            actor1.pos.y < actor2.pos.y + actor2.size.y;
 }

// class which sets the coordinates for an Actor
class Vec {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    // this (i guess) is used if an Actor stands on something/other
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    // calucaltes the actors position after a certain amount of time-factor
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
}

// ###### PLAYERS #######
// players have own classes, because behaviour is very different
class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() {
        return "player";
    }

    static create(pos) {
        // change this "-0.5" to "0" later to see whats the result (player should be hovering then)
        return new Player(pos.plus(new Vec(0, -0.5)),
                            new Vec(0, 0));
    }
}
Player.prototype.size = new Vec(0.8, 1.5);

// handeling Player movements
const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
        pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
        pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    } else {
        ySpeed = 0;
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
};

// ##### LAVA #####
class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() {
        return "lava";
    }

    static create(pos, ch) {
        // depending on the chars in the level-string
        // create different types of Lava (dripping, bouncing, static)
        // Vec stores speed and reset
        if (ch == "=") {
            return new Lava(pos, new Vec(2, 0));
        } else if (ch == "|") {
            return new Lava(pos, new Vec(0, 2));
        } else if (ch = "v") {
            return new Lava(pos, new Vec(0, 3));
        }
    }
}
Lava.prototype.size = new Vec(1, 1);
// if player touches Lava -> game is lost
Lava.prototype.collide = function(state) {
    return new State(state.level, state.actors, "lost");
};
// update for Lava (moving on, returning, or dripping again)
Lava.prototype.update = function (time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
        // now wall? -> keep going
        return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
        // wall but is dripping-Lava? -> get new dripple
        return new Lava(this.reset, this.speed, this.reset);
    } else {
        // wall but bouncing-Lava? -> move in oposite direction (*-1)
        return new Lava(this.pos, this.speed.times(-1));
    }
};

// ##### COINS #####
class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }

    get type() {
        return "coin";
    }

    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos,
                        Math.random() * Math.PI * 2);
                        // give the coin a random starting point on the wave for the wobble
    }
}
Coin.prototype.size = new Vec(0.6, 0.6);
// all coins are gone? -> game is won
Coin.prototype.collide = function(state) {
    let filtered = state.actors.filter(a => a != this);
    let status = state.status;
    if (!filtered.some(a => a.type == "coin")) status = "won";
    return new State(state.level, filtered, status);
};
// create the update for the wobble (collisions with the grid are ignored)
const wobbleSpeed = 8, wobbleDist = 0.07;
Coin.prototype.update = function(time) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
                    this.basePos, wobble);
};

// #### LEVEL-CHAR-OBJECT ####
const levelChars = {
    ".": "empty",
    "#": "wall",
    "+": "lava",
    "@": Player,
    "o": Coin,
    "=": Lava,
    "|": Lava,
    "v": Lava
};


// #############################
// ####### DRAWING DOM #########
// #############################

// helper function for setting up elements
function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

class DOMDisplay {
    constructor(parent, level) {
        // level grid doesn't change -> only drawn once
        this.dom = elt("div", {class: "game"}, drawGrid(level)); 
        // actor are redrawn every display-update
        // (actorLayer keeps track of element that holds actors)
        this.actorLayer = null; 
        parent.appendChild(this.dom);
    }
    clear() {
        this.dom.remove();
    }
}
// with "syncState", instead of reorganizing all actors,
// all actors are deleted and redrawn
DOMDisplay.prototype.syncState = function(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
};
// add scrolling, so that the player is somewhere around the center
DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    // the viewport
    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5))
                            .times(scale);

    if (center.x < left + margin) {
        this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
        this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
        this.dom.scrollTop = center.y - margin;
    } else if ( center.y > bottom - margin) {
        this.dom.scrollTop = center.y + margin - height;
    }
};

// units are scaled by pixels. Her is the constant:
const scale = 20;

function drawGrid(level) {
    return elt("table", {
        class: "background",
        style: `width: ${level.width * scale}px`
        // "...level" spreads the childNodes into an array
    }, ...level.rows.map(row => 
        elt("tr", {style: `height: ${scale}px`},
            ...row.map(type => elt("td", {class: type})))
    ));
}

function drawActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", {class: `actor ${actor.type}`});
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;
        return rect;
    }));
}


// ###### animationFrame - Wrapper #######
function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        if (lastTime != null) {
            // max frame-step set to 100ms
            let timeStep = Math.min(time - lastTime, 100) / 1000; // convert to seconds
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

// ########################
// ##### run the game #####
// ########################
function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let running = "yes";

    return new Promise(resolve => {
        function escHandler(event) {
            if (event.key != "Escape") return;
            event.preventDefault();
            if (running == "no") {
                running = "yes";
                runAnimation(frame);
            } else if (running == "yes") {
                running = "pausing";
            } else {
                running = "yes";
            }
        }
        window.addEventListener("keydown", escHandler);
        let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

        // "frame is defined again and i don't know how that works, but it does"
        function frame(time) {
            if (running == "pausing") {
                running = "no";
                return false;
            }

            state = state.update(time, arrowKeys);
            display.syncState(state);
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                window.removeEventListener("keydown", escHandler);
                arrowKeys.unregister();
                resolve(state.status);
                return false;
            }
        }
        runAnimation(frame);
    });
}

// ##### tracking keys #######
function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    down.unregister = () => {
        window.removeEventListener("keydown", track);
        window.removeEventListener("keyup", track);
    };
    return down;
}

// serve the next level if won or the same if lost
async function runGame(plans, Display) {
    let lives = 3;
    for (let level = 0; level < plans.length && lives > 0;) {
        console.log(`You have ${lives} left`);
        let status = await runLevel(new Level(plans[level]),
                                    Display);
        if (status == "won") level++;
        else lives--;
        if (lives > 0) {
            console.log("You've won!");
        } else {
            console.log("GAME_OVER!");
        }
    }
    console.log("You've won!");
}
