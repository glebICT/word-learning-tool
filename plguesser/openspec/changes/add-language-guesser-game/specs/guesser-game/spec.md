## ADDED Requirements

### Requirement: Game launches on page load with no setup screen
The game SHALL begin a new round automatically when `plguesser/index.html` is opened, with no intermediate menu, settings, or login.

#### Scenario: Player opens the page
- **WHEN** a player opens `plguesser/index.html` in a browser
- **THEN** the first question is displayed within 1 second
- **AND** the score is reset to 0
- **AND** the question counter shows `1 / 10` (or whatever `ROUND_LENGTH` is set to)

### Requirement: Each question presents one code snippet and four language options
The game SHALL display the snippet's text and exactly four answer buttons per question. One button is the correct language; the other three are randomly chosen from the other languages represented in the snippet library, with no duplicates.

#### Scenario: Question renders
- **WHEN** a new question is shown
- **THEN** the snippet text is rendered in a monospace block
- **AND** exactly four answer buttons are visible
- **AND** one of the four buttons matches the snippet's actual language
- **AND** the other three buttons each show a different, distinct language name
- **AND** the order of the four buttons is randomized so the correct answer is not always in the same position

### Requirement: Answering a question shows immediate feedback
When the player clicks an answer, the game SHALL lock the answer buttons (no further clicking changes the round), indicate which choice was correct and which the player picked, and display the snippet's educational "tell" text.

#### Scenario: Player picks the correct answer
- **WHEN** the player clicks the button matching the snippet's language
- **THEN** that button is marked as correct (e.g. green / check)
- **AND** the score is incremented by 1
- **AND** the "tell" text for the snippet is shown beneath the snippet
- **AND** all four answer buttons become non-interactive

#### Scenario: Player picks a wrong answer
- **WHEN** the player clicks a button that does NOT match the snippet's language
- **THEN** that button is marked as incorrect (e.g. red / cross)
- **AND** the button containing the correct language is also visually marked as correct
- **AND** the score is NOT incremented
- **AND** the "tell" text for the snippet is shown beneath the snippet
- **AND** all four answer buttons become non-interactive

### Requirement: Player advances to the next question via a Next button
After answering, the game SHALL present a "Next" control. Clicking it advances to the next question in the round.

#### Scenario: Advancing mid-round
- **WHEN** the player has answered a question and there are remaining questions in the round
- **AND** the player clicks "Next"
- **THEN** a new question is loaded
- **AND** the question counter advances by 1
- **AND** the previous feedback and "tell" text are cleared

### Requirement: Round ends after ROUND_LENGTH questions with a summary screen
After the last question of the round, the game SHALL show a summary that reports the final score and offers a way to play again.

#### Scenario: Round completes
- **WHEN** the player answers the final question of the round
- **AND** the player clicks "Next" (or equivalent control)
- **THEN** a summary screen is shown displaying the final score in the form `X / ROUND_LENGTH`
- **AND** a "Play again" button is visible

#### Scenario: Player chooses Play again
- **WHEN** the player clicks "Play again" on the summary screen
- **THEN** the score resets to 0
- **AND** a new round begins with freshly shuffled snippets and options

### Requirement: No question repeats within a single round
Within one round, the game SHALL NOT show the same snippet twice. Across rounds (after Play again), snippets MAY repeat.

#### Scenario: Round of 10 plays out
- **WHEN** the player plays a complete 10-question round
- **THEN** the 10 snippets shown are all distinct entries from the snippet library

### Requirement: The game is linked from the repository's root landing page
The repository's top-level `index.html` SHALL include a link to `plguesser/index.html`, formatted consistently with the existing links to other games.

#### Scenario: Visitor views the landing page
- **WHEN** a visitor opens the top-level `index.html`
- **THEN** a link to the programming language guesser game is visible
- **AND** the link uses the same markup pattern as the other game links on that page
