// ===============================================================
//  SALVAGE RUN — Station Kepler
//  Reference solution · Game Dev Pro · Sessions 1–12
//  Written using ONLY what the student has been taught.
// ===============================================================

console.log("Salvage Run booting…");

// ---------------------------------------------------------------
//  1. THE CANVAS
// ---------------------------------------------------------------
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// ---------------------------------------------------------------
//  2. SETTINGS — every tunable number lives here and NOWHERE else
// ---------------------------------------------------------------
const FPS = 60;                 // frames per second (what rAF gives us)
const ROUND_SECONDS = 60;       // length of one run

const TUG_W = 46;
const TUG_H = 26;
const TUG_SPEED = 5;

const POD_SIZE = 18;
const PODS_PER_WAVE = 8;
const POD_SAFE_GAP = 90;        // pods must spawn this far from the core
const HUD_H = 40;               // keep pods from spawning under the HUD text

const START_ROCKS = 3;
const ROCK_MIN_R = 12;
const ROCK_MAX_R = 26;
const ROCK_MIN_SPEED = 0.8;     // never zero — a still rock looks broken
const ROCK_MAX_SPEED = 2.5;
const UNSTABLE_EVERY = 5;       // seconds between one rock going unstable

const CORE_R = 44;
const START_SHIELD = 10;
const DAMAGE_NORMAL = 1;
const DAMAGE_UNSTABLE = 3;

const SCORE_POD = 10;
const SCORE_WAVE = 50;
const SCORE_VAPORISE = 25;
const SCORE_MISCLICK = 5;       // subtracted for clicking a stable rock

// colours
const COL_TUG = "#34d399";
const COL_POD = "#6c8cff";
const COL_ROCK = "#a3aad6";
const COL_UNSTABLE = "#fbbf24";
const COL_CORE = "#9a6bff";
const COL_TEXT = "#e9ecff";
const COL_BAD = "#fb7185";

// ---------------------------------------------------------------
//  3. STATE — the things that change while the game runs
// ---------------------------------------------------------------
let score = 0;
let wave = 1;
let frames = 0;                 // counts only UNPAUSED frames
let paused = false;
let gameOver = false;
let endReason = "";
let flash = 0;                  // counts down after damage, for the red flash

let pods = [];
let rocks = [];

const tug = { x: 60, y: H - 80, w: TUG_W, h: TUG_H, speed: TUG_SPEED };
const core = { x: W / 2, y: H / 2, r: CORE_R, shield: START_SHIELD };
const keys = {};                // which keys are held down right now

// ---------------------------------------------------------------
//  4. LITTLE HELPERS (the four that return a value)
// ---------------------------------------------------------------

// A random decimal between min and max.
function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

