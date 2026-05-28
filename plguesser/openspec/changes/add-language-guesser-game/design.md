## Context

`plguesser/` is a new sibling of the static games under `/Users/glebsvechnikov/Code/word-learning-tool/`. Those games (e.g. `logic_detectives/`, `7sd/`, `greek-puzzle/`) are plain HTML pages served straight from disk — no build system, no framework, no backend. The root `common.css` provides a shared baseline (system font, centered layout, large buttons). The audience is high school students, and the brief is explicitly "simple."

## Goals / Non-Goals

**Goals:**
- Single-page game that runs by opening `plguesser/index.html` in a browser — same UX as every other game in the repo.
- Curated, hand-picked snippets that are visually distinctive enough for a beginner to learn from. Quality over quantity.
- Per-question feedback that teaches the "tell" (e.g. "`def` and indentation → Python"), so the game has educational value beyond a leaderboard score.
- Linkable from the root `index.html` landing page in one line, matching how other games are listed.

**Non-Goals:**
- No backend, no persistence between sessions, no accounts, no leaderboards.
- No syntax highlighter library or any third-party JS dependency. Snippets render as plain monospace `<pre>` text.
- No free-text input mode in v1 — multiple-choice only (lower friction for beginners; deterministic to grade).
- No difficulty levels, timers, or hint system in v1 — these are tempting but violate the "simple" brief and can be layered on later.
- No support for fetching snippets from a remote source; everything is bundled.

## Decisions

### Decision: Vanilla HTML/CSS/JS, no framework, no build step
Matches every sibling game in the repo. A build system (Vite, Webpack, anything) would be the only thing in this repo requiring node tooling and would dwarf the game in complexity. Tradeoff: no JSX, no module bundling — but for ~200 lines of JS, neither is needed.

**Alternatives considered:** React + Vite (rejected: massive overkill); Svelte (same).

### Decision: Multiple-choice answers, exactly 4 options per round
Lowest cognitive load for the target audience and zero ambiguity in grading (no "is `JS` the same answer as `JavaScript`?" problems). 4 options is the sweet spot — enough to feel non-trivial, few enough to fit on one screen with large tap targets.

**Alternatives considered:** Free-text input (rejected: spelling/casing friction, harder for beginners). 2 options (rejected: too easy, becomes a coin flip). 6+ options (rejected: harder to lay out, slower to read).

### Decision: Snippet data lives in a separate JS file as a plain array
`snippets.js` exports a `SNIPPETS` array of `{ language, code, tell }` objects. The game module reads from it. This keeps content and game logic separate so the snippet list can grow without touching `script.js`.

**Alternatives considered:** Inline in `script.js` (rejected: clutters logic, makes contributions harder). External JSON loaded via `fetch` (rejected: introduces CORS issues when opening the file via `file://`, which is how these games are meant to be runnable).

### Decision: Distractor options for each round are drawn from a pool of other languages in the dataset
The answer set for a round is the correct language plus 3 randomly chosen distractors from the other languages represented in `SNIPPETS`. This means adding a new language to `snippets.js` automatically makes it a potential distractor everywhere else — no separate distractor list to maintain.

**Alternatives considered:** Hardcoded distractor lists per snippet (rejected: high maintenance cost; rigid).

### Decision: Round length is a fixed constant (default 10) defined at the top of `script.js`
Not configurable in the UI in v1. A `const ROUND_LENGTH = 10` is trivially changeable in source if a teacher wants a longer set.

### Decision: Show the "tell" only AFTER the player answers, regardless of correctness
The educational moment lands when the player commits — showing the tell before the answer would let players game it, and showing it only on wrong answers would punish correct guessers by withholding the explanation.

## Risks / Trade-offs

- **Snippet quality is the whole game.** If snippets are ambiguous or too short, the game stops being educational and becomes random. → Mitigation: bundle ~3 snippets per language (so each round picks one fresh), and write a short style guide in `snippets.js` comments for anyone adding more.
- **No syntax highlighting → snippets are visually less appealing than real code editors.** → Mitigation: use a monospace font, generous padding, and a subtle background tint on the `<pre>` block. Acceptable for v1 given the no-dependencies constraint.
- **Random distractor selection can occasionally produce a "too obvious" round** (e.g. Python snippet with distractors SQL, Bash, HTML where none look anything like the snippet). → Mitigation: accept this as fine for v1; if it becomes a problem, add a "visually similar languages" tag in the dataset later.
- **No persistence means refreshing mid-game loses progress.** → Acceptable for a single-sitting game with ~10 rounds. Not worth localStorage complexity in v1.

## Migration Plan

Greenfield addition — no migration. Deploy = commit the new files and the updated root `index.html` link.

## Open Questions

- Which exact 8 languages should ship in v1? Proposed set: Python, JavaScript, Java, C, Ruby, Go, Bash, SQL. To be confirmed during implementation; the data structure is agnostic.
- Should the root `index.html` link use the same labeling style as e.g. "Greek Quantifiers"? Will follow whatever pattern is already there when implementing.
