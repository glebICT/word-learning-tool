## ADDED Requirements

### Requirement: Snippets are bundled with the page as a static JavaScript array
The snippet dataset SHALL be exposed as a JavaScript value (e.g. a global `SNIPPETS` array or an exported constant in a module) loaded directly by `index.html` via a `<script>` tag. No `fetch` / `XMLHttpRequest` call SHALL be required to obtain snippets, so the game works when opened from a `file://` URL.

#### Scenario: Page opened from local filesystem
- **WHEN** a user opens `plguesser/index.html` directly from disk (file:// protocol)
- **THEN** all snippets load successfully without any network requests
- **AND** no console errors related to CORS or failed fetches are produced

### Requirement: Each snippet entry has a language, code, and tell field
Each entry in the snippet dataset SHALL be an object containing at minimum: a `language` (the canonical display name shown on answer buttons), a `code` (the snippet text as a string, with original formatting preserved), and a `tell` (a short one-sentence explanation, suitable for a beginner, of the visual feature that identifies the language).

#### Scenario: A snippet entry is well-formed
- **WHEN** any entry in the snippet dataset is inspected
- **THEN** it has a non-empty string `language` field
- **AND** it has a non-empty string `code` field
- **AND** it has a non-empty string `tell` field

### Requirement: Snippet code preserves original whitespace and indentation
Snippet `code` strings SHALL preserve the original line breaks and leading whitespace of the source. The renderer SHALL display them in a way that retains this formatting (e.g. inside a `<pre>` element).

#### Scenario: Indented snippet renders
- **WHEN** a Python snippet with 4-space indentation is shown to the player
- **THEN** the indentation is visible in the rendered output exactly as authored

### Requirement: Library covers at least 8 distinct languages with multiple snippets each
The bundled library SHALL include at least 8 distinct values for the `language` field, and SHALL include at least 2 snippets for each represented language so that consecutive rounds do not always show the same snippet for the same language.

#### Scenario: Library inventory at ship time
- **WHEN** the snippet library is loaded
- **THEN** the count of unique `language` values is at least 8
- **AND** every represented language has at least 2 snippet entries

### Requirement: Snippets are short enough to read at a glance
Each snippet `code` field SHALL be short enough to read without scrolling on a typical laptop screen — as a rule, at most 15 lines and at most 80 characters per line.

#### Scenario: Long snippet is rejected by the convention
- **WHEN** a contributor adds a snippet that exceeds 15 lines OR 80 characters wide
- **THEN** the snippet is rewritten or trimmed before being added to the library
