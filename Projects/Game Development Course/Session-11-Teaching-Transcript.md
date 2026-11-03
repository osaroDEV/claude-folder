# Session 11 — Mouse & Touch Input

### Teaching Transcript · Week 6 · 60 minutes · Beginner (age 15)

**Session goal:** by the end, the student can explain *why* raw mouse coordinates are wrong on a canvas and fix it with `getBoundingClientRect()`, can test whether a click landed inside a circle using the distance formula, has built a complete, playable Click-the-Target game with a score, and knows that touch and pointer events reuse the exact same approach.

**Before you start:** have the student's Session 10 keyboard build open in a tab (you'll reuse the loop from it). Have a blank `session-11` file ready. Have the digital whiteboard open on a fresh page — you'll sketch twice today, and both sketches are load-bearing.

**What this session builds on:** the game loop (Session 8), arrays and objects (Session 7), `if` decisions (Session 6), and events (Session 10). Nothing new is needed beyond those.

---

## 0:00 – 0:04 | Hook & the Session 10 check

[Share screen — nothing on it yet, just talk to them first]

**SAY, with energy:**
"Quick question before we start. Think of the last shooter you played, or any game where you aim. You move your mouse, and a crosshair moves on screen. You click, and something either dies or you miss. So here's my question: **how does the game know you hit?** Not 'how does it know you clicked' — it knows that easily. How does it know that the exact pixel you clicked was *inside the enemy*?"

