# Sessions 1–10 — Roundup & Consolidation

### Teaching Transcript · Revision Session · 60 minutes · Beginner (age 15)

> ### ⚠️ Read this before the lesson — this is not a normal session
>
> This hour teaches **nothing new**. Every single thing in it has already been taught. That changes how you run it: your job today is not to explain, it is to make the student **retrieve**. Every time you are about to say an answer, stop and ask for it instead. The learning happens in the pause while they dig for it, not in your explanation.
>
> **Where this fits:** run it at the end of Week 5, after Session 10 and before Session 11 (mouse input) — or as a catch-up hour for a student returning after a break. It is also the natural rehearsal before Project Challenge 1, which spans Sessions 1–12.
>
> **The one rule for the hour:** the student's hands stay on the keyboard from 0:34 onwards, and they build from memory, not from a copy. If they open an old file and paste, the session has failed even if the code runs.

**Session goal:** by the end, the student can describe the whole first half of the course as one connected story — page, style, language, loop, motion, control — and has rebuilt, from memory in a single empty file, a program that uses something from all ten sessions at once: a steerable player and a set of bouncing balls, running in a proper game loop, with a live counter on screen.

**Before you start:** have an empty folder called `session-recap` ready in VS Code. Have the Session 8, 9 and 10 demos open in three browser tabs, but **do not show them** unless the student is genuinely stuck — they are your safety net, not your lesson. Have the whiteboard clear; you will use it three times.

---

## 0:00 – 0:04 | Opening & the one prerequisite check

**SAY, setting the tone honestly:**
"Today's different. I'm not teaching you anything new. Ten sessions in, you've got a big pile of pieces — HTML, CSS, variables, functions, if statements, arrays, loops, the game loop, velocity, the keyboard — and today we put them on one table and see that they're actually one thing, not ten. And then you're going to build something that uses all of them, from an empty file, from your head."

**SAY:** "If that sounds intimidating, here's the thing: you already know every line of it. Today is about proving that to yourself."

**ASK — the one real check, and do it before anything else:** "From memory, no notes: what are the three functions in a game loop, and what is each one's job?"

> `update()` moves things and makes decisions. `draw()` paints the picture. `loop()` calls both, then asks for the next frame.

**Follow up:** "And the first line inside `draw()`?"

> `ctx.clearRect(0, 0, W, H)` — wipe the previous frame.

> **If they can't do this, don't stop the session — change it.** Unlike a normal lesson, there's nothing here to postpone. Skip the review sections, go straight to the 0:34 build, and rebuild the loop with them line by line as the review. The build *is* the revision. A student who spends fifty minutes typing the loop from near-scratch has had a better recap hour than one who listened to a perfect summary.

---

## 0:04 – 0:12 | Part 1 — The page: Sessions 1, 2 and 3

**SAY:** "Let's go back to the very beginning. Session 1. What are the three technologies, and what does each one do?"

> HTML = structure. CSS = style. JavaScript = behaviour.

**ASK, pushing for the phrasing rather than the list:** "There was a one-line way of remembering it. Do you have it?"

> HTML is the noun, CSS is the adjective, JavaScript is the verb. "Button" / "big red button" / "when clicked, jump."

**[Switch to digital whiteboard.]** Draw three stacked layers, bottom to top, labelling as you go:

```
   JavaScript   ← behaviour: it moves, it responds, it keeps score
   CSS          ← style: colour, size, spacing, layout
   HTML         ← structure: what exists on the page
```

**SAY:** "Every game you'll ever build in this course is these three layers. Nothing has been added since Session 1. Everything since has been *depth* in one of these layers."

### The canvas (Session 2)

**ASK:** "What is the canvas, in one sentence?"

> A rectangle on the page that JavaScript is allowed to draw into.

**ASK:** "And the two lines that get you the ability to draw?"

**Let them type it before you show it:**

```js
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
```

**SAY:** "`ctx` is short for context. Think of the canvas as the paper and `ctx` as the pen. You can't draw with the paper — you draw with the pen."

**ASK — the one that catches people even now:** "Point at where `x = 0, y = 0` is on the canvas. And which way does y get bigger?"

> Top-left corner. **y grows downwards.** Down the screen is a *bigger* y.

**SAY:** "That one fact is behind a huge number of beginner bugs. Something moving 'up' has a *negative* vy. Say that out loud once."

**[On the whiteboard, sketch a rectangle with 0,0 marked at the top-left and arrows: x → right, y ↓ down.]** Leave it up — you will point at it twice more this hour.

