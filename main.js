// Get elements from the DOM
const menu = document.querySelector('.startMenu');
const game = document.querySelector('.game');
const cardScene1 = document.querySelector('.cardScene1');
const cardScene2 = document.querySelector('.cardScene2');

const startButton = document.getElementById('startBtn');
const nextButton = document.getElementById('nextButton');
const startGameButton = document.getElementById('startGameBtn');

startButton.addEventListener('click', () => {
    menu.style.display = 'none';
    cardScene1.style.display = 'block';
    cardScene2.style.display = 'none';
    game.style.display = 'none';
});

nextButton.addEventListener('click', () => {
    menu.style.display = 'none';
    cardScene1.style.display = 'none';
    cardScene2.style.display = 'block';
    game.style.display = 'none';
});


startGameButton.addEventListener('click', () => {
    menu.style.display = 'none';
    cardScene1.style.display = 'none';
    cardScene2.style.display = 'none';
    game.style.display = 'block';
});

const tilesContainer = document.querySelector(".tiles");
const images = ['images/christian.png', 'images/heidi.png', 'images/karoliina.png', 'images/kerttuli.png', 'images/lauri.png', 'images/maarit.png', 'images/olli.png', 'images/taitotalo.png'];
const imagesPickList = [...images, ...images];
const tileCount = imagesPickList.length;
const answerMap = {
    "images/christian.png": ["christian", "chris", "chrisu"],
    "images/heidi.png": ["heidi"],
    "images/karoliina.png": ["karoliina"],
    "images/kerttuli.png": ["kerttuli"],
    "images/lauri.png": ["lauri"],
    "images/maarit.png": ["maarit"],
    "images/olli.png": ["olli"],
    "images/taitotalo.png": ["taitotalo"]
};
const messageElement = document.getElementById("message");
const questionElement = document.getElementById("questionContainer");
const inputElement = document.getElementById("teacherName");

// Game state
let revealedCount = 0;
// clicked tile and user is looking for next tile
let activeTile = null;
/* awaiting end of move is true, it means
the user is waiting for the two unmatched tiles to be turned over again */
let awaitingEndOfMove = false;
let awaitingAnswer = false;


function buildTile(imageSrc) {
    const element = document.createElement("div");
    element.classList.add("tile");
    /* Setting a data attribute on each tile.
    This let us to record miscellaneous information. */
    element.setAttribute("data-image", imageSrc);
    element.setAttribute("data-revealed", "false");


    element.addEventListener("click", () => {

        const revelead = element.getAttribute("data-revealed");

        // If two tiles are clicked, the function will be called
        // If you want to click a revelead tile again, you can't (we need to cancel this move)
        // If you want to click an active tile again, you can't (we need to cancel this move)
        if (awaitingEndOfMove || revelead === "true" || element === activeTile || awaitingAnswer) {
            // Return means, that we are going to exit the function
            return;
        }
        // Applying css class to the element
        element.style.backgroundImage = `url(${imageSrc})`; // Set the background image correctly;

        // if there is not active tile, we are going to set the active tile
        if (!activeTile) {
            activeTile = element;
            // Once we have set the active tile, we are going to exit the function
            return;
        }

        // Checking for a match
        const imageToMatch = activeTile.getAttribute("data-image");
        if (imageToMatch === imageSrc) {
            activeTile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");
            // If a player chose a correct tile, we are going to clear the game state
            // activeTile = null;
            awaitingEndOfMove = false;
            awaitingAnswer = true; // Set a flag to indicate awaiting user input  
            showQuestion(); // Show the question container again
            return;
        }

        // If a player chose an incorrect tile
        awaitingEndOfMove = true;

        // Hide tiles after 1 second
        setTimeout(() => {
            element.style.backgroundImage = null; // Just clicked tile
            activeTile.style.backgroundImage = null; // Active (previous clicked) tile

            // Reset the active tile, because we are going to start a new move
            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000); // after 1 second (1 second = 1000 milliseconds)
    });

    return element;
}


// Build up tiles
for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * imagesPickList.length);
    const imageSrc = imagesPickList[randomIndex];
    const tile = buildTile(imageSrc);
    // We don't want to use the same image twice
    imagesPickList.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
}

const submitButton = document.getElementById("submitBtn");
submitButton.addEventListener("click", () => {
    if(awaitingAnswer) {
        Answer();
    }
});


function Answer() {
    const answer = inputElement.value.trim().toLowerCase();
    imageSrc = activeTile.getAttribute("data-image")

    hideQuestion();
    if (answerMap[imageSrc].includes(answer)) {
        showCorrectMessage();
        revealedCount += 2; // Increment revealedCount only when a pair is matched
        if (revealedCount === tileCount) {
            alert("You won!");
        }
    } else {
        showIncorrectMessage();
    }
}

function showCorrectMessage() {
    messageElement.style.color = "green";
    messageElement.textContent = "Correct!";
    showMessage();
    activeTile = null;
    awaitingAnswer = false; // Reset the flag after the correct answer
    setTimeout(() => {
        hideMessage();
    }, 3000); 
}

function showIncorrectMessage(question) {
    messageElement.style.color = "red";
    messageElement.textContent = 'Incorrect! Try again...'
    showMessage();
     setTimeout(() => {
        showQuestion(); // Show the question container again
    }, 1000); 
     setTimeout(() => {
        hideMessage();
    }, 3000); 
}

function showMessage() {
    messageElement.style.visibility = 'visible';
}

function hideMessage() {
    messageElement.style.visibility = 'hidden';
}

function showQuestion() {
    inputElement.value = '';
    questionElement.style.visibility = 'visible';
}

function hideQuestion() {
    questionElement.style.visibility = 'hidden';
}