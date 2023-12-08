function generateOption() {
  //get the container with the options
  let optionContainer = document.getElementById("optionContainer");

  //creating the option box in a new container
  let newOption = document.createElement("div");
  newOption.className = "option";

  //creating name input and label
  let nameLabel = document.createElement("label");
  nameLabel.textContent = "Name: ";
  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.className = "name-input";
  nameInput.placeholder = "Enter name";

  //creating link name input and label
  let linkLabel = document.createElement("label");
  linkLabel.textContent = "Link:";
  let linkInput = document.createElement("input");
  linkInput.type = "text";
  linkInput.name = "link";
  linkInput.className = "link-input";
  linkInput.placeholder = "Enter link";

  //append elements 
  newOption.appendChild(nameLabel);
  newOption.appendChild(nameInput);

  newOption.appendChild(linkLabel);
  newOption.appendChild(linkInput);

  newOption.style.marginBottom = "10px";

  optionContainer.appendChild(newOption);

  return optionContainer;
}

document.addEventListener("DOMContentLoaded", function () {
  const addInputButton = document.getElementById("addInputButton");

  addInputButton.addEventListener("click", function () {
    generateOption();
  });
});
