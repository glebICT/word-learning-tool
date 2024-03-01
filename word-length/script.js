const words = [ "banana", "cat", "elephant", "door", "heart", "giraffe"];
const randomIndex = Math.floor(Math.random() * words.length);
const targetWord = words[randomIndex];
window.onload = function () {

    const wordElement = document.getElementById("word");
    wordElement.textContent = "_ ".repeat(targetWord.length);
    console.log(targetWord);

};
function checkGuess() {
    const guess = document.getElementById("input").value.toLowerCase();
    if (guess === targetWord) {
        alert("Correct!");
        // location.reload(); 
    } else {
        alert("Try again!");
    }
}
