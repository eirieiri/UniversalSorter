/**
 * Generates 2 input boxes: 
 *    title 
 *    youtube link
 */
function generateOption() {
    //get the container with the options
    let optionContainer = document.getElementById("input");

    //creating the option box in a new container
    let newOption = document.createElement("div");
    newOption.className = "option";

    //creating name input and label
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "title";
    nameInput.className = "name-input";
    nameInput.placeholder = "Enter a title";

    //creating link name input and label
    let linkInput = document.createElement("input");
    linkInput.type = "text";
    linkInput.name = "YouTube link";
    linkInput.className = "link-input";
    linkInput.placeholder = "Enter YouTube link";

    //append elements 
    newOption.appendChild(nameInput);
    newOption.appendChild(linkInput);

    newOption.style.marginBottom = "10px";

    optionContainer.appendChild(newOption);

    return optionContainer;
}

