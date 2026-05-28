## Why

High school students who are exposed to programming see snippets of many languages but rarely learn to recognize them by sight. A short, low-stakes "guess the language" game gives them a fast, fun way to build that visual literacy — and adds another single-page game to the existing collection in this repo (alongside Connections, Logic Detectives, Greek Quantifiers, etc.).

## What Changes

- Add a new browser-based mini-game at `plguesser/index.html` that shows a short code snippet and asks the player to identify the programming language.
- Provide multiple-choice answers (4 options per round) so the game is approachable for students with limited exposure to syntax.
- Ship a curated, bundled set of snippets covering ~8 visually distinct languages (e.g. Python, JavaScript, Java, C, Ruby, Go, Bash, SQL). No backend, no network calls — pure static HTML/CSS/JS to match the rest of the repo.
- Track score across a fixed-length round (default 10 questions) and show per-question feedback (correct/incorrect + a one-line "tell" that gives away the language, for the educational angle).
- Link the new game from the top-level `index.html` landing page.

## Capabilities

### New Capabilities

- `guesser-game`: Core game loop — round setup, snippet presentation, answer selection, feedback, scoring, end-of-round summary, and replay.
- `snippet-library`: Curated dataset of code snippets bundled with the page. Each entry pairs a snippet with its language label and a short educational "tell" shown after answering.

### Modified Capabilities

_None — this is a greenfield addition._

## Impact

- **New files** under `plguesser/`: `index.html`, `style.css`, `script.js`, `snippets.js` (or equivalent data module).
- **Modified**: top-level `/Users/glebsvechnikov/Code/word-learning-tool/index.html` gains a link to the new game (matches the pattern used for the existing games).
- **Dependencies**: none — vanilla HTML/CSS/JS, no build step, no third-party libraries. Optional use of the existing root-level `common.css` for visual consistency.
- **Hosting**: works as a plain static page (same as siblings).