### Two shapes and two edges

**ASK:** "`ctx.fillRect(x, y, w, h)` — which part of the rectangle is at `x, y`?"

> The **top-left corner**.

**ASK:** "And `ctx.arc(x, y, r, ...)` — which part of the circle is at `x, y`?"

> The **centre**.

**KEY IDEA — say it slowly:**
"So a rectangle's right edge is `x + width`, but a circle's right edge is `x + r`, and its *left* edge is `x - r`, not `x`. Whenever you're about to compare a shape to a wall, the first question is always: **is this shape's x its corner or its middle?**"

### CSS (Session 3)

**ASK:** "Three ways to add CSS. Which one do we use, and why?"

> Inline on the element, a `<style>` block in the head, or an external `.css` file linked in. We use the external file — the style lives in one place and every page can share it.

**ASK:** "What's the difference between margin and padding?"

> Padding is space **inside** an element, between its edge and its content. Margin is space **outside** it, pushing other things away.

**SAY, and be quick here — this is the least load-bearing part of the recap:** "CSS matters less to us than to a web designer, because our game lives inside the canvas and CSS can't reach in there. What CSS gives us is the *frame* — a centred canvas, a border, a dark background, so the thing looks deliberate instead of accidental. That's the game shell you reuse in every project, and you should be copying it forward, not retyping it."

---

## 0:12 – 0:22 | Part 2 — The language: Sessions 4, 5, 6 and 7

**SAY:** "Now the middle four sessions. These are the ones that aren't about games at all — they're about JavaScript itself. And they're the four you'll use every day for the rest of your life if you keep coding."

### Session 4 — variables and data

**ASK:** "`let` and `const` — when do you use each?"

> `let` when the value will change (a score, a position). `const` when it must not (the canvas, the context, a setting).

**SAY:** "Get in the habit of reaching for `const` first and only using `let` when you know it changes. It's a note to your future self: *this one moves, that one doesn't.*"

**ASK, the classic:** "What does `2 + 2` give you? And what does `"2" + "2"` give you?"

> `4`, and `"22"`. With numbers, `+` adds. With text, `+` joins.

**SAY:** "And that's why score display works: `"Score: " + score` glues a word to a number and gives you text you can draw."

### Session 5 — functions

**ASK:** "What is a function, in your own words?"

> A named block of code you can run whenever you want, as many times as you want.

**ASK:** "What's the difference between a **parameter** and a **return value**?"

> A parameter is what you hand *in*. A return value is what it hands *back*.

**ASK — the important one:** "What does DRY stand for, and why do we care?"

> Don't Repeat Yourself. If the same code appears three times, a change means three edits and two chances to forget one.

**SAY, connecting it forward:** "Watch for this in today's build. We'll draw five balls, and you'll notice we write the drawing code exactly once."

### Session 6 — decisions

**TYPE on the board and ask them to read each aloud:**

```js
if (score > 10)            // greater than
if (lives === 0)           // exactly equal — three equals signs
if (x < 0 || x > W)        // OR  — true if EITHER side is true
if (alive && !paused)      // AND, and NOT
```

**ASK:** "Why three equals signs and not one?"

> One `=` **assigns** a value. Three `===` **compares** them. `x = 5` puts 5 into x; `x === 5` asks a question.

**ASK:** "In `x < 0 || x > W` — why OR and not AND?"

> Because a ball is off-screen if it's off the *left* **or** off the *right*. It can never be both at once, so AND would never be true and the check would never fire.

### Session 7 — arrays and loops

**ASK:** "What index is the first item of an array?"

> Zero. And the last one is `length - 1`.

**ASK:** "What do `push` and `splice` do?"

> `push` adds to the end. `splice(index, 1)` removes one item at a position.

**TYPE the shape of a for loop and have them narrate the three parts:**

```js
for (let i = 0; i < balls.length; i++) {
  // do something with balls[i]
}
```

> Start at 0; keep going while i is less than the length; add one each time round.

**KEY IDEA — and this is the biggest idea in the first ten sessions:**
"An array plus a loop means **the amount of code you write stops depending on the number of things**. Five balls or five hundred, it's the same loop. That's why one number at the top of the file can control the whole game."

**ASK (open-ended — let them think):** "In the star-field demo there were two loops. What did each one do, and why weren't they one loop?"

