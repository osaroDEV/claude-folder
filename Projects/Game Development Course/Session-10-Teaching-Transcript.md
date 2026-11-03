# Session 10 — Keyboard Input — Controlling the Player

### Teaching Transcript · Week 5 · 60 minutes · Beginner (age 15)

> ### ⚠️ Read this before the lesson — this student missed Session 9
>
> This transcript has a **10-minute catch-up block built into the front** (section 0:04–0:14) covering the essentials of Session 9. The timings for the rest of the session have been tightened to absorb it, so the hour still ends on time.
>
> **The good news, and you should be reassured by this:** Session 10 does **not** actually depend on Session 9. Keyboard input builds on the *game loop* from Session 8 — `update()`, `draw()`, `loop()` — and today's player moves by simple `+=` and `-=`, not by velocity or bouncing. So a student who missed Session 9 is **not blocked** from doing today's work properly.
>
> What they've missed is *vocabulary and continuity*, not a prerequisite. The catch-up exists so they aren't lost when you say "velocity" in passing, and so the gap doesn't quietly widen. Deliver it, then move on with confidence.
>
> **What you must check instead:** that they still have **Session 8** solid. That one *is* a hard prerequisite, and everything today sits on it. There's a check for it in the first four minutes — do not skip it.
>
> Session 9's actual build (the bouncing ball) is set as extra homework tonight. Make sure they know it's a debt to be paid, not a lesson cancelled — Pong needs that ball in three sessions' time.

**Session goal:** by the end, the student can explain what an *event* is, knows why we record key presses in an object instead of moving the player directly inside the event handler, and has built — from scratch, live — a square they can steer around the canvas with the arrow keys, which stops cleanly at all four edges.

**Before you start:** have Session 8 open. Have the Session 9 bouncing-ball demo already loaded in a browser tab, ready to run, so the catch-up costs you zero setup time mid-lesson.

---

## 0:00 – 0:04 | Welcome back & the Session 8 check

**SAY, warmly and without making a thing of the missed session:**
"Good to see you. You missed the last one, so we're going to spend the first ten minutes catching you up on what happened — and then we go straight into today, which is a big one. Today is the session where this stops being an animation you watch and becomes a game you *play*. By the end of the hour you'll be driving something around the screen with the arrow keys."

**ASK — this is the real prerequisite, so check it properly:** "Before anything else: from memory, no notes, tell me the three functions in a game loop and what each one does." (Answer: `update()` moves and decides, `draw()` paints, `loop()` calls both then asks for the next frame.)

**Follow up:** "And what's the very first line inside `draw()`?" (`clearRect` — wipe the old frame.)

> **If they can't answer these confidently, stop.** Do not proceed into today's material and do not deliver the Session 9 catch-up. Spend the session rebuilding the Session 8 skeleton instead, and move today's lesson to next time. Keyboard input on top of a shaky game loop produces a student who can copy code and can't fix it. Losing one session to secure the foundation is a good trade; two shaky sessions stacked on each other is not.

---

## 0:04 – 0:14 | Catch-up: Session 9 in ten minutes

**Frame it honestly:**
"I'm going to show you what you missed, not teach it fully — we don't have the hour for that. You'll get the full build as homework. What I need you to leave with today is the vocabulary and the two big ideas, so that when I say a word later, you know what I mean."

### Idea 1 — velocity (about 4 minutes)

**SAY:** "Every moving thing needs two separate ideas. **Position** is where it *is* — `x` and `y`. **Velocity** is how it's *moving* — and we write that as `vx` and `vy`. `v` for velocity, then the direction."

**TYPE:**

```js
x += vx;   // move horizontally by vx pixels this frame
y += vy;   // move vertically by vy pixels this frame
```

**KEY IDEA:** "Velocity is speed *and* direction in one number. The **size** of the number is the speed — `vx = 5` is faster than `vx = 1`. The **sign** is the direction — positive `vx` goes right, negative goes left. Positive `vy` goes *down*, because on a canvas y grows downwards."

**ASK:** "So what would `vx` and `vy` be for something drifting slowly up and to the left?" (Both negative, both small.)

**SAY, connecting it to what they do know:** "In Session 8 you called this `speed` and just added it to `x`. It's the same thing — we've split it into two directions and given it its proper name. You already understand it; you just learned the word for it."

### Idea 2 — bouncing (about 4 minutes)

