// SEGS, DIGIT_MAP, getDigitState come from logic.js
let PUZZLES = [];
let currentPuzzle = 0;
let score = 0;
let streak = 0;
let solved = [];
let digitStates = []; // array of bool[7] for each editable digit
let selectedSeg = null; // {digitIdx, segIdx}
let movesUsed = 0;
let hintUsed = false;

fetch("data.json")
    .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
    })
    .then((data) => {
        PUZZLES = data;
        solved = new Array(PUZZLES.length).fill(false);
        loadPuzzle(0);
    })
    .catch((err) => {
        document.getElementById("instruction-box").textContent =
            "Could not load data.json: " +
            err.message +
            ". Open via a local server.";
    });

function renderDisplay() {
    const puz = PUZZLES[currentPuzzle];
    const row = document.getElementById("equation-row");
    row.innerHTML = "";

    let editCount = 0;
    puz.chars.forEach((ch, ci) => {
        if (puz.editable[ci]) {
            const idx = editCount++;
            const state = digitStates[idx];
            const el = createDigitElement(state, idx, !solved[currentPuzzle]);
            row.appendChild(el);
        } else {
            const span = document.createElement("div");
            span.className = "display-char";
            span.textContent = ch;
            row.appendChild(span);
        }
    });
}

function createDigitElement(segState, digitIdx, interactive) {
    const wrap = document.createElement("div");
    wrap.className = "digit-container";

    const positions = [
        { cls: "seg-h seg-a", name: "a", top: "0px" },
        { cls: "seg-v seg-b", name: "b" },
        { cls: "seg-v seg-c", name: "c" },
        { cls: "seg-h seg-d", name: "d" },
        { cls: "seg-v seg-e", name: "e" },
        { cls: "seg-v seg-f", name: "f" },
        { cls: "seg-h seg-g", name: "g" },
    ];

    positions.forEach((pos, si) => {
        const seg = document.createElement("div");
        seg.className = "seg " + pos.cls + (segState[si] ? " on" : "");

        if (interactive) {
            seg.addEventListener("click", () => handleSegClick(digitIdx, si));
            seg.title = "segment " + pos.name;
        } else {
            seg.classList.add("locked");
        }

        // Check if this seg is currently selected
        if (
            selectedSeg &&
            selectedSeg.digitIdx === digitIdx &&
            selectedSeg.segIdx === si
        ) {
            seg.classList.add("selected");
        }

        wrap.appendChild(seg);
    });

    return wrap;
}

function handleSegClick(digitIdx, segIdx) {
    if (solved[currentPuzzle]) return;
    const puz = PUZZLES[currentPuzzle];

    if (selectedSeg === null) {
        // First click: select this segment (must be ON to pick up)
        if (digitStates[digitIdx][segIdx]) {
            selectedSeg = { digitIdx, segIdx };
            renderDisplay();
            document.getElementById("instruction-box").textContent =
                "Good! Now click an empty (dark) segment to place it there.";
        } else {
            // Clicked an empty seg — if no moves used yet, can't place without picking up
            document.getElementById("result-msg").textContent =
                "← pick up a lit segment first!";
            document.getElementById("result-msg").className = "hint-msg";
        }
    } else {
        // Second click: place the segment
        if (
            selectedSeg.digitIdx === digitIdx &&
            selectedSeg.segIdx === segIdx
        ) {
            // Deselect
            selectedSeg = null;
            renderDisplay();
            updateInstruction();
            return;
        }

        // Can only place on an empty segment
        if (!digitStates[digitIdx][segIdx]) {
            // Move: remove from selected, add to target
            digitStates[selectedSeg.digitIdx][selectedSeg.segIdx] = false;
            digitStates[digitIdx][segIdx] = true;
            movesUsed++;
            selectedSeg = null;
            updateMovePips();
            renderDisplay();
            document.getElementById("result-msg").textContent = "";
            checkSolution();
            updateInstruction();
        } else {
            document.getElementById("result-msg").textContent =
                "That segment is already on — pick an empty (dark) one.";
            document.getElementById("result-msg").className = "hint-msg";
        }
    }
}