> The first loop **built** the array; the second loop **drew** it. Building and drawing are separate jobs — and you build once, but you draw every frame. That separation is exactly what becomes `update()` and `draw()`.

---

## 0:22 – 0:30 | Part 3 — The engine: Sessions 8 and 9

**SAY:** "Sessions 1 to 7 gave you a still picture and a language. Session 8 is where it comes alive, and it's the single most important session in the course so far."

**ASK:** "What is a frame?"

> One complete redraw of the screen. Games do about 60 of them a second, and the illusion of motion comes from small changes between them.

**[Switch to the whiteboard.]** Draw the frame timeline:

```
 frame 1        frame 2        frame 3        frame 4
 update()       update()       update()       update()
 draw()         draw()         draw()         draw()
   |              |              |              |
   +---- 1/60 s --+---- 1/60 s --+---- 1/60 s --+ ...
```

**SAY, pointing:** "Sixty times a second: decide, then paint. Decide, then paint. Every game ever made is this picture. Fortnite is this picture."

**ASK:** "Why `requestAnimationFrame` and not something that just repeats?"

> It asks the browser to run the function right before the next screen refresh, so it's smooth and in step with the display — and it politely pauses when the tab isn't visible instead of burning the battery.

**ASK — and make them justify it:** "Why do we split `update` and `draw` at all? Why not do both in one function?"

> Because they're different jobs. `update` changes numbers; `draw` turns numbers into pixels. Keeping them apart means you can pause the game by not calling `update` while still calling `draw`, and when something's wrong you know instantly which half to look in: is it moving wrong, or is it *drawn* wrong?

**ASK:** "What happens if you forget `clearRect`?"

> Nothing is erased, so every frame paints on top of the last. You get a smear — which is occasionally a lovely effect on purpose, and always a bug by accident.

### Session 9 — motion

**ASK:** "Position and velocity — what's the difference, and what are they called in code?"

> Position is where it *is* — `x`, `y`. Velocity is how it's *moving* — `vx`, `vy`.

**TYPE:**

```js
x += vx;
y += vy;
```

**SAY:** "Two lines. That's all motion is, forever. Everything else is just choosing good numbers for vx and vy."

**ASK:** "Velocity is two things in one number. What are they?"

> **Size** is the speed. **Sign** is the direction. Negative vx goes left; negative vy goes **up**.

**ASK:** "How do you bounce?"

> `vx = -vx`. You don't move the ball — you reverse where it's *going*.

**ASK (open-ended):** "Why does a ball hitting a side wall come off at an angle instead of straight back?"

> Because only `vx` flipped. The up-or-down drift carried on untouched. And in a corner both flip on the same frame, so it retraces its path — and nobody wrote any corner code. Two simple rules produced the complicated-looking behaviour.

**SAY, planting today's honest caveat:** "One thing to hold on to: flipping the velocity fixes the *direction* but not the *position*. If a fast ball has already ended up three pixels inside the wall, it's still three pixels inside the wall — it's just heading out now. Keep an eye out for that in the build; it's why Pong will add one extra line to shove the ball back to the wall's face."

---

## 0:30 – 0:34 | Part 4 — The player: Session 10

**ASK:** "What's an event?"

> Something happening — a key going down, a mouse moving — that the browser tells your code about, because you asked to be told with `addEventListener`.

**ASK — the one that shows they understood rather than copied:** "Why don't we move the player inside the `keydown` handler?"

> Because holding a key produces the operating system's typing stutter — one, pause, then a stream — and the movement inherits it. Events say **when something changed**; the loop decides **what happens each frame**. Don't let one do the other's job.

**ASK:** "So what do the two listeners actually do?"

> Write `true` and `false` into the `keys` object. Nothing else. The notepad.

**ASK:** "And the clamp — why is the limit `W - player.size` rather than `W`?"

> Because `x` is the square's **left** corner, so it has to stop one square-width early to stay fully on screen. **[Point back at the coordinate sketch on the whiteboard.]**

**SAY:** "Good. That's ten sessions in twenty-six minutes. Now the part that actually proves it."

---

## 0:34 – 0:50 | Hands-on: build "The Recap Arcade" from an empty file

**SAY:** "Empty file. `session-recap/index.html`. No copying, no old tabs. I'll tell you *what* to build, section by section, and you write it. If you're stuck for more than about thirty seconds I'll help — but try first, because being stuck for twenty seconds and then remembering is worth ten minutes of watching me."

