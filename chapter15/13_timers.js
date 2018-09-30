// set a timer that waits 500ms
let bombTimer = setTimeout(() => {
    console.log("BOOM!");
}, 500);

// unless random produces lower than 0.5 (50% chance)
if (Math.random() < 0.5) {
    // in this case reset the timer
    console.log("Defused.");
    clearTimeout(bombTimer);
}

// setIntervall repeats calls with given ms
let ticks = 0;
let clock = setInterval(() => {
    console.log("tick", ticks++);
    if (ticks == 10) {
        clearInterval(clock);
        console.log("stop.");
    }
}, 200);
clock;

