## 1. Page scaffolding

- [ ] 1.1 Create `plguesser/index.html` with `<!doctype>`, `<title>Programming Language Guesser</title>`, and link to root `../common.css` plus local `style.css`
- [ ] 1.2 Add static page structure: header/title, snippet container (`<pre>`), 4 answer-button slots, feedback area, "Next" button, score + question counter, summary screen container (hidden by default)
- [ ] 1.3 Add `<script src="snippets.js"></script>` and `<script src="script.js"></script>` at the end of `<body>` (load order matters: data first)

## 2. Snippet library

- [ ] 2.1 Create `plguesser/snippets.js` exposing a global `SNIPPETS` array (or `window.SNIPPETS`) of `{ language, code, tell }` objects
- [ ] 2.2 Add at least 2 snippets each for: Python, JavaScript, Java, C, Ruby, Go, Bash, SQL (≥16 total)
- [ ] 2.3 Verify every snippet: `code` ≤15 lines and ≤80 chars per line, preserves original indentation, `tell` is one short beginner-friendly sentence
- [ ] 2.4 Add a short comment block at the top of `snippets.js` documenting the snippet style guide for future contributors

## 3. Game logic (`plguesser/script.js`)

- [ ] 3.1 Define `const ROUND_LENGTH = 10` and `const NUM_OPTIONS = 4` at the top of the file
- [ ] 3.2 Implement `buildRound()` that picks `ROUND_LENGTH` distinct snippets from `SNIPPETS` (Fisher–Yates shuffle, slice)
- [ ] 3.3 Implement `buildOptions(snippet, allLanguages)` that returns 4 unique language names — the correct one plus 3 random distractors drawn from other languages — in randomized order
- [ ] 3.4 Implement `renderQuestion(snippet, options)` that fills the snippet `<pre>`, populates the 4 answer buttons, clears feedback, hides "Next" until an answer is picked
- [ ] 3.5 Implement `onAnswer(clickedLanguage, correctLanguage, snippet)` that: locks buttons, marks correct/incorrect classes, reveals snippet's `tell`, increments score on match, reveals "Next"
- [ ] 3.6 Implement `nextQuestion()` that advances the counter; if all questions answered, calls `showSummary()`
- [ ] 3.7 Implement `showSummary()` that hides the question UI, shows final score `X / ROUND_LENGTH`, shows "Play again" button
- [ ] 3.8 Implement `playAgain()` that resets score + counter and starts a fresh round
- [ ] 3.9 Bootstrap: on `DOMContentLoaded`, kick off the first round

## 4. Styling (`plguesser/style.css`)

- [ ] 4.1 Style the snippet `<pre>` with a monospace font, generous padding, subtle background tint, and `white-space: pre` so indentation is preserved
- [ ] 4.2 Style answer buttons as a 2×2 grid (or single column on narrow screens) with large tap targets, consistent with other games in the repo
- [ ] 4.3 Add `.correct` (green) and `.incorrect` (red) classes for answer feedback states
- [ ] 4.4 Style the score/counter, feedback "tell" line, and summary screen for readability on both light and dark color schemes (the repo's `common.css` uses `color-scheme: light dark`)

## 5. Integration

- [ ] 5.1 Update the repository's top-level `/Users/glebsvechnikov/Code/word-learning-tool/index.html` to add a link to `plguesser/index.html`, using the same markup pattern as existing game links
- [ ] 5.2 Open `plguesser/index.html` directly from disk (file://) and confirm: no console errors, a question renders, picking an answer shows feedback + tell, "Next" advances, after 10 questions the summary screen appears, "Play again" restarts cleanly
- [ ] 5.3 Verify in browser devtools that no network requests are made (snippets load from the bundled script tag, not via fetch)

## 6. Wrap-up

- [ ] 6.1 Manual cross-check against `specs/guesser-game/spec.md` scenarios — confirm each scenario's WHEN/THEN is satisfied by the running page
- [ ] 6.2 Manual cross-check against `specs/snippet-library/spec.md` scenarios — confirm dataset shape, language coverage, and snippet size constraints
- [ ] 6.3 Run `openspec validate add-language-guesser-game --strict` and resolve any reported issues
