const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');


const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let isErasing = false; // Flag to track erasing mode

let lineWidth = 5;
let startX;
let startY;

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
    if (e.button === 2) { // Check if the right mouse button is pressed
        isErasing = !isErasing; // Toggle erasing mode
        if (isErasing) {
            ctx.globalCompositeOperation = 'destination-out'; // Set the composite operation to erase
            isPainting = true; // Start erasing
            startX = e.clientX - canvasOffsetX;
            startY = e.clientY - canvasOffsetY;
            lineWidth = ctx.lineWidth * 3;
            // ctx.lineWidth = e.lineWidth *; // Set eraser line width
        } else {
            ctx.globalCompositeOperation = 'source-over'; // Reset composite operation for drawing
            ctx.lineWidth = 5; // Set default line width for drawing
        }
    }
  
});

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        console.log(e.target.value);
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }

});

const draw = (e) => {
    if (!isPainting) {
        return;
    }
     // Set the composite operation to erase
    ctx.strokeStyle = document.getElementById('stroke').value;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
   
    if (e.button === 2 && isErasing) { // Check if the right mouse button is released in erasing mode
        isPainting = false; // Stop erasing
        ctx.globalCompositeOperation = 'source-over'; // Reset the composite operation
        ctx.beginPath(); // Start a new path for drawing
        isErasing = false; // Switch back to drawing mode
        ctx.lineWidth = 5; // Set default line width for drawing
    }
    else{
        isPainting = false;
        ctx.stroke();
        ctx.beginPath();
    }
});

canvas.addEventListener('mousemove', e=>{
    draw(e)

});

function generateSymbol() {
    const canvas = document.getElementById('symbol');
    const symbol = [
        'asterisk', 
        'slash', 
        'dot', 
        'percent', 
        'plus', 
        'ampersand', 
        'question', 
        'minus', 
        'equals', 
        'circumflex', 
        'tilde', 
        'colon',
        'quote',
        'section'
    ]
    canvas.textContent = symbol[Math.floor(Math.random() * symbol.length)]
}