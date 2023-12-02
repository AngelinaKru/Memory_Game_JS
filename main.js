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

            revealedCount += 2;
            Question(imageSrc);
            // If all tiles are revealed (game is won)
            if (revealedCount === tileCount) {
                alert("You won!");
            }
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

 function Question(event, imageSrc) { 
    let question = document.querySelector(".question");
    let tryAgain = document.getElementById("tryAgain");
    question.style.display = "block";

    let answer = document.getElementById("teacherName").value; // Get the value of the input field
        
        //let answer = document.getElementById("teacherName").value;
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
            }
        }
    }

    let submitButton = document.getElementById("submitBtn");
    submitButton.addEventListener("click", (event) => {
        Question(event, imageSrc);
    });