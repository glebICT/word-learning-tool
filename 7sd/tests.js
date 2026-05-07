const results = [];

function test(name, fn) {
    try {
        fn();
        results.push({ name, pass: true });
    } catch (err) {
        results.push({ name, pass: false, msg: err.message });
    }
}

function assert(cond, msg) {
    if (!cond) throw new Error(msg || "assertion failed");
}

function assertEq(actual, expected, msg) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);
    if (a !== e) {
        throw new Error(
            (msg ? msg + "\n" : "") +
                "expected: " + e + "\n" +
                "actual:   " + a,
        );
    }
}

// ---- logic.js: SEGS / DIGIT_MAP ----

test("SEGS lists all seven segments a..g", () => {
    assertEq(SEGS, ["a", "b", "c", "d", "e", "f", "g"]);
});

test("DIGIT_MAP defines all 10 digits", () => {
    for (let n = 0; n <= 9; n++) {
        assert(Array.isArray(DIGIT_MAP[n]), "missing digit " + n);
        assertEq(
            DIGIT_MAP[n].length,
            7,
            "digit " + n + " must have 7 segments",
        );
        for (const v of DIGIT_MAP[n]) {
            assert(v === 0 || v === 1, "digit " + n + " has non-binary segment");
        }
    }
});

test("DIGIT_MAP segment counts match expected lit-segment counts", () => {
    // Standard 7-seg lit-segment counts for digits 0..9
    const expected = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
    for (let n = 0; n <= 9; n++) {
        const lit = DIGIT_MAP[n].reduce((a, b) => a + b, 0);
        assertEq(lit, expected[n], "digit " + n + " lit-count");
    }
});

// ---- logic.js: getDigitState ----

test("getDigitState returns a copy for valid digits", () => {
    const s = getDigitState("5");
    assertEq(s, DIGIT_MAP[5]);
    s[0] = 0;
    assertEq(DIGIT_MAP[5][0], 1, "DIGIT_MAP must not be mutated");
});

test("getDigitState returns null for non-digit chars", () => {
    assertEq(getDigitState("="), null);
    assertEq(getDigitState("+"), null);
    assertEq(getDigitState("×"), null);
    assertEq(getDigitState("÷"), null);
    assertEq(getDigitState("-"), null);
});

// ---- logic.js: segDiff ----

test("segDiff counts on/off toggles between two digits", () => {
    // 8 → 9: 8 has all segments, 9 drops segment e
    assertEq(segDiff(DIGIT_MAP[8], DIGIT_MAP[9]), { on: 0, off: 1 });
    // 9 → 8: opposite
    assertEq(segDiff(DIGIT_MAP[9], DIGIT_MAP[8]), { on: 1, off: 0 });
    // identity
    assertEq(segDiff(DIGIT_MAP[3], DIGIT_MAP[3]), { on: 0, off: 0 });
});

// ---- data.json: structural validity ----

const dataPromise = fetch("data.json").then((r) => {
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
});

dataPromise
    .then((PUZZLES) => {
        test("data.json has at least one puzzle", () => {
            assert(Array.isArray(PUZZLES) && PUZZLES.length > 0);
        });

        PUZZLES.forEach((puz, i) => {
            const tag = "puzzle[" + i + "] (" + puz.equation + " → " + puz.solution + ")";

            test(tag + " has matching chars/editable/solutionChars lengths", () => {
                assertEq(puz.editable.length, puz.chars.length, "editable length");
                assertEq(
                    puz.solutionChars.length,
                    puz.chars.length,
                    "solutionChars length",
                );
            });

            test(tag + " has movesAllowed >= 1", () => {
                assert(
                    Number.isInteger(puz.movesAllowed) && puz.movesAllowed >= 1,
                    "movesAllowed must be a positive integer",
                );
            });

            test(tag + " marks at least one editable position", () => {
                assert(puz.editable.some(Boolean), "no editable positions");
            });

            test(tag + " editable positions hold digits in both equation and solution", () => {
                puz.chars.forEach((ch, ci) => {
                    if (!puz.editable[ci]) return;
                    assert(
                        getDigitState(ch) !== null,
                        "chars[" + ci + "]='" + ch + "' is not a digit",
                    );
                    assert(
                        getDigitState(puz.solutionChars[ci]) !== null,
                        "solutionChars[" + ci + "]='" +
                            puz.solutionChars[ci] +
                            "' is not a digit",
                    );
                });
            });

            test(tag + " non-editable positions match between equation and solution", () => {
                puz.chars.forEach((ch, ci) => {
                    if (puz.editable[ci]) return;
                    assertEq(
                        puz.solutionChars[ci],
                        ch,
                        "non-editable char at " + ci + " differs",
                    );
                });
            });

            test(tag + " equation differs from solution", () => {
                assert(
                    JSON.stringify(puz.chars) !== JSON.stringify(puz.solutionChars),
                    "puzzle has no change to make",
                );
            });

            // The game's only mechanic is a swap (1 segment off + 1 segment on).
            // For a puzzle to be solvable, on-count must equal off-count, and
            // that count must equal movesAllowed.
            test(tag + " is solvable in exactly movesAllowed swaps", () => {
                const { on, off } = puzzleSegDiff(puz);
                assertEq(
                    on,
                    off,
                    "swap mechanic requires equal on/off counts (got on=" +
                        on +
                        ", off=" +
                        off +
                        ")",
                );
                assertEq(
                    on,
                    puz.movesAllowed,
                    "movesAllowed=" +
                        puz.movesAllowed +
                        " but puzzle needs " +
                        on +
                        " swap(s)",
                );
            });
        });
    })
    .catch((err) => {
        results.push({
            name: "load data.json",
            pass: false,
            msg: err.message + " — open via a local server (file:// won't work).",
        });
    })
    .finally(render);

function render() {
    const root = document.getElementById("test-results");
    const summary = document.getElementById("test-summary");
    root.innerHTML = "";

    let passed = 0;
    results.forEach((r) => {
        const div = document.createElement("div");
        div.className = "test-result " + (r.pass ? "pass" : "fail");
        const marker = r.pass ? "✓" : "✗";
        div.innerHTML =
            '<span class="marker">' +
            marker +
            '</span><span class="name"></span>';
        div.querySelector(".name").textContent = r.name;
        if (!r.pass) {
            const msg = document.createElement("div");
            msg.className = "msg";
            msg.textContent = r.msg;
            div.appendChild(msg);
        }
        root.appendChild(div);
        if (r.pass) passed++;
    });

    const total = results.length;
    const failed = total - passed;
    summary.textContent =
        passed + " / " + total + " passed" + (failed ? " · " + failed + " failed" : "");
    summary.className = failed === 0 ? "all-pass" : "has-fail";
}