**SAY:** "The second idea is how you make something bounce off a wall. And it's not what most people guess. A bounce doesn't change where the ball *is*. It changes where the ball is *going*. So you don't touch the position — you reverse the velocity."

**TYPE:**

```js
vx = -vx;   // reverse horizontal direction — bounce off a side wall
vy = -vy;   // reverse vertical direction — bounce off the top or bottom
```

**SAY:** "`vx = -vx` means: take the velocity, flip its sign, put it back. If it was `4` going right, it becomes `-4` going left. One line, works in both directions automatically."

**Run the Session 9 demo now and let them watch it for thirty seconds.** Point at the walls as it hits them.

**SAY, pointing:** "Watch — when it hits a side wall, only the left-right direction flips. The up-down drift carries on untouched. That's why it comes off at an angle instead of straight back. And in a corner, both flip at once, so it returns the way it came. Nobody wrote corner code — it just falls out of two simple rules."

### Idea 3 — the one that matters for later (about 2 minutes)

**SAY:** "One last thing, and this is the one I'll keep referring to. When you draw a rectangle, the `x` is its **top-left corner**. When you draw a circle with `arc`, the `x` is its **centre**. So to find a circle's actual left edge you have to subtract the radius: `ball.x - ball.r`. If you forget, the ball sinks halfway into the wall before it turns around."

**SAY:** "Today we're back to rectangles, so `x` is the corner again — but keep that in your head. Knowing whether a shape's `x` is its corner or its middle is something you'll ask yourself constantly from here on."

**Close the catch-up cleanly:**
"That's Session 9: motion is velocity added to position; bouncing is flipping the sign of a velocity. Your homework tonight is to build that bouncing ball yourself from scratch, because in about three sessions it becomes the ball in Pong. But — and this matters — **nothing in today's lesson needs it.** Today stands on Session 8, which you've got. So let's go."

---

## 0:14 – 0:19 | What today changes, and what an "event" is

**SAY:**
"Everything you've made so far has been on rails. The square goes where the code says, at the speed the code says, and you sit and watch. Today we hand you the controls. And the moment a human can change what happens, it stops being an animation and becomes a game. That's the whole difference."

**SAY:** "So the question is: how does your code find out that a human pressed a key? The answer is a thing called an **event**. The browser is watching for all sorts of things happening — a key going down, the mouse moving, a button being clicked, the window being resized. Each of those is an event. Your code doesn't go looking for them. Instead, you leave a message saying 'when this happens, run this function for me.' Then you get on with your life, and the browser interrupts you when it happens."

**ASK:** "Can you think of a real-life version of that? Something where you don't stand and wait, you just ask to be told?" (A doorbell. A phone notification. Putting your name down at a restaurant instead of hovering by the door.) Let them find one — the analogy sticks much better if it's theirs.

**SAY:** "The doorbell is perfect, actually. You don't stand at the door all day checking whether someone's there. You install a bell, and you carry on cooking. `addEventListener` is you installing the bell."

---

## 0:19 – 0:27 | keydown, keyup, and event.key

**SAY:** "Here's how you install the bell. The function is called `addEventListener`, and you give it two things: the *name* of the event you care about, and the *function* to run when it happens."

**TYPE:**

```js
document.addEventListener("keydown", function (event) {
  console.log("You pressed: " + event.key);
});
```

**SAY, breaking it into three parts as you point at them:**
- "`"keydown"` — the event I care about. It fires the instant a key goes down. There's a matching `"keyup"` that fires when it's released."
- "`function (event) { ... }` — the code to run when it happens. The browser calls this for me. I never call it myself."
- "`event` — the browser hands my function a little parcel of information about what just happened. For a key press, the useful bit is `event.key`, which tells me *which* key."

**Have them type it and open the console.** Press letters. Press the arrows. Press the spacebar. Read the output together.

**ASK:** "What does `event.key` say when you press the left arrow?" (`"ArrowLeft"` — with a capital A and a capital L, and no space.) "And the spacebar?" (`" "` — a single space character. That surprises everyone.)

**WARN — this catches people constantly:**
"These names are **case-sensitive and spelled exactly**. `"ArrowLeft"` works. `"arrowleft"` does not. `"Arrow Left"` does not. And here's the nasty part: if you spell it wrong, **nothing breaks**. No error, no warning. Your code just quietly never runs, and you sit there pressing a key wondering why nothing happens. When a key doesn't work, checking the spelling is the first thing you do, not the last."

