# Session 7 — Loops & Arrays — Handling Many Things
### Teaching Transcript · Week 4 · 60 minutes · Beginner (age 15)

**Session goal:** by the end, the student can store a list of things in an array, pull items out by index, and use a `for` loop to repeat an action automatically — enough to build a screen full of random stars from six lines of code.

**Before you start:** have the code editor open with a blank `session-07` file, and the Session 5 & 6 files nearby in case you need to jump back for a quick reminder of functions or `if` statements.

---

## 0:00 – 0:05 | Welcome back & the hook

**SAY:**
"Last time we taught the computer to make decisions — if this, then that. Today we're solving a different problem: what happens when you don't have one of something, you have a hundred? A hundred enemies, a hundred bullets, a hundred stars in a night sky. You are not going to write a hundred variables. There's a much smarter way, and it's actually only two new ideas. By the end of this hour you'll type about six lines of code and watch forty random stars appear on screen."

**ASK:** "If you were making a phone app to hold your contacts, would you want a separate variable for `contact1`, `contact2`, `contact3`... all the way up to `contact300`?"

Let them laugh at how absurd that sounds — that's the motivation for today.

---

## 0:05 – 0:15 | Arrays: a list in one variable

**SAY:**
"An array is just a list. Instead of one variable holding one value, one variable holds a whole ordered row of values. Think of it like a row of lockers, all sharing one locker number range, or a playlist — one playlist, many songs inside it."

**TYPE (live, student watching):**
```js
let scores = [10, 25, 40, 100];
let colours = ["red", "green", "blue"];
let enemies = [];   // an empty list, ready to fill later
```

**SAY:** "Square brackets `[ ]` say 'this is a list.' Commas separate each item. An empty pair of brackets is a list with nothing in it yet — perfectly valid, and actually really common, because you often start empty and fill it as the game runs."

**SAY:** "Now here's the one rule that trips up literally every beginner, so I want you to say it back to me: to get an item OUT of the list, you use its position — called the index. And counting starts at ZERO, not one."

**TYPE:**
```js
let colours = ["red", "green", "blue"];
colours[0]   // "red"   <- the FIRST item is index 0
colours[1]   // "green"
colours[2]   // "blue"
colours.length   // 3   <- how many items are in the list
```

**ASK:** "If this list has 3 colours, what index is the LAST one?" (Answer: 2, not 3 — because we started counting at 0.) Let them get this wrong once and correct themselves; it sticks better that way.

**KEY IDEA TO SAY OUT LOUD:** "First item is always index 0. Last item is always at `length - 1`. Say that back to me." Have them actually repeat it.

---

## 0:15 – 0:20 | Adding to a list: push()

**SAY:**
"Most of the time you don't type a whole list out at once — you start empty and add things while the game is running, like enemies spawning one at a time. `.push()` adds a new item to the end."

**TYPE (and run in console):**
```js
let enemies = [];
enemies.push("goblin");   // ["goblin"]
enemies.push("dragon");   // ["goblin", "dragon"]
enemies.length;            // 2
```

**HANDS-ON (student types this themselves, 2 minutes):** Have them build their own list of 3 favourite games using `.push()`, then log `.length` to prove it worked.

---

## 0:20 – 0:32 | The for loop

**SAY:**
"Now the second big idea. A loop repeats code automatically instead of you copy-pasting it. Watch this."

**TYPE:**
```js
for (let i = 0; i < 5; i++) {
  console.log("Hello number " + i);
}
// prints Hello number 0, 1, 2, 3, 4
```

**Run it. Let them see 5 lines print from ONE console.log.**

**SAY, breaking down the three parts slowly — this is the part that needs the most patience:**
"There are three parts inside those parentheses, separated by semicolons, and each one has a job:

1. `let i = 0` — the **start**. We make a counter, and we name it `i` by convention, starting at 0.
2. `i < 5` — the **condition**. Before every single lap, JavaScript checks: is this still true? The moment it's false, the loop stops.
3. `i++` — the **step**. After each lap finishes, add 1 to `i`. `i++` is just shorthand for `i = i + 1`."

**ASK:** "So how many times does this loop actually run?" Walk through it together: i=0 (true, runs), i=1 (true, runs), i=2, i=3, i=4, then i=5 — condition `5 < 5` is false, stop. Five runs total, 0 through 4.

**WHY THIS MATTERS — say this explicitly:** "Notice the counter starts at 0, just like array indexes. That is NOT a coincidence — it's on purpose, because loops and arrays are best friends. Loop from 0 while `i` is less than the array's length, and you touch every single item, exactly once, no matter how long the list is."

---

## 0:32 – 0:38 | Combining them: looping over an array

