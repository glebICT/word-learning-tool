const SEGS = ["a", "b", "c", "d", "e", "f", "g"];

// Each digit's segments: a,b,c,d,e,f,g (1 = on)
const DIGIT_MAP = {
    0: [1, 1, 1, 1, 1, 1, 0],
    1: [0, 1, 1, 0, 0, 0, 0],
    2: [1, 1, 0, 1, 1, 0, 1],
    3: [1, 1, 1, 1, 0, 0, 1],
    4: [0, 1, 1, 0, 0, 1, 1],
    5: [1, 0, 1, 1, 0, 1, 1],
    6: [1, 0, 1, 1, 1, 1, 1],
    7: [1, 1, 1, 0, 0, 0, 0],
    8: [1, 1, 1, 1, 1, 1, 1],
    9: [1, 1, 1, 1, 0, 1, 1],
};

function getDigitState(ch) {
    const n = parseInt(ch);
    if (!isNaN(n) && DIGIT_MAP[n]) return [...DIGIT_MAP[n]];
    return null;
}

// Count segment toggles needed to go from one digit state to another.
// A "move" in the game is a swap (1 off + 1 on), so a puzzle is solvable
// iff on === off across all editable digits, and that count === movesAllowed.
function segDiff(fromState, toState) {
    let on = 0;
    let off = 0;
    for (let i = 0; i < 7; i++) {
        if (fromState[i] && !toState[i]) off++;
        else if (!fromState[i] && toState[i]) on++;
    }
    return { on, off };
}

// Sum of segDiff across every editable digit in a puzzle.
function puzzleSegDiff(puz) {
    let on = 0;
    let off = 0;
    puz.chars.forEach((ch, ci) => {
        if (!puz.editable[ci]) return;
        const from = getDigitState(ch);
        const to = getDigitState(puz.solutionChars[ci]);
        const d = segDiff(from, to);
        on += d.on;
        off += d.off;
    });
    return { on, off };
}