**What they're building, described out loud before a line is typed:**
"A green square you steer with the arrow keys, which stops at all four walls. Five yellow balls bouncing around the box on their own. And a counter in the corner showing how many seconds it's been running. Nothing collides with anything yet — that's next month."

**Build it in this order, and give the hint only after they've tried:**

**1. The shell (Sessions 1–3).** "Doctype, html, head with a style block, body, a canvas 380 by 240 with `id="game"` and `tabindex="0"`, then a script tag." *Hint if needed: `tabindex` is what lets a canvas receive key presses.*

**2. The pen and the walls (Session 2).** "Get the canvas, get the context, and store `W` and `H` from `canvas.width` and `canvas.height`."

**3. The player and the notepad (Session 10).** "A `player` object with x, y, size and speed. An empty `keys` object. Two listeners."

**4. The balls (Session 7 + 9).** "An empty `balls` array, and a for loop that pushes five ball objects into it — each with x, y, vx, vy and r. Give them different starting positions and different speeds so they don't move as one blob."

**5. One drawing function (Session 5).** "A `drawBall(b)` function. You write the arc code once."

**6. `update()` (Sessions 4, 6, 9, 10).** "Count the frame. Read the keys and move the player. Clamp it. Then loop over every ball, add velocity to position, and flip the velocity at each wall."

**7. `draw()` (Sessions 2, 4, 8).** "Clear. Draw every ball with a loop. Draw the player. Then draw the text `"Seconds: " + Math.floor(frames / 60)` in the corner."

**8. `loop()` (Session 8).** "You know this one."

**The finished program — this is the target, not a handout. Only show it if you have to:**

```html
<!DOCTYPE html>
<html>
<head><style>
  body{margin:0;background:#0d1024;display:flex;justify-content:center;padding:14px}
  canvas{background:#0b0e24;border:3px solid #6c8cff;border-radius:12px}
</style></head>
<body>
  <canvas id="game" width="380" height="240" tabindex="0"></canvas>
  <script>
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    canvas.focus();

    // ---- SESSION 4: a variable holding the state of the game ----
    let frames = 0;

    // ---- SESSION 10: the notepad of held keys ----
    let player = { x: 170, y: 100, size: 28, speed: 4 };
    const keys = {};
    canvas.addEventListener("keydown", function (e) { keys[e.key] = true;  e.preventDefault(); });
    canvas.addEventListener("keyup",   function (e) { keys[e.key] = false; });

    // ---- SESSION 7: an array built by a loop ----
    let balls = [];
    const HOW_MANY = 5;
    for (let i = 0; i < HOW_MANY; i++) {
      balls.push({
        x: 40 + i * 70,
        y: 40 + i * 30,
        vx: 2 + i * 0.4,
        vy: 1.5 + i * 0.3,
        r: 10
      });
    }

    // ---- SESSION 5: written once, used five times ----
    function drawBall(b) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // ---- SESSION 8: update() decides, draw() paints ----
    function update() {
      frames = frames + 1;

      if (keys["ArrowLeft"])  player.x -= player.speed;
      if (keys["ArrowRight"]) player.x += player.speed;
      if (keys["ArrowUp"])    player.y -= player.speed;
      if (keys["ArrowDown"])  player.y += player.speed;
      player.x = Math.max(0, Math.min(W - player.size, player.x));
      player.y = Math.max(0, Math.min(H - player.size, player.y));

      // SESSION 9 motion + SESSION 6 edge checks, for every ball at once
      for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.x - b.r < 0 || b.x + b.r > W) { b.vx = -b.vx; }
        if (b.y - b.r < 0 || b.y + b.r > H) { b.vy = -b.vy; }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "#fbbf24";
      for (let i = 0; i < balls.length; i++) {
        drawBall(balls[i]);
      }

      ctx.fillStyle = "#34d399";
      ctx.fillRect(player.x, player.y, player.size, player.size);

      ctx.fillStyle = "#ffffff";
      ctx.font = "16px system-ui";
      ctx.fillText("Seconds: " + Math.floor(frames / 60), 10, 22);
    }

    function loop() {
      update();
      draw();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  </script>
</body>
</html>
```

**When it runs, stop and make the point explicitly:**

**SAY:** "Look at what's on that screen. The page is Session 2. The frame around it is Session 3. `frames` and the text are Session 4. `drawBall` is Session 5. The wall checks are Session 6. The array and both loops are Session 7. `update`, `draw` and `loop` are Session 8. The bouncing is Session 9. The arrow keys are Session 10. Ten sessions, sixty lines, one file — and you wrote it from your head."