// Straight-line distance between two points (Pythagoras).
function distance(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

// Do two rectangles overlap? (AABB — four comparisons.)
function rectsOverlap(a, b) {
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

// Do two circles overlap? (Centres closer than the two radii added up.)
function circlesOverlap(a, b) {
  return distance(a.x, a.y, b.x, b.y) < a.r + b.r;
}

// How many whole seconds are left in the round.
function timeLeft() {
  return Math.max(0, ROUND_SECONDS - Math.floor(frames / FPS));
}

// ---------------------------------------------------------------
//  5. DRAWING HELPERS
// ---------------------------------------------------------------
function drawRect(r, colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(r.x, r.y, r.w, r.h);
}

function drawCircle(c, colour) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
  ctx.fill();
}

// ---------------------------------------------------------------
//  6. MAKING THINGS
// ---------------------------------------------------------------

// A speed that is never zero: pick a size, then pick a direction.
function randomSpeed() {
  const size = randomBetween(ROCK_MIN_SPEED, ROCK_MAX_SPEED);
  if (Math.random() < 0.5) {
    return -size;
  }
  return size;
}

// Returns a brand-new rock, sitting on a random edge, drifting inwards.
function makeRock() {
  const r = randomBetween(ROCK_MIN_R, ROCK_MAX_R);
  const rock = { x: 0, y: 0, r: r, vx: randomSpeed(), vy: randomSpeed(), unstable: false };
  const edge = Math.floor(randomBetween(0, 4));   // 0 top, 1 right, 2 bottom, 3 left

  if (edge === 0) {
    rock.x = randomBetween(r, W - r);
    rock.y = r;
    rock.vy = Math.abs(rock.vy);            // must head DOWN, into the sector
  } else if (edge === 1) {
    rock.x = W - r;
    rock.y = randomBetween(r, H - r);
    rock.vx = -Math.abs(rock.vx);           // must head LEFT
  } else if (edge === 2) {
    rock.x = randomBetween(r, W - r);
    rock.y = H - r;
    rock.vy = -Math.abs(rock.vy);           // must head UP
  } else {
    rock.x = r;
    rock.y = randomBetween(r, H - r);
    rock.vx = Math.abs(rock.vx);            // must head RIGHT
  }
  return rock;
}

// Returns one pod in a legal spot: on screen, below the HUD, away from the core.
function makePod() {
  let pod = null;
  let safe = false;
  while (safe === false) {
    pod = {
      x: randomBetween(0, W - POD_SIZE),
      y: randomBetween(HUD_H, H - POD_SIZE),
      w: POD_SIZE,
      h: POD_SIZE
    };
    const gap = distance(pod.x + POD_SIZE / 2, pod.y + POD_SIZE / 2, core.x, core.y);
    if (gap > POD_SAFE_GAP) {
      safe = true;
    }
  }
  return pod;
}

// Fills the pods array with a fresh wave.
function spawnWave() {
  pods = [];
  for (let i = 0; i < PODS_PER_WAVE; i++) {
    pods.push(makePod());
  }
  console.log("Wave " + wave + " — pods: " + pods.length);
}

// Puts every single thing back to its starting value.
function resetGame() {
  score = 0;
  wave = 1;
  frames = 0;
  flash = 0;
  paused = false;
  gameOver = false;
  endReason = "";
  core.shield = START_SHIELD;
  tug.x = 60;
  tug.y = H - 80;
  rocks = [];
  for (let i = 0; i < START_ROCKS; i++) {
    rocks.push(makeRock());
  }
  spawnWave();
}

// ---------------------------------------------------------------
//  7. INPUT
// ---------------------------------------------------------------
document.addEventListener("keydown", function (e) {
  keys[e.key] = true;

  // stop the arrow keys scrolling the page
  if (e.key === "ArrowUp" || e.key === "ArrowDown" ||
      e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
  }

  // e.repeat is true when the key is auto-repeating from being held.
  // Without this check, holding P flickers the pause on and off.
  if (e.repeat === false) {
    if (e.key === "p" || e.key === "P") {
      paused = !paused;
    }
    if (e.key === "r" || e.key === "R") {
      resetGame();
    }
  }
});

document.addEventListener("keyup", function (e) {
  keys[e.key] = false;
});

// If the window loses focus, forget every held key (Session 10's stuck-key fix).
window.addEventListener("blur", function () {
  for (const k in keys) {
    keys[k] = false;
  }
});

// Convert a mouse event into CANVAS coordinates. The whole point of Session 11.
function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

canvas.addEventListener("click", function (event) {
  if (paused === true || gameOver === true) {
    return;
  }
  const pos = getMousePos(event);

  // Backwards, so we test the rock drawn on TOP first.
  for (let i = rocks.length - 1; i >= 0; i--) {
    const rock = rocks[i];
    if (distance(pos.x, pos.y, rock.x, rock.y) < rock.r) {
      if (rock.unstable === true) {
        score += SCORE_VAPORISE;
        rocks.splice(i, 1);
        rocks.push(makeRock());
      } else {
        score = Math.max(0, score - SCORE_MISCLICK);
      }
      return;                 // one click affects at most ONE rock
    }
  }
});

// ---------------------------------------------------------------
//  8. UPDATE — the rules of the world, one frame at a time
// ---------------------------------------------------------------
function moveTug() {
  if (keys["ArrowLeft"])  { tug.x -= tug.speed; }
  if (keys["ArrowRight"]) { tug.x += tug.speed; }
  if (keys["ArrowUp"])    { tug.y -= tug.speed; }
  if (keys["ArrowDown"])  { tug.y += tug.speed; }

  // clamp: x is the LEFT corner, so the limit is the width minus our own width
  tug.x = Math.max(0, Math.min(W - tug.w, tug.x));
  tug.y = Math.max(0, Math.min(H - tug.h, tug.y));
}

function moveRocks() {
  for (let i = 0; i < rocks.length; i++) {
    const rock = rocks[i];
    rock.x += rock.vx;
    rock.y += rock.vy;

    // A circle's edge is x - r and x + r, NOT x.
    // Fix the position first, then flip the velocity — otherwise it sticks.
    if (rock.x - rock.r < 0) { rock.x = rock.r;     rock.vx = -rock.vx; }
    if (rock.x + rock.r > W) { rock.x = W - rock.r; rock.vx = -rock.vx; }
    if (rock.y - rock.r < 0) { rock.y = rock.r;     rock.vy = -rock.vy; }
    if (rock.y + rock.r > H) { rock.y = H - rock.r; rock.vy = -rock.vy; }
  }
}

function checkPodPickups() {
  // BACKWARDS, because we remove items as we go.
  for (let i = pods.length - 1; i >= 0; i--) {
    if (rectsOverlap(tug, pods[i])) {
      score += SCORE_POD;
      pods.splice(i, 1);
    }
  }
  if (pods.length === 0) {          // wave cleared
    score += SCORE_WAVE;
    wave++;
    spawnWave();
    rocks.push(makeRock());         // the difficulty ramp
  }
}

function checkCoreHits() {
  for (let i = rocks.length - 1; i >= 0; i--) {
    const rock = rocks[i];
    if (circlesOverlap(rock, core)) {
      if (rock.unstable === true) {
        core.shield -= DAMAGE_UNSTABLE;
      } else {
        core.shield -= DAMAGE_NORMAL;
      }
      flash = 12;                   // 12 frames of red = about a fifth of a second
      rocks.splice(i, 1);           // remove it, or it damages us every frame
      rocks.push(makeRock());       // and send a replacement in from an edge
    }
  }
}

function maybeDestabilise() {
  if (frames % (UNSTABLE_EVERY * FPS) !== 0) { return; }   // not time yet
  if (rocks.length === 0) { return; }
  const i = Math.floor(randomBetween(0, rocks.length));
  rocks[i].unstable = true;
}

function checkEndConditions() {
  if (core.shield <= 0) {
    core.shield = 0;
    gameOver = true;
    endReason = "SHIELD DOWN";
  } else if (timeLeft() <= 0) {
    gameOver = true;
    endReason = "TIME UP";
  }
}

function update() {
  if (paused === true || gameOver === true) { return; }   // the guard
  frames++;
  if (flash > 0) { flash--; }
  moveTug();
  moveRocks();
  checkPodPickups();
  checkCoreHits();
  maybeDestabilise();
  checkEndConditions();
}

// ---------------------------------------------------------------
//  9. DRAW — paint the world, change nothing
// ---------------------------------------------------------------
function drawCore() {
  // faint danger ring
  ctx.strokeStyle = COL_CORE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(core.x, core.y, core.r + 10, 0, Math.PI * 2);
  ctx.stroke();

  if (flash > 0) {
    drawCircle(core, COL_BAD);
  } else {
    drawCircle(core, COL_CORE);
  }

  ctx.fillStyle = COL_TEXT;
  ctx.font = "20px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(core.shield, core.x, core.y + 7);
  ctx.textAlign = "left";
}

function drawHud() {
  const line = "Score: " + score +
               "    Wave: " + wave +
               "    Pods: " + pods.length +
               "    Shield: " + core.shield +
               "    Time: " + timeLeft();
  if (core.shield <= 3) {
    ctx.fillStyle = COL_BAD;
  } else {
    ctx.fillStyle = COL_TEXT;
  }
  ctx.font = "17px system-ui";
  ctx.fillText(line, 14, 28);
}

function drawBanner(big, small) {
  ctx.fillStyle = "rgba(5, 7, 20, 0.72)";
  ctx.fillRect(0, H / 2 - 60, W, 120);
  ctx.textAlign = "center";
  ctx.fillStyle = COL_TEXT;
  ctx.font = "34px system-ui";
  ctx.fillText(big, W / 2, H / 2 - 6);
  ctx.font = "16px system-ui";
  ctx.fillStyle = COL_ROCK;
  ctx.fillText(small, W / 2, H / 2 + 28);
  ctx.textAlign = "left";
}

function draw() {
  ctx.clearRect(0, 0, W, H);          // ALWAYS first

  drawCore();

  for (let i = 0; i < pods.length; i++) {
    drawRect(pods[i], COL_POD);
  }
  for (let i = 0; i < rocks.length; i++) {
    if (rocks[i].unstable === true) {
      drawCircle(rocks[i], COL_UNSTABLE);
    } else {
      drawCircle(rocks[i], COL_ROCK);
    }
  }

  drawRect(tug, COL_TUG);
  drawHud();

  if (paused === true) {
    drawBanner("PAUSED", "Press P to carry on");
  }
  if (gameOver === true) {
    drawBanner(endReason, "Final score " + score + " — press R to fly again");
  }
}

// ---------------------------------------------------------------
//  10. THE LOOP
// ---------------------------------------------------------------
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

resetGame();
requestAnimationFrame(loop);
