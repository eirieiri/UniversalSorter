document.addEventListener("DOMContentLoaded", function () {
    //Get Containers 
    const inputContainer = document.getElementById("input");
    const buttonContainer = document.getElementById("buttons");
    const textContainer = document.getElementById("text");
    const choiceContainer = document.getElementById("option-character")

    const thingsToSort = [];

    document.addEventListener("click", async function () {
        //Start manual button is pressed
        if (event.target.id === "start-manual") {

            saveInputs(thingsToSort);
            console.log("Confirm button clicked!");

            //clear the html 
            buttonContainer.innerHTML = "";
            inputContainer.innerHTML = "";
            textContainer.innerHTML = "";

            shuffle(thingsToSort);

            createChoicePage();
        }

        //If the sorter-button is pressed  
        if (event.target.id === "sorter-button") {
            buttonContainer.innerHTML = "";
            inputContainer.innerHTML = "";
            textContainer.innerHTML = "";

            //start sorter 
            let sorted = await startSorter(thingsToSort);

            choiceContainer.textContent = ""
            buttonContainer.textContent = ""

            let finishedMessage = document.createElement("h2")
            finishedMessage.textContent = "Congrats! You finished sorting!" 

            textContainer.appendChild(finishedMessage);
            displayTable(sorted)
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
        return "https://www.youtube.com/embed/" + match[1];
    } else {
        return url;
    }
}

//
async function startSorter(array) {
    let optionCharacterElement = document.getElementById("option-character");
    optionCharacterElement.style.display = "flex";
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

    let sorted = await mergeSort(array, 1)
}

//merge function
async function merge(left, right, battleNumber) {
    console.log("merge was started")
    let textContainer = document.getElementById("text")
    textContainer.textContent = ""
    let text = document.createElement("h2");
    text.textContent = `Battle N.${battleNumber++}`;

    textContainer.appendChild(text)

    let arr = [];

    while (left.length && right.length) {
        let choice = await chooseCharacter(left[0], right[0]);
        console.log("Processing Choice")

        if (choice === 0) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    return [...arr, ...left, ...right]
}

//mergeSort function 
async function mergeSort(array, battleNumber) {
    console.log("merge sort was started")

    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);  
    const right = array.slice(middle);

    return await merge(
        await mergeSort(left, battleNumber), 
        await mergeSort(right, battleNumber), 
        battleNumber
        );
}


//based of what button is pressed returns 1 or 0 
async function chooseCharacter(left, right) {
    console.log("Choose between the 2 options: ")
    return new Promise((resolve, reject) => {
        let option_1Container = document.getElementById("opt-1");
        let option_2Container = document.getElementById("opt-2");

        option_1Container.textContent = "";
        option_2Container.textContent = "";

        // Display left character
        let iframe1 = document.createElement("iframe")
        iframe1.src = left.link;
        let name1 = document.createElement("h2");
        name1.className = "char-option";
        name1.textContent = left.name;

        option_1Container.appendChild(iframe1)
        option_1Container.appendChild(name1)

        // Display right character
        let iframe2 = document.createElement("iframe");
        iframe2.src = right.link;
        let name2 = document.createElement("h2");
        name2.className = "char-option";
        name2.textContent = right.name;

        option_2Container.appendChild(iframe2)
        option_2Container.appendChild(name2)

        // Make buttons reactable
        console.log("Choose option")

        // Event listener for button click
        function handleButtonClick(event) {
            if (event.target.id === "left-option") {
                console.log("left was chosen");
                resolve(0);  // Resolve the Promise with the choice 0
            } else if (event.target.id === "right-option") {
                console.log("right was chosen");
                resolve(1);  // Resolve the Promise with the choice 1
            }

            // Remove the event listener after the choice is made
            document.removeEventListener("click", handleButtonClick);
        }

        document.addEventListener("click", handleButtonClick);
    });
}


function displayTable(array) {
    // Get the container where you want to display the table
    const textContainer = document.getElementById("table-container");

    // Create a table element
    const table = document.createElement("table");

    // Create table header
    const headerRow = document.createElement("tr");
    const embedHeader = document.createElement("th");
    const nameHeader = document.createElement("th");
    embedHeader.textContent = "Embed";
    nameHeader.textContent = "Name";
    headerRow.appendChild(embedHeader);
    headerRow.appendChild(nameHeader);
    table.appendChild(headerRow);

    // Create table rows
    array.forEach(item => {
        const row = document.createElement("tr");
        const embedCell = document.createElement("td");
        const nameCell = document.createElement("td");

        // Create an iframe for the embed
        const embedIframe = document.createElement("iframe");
        embedIframe.src = item.link;
        embedIframe.width = "300"; 
        embedIframe.height = "200"; 
        embedCell.appendChild(embedIframe);

        // Set the name
        nameCell.textContent = item.name;

        // Append cells to the row
        row.appendChild(embedCell);
        row.appendChild(nameCell);

        // Append the row to the table
        table.appendChild(row);
    });

    // Append the table to the container
    textContainer.appendChild(table);
}
