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


document.addEventListener("DOMContentLoaded", function () {
    /**
    * On the press of Manual button, generates base of the manual enter page 
    * 
    * 2 input boxes: 
    *   - youtube or image url
    *   - text box 
    *   via the generateOption function 
    * 2 buttons:
    *   - Add option: uses generateOption (id = "addOption") 
    *   - Start
    */
    const manualButton = document.getElementById("manual-input");
    const fileButton = document.getElementById("file-input");
    let optionContainer = document.getElementById("input");


    //get different dontainers 
    let buttonsContainer = document.getElementById("buttons")
    let textContainer = document.getElementById("text")

    manualButton.addEventListener("click", function () {
        //empty the body of the container
        buttonsContainer.textContent = ""

        //add some text to the text container 
        let text = document.createElement("h2")
        text.textContent = "Enter your options manually: "
        textContainer.appendChild(text)

        //generate the first 2 input boxes
        generateOption();

        //Add the 2 buttons bellow 
        let addInputButton = document.createElement("button")
        addInputButton.id = "addOption"
        addInputButton.textContent = "+ add Option"
        buttonsContainer.appendChild(addInputButton)

        //Add the start button 
        let startButton = document.createElement("button")
        startButton.id = "start-manual"
        startButton.textContent = "Start!"
        buttonsContainer.appendChild(startButton)
    })


    fileButton.addEventListener("click", function() {
        buttonsContainer.textContent = ""

        let text = document.createElement("h2")
        text.textContent = "Enter your file: "
        textContainer.appendChild(text)

        let fileInput = document.createElement("input")
        fileInput.id = "file-input-box"
        fileInput.type = "file"
        optionContainer.appendChild(fileInput)

        let confirm = document.createElement("button")
        confirm.id = "confirm-input"
        confirm.textContent = "Confirm"
        confirm.accept = ".json"
        buttonsContainer.appendChild(confirm)
    })

    /**
    * When button is pressed with addOption id, a new box is added to the input container 
    */
    document.addEventListener("click", function (event) {
        if (event.target.id === "addOption") {
            generateOption();
        }
    });
})