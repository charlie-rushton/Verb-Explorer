//Start Page
//Author: Charlie Rushton, Sam Bentley

//Based on work by: Sam Bentley
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 720;
canvasLeft = 0;
canvasTop = canvas.offsetTop,
    div = document.getElementById("gamecontainer");
canvas.gamecontainer = "CursorLayer";
div.appendChild(canvas);
questions = []; //variable for buttons
const buttonColor = "white";
const brandColor = "#461964";
const topBarColor = "#71587E"
const questionBarColor = "#26013c";
var grad = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
var sheet = document.createElement("style");
grad.addColorStop(0, 'black');
grad.addColorStop(1, 'white');

var startButton = {
    colour: questionBarColor,
    width: 500,
    height: 75,
    top: canvas.height - 150,
    left: canvas.width / 2 - 250,
    text: "Start New Game",
    text_color: 'white'
};

/**
 * Renders the start button at the bottom of the page
 */
function addStartButton() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = startButton.colour;
    ctx.fillRect(startButton.left, startButton.top, startButton.width, startButton.height);
    ctx.font = "36px Helvetica";
    ctx.fillStyle = startButton.text_color;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    console.log(ctx.textBaseline);
    ctx.fillText(startButton.text, startButton.left + startButton.width / 2,
        startButton.top + (startButton.height / 4));
}

/**
 * The event listener to check if the start button is pressed.
 */
function addStartEventListener() {
    canvas.addEventListener('click', function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        if (y > startButton.top && y < startButton.top + startButton.height && x > startButton.left
            && x < startButton.left + startButton.width) {
            window.location.replace('game.html');
            canvas.style.backgroundImage = "";
            canvas.style.backgroundSize = "0px 0px";
            canvas.style.backgroundRepeat = "no-repeat";
            canvas.style.backgroundPosition = "0px 0px";
        }
    }, false);
}

/**
 * Set the css to have the welsh learning logo in the background and render the welcome text
 */
function welcomeScreen() {
    canvas.style.backgroundImage = "url('images/nwlogo2.png')";
    canvas.style.backgroundSize = "1069px 864px";
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundPosition = "-458px -110px";
    ctx.font = "45px Helvetica";
    ctx.fillText("Welcome to the", 450, 225);
    ctx.font = "80px Helvetica";
    ctx.fillText("Verb Explorer", 650, 325);
}

/**
 * Initialise the start page
 */
function initialiseStart() {
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    addStartButton();
    addStartEventListener();
    welcomeScreen();
}

initialiseStart();