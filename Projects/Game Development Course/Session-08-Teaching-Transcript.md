# Session 8 — The Game Loop — Bringing the Screen to Life
### Teaching Transcript · Week 4 · 60 minutes · Beginner (age 15)

**Session goal:** by the end, the student understands what a "frame" is, can explain why `requestAnimationFrame` is used instead of just running code once, and has built — from scratch, live — a working `update()` / `draw()` game loop where a square moves across the screen and wraps around. This is the biggest payoff session of Month 1: everything so far (variables, functions, if/else, loops, arrays) gets used today, and it ends with something that actually *moves on its own*.

**Before you start:** have Sessions 5–7 open nearby. You'll casually reference functions (Session 5), if/else (Session 6), and the idea of "update the world, then draw it" ties directly into loops (Session 7). This session is the glue that connects all three.

---

## 0:00 – 0:05 | Welcome back & the big promise

**SAY:**
"Everything we've learned so far — variables, functions, if statements, loops — has produced things that happen once, or things that happen when you click a button. Today, for the first time, we're going to make something move by itself, continuously, without you touching anything. This is the single most important idea in this entire course. Once you understand today's session, you understand the engine that runs literally every video game ever made. It's simpler than you'd think: it's really just one idea, repeated very fast."

**ASK:** "When you watch a cartoon, is anything actually moving on the screen, or are you looking at a lot of still pictures shown very quickly?" Let them arrive at "still pictures, shown fast" themselves if possible — that's exactly today's lesson.

---

## 0:05 – 0:12 | What is a "frame"?

**SAY:**
"A frame is one single still picture. A flip-book is a perfect way to think about this: each page is a tiny bit different from the last, and when you fan through them fast, your brain sees smooth motion. Games do the exact same thing, just electronically. Your screen usually redraws itself 60 times every single second — we call that '60 FPS,' frames per second. A smooth game tries to draw a fresh frame every one of those 60 times."

**KEY IDEA — say this slowly, it's the whole session in one sentence:**
"Nothing on a screen ever actually 'moves.' We just erase the picture and redraw it a few pixels over, sixty times a second. Movement is an illusion made of many still frames. That's it. That's the secret."

**ASK:** "So if I want a ball to move from the left side of the screen to the right side, what do I actually need to do, frame by frame?" Guide them to: "draw it slightly further right, over and over."

---

## 0:12 – 0:20 | requestAnimationFrame — the right way to loop

**SAY:**
"So we need something that runs our code once per frame, automatically, forever. The browser gives us a built-in tool for exactly this job: `requestAnimationFrame`. You hand it a function. The browser calls that function right before the next screen refresh. And if that function asks for the next frame too, before it finishes, you get a loop that runs forever."

**TYPE:**
```js
function loop() {
  // ...do one frame of work here...

  requestAnimationFrame(loop);  // ask the browser for the next frame
}

requestAnimationFrame(loop);    // kick it off once to start
```

**SAY:** "Read that last line inside the function out loud with me: 'request animation frame, loop.' It's the function asking the browser, 'call me again right before the next frame.' That one line is what keeps it going forever — remove it, and the loop runs exactly once and stops."

**ASK (check understanding):** "What do you think happens if I forget to write `requestAnimationFrame(loop)` inside the function itself?" (Answer: the loop only runs once — no automatic repeat.)

**SAY, briefly, if they've heard of `setInterval`:** "You might have heard of `setInterval` for repeating things. `requestAnimationFrame` is the better tool specifically for games and animation — it lines up perfectly with your screen's own refresh rate for smoother motion, and it automatically pauses itself when the browser tab isn't visible, which saves battery. Always reach for `requestAnimationFrame` for a game loop."

---

## 0:20 – 0:28 | The update / draw pattern

**SAY:**
"Professional game code always splits each frame into exactly two jobs, and keeps them in two separate functions. This is a habit I want you to build right now, at the very start, because it will save you so much pain later."

**TYPE:**
```js
function update() {
  // change the world: move things, check the rules
  // NO drawing happens in here
}

function draw() {
  // paint the current state of the world onto the canvas
  // NO logic or decisions happen in here
}

function loop() {
  update();   // 1. think
  draw();     // 2. paint
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
```

**SAY, using a very concrete analogy:** "Think of `update()` as the referee deciding what happens next, and `draw()` as the camera operator filming what's currently true. The referee never paints anything, and the camera never changes the score. Keeping those two jobs completely separate is why professional game code stays readable even when a game gets huge and complicated."

---

## 0:28 – 0:35 | Clearing the canvas

**SAY:**
"There's one step almost everyone forgets on their first try, so I'm warning you now on purpose: at the very start of `draw()`, you must erase the previous frame before painting the new one."

**TYPE:**
```js
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // wipe first!
  // ...now draw everything fresh...
}
```

