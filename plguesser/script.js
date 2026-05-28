const EASY_LANGS = [
    "Python", "JavaScript", "Java", "C", "SQL", "Go", "Ruby", "PHP",
];

const MEDIUM_LANGS = [
    ...EASY_LANGS,
    "TypeScript", "C#", "Swift", "Kotlin", "Rust", "Bash", "C++", "Perl",
];

const HARD_LANGS = [
    ...MEDIUM_LANGS,
    "MATLAB", "Julia", "R", "Fortran", "COBOL", "Lisp", "Scheme", "Haskell",
    "OCaml", "F#", "Pascal", "Ada", "Visual Basic", "Objective-C",
    "1C", "易语言",
];

const IMPOSSIBLE_LANGS = [
    ...HARD_LANGS,
    "Erlang", "Elixir", "Scala", "Clojure", "Groovy", "Nim", "Zig", "Crystal",
    "Dart", "Tcl", "Lua", "Prolog", "Smalltalk", "Forth", "APL", "Algol 68",
    "REXX", "Modula-2", "BASIC", "Eiffel", "PL/I", "Logo", "Assembly", "VHDL",
    "Linotte", "قلب",
    "Uiua", "LOLCODE", "Befunge", "INTERCAL", "Wolfram", "BQN",
];

const MODES = {
    8:  { label: "Easy",       languages: EASY_LANGS },
    16: { label: "Medium",     languages: MEDIUM_LANGS },
    32: { label: "Hard",       languages: HARD_LANGS },
    64: { label: "Impossible", languages: IMPOSSIBLE_LANGS },
};

const els = {
    snippet: document.getElementById("snippet"),
    form: document.getElementById("guess-form"),
    guess: document.getElementById("guess"),
    submit: document.getElementById("submit"),
    languages: document.getElementById("languages"),
    result: document.getElementById("result"),
    tell: document.getElementById("tell"),
    next: document.getElementById("next"),
    counter: document.getElementById("counter"),
    score: document.getElementById("score"),
    modeLabel: document.getElementById("mode-label"),
    game: document.getElementById("game"),
    modeSelect: document.getElementById("mode-select"),
    modeButtons: document.querySelectorAll(".mode-btn"),
    summary: document.getElementById("summary"),
    finalScore: document.getElementById("final-score"),
    playAgain: document.getElementById("play-again"),
};

let roundLength = 8;
let round = [];
let currentIndex = 0;
let score = 0;
let answered = false;

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function activeLanguages() {
    return MODES[roundLength].languages;
}

function populateDatalist() {
    const langs = [...activeLanguages()].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    els.languages.innerHTML = "";
    for (const lang of langs) {
        const opt = document.createElement("option");
        opt.value = lang;
        els.languages.appendChild(opt);
    }
}

function buildRound() {
    const allowed = new Set(activeLanguages());
    const byLanguage = new Map();
    for (const lang of allowed) byLanguage.set(lang, []);
    for (const snippet of SNIPPETS) {
        if (allowed.has(snippet.language)) {
            byLanguage.get(snippet.language).push(snippet);
        }
    }
    const oneEach = [];
    for (const variants of byLanguage.values()) {
        if (variants.length > 0) {
            oneEach.push(variants[Math.floor(Math.random() * variants.length)]);
        }
    }
    return shuffle(oneEach).slice(0, roundLength);
}

function removeFromDatalist(language) {
    const opts = els.languages.querySelectorAll("option");
    for (const opt of opts) {
        if (opt.value === language) {
            opt.remove();
            return;
        }
    }
}

function normalize(s) {
    return s.trim().toLowerCase();
}

function renderQuestion() {
    const snippet = round[currentIndex];
    answered = false;

    els.snippet.textContent = snippet.code;
    els.tell.textContent = "";
    els.result.textContent = "";
    els.result.className = "";
    els.guess.value = "";
    els.guess.disabled = false;
    els.guess.classList.remove("correct", "incorrect");
    els.submit.disabled = false;
    els.next.hidden = true;
    els.counter.textContent = `${currentIndex + 1} / ${roundLength}`;
    els.score.textContent = `Score: ${score}`;
    els.modeLabel.textContent = MODES[roundLength]?.label || "";
    els.guess.focus();
}