**SAY:** "Which is exactly why we just printed them to the console. Don't guess a key's name — press it and read what the browser tells you it's called."

---

## 0:27 – 0:36 | The `keys` object — the pattern that makes it feel smooth

**SAY:** "Now, the obvious next step is to move the player right there inside the `keydown` function. It's the first thing everyone tries. And it *sort of* works, which is what makes it a trap."

**ASK:** "Think about holding a key down in a text box — hold a letter down right now and watch what appears." (One letter… a pause… then a fast stream of them.) "That stutter is your operating system's key-repeat, and it's designed for typing, not for games. If you move the player inside `keydown`, your player moves once, then freezes for a moment, then races off. It feels broken, because you've handed control of your game's timing to the keyboard settings on that particular computer."

**KEY IDEA — the sentence to land:**
"Events tell you **when something changed**. The game loop decides **what happens each frame**. Don't let one do the other's job."

**SAY:** "So here's the professional pattern, and it's beautifully simple. The event handlers do almost nothing — they just write down which keys are currently held. Then `update()` reads that note, sixty times a second, and moves the player. Two separate jobs, cleanly split — exactly like `update` and `draw`."

**TYPE:**

```js
const keys = {};   // our notepad: which keys are held right now

canvas.addEventListener("keydown", function (e) {
  keys[e.key] = true;    // write down: this key is DOWN
  e.preventDefault();
});
canvas.addEventListener("keyup", function (e) {
  keys[e.key] = false;   // write down: this key is UP again
});
```

**SAY:** "Read it out loud: on key down, mark it true. On key up, mark it false. That's the entire input system. Nine lines and it will serve you for every game in this course."

**SAY:** "And then, inside `update()`, we simply ask the notepad a question:"

**TYPE:**

```js
if (keys["ArrowLeft"]) { /* move left */ }
```

