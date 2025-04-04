//board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//mine
let allowDirectionChange = true;
let ouroboros = false;
let direction = "";
let timer;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

//food
let foodX;
let foodY;

let points = 0;
let pointsDisplay;

let gameOver = false;

start();

function start() {
    // Initialize the game
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    allowDirectionChange = false;



    placeFood();
    placeSnake();
    document.addEventListener("keyup", move);
    setInterval(update, 100);
}


function displayTimer() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height); // Fill the canvas with black background

    context.fillStyle = "white";
    context.font = "30px Arial";
    context.textAlign = "center";

    if (ouroboros === true) {
        context.fillText("Game Over, the Snake ate itself.", board.width / 2, board.height / 2.3); // Center the text
    } else {
        context.fillText("Game Over, Out of Bounds.", board.width / 2, board.height / 2.3);
    }
    context.fillText("Game restarts in " + timer + " seconds", board.width / 2, board.height / 2);
    context.fillStyle = "yellow";
    context.fillText("You have earned " + pointsDisplay + " points", board.width / 2, board.height / 1.8);
}

function startTimer() {
    timer = 5; // Reset timer to initial value
    displayTimer(); // Display initial timer

    // Start a new timer interval
    let timerInterval = setInterval(function () {
        if (timer > 0) {
            timer--;
            displayTimer(); // Update timer display
        } else {
            allowDirectionChange = true;
            gameOver = false;
            clearInterval(timerInterval); // Stop the timer interval
        }
    }, 1000);
}
function update() {
    if (gameOver) {
        snakeX = Math.floor(Math.random() * cols) * blockSize;
        snakeY = Math.floor(Math.random() * rows) * blockSize;
        speedX = 0;
        speedY = 0;
        points = 0;
        snakeBody = [];
        return;
    }

    pointsDisplay = points;

    //Ouroborus, the snake ate itself
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            ouroboros = true;
            startTimer();
            return;
        }
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "white";
    context.font = "20px Arial";
    context.textAlign = "left";
    context.fillText("Points: " + points, 10, 20); // Display points on the screen

    context.fillStyle = "#0099ff";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        points++;
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        startTimer();
    }
}





function move(e) {
    e.preventDefault();
    switch (e.code) {
        case "ArrowUp":
        case "KeyW":
            if (direction !== "down") {
                direction = "up";
                speedX = 0;
                speedY = -1;
            }
            break;

        case "ArrowDown":
        case "KeyS":
            if (direction !== "up") {
                direction = "down";
                speedX = 0;
                speedY = 1;
            }
            break;

        case "ArrowLeft":
        case "KeyA":
            if (direction !== "right") {
                direction = "left";
                speedX = -1;
                speedY = 0;
            }
            break;

        case "ArrowRight":
        case "KeyD":
            if (direction !== "left") {
                direction = "right";
                speedX = 1;
                speedY = 0;
            }
            break;

        default:
            speedX = 0;
            speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function placeSnake() {
    snakeX = Math.floor(Math.random() * cols) * blockSize;
    snakeY = Math.floor(Math.random() * rows) * blockSize;
}

