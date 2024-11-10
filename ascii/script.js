// const art1 = `
//   .-.
//  (o Q) 
//  | O | 
//  '---' 
// `;

// const art2 = `
//   .-.
//  (o O) 
//  | O | 
//  '---' 
// `;

// const differences = [
//     "The left eye is different",
//     "The right eye is different"
// ];

// document.getElementById('art1').innerText = art1;
// document.getElementById('art2').innerText = art2;

// function checkAnswer() {
//     const userInput = document.getElementById('userInput').value.toLowerCase();
//     const result = document.getElementById('result');

//     if (differences.some(diff => userInput.includes(diff.toLowerCase()))) {
//         result.innerText = "Correct! You found a difference!";
//     } else {
//         result.innerText = "Try again!";
//     }
// }

const level5 = `
                             ~~~~
                            ~~
                          _||____
 /\ /\ /\                /\\\\\\\\
//\\/\\/\\        __    /__\\\\\\\\  _,
//\\/\\/\\     __/  \_  |__|_|_|__|   \__,
 || || ||     '-o---o-' |  |/|\| /|   /\ \
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`;



const checkAnswer = () => {
    const text = document.getElementById('level5').value;
    console.log(text,level5, text === level5);
    // if (text == level5){
    //     alert('You did it!');
    // }
    
}   

const showAnswer = () => {
    document.getElementById('level5').value = `
                             ~~~~
                            ~~
                          _||____
 /\ /\ /\                /\\\\\\\\
//\\/\\/\\        __    /__\\\\\\\\  _,
//\\/\\/\\     __/  \_  |__|_|_|__|   \__,
 || || ||     '-o---o-' |  |/|\| /|   /\ \
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`;
    
}   

const recover = () => {
    document.getElementById('level5').value = `                             ~~~~
                            ~~
                          _||____
 /\ /\ /\                /\\\\\\\\
//\\/\\/\\              /__\\\\\\\\  
//\\/\\/\\       
 || || ||`
;
}