**ASK, and give them a moment with it:** "Which single piece, if I deleted it, would break the most other pieces?"

> The game loop. Without it nothing updates and nothing redraws — motion, keys and the counter all die at once. Everything else is a *passenger* on the loop. That's the right instinct to have about a game's architecture, and it's worth saying so.

**Two quick tuning experiments while their hands are still on it (2 min):**

1. Change `HOW_MANY` to `2`, then `40`. One number, no other edits. Ask them to say out loud *why* that works — you want the words "array" and "loop" in the answer.
2. Change `frames = frames + 1` to `frames = frames + 2`. The counter now runs at double speed. Ask what it means that "seconds" was never really seconds — it was a count of frames that we chose to *interpret* as seconds.

---

## 0:50 – 0:54 | Break it on purpose — three bugs

**SAY:** "Now we break it deliberately, one thing at a time, and you predict what will happen *before* you press Run. Predicting is the skill. Anyone can fix a bug they've seen before; you're learning to reason about code you haven't run yet."

**Break 1 — delete the `clearRect` line.**
**Predict first.** Then run. The balls smear into solid trails and the player leaves a snake behind it; the number in the corner turns into an unreadable pile of overlapping text.
**ASK:** "Why does the *text* look worse than the shapes?" (Because every frame's text is drawn a pixel-perfect on top of the last, ten different numbers deep. It's the clearest possible demonstration that nothing on a canvas ever removes itself.)

**Break 2 — change `if (b.x - b.r < 0 ...)` to `if (b.x < 0 ...)`.**
**Predict first.** Then run and watch closely. The balls now bury themselves a full radius (and a little more) into the left and right walls before turning around — each one sinks until its *centre* touches the wall, so half the ball is outside, and then pops back out.
**ASK:** "Why only the sides, and not the top and bottom?" (Because we only broke the horizontal check. The vertical one still uses `y - r`.) **Point back at the coordinate sketch.** This is the corner-versus-centre question in its natural habitat.