**WARN CLEARLY (this is the #1 beginner bug in this entire course, say the word "smear" out loud):**
"If you skip `clearRect`, every single position your object has ever visited stays painted on the canvas — you get a long smear trail instead of a moving object. If you ever see that happen to you later in this course, the very first thing to check is: did I forget `clearRect` at the top of `draw()`?"

**ASK:** "Why do you think we clear the canvas INSIDE `draw()`, and not inside `update()`?" (Because clearing is part of painting the picture, not part of deciding what happens — it belongs with the camera operator, not the referee.)

---

## 0:35 – 0:50 | Hands-on build: your first real game loop

**SAY:** "Now we build the whole thing, live, from an empty file. This exact skeleton — `update()`, `draw()`, `loop()` — is what every single game for the rest of this course is built on top of. Type it with me."

**Live-code together, line by line, narrating each piece:**

```html
<canvas id="game" width="360" height="200"></canvas>
<script>
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // ---- the world (its current state) ----
  let player = { x: 0, y: 80, size: 40, speed: 3 };

  // ---- STEP 1: update the world ----
  function update() {
    player.x += player.speed;             // move right
    if (player.x > W) {                   // gone off the right edge?
      player.x = -player.size;            // wrap back to the left
    }
  }

  // ---- STEP 2: draw the world ----
  function draw() {
    ctx.clearRect(0, 0, W, H);            // wipe the old frame
    ctx.fillStyle = "#34d399";
    ctx.fillRect(player.x, player.y, player.size, player.size);
  }

  // ---- the loop: update, draw, repeat forever ----
  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
</script>
```

**Narrate as you go:**
- "`player` is one object holding everything about it: position, size, and speed — all bundled together, just like the star objects last session."
- "`update()` does exactly two things: move `player.x` by its speed, and check with an `if` — the tool from Session 6 — whether it's gone off the right edge. If so, teleport it back to just off the left edge, so it wraps around forever."
- "`draw()` wipes the canvas clean, then paints the square at its current position. It doesn't know or care WHY the square is where it is — that's `update()`'s job. It just paints what's currently true."
- "And `loop()` ties it together: think, then paint, then ask for the next frame. Forever."

**Press Run. Let the square glide across and wrap around. Pause here and just let it sink in — this is the moment.**

**SAY:** "Everything from here to the end of the course is a richer version of exactly this pattern. A ball that bounces, a player you control with the keyboard, bricks that break — it is always `update()`, then `draw()`, then ask for the next frame."

**HANDS-ON CHALLENGE (student drives, you coach, ~8 min):**
1. Change `player.speed` to `6`, then to `1`. Watch it speed up and slow down, frame by frame.
2. Make it move diagonally: add `player.y += 1;` inside `update()`, and add a similar wrap check for the vertical edge.
3. If time allows: add a second shape (a circle, using `ctx.arc`) with its own position and speed, updated and drawn alongside the square in the same `update()` / `draw()` functions.

---

## 0:50 – 0:57 | Quick-fire understanding check

Ask these out loud, one at a time, and have the student answer in their own words before you confirm:

1. "What's a frame?" — one still picture; 60 of them a second looks like smooth motion.
2. "What does `requestAnimationFrame` actually do?" — asks the browser to run our function again right before the next screen refresh, which is how the loop keeps going forever.
3. "What goes in `update()`, and what's NOT allowed in there?" — moving/deciding logic; no drawing.
4. "What's the very first line that should run inside `draw()`, and why?" — `clearRect`, so the old frame doesn't smear into the new one.

---

## 0:57 – 1:00 | Recap & Month 1 complete 🎉

**SAY, with real enthusiasm — this is worth celebrating:**
"That's it — that's the engine. A game loop runs about 60 times a second, calling `update()` to move and decide, then `draw()` to paint, driven by `requestAnimationFrame`, always clearing the canvas first. And with that, Month 1 is actually done. Look at what you now have: your tools set up, HTML and CSS for structure and style, JavaScript fundamentals — variables, functions, if/else, loops, arrays — and now a real, working animation engine you built yourself, from scratch."

**SAY:** "Month 2 starts next session, and it's where this stops being a demo and starts being games. We take this exact skeleton and turn it into player-controlled movement, keyboard and mouse input, collisions, and then the real thing: Pong."

**Homework / practice before next session (leave this with them):**
1. Get the diagonal-bounce version working if it wasn't finished in class.
2. Try changing `player.size` and watch how the wrap-around point changes — why does it need to depend on `player.size` at all? (Because the square needs to be fully off-screen before it reappears, or you'll see it clip at the edge.)
3. For fun: change `ctx.fillRect` to `ctx.arc` (a circle) and get it moving in the loop.

---

### Teaching notes for you
- This is the conceptual peak of Month 1 — resist the urge to rush the "frame = still picture, illusion of motion" explanation. If that doesn't land, nothing after it will make sense either.
- If the square doesn't appear at all, the most common cause is a typo in `getContext("2d")` or forgetting to call `requestAnimationFrame(loop)` a second time (once inside `loop`, once to kick it off outside).
- If the square leaves a trail/smear, that's your cue to walk them straight back to the `clearRect` warning — it's a perfect real-time demonstration of the exact bug you warned them about.
- Keep this session's pace slightly slower than usual on the update/draw split — it's a habit, not just a fact, and habits need repetition to stick.
