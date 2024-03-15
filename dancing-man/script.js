function main() {
    const input = document.getElementById('a');
    const output = document.getElementById('x');
    input.addEventListener("change", (event) => {
        console.log(event.target.value, output);
        output.textContent = event.target.value
    })
}