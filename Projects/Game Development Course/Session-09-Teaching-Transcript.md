# Session 9 — Animation & Movement

### Teaching Transcript · Week 5 · 60 minutes · Beginner (age 15)

**Session goal:** by the end, the student can explain the difference between *position* and *velocity*, knows that flipping the sign of a velocity is what makes something bounce, and has built — from scratch, live — a ball that bounces off all four walls of the canvas. This is the first session of Month 2, and it is the moment the loop from last week starts behaving like a real game.

**Before you start:** have Session 8 open nearby — today is a direct extension of it, not a new topic. You will reuse the exact `update()` / `draw()` / `loop()` skeleton and only change what happens inside `update()`. Also check their Session 8 homework (the "Busy Road" exercise) at the top of the lesson: if the skeleton isn't yet automatic for them, spend five extra minutes there before starting, because everything today sits on top of it.

---

## 0:00 – 0:05 | Welcome back & today's promise

**SAY:**
"Last week you built the engine — the loop that runs sixty times a second, thinking and then painting. Today we put something interesting inside it. By the end of this hour you'll have a ball bouncing around inside the canvas, hitting the walls and coming back, all on its own. And here's the thing I want you to hold onto: this is not a new engine. It's the exact same `update()`, `draw()`, `loop()` you already wrote. We're only changing a few lines inside `update()`. That's how the rest of this course works — the skeleton never changes, we just teach it new tricks."

**ASK, before anything else — a memory check:** "Without looking at your notes, tell me the three functions in a game loop and what each one is for." (Answer: `update()` thinks/moves, `draw()` paints, `loop()` calls both and asks for the next frame.) If they can't do this unaided, stop and rebuild the skeleton together for five minutes. Do not move on without it.

**SAY:** "One more question before we start. Last week your square went off the right edge and reappeared on the left — it *wrapped*. Today the ball is going to hit the wall and come *back*. Those are two completely different behaviours. Keep that difference in your head; we'll come back to it."

---

## 0:05 – 0:12 | Position and velocity

**SAY:**
"Every moving thing in every game needs two separate ideas, and beginners often squash them into one, which causes endless confusion. So let's separate them clearly. The first is **position** — where the object *is*, right now. That's `x` and `y`. The second is **velocity** — how it's *moving*. That's `vx` and `vy`. Those short names are what real game programmers use, so we'll use them too: `v` for velocity, then `x` or `y` for the direction."

**TYPE:**

```js
x += vx;   // move horizontally by vx pixels this frame
y += vy;   // move vertically by vy pixels this frame
```

**SAY:** "That's it. That's motion. Two lines. Every moving object in every game you have ever played is doing some version of those two lines, sixty times a second."

**KEY IDEA — say it slowly:**
"Velocity is speed *and* direction in one number. The **size** of the number is the speed: `vx = 5` is faster than `vx = 1`. The **sign** of the number is the direction: positive `vx` moves right, negative `vx` moves left. Positive `vy` moves *down*, because on a canvas y grows downwards. One number, two pieces of information."

**ASK:** "So if I want something drifting slowly up and to the left, what would `vx` and `vy` look like?" (Both negative, both small — e.g. `vx = -1, vy = -0.8`.) Let them work it out; the "up is negative" part is the bit that catches people.

**SAY, connecting back:** "Last week you called this `speed`. Today we're calling it `vx` and `vy`. It's the same idea — we're just giving it the proper name and splitting it into two directions, because in a moment we're going to need to change them independently."

---

## 0:12 – 0:20 | Bouncing — flip the sign

**SAY:**
"Now the good part. How do you make something bounce off a wall? Beginners usually reach for teleporting — move it back where it came from. But that's not what a bounce is. A bounce doesn't change where the ball *is*. It changes where the ball is *going*. So we don't touch the position at all. We reverse the velocity."

**TYPE:**

```js
vx = -vx;   // reverse horizontal direction (bounce off a side wall)
vy = -vy;   // reverse vertical direction (bounce off the top or bottom)
```

**SAY:** "Read that carefully, because it looks strange the first time. `vx = -vx` means: take the velocity, flip its sign, and store it back. If `vx` was `4` — moving right — it becomes `-4`, moving left. If it was `-4`, it becomes `4`. One line, and it works in both directions automatically. You will use this exact trick for the rest of your life as a game developer."