function checkSolution() {
    const puz = PUZZLES[currentPuzzle];
    let editIdx = 0;
    let correct = true;
    puz.chars.forEach((ch, ci) => {
        if (puz.editable[ci]) {
            const target = getDigitState(puz.solutionChars[ci]);
            const current = digitStates[editIdx];
            if (JSON.stringify(current) !== JSON.stringify(target))
                correct = false;
            editIdx++;
        }
    });

    if (correct) {
        solved[currentPuzzle] = true;
        const pts = hintUsed ? 5 : movesUsed <= puz.movesAllowed ? 10 : 7;
        score += pts;
        streak++;
        document.getElementById("score-val").textContent = score;
        document.getElementById("streak-val").textContent = streak;
        const msg = document.getElementById("result-msg");
        msg.textContent = "✓ correct! " + puz.solutionChars.join("");
        msg.className = "correct";
        document.getElementById("btn-next").style.display = "";
        document.getElementById("instruction-box").textContent =
            "🎉 Well done! " + puz.solutionChars.join("") + " is correct!";
        flashScore("+" + pts);
        updateProgressDots();
    }
}

function flashScore(txt) {
    const el = document.getElementById("score-flash");
    el.textContent = txt;
    el.classList.add("show");
    setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "";
        el.classList.remove("show");
    }, 900);
}

function updateInstruction() {
    const puz = PUZZLES[currentPuzzle];
    if (solved[currentPuzzle]) return;
    const rem = puz.movesAllowed - movesUsed;
    if (rem > 0) {
        document.getElementById("instruction-box").textContent =
            puz.label +
            " You have " +
            rem +
            " move" +
            (rem > 1 ? "s" : "") +
            " left. Pick up a lit segment (orange) and place it somewhere dark.";
    } else {
        document.getElementById("instruction-box").textContent =
            "No moves left! Try the hint or reset to try again.";
    }
}

function updateMovePips() {
    const puz = PUZZLES[currentPuzzle];
    const el = document.getElementById("moves-indicator");
    el.innerHTML = "";
    const label = document.createElement("span");
    label.textContent = "moves:";
    el.appendChild(label);
    for (let i = 0; i < puz.movesAllowed; i++) {
        const pip = document.createElement("div");
        pip.className = "move-pip" + (i < movesUsed ? " used" : "");
        el.appendChild(pip);
    }
}

function updateProgressDots() {
    const dots = document.getElementById("progress-dots");
    dots.innerHTML = "";
    PUZZLES.forEach((p, i) => {
        const d = document.createElement("div");
        d.className =
            "prog-dot" +
            (solved[i] ? " done" : i === currentPuzzle ? " active" : "");
        d.title = "Puzzle " + (i + 1);
        d.addEventListener("click", () => {
            loadPuzzle(i);
        });
        dots.appendChild(d);
    });
}

function loadPuzzle(idx) {
    currentPuzzle = idx;
    hintUsed = false;
    movesUsed = 0;
    selectedSeg = null;
    const puz = PUZZLES[idx];

    // Build digit states for editable digits
    digitStates = [];
    puz.chars.forEach((ch, ci) => {
        if (puz.editable[ci]) {
            digitStates.push(getDigitState(ch));
        }
    });

    document.getElementById("result-msg").textContent = "";
    document.getElementById("result-msg").className = "";
    document.getElementById("btn-next").style.display = "none";
    document.getElementById("puzzle-num").textContent =
        idx + 1 + "/" + PUZZLES.length;
    updateMovePips();
    updateInstruction();
    renderDisplay();
    updateProgressDots();
}

document.getElementById("btn-hint").addEventListener("click", () => {
    if (solved[currentPuzzle]) return;
    const puz = PUZZLES[currentPuzzle];
    hintUsed = true;
    const msg = document.getElementById("result-msg");
    msg.textContent = "💡 " + puz.hint;
    msg.className = "hint-msg";
});

document.getElementById("btn-reset").addEventListener("click", () => {
    if (solved[currentPuzzle]) return;
    streak = Math.max(0, streak - 1);
    document.getElementById("streak-val").textContent = streak;
    loadPuzzle(currentPuzzle);
});

document.getElementById("btn-next").addEventListener("click", () => {
    if (currentPuzzle < PUZZLES.length - 1) {
        loadPuzzle(currentPuzzle + 1);
    } else {
        // All done!
        document.getElementById("instruction-box").textContent =
            "🏆 Amazing! You finished all " +
            PUZZLES.length +
            " puzzles! Score: " +
            score;
        document.getElementById("btn-next").style.display = "none";
    }
});
