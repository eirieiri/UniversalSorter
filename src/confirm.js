document.addEventListener("DOMContentLoaded", function () {
  const confirmButton = document.getElementById("confirmButton");
  const optionContainer = document.getElementById("optionContainer");
  const buttonContainer = document.getElementById("button");
  const outputElement = document.getElementById("output");

  const savedInputs = [];

  confirmButton.addEventListener("click", function () {
    saveInputs(savedInputs);
    console.log("Confirm button clicked!");

    buttonContainer.innerHTML = "";
    optionContainer.innerHTML = "";

    const bracketSize = [2, 4, 16, 32, 64, 128, 256, 512];
    let closestBigger;

    if (!bracketSize.includes(savedInputs.length)) {
      closestBigger = bracketSize.find(size => size > savedInputs.length);

      for (let i = savedInputs.length; i < closestBigger; i++) {
        savedInputs.push({
          name: "",
          link: ""
        });
      }
    } else {
      closestBigger = savedInputs.length
    }

    shuffle(savedInputs);
    console.log(savedInputs);

    console.log(saveInputs);

    bracketDivider(closestBigger, saveInputs)
  });

});

function saveInputs(array) {
  const options = optionContainer.querySelectorAll(".option");

  options.forEach((option) => {
    const nameInput = option.querySelector(".name-input");
    const linkInput = option.querySelector(".link-input");

    if (nameInput.value.trim() !== "" && linkInput.value.trim() !== "") {
      const inputObject = {
        name: nameInput.value,
        link: linkInput.value,
      };

      array.push(inputObject);
    }
  });
}


//code from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function bracketDivider(number_of_elements, elements) {
  const result = [];
  let outputContainer = document.getElementById("output");
  let number_of_rounds = Math.log2(number_of_elements);


  for (let round = 1; round <= number_of_rounds; round++) {
    // Clearing everything from previous rounds
    outputContainer.textContent = "";

    // Display what round it is
    let text = document.createElement("p");
    text.textContent = `Round ${round} out of ${number_of_rounds}`;
    outputContainer.appendChild(text);

    // Define the round in the results array
    result.push({
      roundNumber: round,
      matchUps: []
    });

    // Run the bracket
    roundMaker(result, elements);
  }

  return result;
}


function roundMaker(results, elements) {
  let outputContainer = document.getElementById("output")
  //go through each element from the array putting it again another 
  for (let i = 0; i < elements.length; i += 2) {
    //Show match up 
    let text = document.createElement("p")
    text.textContent = `Match Up ${i+1} out of ${(elements.length+1)/2}`
    outputContainer.appendChild(text)

    //have a match up 
    matchUP(elements[i*2], elements[i*2+1], results) 
  }
}

function matchUP(opt1, opt2, results) {
  let outputContainer = document.getElementById("output")
  let option1 = document.createElement("div")
  let option2 = document.createElement("div")

  if (!opt1 || !opt2 || !opt1.name || !opt2.name) {
    console.error("Invalid data in matchUP function:", opt1, opt2);
    return;
  }

  //define option 1 
  let name1 = document.createElement("p")
  name1.textContent = opt1.name
  let link1 = document.createElement("iframe")
  link1.src = opt1.link
  option1.appendChild(name1)
  option1.appendChild(link1)

  //define option 2 
  let name2 = document.createElement("p")
  name2.textContent = opt2.name
  let link2 = document.createElement("iframe")
  link2.src = opt2.link
  option2.appendChild(name2)
  option2.appendChild(link2) 

  //append 
  outputContainer.appendChild(option1)
  outputContainer.appendChild(option2)
}