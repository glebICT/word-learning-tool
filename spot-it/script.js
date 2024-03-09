const letter1 = document.getElementById("letter1");
const letter2 = document.getElementById("letter2");
const correctAnswer = document.getElementById("correct-answer");

let score = 0;

function updateScore(event){
    console.log(event.classList.contains('correct'));
    if(event.classList.contains('correct')){
        score = score+1;
    }else{
        score = score-1;
    }
    console.log(score);
    const scoreEl = document.getElementById("score");
    scoreEl.textContent = "Score: " + score;
    updateLetters()
}


function setLetters(correctLetter) {
    const letters = ["i", "l", "j", "1"];
    letters.sort(() => Math.random() - 0.5);
    const buttons = document.getElementsByClassName('letter');
    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        button.textContent = letters[index]
        button.classList.remove("correct", "incorrect");
        if(letters[index] === correctLetter){
            button.classList.add("correct");
        }
        
    }
   
}

function updateLetters() {
    const images = ['jam.png', 'log.png', 'ice.png'];
   

    const webSafeFonts = [
        "Arial",
        "Verdana",
        "Tahoma",
        "Trebuchet MS",
        "Times New Roman",
        "Georgia",
        "Garamond",
        "Courier New",
        "Arial Black",
        "Impact",
        "Comic Sans MS",
        "MS Gothic",
        "MS Mincho"
    ];

    const randomIndex = Math.floor(Math.random() * webSafeFonts.length);
    const randomImgIndex = Math.floor(Math.random() * images.length);
    document.body.style.fontFamily = webSafeFonts[randomIndex];
    document.getElementById('centered-image').src = images[randomImgIndex];

    setLetters(images[randomImgIndex].charAt(0))
   
}

