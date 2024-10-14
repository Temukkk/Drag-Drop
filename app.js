// Function to handle drag and drop events
function enableDragAndDrop() {
    let lists = document.getElementsByClassName("list");
    let rightBox = document.getElementById("right");
    let leftBox = document.getElementById("left");

    for (let list of lists) {
        list.addEventListener("dragstart", function (e) {
            let selected = e.target;
            selected.classList.add("dragging");

            rightBox.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            rightBox.addEventListener("drop", function (e) {
                rightBox.appendChild(selected);
                resetDragState(selected);
            });

            leftBox.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            leftBox.addEventListener("drop", function (e) {
                leftBox.appendChild(selected);
                resetDragState(selected);
            });
        });
    }
}

// Function to reset drag state and class
function resetDragState(selected) {
    selected.classList.remove("dragging");
    selected = null;
}

// Function to add new draggable items dynamically
function addNewItem(box, itemText) {
    let newItem = document.createElement("div");
    newItem.className = "list";
    newItem.draggable = true;
    newItem.innerText = itemText;
    box.appendChild(newItem);
    updateEventListeners();
}

// Function to add random items with a unique ID
function addRandomItems() {
    let leftBox = document.getElementById("left");
    for (let i = 0; i < 5; i++) {
        let randomText = "Item " + Math.floor(Math.random() * 100);
        addNewItem(leftBox, randomText);
    }
}

// Function to remove all items in a box
function clearBox(box) {
    while (box.firstChild) {
        box.removeChild(box.firstChild);
    }
}

// Function to reset both left and right boxes
function resetAll() {
    let leftBox = document.getElementById("left");
    let rightBox = document.getElementById("right");
    clearBox(leftBox);
    clearBox(rightBox);
    addRandomItems();
}

// Function to update event listeners after dynamically adding items
function updateEventListeners() {
    let lists = document.getElementsByClassName("list");
    for (let list of lists) {
        list.removeEventListener("dragstart", handleDragStart);
        list.addEventListener("dragstart", handleDragStart);
    }
}

// Function to handle drag start for dynamic updates
function handleDragStart(e) {
    let selected = e.target;
    selected.classList.add("dragging");

    let rightBox = document.getElementById("right");
    let leftBox = document.getElementById("left");

    rightBox.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    rightBox.addEventListener("drop", function (e) {
        rightBox.appendChild(selected);
        resetDragState(selected);
    });

    leftBox.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    leftBox.addEventListener("drop", function (e) {
        leftBox.appendChild(selected);
        resetDragState(selected);
    });
}

// Initialize app by enabling drag-and-drop and adding default items
function initializeApp() {
    addRandomItems();
    enableDragAndDrop();
}

// Add button functionality to reset items
document.addEventListener("DOMContentLoaded", function () {
    let resetButton = document.createElement("button");
    resetButton.innerText = "Reset All";
    resetButton.style.margin = "20px";
    resetButton.style.padding = "10px 20px";
    resetButton.style.fontSize = "16px";
    document.body.appendChild(resetButton);

    resetButton.addEventListener("click", resetAll);

    initializeApp();
});
