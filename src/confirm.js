document.addEventListener("DOMContentLoaded", function () {
  const confirmButton = document.getElementById("confirmButton");
  const optionContainer = document.getElementById("optionContainer");
  const buttonContainer = document.getElementById("button")
  const outputElement = document.getElementById("output");

  const savedInputs = [];

  confirmButton.addEventListener("click", function () {
    saveInputs();

    buttonContainer.innerHTML = ""
    optionContainer.innerHTML = ""

    const bracketSize = [2, 4, 16, 32, 64, 128, 256, 512];

    if (!bracketSize.includes(savedInputs.length)) {
      let closestBigger = bracketSize.find(size => size > savedInputs.length)

      for (let i = 0; i < closestBigger - savedInputs; i++) {
        savedInputs.push({
          name: "",
          link: ""
        })
      }

      shuffle(saveInputs)
    }
  });



});

function saveInputs() {
  const options = optionContainer.querySelectorAll(".option");

  options.forEach((option) => {
    const nameInput = option.querySelector(".name-input");
    const linkInput = option.querySelector(".link-input");

    if (nameInput && linkInput) {
      const inputObject = {
        name: nameInput.value,
        link: linkInput.value,
      };

      savedInputs.push(inputObject);
    }
  });
}

function bracketGenerator() {

}


//code from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

