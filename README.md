# 🟥 Red Box Game

> A deceptively simple browser game built with vanilla HTML, CSS, and JavaScript — powered by an optimal Queue + Set algorithm.

---

## 🎮 Live Demo

🔗 [Play it here](https://five-box-game.vercel.app/) ← _replace with your Vercel/Netlify URL_

---

## 📌 About The Project

Red Box Game is an interactive 5×5 grid puzzle where only **3 boxes can be red at any time**.

- Click any blue box → it turns **red**
- Click a red box → it toggles **back to blue**
- When a 4th box is clicked → the **oldest red box** automatically reverts to blue (FIFO)

Simple rules. Satisfying to play. Built to demonstrate clean algorithm design and minimal frontend architecture.

---

## 🧠 Algorithm Design

This is the most interesting part of the project.

### The Problem

At any point, only 3 boxes can be red. When a 4th is clicked, the **first** box that turned red must revert. This is classic **FIFO (First In, First Out)** behaviour.

### Data Structures Used

| Structure | Role | Complexity |
|-----------|------|------------|
| `Array` (as Queue) | Tracks order of red boxes for FIFO eviction | O(1) enqueue/dequeue |
| `Set` | Instant lookup — is this box already red? | O(1) has/add/delete |

### Why Not Just an Array?

A plain array would require scanning every element on each click to check if a box is already red — **O(n)**. Adding a `Set` alongside the queue gives us **O(1) lookup** with no tradeoff.

### Time & Space Complexity

| Operation | Complexity | Reason |
|-----------|------------|--------|
| Click handler | **O(1)** | All ops are constant — Set lookup, queue push/shift |
| Space | **O(1)** | Queue and Set are permanently bounded at size 3 |

> The queue and set **never exceed 3 elements** regardless of how many times the user clicks. Memory usage is fixed — not proportional to input.

### Core Algorithm (Pseudocode)

```
ON CLICK(boxId):

  if boxId is already RED:
    → remove from queue (any position)
    → remove from set
    → turn box BLUE
    → return

  if queue.length === 3:
    → evict oldest = queue.shift()
    → remove oldest from set
    → turn oldest box BLUE

  → push boxId to queue
  → add boxId to set
  → turn boxId RED
```

---

## 🗂️ Project Structure

```
red-box-game/
│
├── index.html      # Shell — grid container, links CSS/JS
├── style.css       # Grid layout, box states, transitions
└── script.js       # State management + click logic
```

No frameworks. No dependencies. No build step. Pure vanilla JS.

---

## ⚙️ Architecture

The codebase is split into **3 clean layers**:

```
UI Layer (HTML/CSS)
  └── 5×5 grid, blue/red visual states, hover transitions

State Layer (JS)
  └── queue[]  → ordered list of red box IDs (FIFO)
  └── redSet   → Set of currently red box IDs (O(1) lookup)

Logic Layer (JS)
  └── handleClick(id)  → decision router
  └── setRed(id)       → atomically updates state + DOM to red
  └── setBlue(id)      → atomically updates state + DOM to blue
```

Each state mutation function updates **both state and DOM together** — they are never out of sync.

---

## 🚀 Getting Started

### Run Locally

No install needed. Just open `index.html` in your browser:

```bash
git clone https://github.com/your-username/red-box-game.git
cd red-box-game
open index.html   # or double-click it
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or drag the project folder into [vercel.com/new](https://vercel.com/new) — no CLI needed.

### Deploy to Netlify

Drag and drop the project folder at [app.netlify.com/drop](https://app.netlify.com/drop). Done in 10 seconds.

---

## ✨ Features

- ✅ 5×5 interactive grid (25 boxes)
- ✅ FIFO eviction — oldest red box resets automatically
- ✅ Toggle behaviour — clicking a red box turns it blue
- ✅ Live counter — shows current red box count (x / 3)
- ✅ Smooth CSS transitions between states
- ✅ Hover effects — tactile feel without complexity
- ✅ Zero dependencies — no React, no libraries, no build tools

---

## 🧪 Edge Cases Handled

| Scenario | Behaviour |
|----------|-----------|
| Click a red box | Toggles back to blue, removed from queue |
| Click 4th unique box | Oldest red evicted first, new box turns red |
| Rapid clicking | State and DOM always in sync — no race conditions |
| Click same box repeatedly | Toggles cleanly each time |

---

## 🛠️ Built With

- HTML5
- CSS3 (Grid, Transitions, Custom Properties)
- Vanilla JavaScript (ES6+)

---

## 📄 License

MIT — free to use, modify, and distribute.
