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
    console.log("Sorter was started")
    //find the different containers 
    let buttonContainer = document.getElementById("buttons")

    let leftButton = document.createElement("button");
    leftButton.textContent = "Choose"
    leftButton.id = "left-option"

    let rightButton = document.createElement("button");
    rightButton.textContent = "Choose"
    rightButton.id = "right-option"

    buttonContainer.appendChild(leftButton)
    buttonContainer.appendChild(rightButton)
    
    let sorted = mergeSort(array, 1)
}

//merge function
function merge(left, right, battleNumber) {
    let textContainer = document.getElementById("text")
    let text = document.createElement("h2");
    h2 = `Battle N.${battleNumber}`;
    
    textContainer.appendChild(text)

    battleNumber++

    let arr = [];

    while (left.length && right.left) {
        if (chooseCharacter(left[0], right[0]) === 0) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    return [ ...arr, ...left, ...right ]
}

//mergeSort function 
function mergeSort(array, battleNumber) {
    console

    let half = array.length / 2;

    if (array.length < 2) {
        return array
    }

    const left = array.splice(0, half);
    return merge(mergeSort(left, battleNumber), mergeSort(array, battleNumber), battleNumber)
}

//based of what button is pressed returns 1 or 0 
function chooseCharacter(left, right) {
    let option_1Container = document.getElementById("opt-1")
    let option_2Container = document.getElementById("opt-2")

    //left
    let iframe1 = document.createElement("iframe")
    iframe1.src = left.link;
    let name1 = document.createElement(h3);
    name1.class = "char-option";
    name1.textContent = left.name;

    //append 
    option_1Container.appendChild(iframe1)
    option_1Container.appendChild(name1)

    //right
    let iframe2 = document.createElement("iframe");
    iframe2.src = right.link;
    let name2 = document.createElement(h3);
    name2.class = "char-option";
    name2.textContent = right.name;

    //append
    option_2Container.appendChild(iframe2)
    option_2Container.appendChild(name2)

    return 0;
}