**ASK (check understanding):** "If a ball hits the *left* wall and I flip `vx`, which way does it go now?" (Right.) "And if it hits the *ceiling* and I flip `vy`?" (Down.) "And which one do I flip if it hits a side wall — `vx` or `vy`?" (`vx` only. `vy` is untouched, so the ball keeps its up-or-down drift while reversing its left-right direction — that's exactly why a bounce looks like a bounce and not a reversal.)

**SAY, and this is the point worth labouring:** "Notice we only ever flip **one** of them at a time. Hitting a side wall changes the horizontal direction and leaves the vertical direction completely alone. That's why the ball comes off the wall at an angle instead of just reversing straight back the way it came. Keeping `vx` and `vy` as two separate numbers is what buys us that."

**SAY, tying back to the start:** "And now the wrap-versus-bounce difference from earlier. Wrapping changes **position** — you teleport the object to the other side. Bouncing changes **velocity** — the object stays put and turns around. Same `if` check on the edge; completely different thing inside the braces."

---

## 0:20 – 0:28 | Where is the edge of a circle?

**SAY:**
"Before we build, one detail that will bite you if we skip it. When we drew rectangles last week, the `x` was the *top-left corner*. But when you draw a circle with `ctx.arc`, the `x` and `y` are the **centre**. So if I check `if (ball.x < 0)`, I'm asking whether the *centre* of the ball has left the canvas — which means half the ball has already gone through the wall before we notice."

**Draw this on paper or a whiteboard — it lands far better visually than verbally.** Sketch a circle overlapping the left wall, mark the centre, mark the radius, and mark where the true left edge is.

**TYPE:**

```js
// for a circle at x with radius r:
ball.x - ball.r     // its LEFT edge
ball.x + ball.r     // its RIGHT edge
ball.y - ball.r     // its TOP edge
ball.y + ball.r     // its BOTTOM edge
```

**SAY:** "So the real question isn't 'has the centre passed the wall'. It's 'has the *edge* passed the wall'. And the edge is always the centre plus or minus the radius."

**TYPE:**

```js
if (ball.x - ball.r < 0 || ball.x + ball.r > W) {
  ball.vx = -ball.vx;
}
```

**SAY:** "One `if`, two conditions, joined with `||` — 'or'. Read it out loud: *if the left edge is off the left wall, OR the right edge is past the right wall, flip the horizontal velocity.* We don't need two separate `if` statements, because the fix is the same in both cases: flip `vx`. That `||` is straight from Session 6."

**ASK:** "Why can I use one `if` for both walls here, when last week I needed a separate check for each edge?" (Because last week each edge needed a *different* action — teleport to the left versus teleport to the right. Here both edges need the *same* action: flip `vx`.)

---

## 0:28 – 0:48 | Hands-on build: the bouncing ball

**SAY:** "Right — let's build it. Start from your Session 8 file if you have it, or type it fresh. I want you driving the keyboard for as much of this as possible; I'll talk you through each line."

**Live-code together, narrating as you go:**

```html
<canvas id="game" width="380" height="240"></canvas>
<script>
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // The ball: position (x,y), velocity (vx,vy), and size (r)
  let ball = { x: 60, y: 50, vx: 3.5, vy: 2.6, r: 16 };

  function update() {
    // 1. move by the velocity
    ball.x += ball.vx;
    ball.y += ball.vy;

    // 2. bounce off left/right walls
    if (ball.x - ball.r < 0 || ball.x + ball.r > W) {
      ball.vx = -ball.vx;
    }
    // 3. bounce off top/bottom walls
    if (ball.y - ball.r < 0 || ball.y + ball.r > H) {
      ball.vy = -ball.vy;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
</script>
```

**Narrate as you go:**

- "One object holds everything about the ball — where it is, how it's moving, and how big it is. Five numbers, all bundled together, exactly like the `player` object last week."
- "`update()` has three jobs and they're numbered in the comments. Move. Check the side walls. Check the top and bottom. Notice: no drawing anywhere in here. Still the referee."
- "`draw()` is almost identical to last week's, except we're painting a circle instead of a square. `beginPath()`, then `arc()`, then `fill()`. Say those three out loud as a set — they always come together."
- "`loop()` hasn't changed by a single character since last week. That's the whole point. The engine is finished; we're just writing better content for it."

**Press Run. Let it bounce for a while before saying anything.** Let them enjoy it — this is the first thing in the course that feels genuinely alive.

**SAY:** "Watch the corners. When it hits a corner, both `if` statements fire on the same frame, both velocities flip, and it comes straight back the way it came. Nobody programmed 'corner behaviour' — it just falls out of the two rules working together. That's a really nice thing about writing simple rules: you often get complicated-looking behaviour for free."

**HANDS-ON CHALLENGE (student drives, you coach, ~10 min):**

1. **Change the angle.** Set `vx: 6` and `vy: 0.5`. Then try `vx: 0.5, vy: 6`. Then make them equal. What decides the angle the ball travels at? *(The ratio between `vx` and `vy`. Equal values give exactly 45°.)*
2. **Break it on purpose.** Set `vx: 40` and watch the walls closely — the ball no longer touches the wall and turns; it punches straight through and blinks out of sight for a frame before reappearing. Then try `vx: 300`: the ball more or less vanishes, flickering in one spot. Don't fix either; we're about to explain them.
3. **Make a comet.** Replace `clearRect` with a semi-transparent fill and watch the trail appear:
   ```js
   ctx.fillStyle = "rgba(11, 14, 36, 0.2)";
   ctx.fillRect(0, 0, W, H);
   ```
4. **Two balls.** Add a second ball object with a different colour, speed and radius. Move it in `update()`, paint it in `draw()`. If they built the two-object exercise last week, this should feel easy — say so out loud, it's a confidence moment.

---

## 0:48 – 0:53 | Overshooting the wall, and a word about frame rate

**SAY, coming back to challenge 2:**
"So why did the fast ball punch through the wall? Think about it frame by frame. Your code only *looks* at where the ball is sixty times a second. In between those looks, it is completely blind. At 40 pixels a frame, the ball can be safely inside the canvas on one frame and 36 pixels past the wall on the next — and 36 pixels is more than the whole ball. So by the time our `if` notices and flips the velocity, the ball has already been drawn somewhere it should never have been. At 300 pixels a frame it's worse: the ball crosses the entire canvas between two checks, so it's outside on almost every frame and you only catch glimpses of it."

**KEY IDEA — this is bigger than one bug:**
"Your game doesn't see movement. It sees a series of snapshots. Anything that happens *between* two snapshots never happened, as far as your code is concerned. Fast objects passing straight through walls is the classic result, and every game programmer, at every level, deals with this."

**SAY:** "There are two things wrong with our bounce, and they're worth naming separately. The first is that we react *late* — the ball is already through the wall when we notice. The second is that flipping the velocity fixes the *direction* but does nothing about the *position*: the ball is still sitting inside the wall, we've just pointed it the other way. Today, neither matters much, because at a few pixels a frame the overshoot is too small to see. When we build Pong, we'll add the proper fix — at the same moment we flip the velocity, we also push the ball back to exactly the edge of the wall, so it can never be inside it. Remember that phrase: **flip the velocity, then fix the position.**"

**SAY, if you want to plant a seed for the homework:** "And keep that second problem in mind tonight, because one of your homework tasks is going to make it bite."

**SAY, briefly — mention it, don't teach it:**
"One last thing, just so you've heard the term. Because we move a fixed number of pixels *per frame*, our speed depends on the device running at 60 frames per second. On a 120 FPS screen, our ball would move twice as fast. Real game engines fix this by multiplying movement by something called **delta time** — the time since the last frame. We're not doing that in this course, and you don't need it yet, but when you read about it later, you'll know what problem it solves."

---

## 0:53 – 0:57 | Quick-fire understanding check

Ask these out loud, one at a time. Make them answer in their own words before you confirm.

1. "What's the difference between position and velocity?" — position is where it is; velocity is how it's moving, both speed and direction.
2. "What does `vx = -vx` do, and when do you use it?" — reverses the horizontal direction; used when the ball reaches a left or right wall.
3. "The ball hits the ceiling. Which velocity flips, and which one stays the same?" — `vy` flips, `vx` is untouched.
4. "Why do I write `ball.x - ball.r` instead of just `ball.x` in the edge check?" — because a circle's `x` is its centre, so the actual edge is a radius away.
5. "Last week the square wrapped around; today the ball bounces. Which one changes position, and which one changes velocity?" — wrapping changes position, bouncing changes velocity.

---

## 0:57 – 1:00 | Recap & what's next

**SAY:**
"Here's today in one breath: motion means adding **velocity** to **position** every frame. Bouncing means **flipping the sign** of a velocity when the object reaches an edge. Flip `vx` for the side walls, flip `vy` for the top and bottom, and remember that a circle's edge is a radius away from its centre."

**SAY, and make this land — it's motivating:**
"And I want you to notice something about what you just built. A ball that bounces around inside a box, at an angle, off four walls. Put a paddle on the left, put a paddle on the right, and that is **Pong** — a real arcade game from 1972. You are about three sessions away from it. The ball you wrote today is genuinely the ball we'll use."

**SAY:** "Next session we hand over the controls. You'll learn how the browser tells your code that a key has been pressed, and you'll steer something around the canvas with the arrow keys. That's when this stops being an animation and starts being a game."

**Homework / practice before next session (leave this with them):**

1. Get the two-ball version working if you didn't finish it in class. Give each ball a different size — check that the bigger one still bounces correctly off the walls, and think about why the radius matters.
2. Make a ball that bounces off the left, right and bottom walls, but **wraps** around at the top — so it disappears off the ceiling and comes back up from the floor. This forces you to use both techniques in one object, in one `update()`.
3. **Gravity — and a bug worth meeting.** Add one line at the very top of `update()`, before the movement: `ball.vy += 0.2;`. Run it and *watch it for a full minute*, not ten seconds. Write down what you see happen, in order.

   *Expected answer, for you — do not give this away:* it looks great at first. The ball falls, bounces, and each bounce is a little lower — convincing, physical, exactly what you'd hope for. Then after roughly ten seconds the bounces get very small, and the ball starts **vibrating on the floor and slowly sinking through it**, until it disappears out of the bottom of the canvas.

   This is the second problem from the wall discussion, arriving right on cue. Once the ball is resting on the floor, its bottom edge is a fraction past `H`, so the `if` fires — but flipping `vy` only turns it around, it doesn't lift it back out of the floor. Gravity immediately pushes it back down, the check fires again next frame, and it flips forever while creeping downward. The fix isn't a better bounce; it's `ball.y = H - ball.r;` at the moment of the bounce — flip the velocity, *then fix the position*. If they arrive at that themselves, they have essentially invented Pong's collision code a month early.

---

### Teaching notes for you

- **The single most valuable idea today is "bouncing changes velocity, not position."** If they take away nothing else, take that. Students who get this write clean collision code for the rest of the course; students who miss it end up teleporting objects around and their games feel broken.
- **Do not skip the whiteboard sketch of the circle and its radius.** Every year, students write `if (ball.x < 0)` and then wonder why the ball sinks halfway into the wall before turning round. Two minutes of drawing prevents it.
- **Deliberately breaking it (challenge 2) is worth the class time.** A bug you caused on purpose is much less frightening than a bug that appears by accident — and it means when it happens to them in Pong, they'll recognise it instantly instead of panicking.
- **If the ball doesn't appear at all:** the usual causes are a missing `beginPath()` before `arc()`, or `Math.PI * 2` mistyped. If the ball smears, they've dropped `clearRect` — same bug as last week, and a nice chance to show that old lessons don't expire.
- **If the ball bounces only off some walls,** check whether they used `&&` instead of `||`, or wrote `>` where they meant `<`. Have them read the condition out loud in plain English; the error almost always becomes obvious the moment they say it as a sentence.
- **Watch for the student who wants to add gravity, or a paddle, or scoring, immediately.** That enthusiasm is exactly what you want — write their idea on a sticky note, tell them which session it's coming in (gravity: platformer, Session 21; paddles: Pong, Session 13), and keep today's file clean. Deferring a good idea to a named future session keeps the momentum without derailing the lesson.
- **The gravity homework is the most valuable thing you'll set all month, so protect it.** Tell them explicitly to watch it for a full minute — the sinking-through-the-floor failure takes about ten seconds to appear, and a student who runs it for five seconds will report back "it works fine" and miss the whole point. Do not warn them it's coming. Discovering a bug yourself, in code you believe is correct, is how the "flip the velocity, then fix the position" rule actually becomes permanent.
- **Pacing:** if you're running behind, cut challenge 3 (the comet trail) rather than challenge 4 (two balls). The trail is a nice toy; handling two independent objects is the skill Pong actually needs.
