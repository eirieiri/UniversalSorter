document.addEventListener("DOMContentLoaded", function () {
    //Get Containers 
    const inputContainer = document.getElementById("input");
    const buttonContainer = document.getElementById("buttons");
    const textContainer = document.getElementById("text");

    const savedInputs = [];

    document.addEventListener("click", function () {
        //Start manual button is pressed
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

        //If the sorter-button is pressed  
        if (event.target.id === "sorter-button") {
            buttonContainer.innerHTML = "";
            inputContainer.innerHTML = "";
            textContainer.innerHTML = "";

            //start sorter 
            startSorter(saveInputs);
        }
    });
});

/**
 * saves inputs into an empty array 
 * @param {Object} array 
 */
function saveInputs(array) {
    const inputContainer = document.getElementById("input");
    const options = inputContainer.querySelectorAll(".option");

    options.forEach((option) => {
        const nameInput = option.querySelector(".name-input");
        const linkInput = option.querySelector(".link-input");

        if (nameInput.value.trim() !== "" || linkInput.value.trim() !== "") {
            const inputObject = {
                name: nameInput.value,
                link: processYoutubelink(linkInput.value),
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

function processYoutubelink(url) {
    var regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(regex);

    if (match) {
        return "https://www.youtube.com/embed/"+match[1];
    } else {
        return url;
    }
}

//
function startSorter(array) {
    //find the different containers 
    let option_1Container = document.getElementById("opt-1")
    let option_2Container = document.getElementById("opt-2")
    
    mergeSort(array, 1)
}

//merge function
function merge(left, right, battleNumber) {
    let textContainer = document.getElementById("text")
    let text = document.createElement("h2");
    h2 = `Battle N.${battleNumber}`;

    battleNumber++

    let arr = [];

    while (left.length && right.left) {
        if (chooseCharacter() === 0) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    return [ ...arr, ...left, ...right ]
}

//mergeSort function 
function mergeSort(array, battleNumber) {

    let half = array.length / 2;

    if (array.length < 2) {
        return array
    }

    const left = array.splice(0, half);
    return merge(mergeSort(left, battleNumber), mergeSort(array, battleNumber), battleNumber)
}

//based of what button is pressed returns 1 or 0 
function chooseCharacter() {
    let option_1Container = document.getElementById("opt-1")
    let option_2Container = document.getElementById("opt-2")
    
    return 0; 
}