[Pause and let them guess. Don't correct anything yet — collect their answer.]

**SAY:** "Hold that thought, because that's literally the whole lesson. By the end of this hour you'll have built a game where you click a target and score points — and you'll have written the maths that decides hit or miss yourself."

**ASK — the prerequisite check, do not skip:** "From last session, in your own words: what is an *event*?"

> (Answer you're listening for: something happening — a key press, a click — that the browser tells your code about, because you asked to be told with `addEventListener`.)

**Follow up:** "And what were the three functions in the game loop?"

> (`update()` moves and decides, `draw()` paints, `loop()` calls both then asks for the next frame.)

> **If both answers come out clean, go.** If the event idea is shaky, spend two extra minutes on the doorbell analogy from last session before moving on — today is entirely events, so a wobble there will sink the hour.

**SAY:** "Perfect. Today is the same idea as last session — events — but with a different input device, and one twist that catches literally every beginner exactly once. I'm going to make sure it catches you *here*, with me watching, instead of at eleven at night on your own."

---

## 0:04 – 0:13 | The coordinate gotcha

**SAY:** "Keyboards are great, but loads of games live on the mouse — aiming, clicking, dragging. And on phones, tapping. So today we read the pointer's position on the canvas. Sounds easy. It nearly is."

**SAY:** "When you click, the browser hands your function that little parcel of information — the `event` object, same as last session. For a mouse event, the two useful bits inside it are `event.clientX` and `event.clientY`. Those are the coordinates of the click."

[Switch to digital whiteboard to sketch this concept — this sketch is the heart of the lesson, take your time]

**Draw this, narrating as you go:**

1. Draw a big rectangle. Label it **"the whole browser window."** Put a dot in its top-left corner and label it `0, 0`.
2. Now draw a smaller rectangle *inside* it, somewhere down and to the right — with space above it. Label it **"your canvas."**
3. Put an X somewhere inside the canvas. That's the click.

**SAY, pointing at the sketch:**
"Here's the trap. `clientX` and `clientY` are measured from the top-left of the **whole window** — this corner up here. Not from the corner of your canvas. So if your canvas sits, say, 40 pixels down and 100 pixels across from the window's corner, and you click the very top-left pixel of your canvas… the browser doesn't say zero, zero. It says **one hundred, forty**."

[Pause and ask: "So if I use that number straight, and I draw a circle at it — where does the circle end up compared to where I actually clicked?"]

> (Answer: down and to the right of the real click, by exactly the distance the canvas sits from the window corner. Let them reason it out. If they say "it'd be off by the same amount every time" — that's a great answer, praise it, because it's the *diagnostic*.)

**SAY:** "Exactly. Everything is offset. And the amount it's offset by is exactly how far your canvas is from the corner of the window. That's why this bug looks so weird when it happens — your clicks all land in the wrong place, but *consistently* wrong, like the game is mocking you."

**KEY IDEA — say it slowly, this is the sentence of the session:**
"The browser measures from the corner of the *window*. You need to measure from the corner of the *canvas*. So you subtract the difference."

**SAY:** "And luckily, the browser will tell us exactly where our canvas is sitting. There's a function called `getBoundingClientRect()`. Long name, simple job — you call it on an element and it hands you back a box describing where that element is on the page. We want two things out of it: `rect.left` and `rect.top`. That's the canvas's corner."

[Share screen to show the code editor. Type this live — don't paste it]

```js
function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();   // canvas position on the page
  return {
    x: event.clientX - rect.left,   // convert to canvas coordinates
    y: event.clientY - rect.top
  };
}
```

**Narrate the three lines as you point at them:**

- "`canvas.getBoundingClientRect()` — hey browser, where is my canvas right now? It gives back a box, and `rect.left` and `rect.top` are the corner we care about."
- "`event.clientX - rect.left` — the click's distance from the window corner, minus the canvas's distance from the window corner. What's left is the click's distance from the **canvas** corner. Which is what we wanted all along."
- "`return { x: ..., y: ... }` — we hand back an object with two properties, so whoever called this gets `pos.x` and `pos.y` in proper canvas coordinates."

**SAY:** "Notice what I've done here — I wrapped it in a little helper function called `getMousePos`. I never want to write that subtraction twice. From now on, in every game you build, any time you need the pointer, you call this."

> **⚠️ Say this out loud, word for word — it's the single most common mouse bug in beginner game code:**
> "Skipping this conversion is the number one mouse bug in the world. Clicks register offset from where you actually clicked. If you ever see that — clicks landing near, but not on — you already know the answer. You forgot `getBoundingClientRect`."

**SAY:** "And one more reason it's a helper function and not a copy-paste: the canvas can *move*. If the page scrolls, or the layout shifts, the canvas is somewhere else now. Because we call `getBoundingClientRect()` fresh every single time, we always get the current position. If you worked it out once at the start and saved it, your game would break the moment someone scrolled."

---

## 0:13 – 0:22 | Listening for movement and clicks

**SAY:** "Right — we know how to convert a position. Now, how do we get told about the mouse in the first place? Same tool as last session: `addEventListener`. Two event names cover almost everything you'll ever need."

[Share screen to show the code editor — type both listeners]

```js
canvas.addEventListener("mousemove", function (e) {
  const pos = getMousePos(e);
  // pos.x, pos.y now hold the pointer's canvas coordinates
});

canvas.addEventListener("click", function (e) {
  const pos = getMousePos(e);
  // handle a click at pos.x, pos.y
});
```

**SAY:** "`"mousemove"` fires every time the pointer moves — and I mean *every* time. Drag your mouse across the canvas and that function runs dozens of times a second. `"click"` fires once, on a full press-and-release."

**SAY, connecting it back:** "Look at the shape of this. It's identical to last session. `addEventListener`, the name of the event in quotes, a function to run. The only things that changed are the event name and which bit of the parcel we dig out. Last week it was `event.key`. This week it's `event.clientX` and `clientY`, run through our converter."

**ASK (check for understanding #1):** "Last session I told you not to move the player inside the `keydown` handler — we wrote it into a `keys` object and let `update()` do the moving instead. Given that, what do you think we should be careful about inside a `mousemove` handler?"

> (You're fishing for: don't do heavy work in there, because it fires constantly. The clean answer is the same as last week — the event's job is to *record* what happened; the loop's job is to *act* on it. Storing `mouse.x` and `mouse.y` in an object and letting `update()` read them is exactly the `keys` object pattern in a new outfit. Say that connection out loud when they get there.)

**SAY:** "That's the pattern showing up again, and it'll keep showing up all course. **Events notice. The loop acts.** Write that down somewhere."

**SAY:** "Now — clicks are a bit different from `mousemove`, and this is worth being precise about. A click is a rare, deliberate thing. A human can maybe manage ten a second on a good day. So it's actually fine to do real work inside a click handler, and we will in a moment. It's the events that fire *constantly* — `mousemove` — where you want to just record and get out."

---

## 0:22 – 0:32 | Did the click hit the target?

**SAY:** "Okay. Back to my opening question. We now know exactly where the click landed, in canvas coordinates. And let's say we've got a target on screen — a circle, sitting at some x and y, with a radius `r`. How do we decide: hit, or miss?"

[Pause and ask: "How would you solve this? Don't worry about code — just describe what you'd check."]

> Let them struggle productively for a moment. Common answers: "check if it's in the box around it" (good instinct — that's rectangle collision, and it's next session), or "check if it's close enough" (that's the answer, and if they say it, tell them they've just described it perfectly and now you only need to make "close enough" precise).

**SAY:** "'Close enough' is exactly right, and here's the beautiful bit. For a circle, 'inside' and 'close to the centre' are the *same thing*. That's what a circle **is** — every point that's less than `r` away from the middle. So the test is: measure how far the click is from the centre. If that distance is less than the radius, you're inside. Hit."

[Switch to digital whiteboard to sketch this concept]

**Draw this:**

1. A circle. Mark the centre, label it `target.x, target.y`. Draw the radius out to the edge and label it `r`.
2. An X inside the circle, off to one side. Label it `pos.x, pos.y`.
3. Now draw a horizontal line from the centre across to below the X — label it `dx`. Then a vertical line up to the X — label it `dy`. Then the straight line from centre to X — label it `distance`.

**SAY, pointing:** "Look what we've drawn. A right-angled triangle. And you've met this before, in maths — the two short sides and the long one. Pythagoras. `a² + b² = c²`."

**SAY:** "So: `dx` is how far apart they are horizontally. `dy` is how far apart vertically. And the actual straight-line distance is the square root of `dx` squared plus `dy` squared."

[Share screen to show the code editor]

```js
const dx = pos.x - target.x;
const dy = pos.y - target.y;
const distance = Math.sqrt(dx * dx + dy * dy);

if (distance < target.r) {
  // HIT! it's inside the circle
}
```

**Narrate each line:**

- "`dx` — click x minus target x. That's the horizontal gap."
- "`dy` — same for vertical."
- "`Math.sqrt` is JavaScript's square root. And `dx * dx` is just dx squared — I'm multiplying it by itself. You could use `Math.pow`, but honestly `dx * dx` is clearer and faster."
- "Then one `if`. Distance less than radius? You're inside. That's the whole hit test."

**ASK (check for understanding #2):** "What happens if the click is *exactly* on the edge — distance exactly equal to the radius? Look at the `if` and tell me: hit or miss?"

> (Answer: a miss, because it's `<` and not `<=`. Then the important follow-up — does it matter? Almost never, because a single pixel on the boundary is a vanishingly rare case. But the point of asking is that they *read the operator* rather than skim it. Praise them if they spot it themselves; this is exactly the kind of care that separates people who can debug from people who can only copy.)

**SAY:** "Now here's something I want you to notice, because it's going to pay off next week."

> **💡 TIP — this is collision detection in disguise**
> "'Is the click inside the circle?' is exactly a **point-versus-circle collision test**. You've just written collision detection and I didn't even tell you that's what it was. Next session we generalise this to objects hitting *each other* — a ball hitting a paddle, a player hitting a wall. You're already halfway there."

**SAY:** "And that's why I made you draw the triangle. It's not a mouse thing. It's a *distance between two points* thing. It works for the click and the target, and it works just as well for two spaceships, or a player and a coin."

---

## 0:32 – 0:45 | Hands-on build: Click the Target

**SAY:** "Right. Everything you need is now on the whiteboard and in your notes. Let's build an actual game. Small, but genuinely complete — a target you click, a score that goes up, and each hit makes it jump somewhere new."

[Share screen to show the code editor. Build this together — student types, you narrate. Do NOT paste the whole thing.]

```html
<!DOCTYPE html>
<html>
<head><style>
  body{margin:0;background:#0d1024;display:flex;justify-content:center;padding:14px}
  canvas{background:#0b0e24;border:3px solid #6c8cff;border-radius:12px;cursor:crosshair}
</style></head>
<body>
  <canvas id="game" width="380" height="260"></canvas>
  <script>
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;

    let score = 0;
    let target = { x: 190, y: 130, r: 26 };

    function moveTarget() {
      target.x = target.r + Math.random() * (W - target.r * 2);
      target.y = target.r + Math.random() * (H - target.r * 2);
    }

    function getMousePos(e) {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    canvas.addEventListener("click", function (e) {
      const pos = getMousePos(e);
      const dx = pos.x - target.x;
      const dy = pos.y - target.y;
      if (Math.sqrt(dx * dx + dy * dy) < target.r) {   // hit?
        score++;
        moveTarget();
      }
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // target
      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.r, 0, Math.PI * 2);
      ctx.fill();
      // score
      ctx.fillStyle = "#e9ecff";
      ctx.font = "18px system-ui";
      ctx.fillText("Score: " + score, 12, 26);
    }

    function loop() { draw(); requestAnimationFrame(loop); }
    loop();
  </script>
</body>
</html>
```

**Narrate these points as you build — one per chunk, don't save them all for the end:**

- **On `target`:** "One object holding everything about the target — where it is and how big it is. Same shape as the `player` object last session. Notice `r` for radius, because it's a circle, and remember from Session 9: for a circle, `x` and `y` are the **centre**, not a corner."
- **On `moveTarget()`:** "`Math.random()` gives a decimal between 0 and 1. Multiply it by the width and you get a random spot across the canvas. But look at the extra care — I start at `target.r` and I use `W - target.r * 2`. Why? Because if I picked a totally random x, the target could land half off the edge and you'd never be able to click it. That keeps the whole circle on screen."

  [Pause and ask: "Why do I subtract the radius *twice* — `r * 2` — instead of once?"]

  > (Answer: once for the left edge, once for the right. The random range has to be squeezed in from *both* sides. This is exactly the same reasoning as the clamp from last session, `W - player.size`, and you should say so.)

- **On the click listener:** "Read this out loud as English: on click, work out where the pointer is, measure the gap to the target's centre, and if that gap is smaller than the radius, add one to the score and move the target. That's it. That's the game."
- **On `score++`:** "`score++` is shorthand for `score = score + 1`. Add one. You'll see it everywhere."
- **On `draw()`:** "`clearRect` first — always, wipe the old frame. Then `beginPath`, `arc`, `fill` to paint the circle, exactly like Session 9. Then `fillText` to write the score straight onto the canvas."
- **On `loop()`:** "And notice — this loop has no `update()`. Nothing moves on its own in this game. The only thing that changes the world is *you*, clicking. The loop is here purely to redraw."

**Press Run. Let them play it for a full minute before you say another word.** This is the payoff moment — protect it.

[Pause and ask: "Right — you've played it. Tell me one thing that would make it more fun."]

> Whatever they say, take it seriously and, if it's on the exercise list below, tell them they're about to build exactly that. Students who feel their idea got built stay switched on.

**HANDS-ON CHALLENGE (student drives, you coach, ~5 min):**

1. **Break it on purpose.** Delete `- rect.left` and `- rect.top` from `getMousePos` — just for thirty seconds. Play it. Watch your clicks land in completely the wrong place. **This is the bug I warned you about at the start. Now you've seen it, you'll recognise it forever.** Then put the lines back.
2. **Tune the difficulty.** Change `target.r` to `14`. Play. Then try `40`. Notice that "difficulty" here is one number.
3. **Cheat, and then fix it.** Try just clicking wildly all over the canvas as fast as you can. Does the score go up? (Only on real hits — the distance test doesn't care how fast you click.) Good. That's your first anti-cheat, and you got it for free.

---

## 0:45 – 0:52 | What about touch screens?

**SAY:** "Now, the elephant in the room. Most people play games on a phone. Your game right now needs a mouse. Is all this work useless on a phone?"

[Pause and ask: "What do you think — how different do you reckon a tap is from a click, under the hood?"]

**SAY:** "Good news, and it's better news than most people expect. Phones and tablets fire **touch** events instead of mouse events — different names, but they carry the **same kind of coordinates**. A touch's position lives at `event.touches[0].clientX` and `event.touches[0].clientY`. And you convert it with the very same `getBoundingClientRect` trick."

[Share screen to show the code editor]

```js
canvas.addEventListener("touchstart", function (e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.touches[0].clientX - rect.left;
  const y = e.touches[0].clientY - rect.top;
  // ... same distance test as before
});
```

**SAY, pointing at `touches[0]`:** "That `touches` bit with the square brackets — recognise it? That's an **array**, from Session 7. And `[0]` is the first item in it. Why would touches be a *list* when a mouse position was just one point?"

[Pause and ask: "Why is it a list?"]

> (Answer: because you have ten fingers. A touchscreen can be touched in several places at once — pinch to zoom, two-thumb controls. So the browser hands you *all* current touches, and `[0]` is the first finger down. Let them get there; it's a genuinely satisfying realisation and it makes arrays feel useful rather than academic.)

**SAY:** "So supporting phones costs you about three lines. The maths — the distance test, the radius comparison — doesn't change by a single character. That's the real lesson here: **the input device changes, the game logic doesn't.**"

**SAY:** "There's one more thing, and it's what modern code actually does. There's a newer family of events called **pointer events** — `"pointerdown"` is the main one. And a pointer event fires for a mouse, *and* for a finger, *and* for a stylus. One set of handlers, every input device. So instead of writing mouse code and then writing touch code, you write it once."

**SAY, honestly:** "I'm not going to make you rewrite today's game with pointer events, because you've got enough new things in your head. But it's a great habit to pick up once you're comfortable, and now you know the word. When you're reading someone else's game code and you see `pointerdown`, you'll know exactly what it's doing."

---

## 0:52 – 0:57 | Quick-fire understanding check

Ask these one at a time, out loud. Wait for their words before you confirm.

1. **"Why can't we just use `event.clientX` directly on a canvas?"** — because it's measured from the corner of the browser window, not the corner of the canvas, so it's offset by however far the canvas sits from that corner.
2. **"What does `getBoundingClientRect()` give you, and which two bits do we use?"** — a box describing where the element is on the page; we use `rect.left` and `rect.top`.
3. **"Someone's clicks are all landing about fifty pixels down and to the right of where they clicked. What's the bug?"** — they forgot the conversion. This is the diagnostic question; if they nail this one, the lesson landed.
4. **"Describe the hit test in words, no code."** — measure the distance from the click to the centre of the circle; if it's less than the radius, it's a hit.
5. **"Why is `dx * dx + dy * dy` under a square root?"** — Pythagoras. `dx` and `dy` are the two short sides of a right-angled triangle; the distance is the long side.
6. **"What does a phone fire instead of a click, and how much of today's code has to change?"** — touch events (or pointer events); only how you *get* the raw coordinates. The conversion and the maths are identical.
7. *(Recall from last session)* **"What's the difference between what an event does and what the loop does?"** — events notice that something changed; the loop decides what happens each frame.

---

## 0:57 – 1:00 | Recap & what's next

**SAY:**
"Today in one breath: **convert pointer coordinates with `getBoundingClientRect()` — always.** Detect a hit on a circle with the **distance formula** compared against its radius. And touch and pointer events reuse the exact same approach, so your game isn't stuck on desktop."

**SAY, and make a point of this — it's a real milestone:**
"And look at what you actually built today. Not a demo. A *game*. It has a goal, it has a score, it responds to you, and it gets harder if you want it to. That's a complete game loop of intent — player does a thing, game reacts, number goes up. Everything from here is that same idea with more pieces."

**SAY:** "Next session: full **collision detection** — objects hitting each other, not just a click hitting a shape. And you're not starting from zero on it, because the triangle we drew on the whiteboard today *is* collision detection. You just used it on a click instead of on a moving ball."

**Homework / practice before next session:**

1. **Shrink and grow.** Set `target.r` to `14` for a harder game, then try a bigger number for an easier one. Find the radius that feels *right* to you — not too easy, not impossible. Write the number down and be ready to defend it. (Same lesson as tuning the player's speed last session: good difficulty is something you *tune*, not something you calculate.)
2. **Add a countdown.** Give the game a **15-second timer**. When it runs out, stop scoring and show "Time's up!" on the canvas. Now the score actually means something, because there's a limit.
3. **Make it move.** Give the target a `vx` and a `vy` like the bouncing ball from Session 9, and move it a little every frame so you have to click a **moving** circle. Two hints for when you get stuck: this game's `loop()` currently has no `update()` — you'll need to add one. And a moving target should bounce off the walls rather than escaping, which you already know how to do.
4. **Optional, if you're enjoying it:** use `"mousemove"` to draw a small crosshair that follows the pointer around the canvas. Remember to store the position in an object and let `draw()` paint it — don't draw inside the event handler.

---

### Teaching notes for you

- **Make them break `getMousePos` in challenge 1. Do not let them skip it.** Describing the offset bug takes ten seconds and is forgotten in a day. *Seeing* their own clicks land in the wrong place, with the cause already known, makes it permanent. It's the highest-value thirty seconds in the lesson.
- **The offset bug may be invisible on some layouts.** If their canvas happens to sit at the very top-left of the window, deleting the conversion changes almost nothing and the demo falls flat. Guard against this: before the lesson, make sure the page has a heading or a paragraph *above* the canvas, and if not, add a couple of blank lines so the canvas is pushed well down the page. Even better — have them scroll the page down slightly with the broken version running, and watch the error grow as they scroll. That version is unforgettable.
- **The whiteboard triangle is the load-bearing sketch of the whole month.** You will point back at it next session for rectangle collision, and again for Pong and Breakout. Draw it properly, leave it up on screen for the rest of the hour, and consider sending them a photo or export of it afterwards.
- **If they answer "check if it's in the box around it"** for the hit test — that is not a wrong answer and you should say so warmly. It's rectangle-vs-point collision, it's genuinely what many games use for speed, and it's literally next session's material. Tell them they've just predicted the next lesson, then steer to the circle version because our target is round.
- **Expect confusion between `target.r` as a *size* and as a *position offset*** in `moveTarget()`. The line uses `r` in two roles at once — as a margin from the edge and as a doubled correction to the width. If they glaze over, draw it: a circle nudged into the left edge, then one nudged into the right, and count the radiuses.
- **On homework 3 (the moving target), there's a real trap and it's a good one.** They'll add `update()` but forget to *call* it inside `loop()` — because today's `loop()` is the only one in the course so far that doesn't have an `update()` in it, so they're not copying from a working example. Symptom: the target sits completely still and no error appears anywhere. Let them find it; if they can't after a fair go, the hint is "read your `loop()` function out loud."
- **The second trap in homework 3:** a moving target plus a click test still works perfectly, because the click is tested against wherever the target is *at that instant*. Some students expect it to break and add complicated prediction code. It doesn't need any. Reassure them if they've over-engineered it — that's a good instinct pointed in the wrong direction, not a failure.
- **If the click seems to do nothing at all,** the order to check is: (1) is the listener on `canvas` rather than `document`, (2) did they spell `"click"` correctly — a typo here fails silently, exactly like the key-name bug last session, (3) is `moveTarget()` being called but `score` never drawn because they forgot to redraw. It's almost never the maths.
- **Pacing:** if you're running behind, cut the pointer-events paragraph in section 0:45 down to one sentence ("there's a newer version of this that handles mouse and touch together — remember the word `pointerdown`"). Protect the hands-on build and the whiteboard triangle at all costs; everything after them is commentary.
