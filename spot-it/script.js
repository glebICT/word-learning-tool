const letter1 = document.getElementById("letter1");
const letter2 = document.getElementById("letter2");
const correctAnswer = document.getElementById("correct-answer");
const scoreEl = document.getElementById("score");
let score = 0;
letter1.addEventListener("click", function () {
    if (letter1.textContent === "i") {
        letter1.classList.add("correct");
        score++;
        scoreEl.textContent = "Score: " + score;
        updateLetters();
    } else {
        letter1.classList.add("incorrect");
    }
});

letter2.addEventListener("click", function () {
    if (letter2.textContent === "1") {
        letter2.classList.add("correct");
        score++;
        scoreEl.textContent = "Score: " + score;
        updateLetters();
    } else {
        letter2.classList.add("incorrect");
    }
});

correctAnswer.addEventListener("click", function () {
    if (correctAnswer.textContent === "j") {
        correctAnswer.classList.add("correct");
        score++;
        scoreEl.textContent = "Score: " + score;
        updateLetters();
    } else {
        correctAnswer.classList.add("incorrect");
    }
});

function updateLetters() {
    const images = ['jam.png', 'log.png', 'ice.png'];

    const webSafeFonts = [
        "Arial, sans-serif",
        "Verdana, sans-serif",
        "Tahoma, sans-serif",
        "Trebuchet MS, sans-serif",
        "Times New Roman, serif",
        "Georgia, serif",
        "Garamond, serif",
        "Courier New, monospace",
        "Arial Black, sans-serif",
        "Impact, sans-serif",
        "Comic Sans MS, cursive",
        "MS Gothic, sans-serif",
        "MS Mincho, serif"
    ];
    const randomIndex = Math.floor(Math.random() * webSafeFonts.length);
    const randomImgIndex = Math.floor(Math.random() * images.length);
    document.body.style.fontFamily = webSafeFonts[randomIndex];
    document.getElementById('centered-image').src = images[randomImgIndex];

    const letters = ["i", "l", "j", "1"];
    letters.sort(() => Math.random() - 0.5);

    letter1.textContent = letters[0];
    letter1.classList.remove("correct", "incorrect");
    letter2.textContent = letters[1];
    letter2.classList.remove("correct", "incorrect");
    correctAnswer.textContent = letters[2];
    correctAnswer.classList.remove("correct", "incorrect");
}