**ASK (check understanding):** "Why does this give smooth movement when the other way didn't?" (Because the loop runs at a steady 60 times a second and moves the player a fixed amount each time. The keyboard's stutter never gets a say — it only ever changes a true or a false.)

**SAY, planting a flag for later:** "This same pattern handles two keys at once for free, which you'll notice in a minute. It's also how we'll do Pong's two paddles — two players, one keyboard, same notepad."

---

## 0:36 – 0:50 | Hands-on build: drive the square

**SAY:** "Right — build it with me. Start from your Session 8 file. The loop doesn't change at all; we're only adding input and rewriting `update()`."

**Live-code together, narrating as you go:**

```html
<canvas id="game" width="380" height="240" tabindex="0"></canvas>
<p>Click the box first, then press the arrow keys.</p>
<script>
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  canvas.focus();

  let player = { x: 170, y: 100, size: 36, speed: 4 };
  const keys = {};

  // record key state (we listen on the canvas so arrows don't scroll the page)
  canvas.addEventListener("keydown", function (e) { keys[e.key] = true;  e.preventDefault(); });
  canvas.addEventListener("keyup",   function (e) { keys[e.key] = false; });

  function update() {
    if (keys["ArrowLeft"])  player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;
    if (keys["ArrowUp"])    player.y -= player.speed;
    if (keys["ArrowDown"])  player.y += player.speed;

    // clamp inside the canvas
    player.x = Math.max(0, Math.min(W - player.size, player.x));
    player.y = Math.max(0, Math.min(H - player.size, player.y));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#34d399";
    ctx.fillRect(player.x, player.y, player.size, player.size);
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
</script>
```

**Narrate as you go:**

- "`tabindex="0"` on the canvas. That's an odd-looking one — it exists to make the canvas *focusable*, so it's allowed to receive key presses at all. We'll come back to it."
- "Four `if` statements, one per direction. Notice there's no `else` anywhere. That's deliberate, and it's why holding two keys works."
- "`draw()` and `loop()` are **completely unchanged** from Session 8. Say that out loud to yourself. All we've done is give `update()` a new way to decide where the player goes."

**Press Run, click the canvas, and let them drive it for a minute before explaining the clamp.** Let them enjoy it — this is the moment the course stops being a demo.

### The clamp

**SAY:** "Now those last two lines, because they look cryptic. `Math.min(a, b)` gives you the smaller of two numbers, `Math.max` the larger. Stacked together they trap a value inside a range. Read the x line inside-out."

**Work through it with real numbers on the board:**

- "`W - player.size` is `380 - 36`, which is **344**. That's the furthest left-hand corner that still keeps the whole square on screen — because the square is drawn *rightwards* from its corner."
- "`Math.min(344, player.x)` — if x has crept past 344, take 344 instead. That's the right wall handled."
- "`Math.max(0, ...)` — if the result is below 0, take 0 instead. That's the left wall handled."
- "So x can never be less than 0 or more than 344. Two walls, one line."

**ASK:** "Why is the limit `W - player.size` and not just `W`?" (Because `x` is the square's *left* corner. If x were 380 the square would start at the right edge and be drawn entirely off-screen. We have to stop it one square-width early.) **This is the same "where is this shape's edge?" question from the catch-up, in a new outfit — say so explicitly.**

**HANDS-ON CHALLENGE (student drives, you coach, ~7 min):**

1. **Feel the speed.** Change `player.speed` to `10`, then to `1`. Which feels better to control? There's no right answer — but notice that "good controls" is a thing you *tune*, not something you calculate.
2. **Two keys at once.** Hold Right and Down together. It works, with no extra code — the two `if`s both fire on the same frame. Ask them *why* it would have failed if we'd used `else if` instead.
3. **Watch the corner carefully.** Drive hard into a corner and hold. The square stops dead and stays perfectly square against both walls. Ask what would happen without the clamp lines. (It sails off and vanishes forever — there's no wall, just the edge of the picture.)
4. **Now measure something.** Drive right for exactly one second, note the distance. Then drive diagonally for one second and compare. *Do not explain it yet* — it's tonight's homework.

---

## 0:50 – 0:55 | Focus, scrolling, and the bug that will haunt them

**SAY:** "Three practical things that cost people hours. I'm giving them to you up front so they cost you nothing."

**1. Focus — why we click the canvas.**
"Key events don't go to whatever's under your mouse. They go to whatever has **focus** — the one element the browser considers 'active' right now. Normally a canvas can't have focus at all, which is why we added `tabindex="0"` — that's us telling the browser 'this element is allowed to be selected.' Then clicking it makes it the active one. If your keys suddenly stop working, the first thing to check is whether you clicked somewhere else on the page. In a full-screen game you'd listen on `document` instead and skip all this."

**2. `preventDefault` — why the page was jumping.**
"Arrow keys have a built-in job in a browser: they scroll the page. So without `e.preventDefault()`, playing your game also scrolls the window up and down, which is horrible. That one line says 'I'm handling this key, don't do your normal thing with it.'"

**3. The stuck key — and I want you to see this one happen.**

**Demonstrate it live, don't just describe it:** hold the right arrow, and *while still holding it*, click somewhere else on the page. Then release the key. The square keeps sliding right on its own until it slams into the wall.

**ASK:** "Why is it still moving? I let go of the key." Give them a moment. The answer is genuinely satisfying once seen: "Because the `keyup` never reached the canvas. It had lost focus by then. So `keys["ArrowRight"]` is still sitting there saying `true`, and `update()` faithfully keeps moving the player sixty times a second — doing exactly what we told it."

**KEY IDEA:**
"Your `keys` object isn't reality. It's a **record** of reality, and records go stale. Anything that interrupts you between the key going down and the key coming up leaves a lie in that object."

**SAY:** "The professional fix is one more listener — when the element loses focus, forget everything:"

```js
canvas.addEventListener("blur", function () {
  for (const k in keys) keys[k] = false;   // clear the notepad
});
```

"Every real game does some version of that. It's why alt-tabbing out of a game and back in doesn't leave your character running into a wall."

---

## 0:55 – 0:58 | Quick-fire understanding check

Ask these out loud, one at a time. Their own words, before you confirm.

1. "What's an event, in your own words?" — something happening that the browser tells your code about, when you've asked to be told.
2. "Why don't we move the player inside the `keydown` function?" — the key-repeat stutter makes it jerky; the loop should control timing, not the keyboard.
3. "What do the two event listeners actually do?" — write `true` or `false` into the `keys` object. Nothing else.
4. "The player won't move at all and there's no error. Name two things to check." — did I click the canvas (focus), and did I spell `"ArrowLeft"` exactly right.
5. "Why is the clamp limit `W - player.size`?" — because `x` is the left corner, so the square needs to stop one width early to stay fully on screen.
6. *(catch-up recall)* "What does `vx = -vx` do?" — reverses the direction; that's a bounce.

---

## 0:58 – 1:00 | Recap & what's next

**SAY:**
"Today in one breath: **events** tell you when a key changes, you record that in a `keys` object, and the **game loop** reads that object every frame to move the player. The events do the noticing; the loop does the moving. And `Math.max` with `Math.min` keeps the player trapped on screen."

**SAY, and mean it — this is a milestone:**
"And notice what just happened. You didn't touch `draw()`. You didn't touch `loop()`. You added nine lines of input code and rewrote `update()`, and a thing you watch became a thing you *play*. That's the shape of every feature you'll add from now on — the engine stays, the content grows."

**SAY:** "Next session is mouse and touch input, which is the same idea with different events. And then we start Pong. That paddle you'll be moving? It's the square you just built, with the up and down keys only. You've already written it."

**Homework / practice before next session:**

1. **The Session 9 catch-up build — do this one first.** From an empty file, build the bouncing ball: an object with `x`, `y`, `vx`, `vy` and `r`; an `update()` that adds velocity to position and flips `vx` or `vy` at the walls; a `draw()` that paints a circle. Remember a circle's edge is `x - r` and `x + r`, not `x`. Bring it next session — I want to see it running.
2. **Add WASD.** Make W, A, S and D work as well as the arrow keys, so the player can use either. *(Teacher's note: they will hit a real bug here — see the teaching notes below. Don't warn them.)*
3. **Answer the diagonal question from class.** You measured that moving diagonally covers more ground in one second than moving straight. Work out *why* using the numbers in the code — how far does the square move horizontally in one frame, and how far vertically, when both keys are held? Write down what you think is happening.
4. **Optional, if you're enjoying it:** make the spacebar change the player's colour. Remember `event.key` for the spacebar is `" "` — a single space.

---

### Teaching notes for you

- **On the catch-up: keep it to ten minutes and resist teaching it properly.** The temptation is to give a good student the whole of Session 9 because they missed it. Don't — you'll lose today's build, and then they're behind on *two* sessions instead of one. Vocabulary today, build at home, check it next week.
- **The Session 8 check in the first four minutes is not a formality.** A student who missed a week may also have gone a fortnight without touching the loop. If it's rusty, rebuilding it is a better use of the hour than anything else on this page, and you should feel fine about spending the session that way.
- **The WASD homework contains a deliberate trap, and it's a good one.** `event.key` is the *character produced*, so with Shift held or Caps Lock on, `"w"` arrives as `"W"` — and `keys["w"]` never becomes true. The player mysteriously stops responding when Caps Lock is on. The fix is `keys[e.key.toLowerCase()] = true`, or using `e.code` (which reports the physical key, `"KeyW"`, regardless of Shift). Let them find it. If they don't, it makes a strong five-minute opener next session.
- **The diagonal homework has a real answer worth arriving at.** Holding Right and Down moves the square 4 pixels across *and* 4 down in the same frame — but the distance actually travelled is the diagonal of that little square, which is about 5.7 pixels. So diagonal movement is roughly **1.41 times faster** (that's √2). It's in a great many published games, including some famous ones. The fix is to normalise the movement, which is Month 3 material — for now, recognising the bug is the win. If they arrive at "it's the diagonal of a square, so Pythagoras," that is a genuinely excellent moment; make a fuss of it.
- **Do demonstrate the stuck-key bug live.** It takes fifteen seconds and it's the single most memorable thing in this lesson. A bug you've seen happen to a teacher is far less frightening than one that appears on your own screen at 11pm.
- **If nothing responds at all:** the order to check is (1) did they click the canvas, (2) is `tabindex="0"` on the canvas tag, (3) is the key name spelled exactly right, (4) are the listeners on `canvas` while they're clicking `document`, or vice versa. It is almost always number 1.
- **If the player moves but stutters,** they've moved the player inside the `keydown` handler after all, rather than in `update()`. Walk them back to the notepad analogy rather than just fixing it.
- **Pacing:** if the catch-up overruns, cut hands-on challenge 1 (speed tuning) — it's the least load-bearing. Protect challenge 4 (the diagonal measurement), because homework 3 depends on them having taken the measurement in class.