function onSubmit(event) {
    event.preventDefault();
    if (answered) return;

    const snippet = round[currentIndex];
    const picked = els.guess.value.trim();
    if (!picked) return;

    answered = true;
    els.guess.disabled = true;
    els.submit.disabled = true;

    const isCorrect = normalize(picked) === normalize(snippet.language);
    if (isCorrect) {
        score++;
        els.score.textContent = `Score: ${score}`;
        els.guess.classList.add("correct");
        els.result.textContent = `Correct — ${snippet.language}`;
        els.result.className = "correct";
    } else {
        els.guess.classList.add("incorrect");
        els.result.textContent = `Not quite — it was ${snippet.language}`;
        els.result.className = "incorrect";
    }

    els.tell.textContent = snippet.tell;
    removeFromDatalist(snippet.language);
    els.next.hidden = false;
    els.next.focus();
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex >= round.length) {
        showSummary();
    } else {
        renderQuestion();
    }
}

function showSummary() {
    els.game.hidden = true;
    els.summary.hidden = false;
    els.finalScore.textContent = `You scored ${score} / ${roundLength} (${MODES[roundLength].label})`;
    els.playAgain.focus();
}

function startGame(length) {
    roundLength = length;
    score = 0;
    currentIndex = 0;
    populateDatalist();
    round = buildRound();
    els.modeSelect.hidden = true;
    els.summary.hidden = true;
    els.game.hidden = false;
    renderQuestion();
}

function backToModeSelect() {
    els.summary.hidden = true;
    els.game.hidden = true;
    els.modeSelect.hidden = false;
}

els.form.addEventListener("submit", onSubmit);
els.next.addEventListener("click", nextQuestion);
els.playAgain.addEventListener("click", backToModeSelect);
els.modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        startGame(Number(btn.dataset.length));
    });
});

const LANGUAGE_CATEGORIES = {
    "Mainstream / Web":   ["Python", "JavaScript", "TypeScript", "PHP", "Ruby"],
    "Systems":            ["C", "C++", "Rust", "Go", "Zig", "Assembly"],
    "JVM":                ["Java", "Kotlin", "Scala", "Clojure", "Groovy"],
    ".NET":               ["C#", "F#", "Visual Basic"],
    "Mobile":             ["Swift", "Objective-C", "Dart"],
    "Functional":         ["Haskell", "OCaml", "Erlang", "Elixir", "Lisp", "Scheme"],
    "Scientific / Data":  ["MATLAB", "Julia", "R", "Wolfram"],
    "Scripting":          ["Bash", "Perl", "Lua", "Tcl"],
    "Logic / Query":      ["Prolog", "SQL"],
    "Hardware":           ["VHDL"],
    "Modern niche":       ["Nim", "Crystal"],
    "Historic / Legacy":  ["COBOL", "PL/I", "Algol 68", "BASIC", "Pascal", "Ada",
                           "REXX", "Modula-2", "Eiffel", "Smalltalk", "Fortran",
                           "Logo"],
    "Array languages":    ["APL", "BQN", "Uiua"],
    "Country-specific":   ["1C", "易语言", "Linotte", "قلب"],
    "Esoteric":           ["LOLCODE", "Befunge", "INTERCAL"],
};

(function logLanguagesByCategory() {
    const total = Object.values(LANGUAGE_CATEGORIES)
        .reduce((n, langs) => n + langs.length, 0);
    console.group(`Programming languages by category (${total} total)`);
    for (const [category, langs] of Object.entries(LANGUAGE_CATEGORIES)) {
        console.log(
            `%c${category}%c (${langs.length}): ${langs.join(", ")}`,
            "font-weight: bold",
            "font-weight: normal"
        );
    }
    console.groupEnd();
})();
