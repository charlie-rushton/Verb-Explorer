
//Name Input
//Author: Charlie Rushton

//Based on work by: Sam Bentley
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 720;
canvasLeft = canvas.offsetLeft;
canvasTop = canvas.offsetTop,
    div = document.getElementById("gamecontainer");
canvas.gamecontainer = "CursorLayer";
div.appendChild(canvas);
var grad = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
var sheet = document.createElement("style");
grad.addColorStop(0, 'black');
grad.addColorStop(1, 'white');
var nameInput;
var name = "";
var avatarDir = "";
var continueButton;

/**
 * Add the event listener to the canvas
 */
function addNameInputEventListeners() {
    canvas.addEventListener('click', nameInputClickListener, false);
}

/**
 * Event listener for submission of name and clicking on avatars
 */
function nameInputClickListener(event) {
    var x = event.offsetX;
        var y = event.offsetY;
        if (y > continueButton.top && y < continueButton.top + continueButton.height
            && x > continueButton.left && x < continueButton.left + continueButton.width) {
            name = nameInput.value();
            console.log(avatarDir);
            console.log(name);
            if (avatarDir === "" || name === "") {

            }
            else {
                canvas.style.backgroundImage = "";
                canvas.style.backgroundSize = "0px 0px";
                canvas.style.backgroundRepeat = "no-repeat";
                canvas.style.backgroundPosition = "0px 0px";
                clearCanvas();
                nameInput.destroy();
                canvas.removeEventListener('click', nameInputClickListener, false);
                startGame();
            }
        }
        // Detect which avatar has been clicked

        if (y > 50 && y < 50 + 100 && x > 220 && x < 220 + 100) {
            avatarDir = "faceAvatars/avatar1.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(216, 46, 108, 108);
            renderNameScreen();
        }
        if (y > 50 && y < 50 + 100 && x > 340 && x < 340 + 100) {
            avatarDir = "faceAvatars/avatar2.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(336, 46, 108, 108);
            renderNameScreen();
        }
        if (y > 50 && y < 50 + 100 && x > 460 && x < 460 + 100) {
            avatarDir = "faceAvatars/avatar3.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(456, 46, 108, 108);
            renderNameScreen();
        }
        if (y > 50 && y < 50 + 100 && x > 580 && x < 580 + 100) {
            avatarDir = "faceAvatars/avatar4.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(576, 46, 108, 108);
            renderNameScreen();
        }
        if (y > 50 && y < 50 + 100 && x > 700 && x < 700 + 100) {
            avatarDir = "faceAvatars/avatar5.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(696, 46, 108, 108);
            renderNameScreen();
        }

        if (y > 170 && y < 170 + 100 && x > 220 && x < 220 + 100) {
            avatarDir = "faceAvatars/avatar6.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(216, 166, 108, 108);
            renderNameScreen();
        }
        if (y > 170 && y < 170 + 100 && x > 340 && x < 340 + 100) {
            avatarDir = "faceAvatars/avatar7.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(336, 166, 108, 108);
            renderNameScreen();
        }
        if (y > 170 && y < 170 + 100 && x > 460 && x < 460 + 100) {
            avatarDir = "faceAvatars/avatar8.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(456, 166, 108, 108);
            renderNameScreen();
        }
        if (y > 170 && y < 170 + 100 && x > 580 && x < 580 + 100) {
            avatarDir = "faceAvatars/avatar9.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(576, 166, 108, 108);
            renderNameScreen();
        }
        if (y > 170 && y < 170 + 100 && x > 700 && x < 700 + 100) {
            avatarDir = "faceAvatars/avatar10.JPG";
            clearCanvas();
            ctx.fillStyle = "yellow";
            ctx.fillRect(696, 166, 108, 108);
            renderNameScreen();
        }
}
/**
 * Renders the continue button on the bottom of the screen
 */
function renderContinueButton() {
    ctx.globalAlpha = 1;

    ctx.fillStyle = continueButton.colour;
    ctx.fillRect(continueButton.left, continueButton.top, continueButton.width, continueButton.height);
    ctx.font = "36px cymraeg";
    ctx.fillStyle = continueButton.text_color;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    console.log(ctx.textBaseline);
    ctx.fillText(continueButton.text, continueButton.left + continueButton.width / 2,
        continueButton.top + (continueButton.height / 4));
}

/**
 * Renders the text input field for the name entry
 */
