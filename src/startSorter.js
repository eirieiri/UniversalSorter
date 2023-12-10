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
  
      if (!bracketSize.includes(savedInputs.length)) {
        let closestBigger = bracketSize.find(size => size > savedInputs.length);
  
        for (let i = savedInputs.length; i < closestBigger; i++) {
          savedInputs.push({
            name: "",
            link: ""
          });
        }
      }
  
      shuffle(savedInputs);
      console.log(savedInputs);
  
  
      bracketDivider(saveInputs)
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