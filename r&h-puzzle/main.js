
function getCells(){
    let counter = 0
    const cells = document.getElementsByTagName('td')
    function updateCounter(number){
        counter = number
        document.getElementById('counter').innerHTML = number
    }
    for (let index = 0; index < cells.length; index++) {
        const element = cells[index];
       
        element.addEventListener("click", (event) => {
            if(event.target.innerHTML === "🏠"){
                event.target.innerHTML = "";
                updateCounter(counter - 1)
            }
            else{
                event.target.innerHTML = "🏠";
                updateCounter(counter + 1)
            }
            
          });
    }
}