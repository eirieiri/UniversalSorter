document.addEventListener("DOMContentLoaded", function () {
    //Get Containers 
    const inputContainer = document.getElementById("input");
    const buttonContainer = document.getElementById("buttons");
    const textContainer = document.getElementById("text");

    //
    const savedInputs = [];

    document.addEventListener("click", function () {
        if (event.target.id === "start-manual") {

            saveInputs(savedInputs);
            console.log("Confirm button clicked!");

            //clear the html 
            buttonContainer.innerHTML = "";
            inputContainer.innerHTML = "";
            textContainer.innerHTML = "";

            shuffle(savedInputs);
            console.log(savedInputs);

            createChoicePage();
        }
    });
});

function saveInputs(array) {
    const inputContainer = document.getElementById("input");
    const options = inputContainer.querySelectorAll(".option");

    options.forEach((option) => {
        const nameInput = option.querySelector(".name-input");
        const linkInput = option.querySelector(".link-input");

        if (nameInput.value.trim() !== "" || linkInput.value.trim() !== "") {
            const inputObject = {
                name: nameInput.value,
                link: linkInput.value,
            };

            array.push(inputObject);
        }

    });
}

/**
 * Shuffles the array 
 * 
 * @param {Object[]} array 
 * @returns shuffled array 
 */
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

/**
 * Created a Page with 2 buttons each one corresponding to a mode of sorting 
 *   - Sorter 
 *   - Manual Sort 
 */
function createChoicePage() {
    const textContainer = document.getElementById("text");
    const buttonContainer = document.getElementById("buttons");

    let text = document.createElement("h2");
    text.textContent = "Choose the mode of Sorting: "
    textContainer.appendChild(text);

    //Create the 2 buttons 
    let sorterButton = document.createElement("button"); 
    sorterButton.textContent = "Sorter";
    sorterButton.id = "sorter-button";

    let bracketButton = document.createElement("button");
    bracketButton.textContent = "Bracket";
    bracketButton.id = "bracket-button";
    bracketButton.disabled = true;

    //append the buttons 
    buttonContainer.appendChild(sorterButton);
    buttonContainer.appendChild(bracketButton)
}