/**
 * Initiate the screen, have 2 buttons 
 *   Manual 
 *   Youtube Playlist - for now non functining 
 * 
 */

var buttonContainer = document.getElementById("buttons");

//Manual Input 
let manualContainer = document.createElement("div");
manualContainer.style.display = "flex";
let manualButton = document.createElement("button");
manualButton.id = "manual-input";
manualButton.textContent = "Manual Input";
manualContainer.appendChild(manualButton);

//Playlist 
let playlistContainer = document.createElement("div");
playlistContainer.style.display = "flex";
let playlistButton = document.createElement("button"); 
playlistButton.id = "playlist-input";
playlistButton.textContent = "Playlist";

let fileInputContainer = document.createElement("div")
fileInputContainer.style.display = "block";
let fileInputButton = document.createElement("button");
fileInputButton.textContent = "Input File";
fileInputButton.id = "file-input"
fileInputContainer.appendChild(fileInputButton);
fileInputButton.className = "file-input"


//disable playlist button 
playlistButton.disabled = true;

playlistContainer.appendChild(playlistButton);

//final append 
buttonContainer.appendChild(manualContainer);
buttonContainer.appendChild(playlistContainer);
buttonContainer.appendChild(fileInputContainer)