**TYPE:**
```js
let colours = ["red", "green", "blue"];

for (let i = 0; i < colours.length; i++) {
  console.log(colours[i]);   // red, then green, then blue
}
```

**SAY:** "Read that condition out loud: 'while i is less than colours.length.' That's the pattern you will type hundreds of times in your coding life: `i < something.length`. It automatically works whether the list has 3 items or 3,000 — you never have to change the loop itself, just the list."

**ASK:** "What would happen if I changed `colours.length` to just the number `3` instead? " (It would still work right now — but if someone added a 4th colour later, the loop would silently miss it. Using `.length` future-proofs the code.) This is a great "aha" moment — let it land.

---

## 0:38 – 0:50 | Hands-on build: a field of stars

**SAY:** "Let's use both ideas together to build something that actually looks cool: a randomly scattered star field, like a night sky, with a moon on top. This is the same trick real games use for particle effects, confetti, raindrops — anything with 'a bunch of similar little things.'"

**Live-code this together, line by line, narrating each piece as you type it into the runner:**

```html
<canvas id="game" width="360" height="240"></canvas>
<script>
  const ctx = document.getElementById("game").getContext("2d");
  const W = 360, H = 240;

  let stars = [];   // an empty array to hold our stars

  // Fill the array with star objects (each is {x, y, size})
  const HOW_MANY = 40;
  for (let i = 0; i < HOW_MANY; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 3 + 1
    });
  }

  // Now draw every star with ONE loop
  ctx.fillStyle = "#fff";
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // A bright moon on top
  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(300, 60, 26, 0, Math.PI * 2);
  ctx.fill();
</script>
```

**Narrate as you go:**
- "`Math.random()` gives a random decimal between 0 and 1. Multiply it by `W` and you get a random spot anywhere across the canvas width. Same trick for height."
- "Notice each star isn't just a number — it's a mini object with three properties: `x`, `y`, and `size`, all bundled together in curly braces. One `push()` adds one whole star."
- "First loop BUILDS the list of 40 stars. Second loop DRAWS every single one. Two loops, two jobs — build, then draw."

**Press Run. Let the "wow" happen.** Then press Run again — different scatter every time, because of `Math.random()`.

**HANDS-ON CHALLENGE (student drives, you coach, ~5 min):**
1. Change `HOW_MANY` to 150, then to 5 — one number controls the whole scene.
2. Bonus if time allows: make a `colours` array like `["#fff","#9ecbff","#ffd9a0"]` and set `ctx.fillStyle = colours[i % colours.length]` inside the drawing loop so stars come out in different colours. (If `%` — the remainder operator — is new, just say: "it wraps the index back around so it never runs off the end of the colours list.")

---

## 0:50 – 0:57 | Removing items from a list

**SAY:** "One more piece: sometimes you need to remove something from the middle of a list — a star gets collected, a brick gets broken. `.splice(index, 1)` removes exactly one item at a position."

**TYPE:**
```js
let stars = ["a", "b", "c", "d"];
stars.splice(1, 1);   // remove 1 item at index 1
// stars is now ["a", "c", "d"]
```

**WARN CLEARLY:** "Here's a gotcha to just be aware of for now, you don't need to solve it today: if you remove items while looping FORWARD through a list, you can accidentally skip the item right after the one you removed, because everything shifts down. The fix professionals use is looping BACKWARDS when deleting. We'll actually need this trick in Breakout later in the course — just file it away, you don't need to use it yet."

---

## 0:57 – 1:00 | Recap & what's next

**SAY, and get them to repeat the key facts back to you in their own words:**
- "Arrays hold lists. First item is index 0."
- "`.push()` adds to the end, `.splice()` removes from the middle, `.length` tells you the count."
- "A `for` loop repeats code a set number of times using a counter."
- "Loop from 0 while `i < array.length` to visit every item in a list, no matter its size."

**SAY:** "Next session we put this together with everything from Month 1 to build the actual engine behind every game — the game loop. That's the session where things start moving on their own, 60 times a second."

**Homework / practice before next session (leave this with them):**
1. Change the star field to draw a horizontal row of 8 squares evenly spaced across the canvas — hint, each square's x position is `i * 45`.
2. Write a `colours` array with 4 colours and log a different one each lap of a `for` loop from 0 to 3.
3. Try `.splice()` on a list of your own and check the result with `console.log`.

---

### Teaching notes for you
- The two ideas that need the most repetition are **zero-based indexing** and the **three parts of a for loop**. Don't rush past either — ask them to predict output before running code, every time.
- If the star demo throws an error, 9 times out of 10 it's a missing comma between object properties or a stray semicolon inside the `for(...)` parentheses instead of the required semicolons.
- Keep energy high going into the star-field build — it's the payoff moment of the session and works best if you build it live rather than pasting it in fully formed.