function renderNameInput() {
    nameInput = new CanvasInput({
        canvas: canvas,
        fontSize: 18,
        fontFamily: 'cymraeg',
        fontColor: '#212121',
        fontWeight: 'bold',
        width: 480,
        height: 30,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        boxShadow: '1px 1px 0px #fff',
        innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        placeHolder: 'Please enter name here...',
        value: "",
        x: canvas.width / 2 - 250,
        y: canvas.height - 400
    });
    nameInput.render();
    nameInput.focus();

}

/**
 * Displays the avatars to choose from
 */
function addAvatars() {
    var imgs = ['faceAvatars/avatar1.JPG', 'faceAvatars/avatar2.JPG', 
    'faceAvatars/avatar3.JPG', 'faceAvatars/avatar4.JPG', 
    'faceAvatars/avatar5.JPG', 'faceAvatars/avatar6.JPG', 
    'faceAvatars/avatar7.JPG', 'faceAvatars/avatar8.JPG', 
    'faceAvatars/avatar9.JPG', 'faceAvatars/avatar10.JPG',];

    var img1 = new Image;
    img1.onload = function () {
        ctx.drawImage(img1, 220, 50, 100, 100);
    };
    img1.src = imgs[0];

    var img2 = new Image;
    img2.onload = function () {
        ctx.drawImage(img2, 340, 50, 100, 100);
    };
    img2.src = imgs[1];

    var img3 = new Image;
    img3.onload = function () {
        ctx.drawImage(img3, 460, 50, 100, 100);
    };
    img3.src = imgs[2];

    var img4 = new Image;
    img4.onload = function () {
        ctx.drawImage(img4, 580, 50, 100, 100);
    };
    img4.src = imgs[3];

    var img5 = new Image;
    img5.onload = function () {
        ctx.drawImage(img5, 700, 50, 100, 100);
    };
    img5.src = imgs[4];

    var img6 = new Image;
    img6.onload = function () {
        ctx.drawImage(img6, 220, 170, 100, 100);
    };
    img6.src = imgs[5];

    var img7 = new Image;
    img7.onload = function () {
        ctx.drawImage(img7, 340, 170, 100, 100);
    };
    img7.src = imgs[6];

    var img8 = new Image;
    img8.onload = function () {
        ctx.drawImage(img8, 460, 170, 100, 100);
    };
    img8.src = imgs[7];

    var img9 = new Image;
    img9.onload = function () {
        ctx.drawImage(img9, 580, 170, 100, 100);
    };
    img9.src = imgs[8];

    var img10 = new Image;
    img10.onload = function () {
        ctx.drawImage(img10, 700, 170, 100, 100);
    };
    img10.src = imgs[9];
}

/**
 * Changes the css of the canvas to use the logo as the background
 */
function nameInputWelcomeScreen() {
    canvas.style.backgroundImage = "url('images/nwlogo2.png')";
    canvas.style.backgroundSize = "1069px 864px";
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundPosition = "-458px -110px";
}

/**
 * Renders the descriptive text above the continue button
 */
function drawMessage() {
    ctx.fillStyle = questionBarColor;
    ctx.fillRect(canvas.width / 2 - 250, canvas.height - 325, 500, 150);
    ctx.fillStyle = "white";
    ctx.font = " 32px cymraeg";
    ctx.fillText("Select an avatar,", canvas.width / 2 - 5, canvas.height - 310);
    ctx.fillText("then enter your name", canvas.width / 2 - 5, canvas.height - 270);
    ctx.fillText("and click Continue", canvas.width / 2 - 5, canvas.height - 230);
}

/**
 * Initialises the page
 */
function initialiseNameInput() {
    clearCanvas();
    continueButton = {
    colour: questionBarColor,
    width: 500,
    height: 75,
    top: canvas.height - 150,
    left: canvas.width / 2 - 250,
    text: "Continue",
    text_color: 'white'
};
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //addStartButton();
    nameInputWelcomeScreen();
    renderContinueButton();
    drawMessage();
    renderNameInput();
    addAvatars();
    addNameInputEventListeners();
}

/**
 * Renders everything on screen
 */
function renderNameScreen() {
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderContinueButton();
    //renderNameInput();
    nameInput.render();
    addAvatars();
    drawMessage();
}

/**
 * Clears the entire canvas
 */
function clearCanvas() {
    ctx.clearRect(0, 0, 2000, 2000);
}

initialiseNameInput();