**Break 3 — set one ball's `vx` to `40`.**
**Predict first.** Then run and watch the right-hand wall carefully. It still bounces — it doesn't escape — but it no longer bounces *off the wall*. It punches straight through it: for one frame the ball sits about thirty pixels past the edge, almost entirely off the canvas, and then snaps back in. At that speed you'll see it as a flicker at the edge rather than a clean contact.
**SAY:** "This is that caveat from earlier, made visible. The ball moves forty pixels between the two moments we look at it, so by the time we notice it has passed the wall, it's *well* past it. Flipping `vx` fixed the direction, but nothing fixed the position — so it has to travel all the way back out from inside the wall. The repair is one extra line that puts the ball's edge exactly on the wall at the moment it bounces. That's Pong, in three sessions."
**ASK:** "So is this the game loop's fault, or the bounce check's fault?" (Neither, really — it's the consequence of only *looking* sixty times a second. Between two frames, the ball genuinely was inside the wall; we just never saw it. Real physics engines have the same problem and much fancier names for it.)

**Put all three back and confirm it runs clean.** Do not leave a broken file at the end of a lesson — students remember the last thing they saw.

---

## 0:54 – 0:57 | Quick-fire check — one from each session

Ask these fast, out loud, their words first. Ten questions, one per session. Note which ones stall; that's your reteach list.

1. What do HTML, CSS and JavaScript each do?
2. Where is `0, 0` on a canvas, and which way does y grow?
3. What's the difference between margin and padding?
4. What does `"5" + 5` give you, and why?
5. What's the difference between a parameter and a return value?
6. Why is it `===` and not `=` inside an `if`?
7. What's the index of the last item in an array of 6 things?
8. What are the three functions of a game loop?
9. What does `vy = -vy` do, and what does a negative `vy` mean on screen?
10. Why do the key listeners only write `true` and `false` instead of moving the player?

> Answers, in order: structure / style / behaviour · top-left, y grows downwards · padding is inside, margin is outside · `"55"`, because a string plus anything joins rather than adds · a parameter goes in, a return value comes back · one equals assigns, three compares · index 5, which is `length - 1` · `update` decides, `draw` paints, `loop` calls both and asks for the next frame · reverses the vertical direction, and negative vy is **upwards** · because the loop, not the keyboard, should control timing.

---

## 0:57 – 1:00 | Recap & what's next

**SAY:**
"Here's the whole first half of this course in five sentences. A page holds a **canvas**. CSS puts a **frame** around it. JavaScript gives you **variables, functions, decisions and lists**. The **game loop** runs update-then-draw sixty times a second. And **velocity** moves things while **events** let a human interfere. That's it. That's everything so far."

**SAY, and mean this one:**
"And notice you didn't learn ten separate things. You learned one thing ten times, each time a bit deeper. Everything from here is added *on top of* what's now on your screen — it never replaces it. The game loop you wrote today is the same loop that will run Pong, Snake, Breakout and your platformer. You're not going to write a different one."

**SAY:** "Next session is the mouse — same idea as the keyboard, different event, plus one new wrinkle about where the pointer actually is relative to the canvas. Then it's collisions, and then we start building real games."

**Homework / practice before next session:**

1. **Rebuild it once more, cold.** Tomorrow, not tonight. Empty file, no notes, no looking at today's. Get as far as you can, then check. The gap between what you remember tomorrow and what you remembered today is the actual measure of how well you know this.
2. **Give the balls colours.** Make a `colours` array and give each ball a colour when you build it, using `colours[i % colours.length]`. Then use it in `draw`. *(Careful: `ctx.fillStyle` is currently set once for all five balls — you'll need to move that line.)*
3. **Make the player's speed change.** Hold the spacebar to move at double speed. Remember `event.key` for the spacebar is `" "` — a single space character.
4. **Fix the fast-ball bug from Break 3.** Set a ball's `vx` to 20 and try to stop it escaping. Hint: after you flip the velocity, also *move* the ball so its edge sits exactly on the wall. One extra line inside each `if`. Bring me whatever you come up with, working or not.
5. **Write the map.** On paper, one line per session, 1 to 10: the name, and the single most useful thing in it. This takes ten minutes and it's the most valuable item on this list.

---

### Teaching notes for you

- **The temptation to lecture is enormous today, and you must resist it.** Ten sessions of material and fifty minutes will pull you toward summarising beautifully while they nod. Nodding is not remembering. Ask, wait, let it be uncomfortable for a few seconds. If you catch yourself talking for more than ninety seconds straight before 0:34, stop and ask a question instead.
- **Timing is the risk in this lesson.** The review sections are elastic and will happily eat the build. Watch the clock hard at 0:22 and 0:30 — the hands-on section starting on time matters more than finishing the review. If you're running late, cut the CSS material (Part 1's last block) entirely; it's the least structurally important thing in the first ten sessions.
- **Protect the build even at the cost of the break-it drill.** If it's 0:50 and the program still isn't running, keep building. The three deliberate bugs can move to the start of Session 11 as a ten-minute opener, and they work fine there.
- **The five balls must have different speeds.** If a student gives them all the same `vx` and `vy`, the five balls move as one rigid formation and the whole demo looks broken. It's a genuinely instructive moment — ask them why it happened before you fix it — but don't let it stand, or they'll think their loop is wrong when it's their data.
- **Expect one specific bug in the build: the balls drawn in the wrong colour, or invisible.** It's almost always `ctx.fillStyle` being set *after* the drawing loop rather than before, or a missing `ctx.beginPath()` inside `drawBall` — without `beginPath` every circle joins onto the previous one's path and you get an expanding smear of connected blobs. That's a good thirty seconds to spend: `beginPath` means "start a new shape."
- **If nothing moves at all, check the very last line.** Forgetting the initial `requestAnimationFrame(loop);` is the single most common way to end up with a perfect game loop that never starts. The page looks blank and there is no error — which is exactly the kind of silence they should now be suspicious of.
- **If the player doesn't respond,** the order is: did they click the canvas, is `tabindex="0"` on the canvas tag, is `"ArrowLeft"` spelled exactly right. It's nearly always the click.
- **On homework 4 (the fast-ball fix):** the answer is to set the position as well as flip the velocity — `b.x = b.r` on the left wall, `b.x = W - b.r` on the right. They probably won't get it unaided, and that's fine; arriving next month at "flip the velocity, *then* fix the position" is much stronger if they've spent twenty frustrated minutes on it first. Do not send them the answer between sessions.
- **What to do with the quick-fire results.** Any question that stalls is a five-minute warm-up for a future session, not a crisis. The three worth actually reteaching if they miss them are 2 (the coordinate system), 8 (the loop) and 10 (the notepad pattern) — those three carry the rest of the course. The others can be repaired in passing.
