const tilesContainer = document.querySelector(".tiles");
const images = ['images/christian.png', 'images/heidi.png', 'images/karoliina.png', 'images/kerttuli.png', 'images/lauri.png', 'images/maarit.png', 'images/olli.png', 'images/taitotalo.png'];
const imagesPickList = [...images, ...images];
const tileCount = imagesPickList.length;

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
        if (awaitingEndOfMove || revelead === "true" || element === activeTile) {
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
            activeTile = null;
            awaitingEndOfMove = false;
            element.setAttribute("data-clicked-image", imageSrc);
            console.log('Clicked image source:', imageSrc);
            Question();
            awaitingAnswer = true; // Set a flag to indicate awaiting user input  
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

function Question() {
    let question = document.querySelector(".question");
    question.style.display = "block";
}

const submitButton = document.getElementById("submitBtn");
submitButton.addEventListener("click", () => {
    if(awaitingAnswer) {
        Answer();
        awaitingAnswer = false; // Reset the flag after evaluating the answer
    }
});

/*function Answer() {
    let answer = document.getElementById("teacherName").value;
    let tryAgain = document.getElementById("tryAgain");
    let clickedTile = document.querySelector('.tile[data-revealed="true"][data-clicked-image]');
    let question = document.querySelector(".question");
    if (clickedTile) {
        let imageSrc = clickedTile.getAttribute("data-clicked-image");

    if (imageSrc === "images/christian.png") {
        if (answer === "Christian" || answer === "christian" || answer === "chris") {
            question.innerHTML = "Correct!";
            question.style.color = "green";
            tryAgain.style.display = "none";
            setTimeout(() => {
                question.style.display = "none";
            }, 3000);
        } else {
            tryAgain.style.display = "block";
            question.style.display = "block";
        }
    }
    else if (imageSrc === "images/heidi.png") {
        if (answer === "Heidi" || answer === "heidi") {

            question.innerHTML = "Correct!";
            question.style.color = "green";
            tryAgain.style.display = "none";
            setTimeout(() => {
                question.style.display = "none";
            }, 3000);
        } else {
            tryAgain.style.display = "block";
            question.style.display = "block";
        }
    }
    else if (imageSrc === "images/karoliina.png") {

        if (answer === "Karoliina" || answer === "karoliina") {
            question.innerHTML = "Correct!";
            question.style.color = "green";
            tryAgain.style.display = "none";
            setTimeout(() => {
                question.style.display = "none";
            }, 3000);
        } else {
            tryAgain.style.display = "block";
            question.style.display = "block";
        }
    }
    else if (imageSrc === "images/kerttuli.png") {

        if (answer === "Kerttuli" || answer === "kerttuli") {
            question.innerHTML = "Correct!";
            question.style.color = "green";
            tryAgain.style.display = "none";
            setTimeout(() => {
                question.style.display = "none";
            }, 3000);
        } else {
            tryAgain.style.display = "block";
            question.style.display = "block";
        }
    }
    else if (imageSrc === "images/lauri.png") {
        if (answer === "Lauri" || answer === "lauri") {
            question.innerHTML = "Correct!";
            question.style.color = "green";
            tryAgain.style.display = "none";
            setTimeout(() => {
                question.style.display = "none";
            }, 3000);
        } else {
            tryAgain.style.display = "block";
            question.style.display = "block";
        }
    }
    else if (imageSrc === "images/maarit.png") {
        if (answer === "Maarit" || answer === "maarit") {
            question.innerHTML = "Correct!";
            question.style.color = "green";
            tryAgain.style.display = "none";
            setTimeout(() => {
                question.style.display = "none";
            }, 3000);
        } else {
            tryAgain.style.display = "block";
            question.style.display = "block";
        }
    }
    else if (imageSrc === "images/olli.png") {
        if (answer === "Olli" || answer === "olli") {
            question.innerHTML = "Correct!";
            question.style.color = "green";
            tryAgain.style.display = "none";
            setTimeout(() => {
                question.style.display = "none";
            }, 3000);
        } else {
            tryAgain.style.display = "block";
            question.style.display = "block";
        }
    }
    else if (imageSrc === "images/taitotalo.png") {
        if (answer === "Taitotalo" || answer === "taitotalo") {
            question.innerHTML = "Correct!";
            question.style.color = "green";
            tryAgain.style.display = "none";
            setTimeout(() => {
                question.style.display = "none";
            }, 3000);
        } else {
            tryAgain.style.display = "block";
            question.style.display = "block";
        }
    }
}}*/

/*function Answer() {
    let answer = document.getElementById("teacherName").value.toLowerCase(); // Convert answer to lowercase for case-insensitive comparison
    let tryAgain = document.getElementById("tryAgain");
    let clickedTile = document.querySelector('.tile[data-revealed="true"][data-clicked-image]');
    let question = document.querySelector(".question");

    if (clickedTile) {
        let imageSrc = clickedTile.getAttribute("data-clicked-image");
        console.log('Clicked image source:', imageSrc); // Log the clicked image source
        console.log('User answer:', answer);

        switch (imageSrc) {
            case "images/christian.png":
                if (answer === "christian" || answer === "chris") {
                    showCorrectMessage(question, tryAgain);
                } else {
                    showIncorrectMessage(question, tryAgain);
                }
                break;
            case "images/heidi.png":
                if (answer === "heidi") {
                    showCorrectMessage(question, tryAgain);
                } else {
                    showIncorrectMessage(question, tryAgain);
                }
                break;
             case "images/maarit.png":
                    if (answer === "maarit") {
                        showCorrectMessage(question, tryAgain);
                    } else {
                        showIncorrectMessage(question, tryAgain);
                    }
                    break;
            case "images/karoliina.png":
                if (answer === "karoliina") {
                    showCorrectMessage(question, tryAgain);
                } else {
                    showIncorrectMessage(question, tryAgain);
                }
                break;
            case "images/kerttuli.png":
                if (answer === "kerttuli") {
                    showCorrectMessage(question, tryAgain);
                } else {
                    showIncorrectMessage(question, tryAgain);
                }
                break;
            case "images/lauri.png":
                if (answer === "lauri") {
                    showCorrectMessage(question, tryAgain);
                } else {
                    showIncorrectMessage(question, tryAgain);
                }
                break;
            case "images/olli.png":
                if (answer === "olli") {
                    showCorrectMessage(question, tryAgain);
                } else {
                    showIncorrectMessage(question, tryAgain);
                }
                break;
            case "images/taitotalo.png":
                if (answer === "taitotalo") {
                    showCorrectMessage(question, tryAgain);
                } else {
                    showIncorrectMessage(question, tryAgain);
                }
                break;
        }
    }
}*/

function Answer() {
    const answer = document.getElementById("teacherName").value.trim().toLowerCase();
    const tryAgain = document.getElementById("tryAgain");
    const clickedTile = document.querySelector('.tile[data-revealed="true"][data-clicked-image]');
    const question = document.querySelector(".question");

    if (clickedTile) {
        const imageSrc = clickedTile.getAttribute("data-clicked-image");

        const answerMap = {
            "images/christian.png": ["christian", "chris"],
            "images/heidi.png": ["heidi"],
            "images/karoliina.png": ["karoliina"],
            "images/kerttuli.png": ["kerttuli"],
            "images/lauri.png": ["lauri"],
            "images/maarit.png": ["maarit"],
            "images/olli.png": ["olli"],
            "images/taitotalo.png": ["taitotalo"]
        };

        if (answerMap[imageSrc] && answerMap[imageSrc].includes(answer)) {
            showCorrectMessage(question, tryAgain);
            updateRevealedCount();
            checkWinCondition();
        } else {
            showIncorrectMessage(question, tryAgain);
        }
    }
}

function showCorrectMessage(question, tryAgain) {
    question.innerHTML = "Correct!";
    question.style.color = "green";
    tryAgain.style.display = "none";
    setTimeout(() => {
        question.style.display = "none";
        awaitingAnswer = false; // Reset the flag after hiding the message
    }, 3000);
}

function showIncorrectMessage(question, tryAgain) {
    tryAgain.style.display = "block";
    question.style.display = "block";
}

function updateRevealedCount() {
    revealedCount += 2; // Increment revealedCount only when a pair is matched
}

function checkWinCondition() {
    if (revealedCount === tileCount) {
        alert("You won!");
    }
}