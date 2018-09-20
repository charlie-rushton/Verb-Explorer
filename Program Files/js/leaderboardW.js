//Leaderboard
//Author: Charlie Rushton, Sam Bentley
//Based on work by: Sam Bentley
button = [];
const buttonColor = "white";
const brandColor = "#461964";
const topBarColor = "#71587E"
const questionBarColor = "#26013c";
var sheet = document.createElement("style");
var leaderboardInfo = [];
var imgs = [];
var names = [];
var scores = [];
var posResponse = 1;
var leaderboardInitialised = false;

/**
 * Send AJAX request to scoreB.php to download the top 10 scorers.
 */
function getLeaderboard() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            for (i = 0; i < 10; i++) {
                leaderboardInfo[i] = response['pos' + posResponse];
                imgs[i] = leaderboardInfo[i][0];
                names[i] = leaderboardInfo[i][1];
                scores[i] = leaderboardInfo[i][2];
                posResponse = posResponse + 1;
            }
            setLeaderboard();
        }
    };
    xmlhttp.open("GET", "scoreB.php", true);
    xmlhttp.send();
}

/**
 * Send AJAX request to uploadScore.php to insert the users score into the database.
 */
function uploadScore() {
    var xmlhttp = new XMLHttpRequest();
    var data = [name, avatarDir, score];
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xmlhttp.open("POST", "uploadScore.php?q=" + JSON.stringify(data), true);

    xmlhttp.send(data);
}

/**
 * Fill the leaderboard with the names and scores downloaded from getLeaderboard().
 */
function setLeaderboard() {
    ctx.fillStyle = questionBarColor;
    ctx.fillRect(0 + 110, 0 + 180, 790, 65);
    ctx.font = "36px cymraeg";
    ctx.fillStyle = "white";
    setImages();
    ctx.fillText("You", 0 + 160, 0 + 195);
    ctx.fillText(name, 0 + 550, 0 + 195);
    ctx.fillText(score, 0 + 825, 0 + 195);
    ctx.font = "18px cymraeg";
    for (i = 0; i < 10; i++) {
        if (i < 5) {
            ctx.fillText(names[i], 0 + 200, 0 + 315 + (60 * i));
            ctx.fillText(scores[i], 0 + 350, 0 + 315 + (60 * i));
        }
        else {
            imgPos = 300;
            ctx.fillText(names[i], 0 + 700, 0 + 315 + (60 * (i - 5)));
            ctx.fillText(scores[i], 0 + 850, 0 + 315 + (60 * (i - 5)));
        }
    }
}

/**
 * Download and render the images of the top 10 as well as the users selected icon.
 */
function setImages() {

    var img0 = new Image;
    img0.onload = function () {
        ctx.drawImage(img0, 0 + 250, 0 + 150, 125, 125);//Should be the image of the current player
    };
    img0.src = avatarDir;

    var img1 = new Image;

    img1.onload = function () {
        ctx.drawImage(img1, 0 + 80, 0 + 300, 50, 50);

    };
    img1.src = imgs[0];


    var img2 = new Image;
    img2.onload = function () {
        ctx.drawImage(img2, 0 + 80, 0 + 360, 50, 50);
    };
    img2.src = imgs[1];

    var img3 = new Image;
    img3.onload = function () {
        ctx.drawImage(img3, 0 + 80, 0 + 420, 50, 50);
    };
    img3.src = imgs[2];

    var img4 = new Image;
    img4.onload = function () {
        ctx.drawImage(img4, 0 + 80, 0 + 480, 50, 50);
    };
    img4.src = imgs[3];

    var img5 = new Image;
    img5.onload = function () {
        ctx.drawImage(img5, 0 + 80, 0 + 540, 50, 50);
    };
    img5.src = imgs[4];

    var img6 = new Image;
    img6.onload = function () {
        ctx.drawImage(img6, 0 + 580, 0 + 300, 50, 50);
    };
    img6.src = imgs[5];

    var img7 = new Image;
    img7.onload = function () {
        ctx.drawImage(img7, 0 + 580, 0 + 360, 50, 50);
    };
    img7.src = imgs[6];

    var img8 = new Image;
    img8.onload = function () {
        ctx.drawImage(img8, 0 + 580, 0 + 420, 50, 50);
    };
    img8.src = imgs[7];

    var img9 = new Image;
    img9.onload = function () {
        ctx.drawImage(img9, 0 + 580, 0 + 480, 50, 50);
    };
    img9.src = imgs[8];

    var img10 = new Image;
    img10.onload = function () {
        ctx.drawImage(img10, 0 + 580, 0 + 540, 50, 50);
    };
    img10.src = imgs[9];
}

/**
 * Add event listener to check if the start over button is pressed.
 */
function addLeaderboardEventListeners() {
    canvas.addEventListener('click', function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        button.forEach(function (question) {
            if (y > question.top && y < question.top + question.height && x > question.left && x < question.left + question.width) {
                location.reload();
            }
        });
    });
}

/** 
 * Renders the start over button.
 */
function renderLeaderboardButtons() {
    ctx.globalAlpha = 1;
    button.forEach(function (question) {
        ctx.fillStyle = question.colour;
        ctx.fillRect(question.left, question.top, question.width, question.height);
        ctx.font = "36px cymraeg";
        ctx.fillStyle = question.text_color;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(question.text, question.left + question.width / 2, question.top + (question.height / 4));
    });
    ctx.font = "18px cymraeg";
    ctx.fillText("For help or questions, contact e.aphywel@bangor.ac.uk", canvas.width / 2, canvas.height - 35);
}

function addButton() {
    button.push({
        colour: questionBarColor,
        width: 250,
        height: 75,
        top: canvas.height - 120,
        left: canvas.width / 2 - 125,
        text: "Cychiwn Eto",
        text_color: 'white'
    });
}

/**
 * Draws the rectangles that make up the leaderboard.
 */
function Leaderboard() {
    ctx.fillStyle = "white";
    ctx.fillRect(0 + 30, 0 + 30, canvas.width - 60, canvas.height - 150);

    ctx.fillStyle = brandColor;
    ctx.fillRect(0 + 35, 0 + 35, canvas.width - 70, canvas.height - 160);

    ctx.fillStyle = questionBarColor;
    ctx.fillRect(0 + 35, 0 + 35, canvas.width - 70, canvas.height - 625);

    ctx.fillStyle = questionBarColor;
    ctx.fillRect(0 + 110, 0 + 180, 790, 65);

    var startPos = 295;
    for (i = 0; i < 3; i++) {
        ctx.fillStyle = topBarColor;
        ctx.fillRect(35, startPos, canvas.width - 70, 60);
        startPos = startPos + 120;
    }

    ctx.fillStyle = questionBarColor;
    ctx.fillRect(canvas.width / 2, 295, 2.5, 300);

    ctx.font = "96px cymraeg";
    ctx.fillStyle = "white";
    ctx.fillText("Bwrdd Sgôr", 240, 30);

    var leaderboardNum = 1;
    var startPosX = 50;
    var startPosY = 315;
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 5; j++) {
            ctx.font = "36px cymraeg";
            ctx.fillStyle = "white";
            ctx.fillText(leaderboardNum, startPosX, startPosY);
            leaderboardNum = leaderboardNum + 1;
            startPosY = startPosY + 60;
        }
        startPosY = 315;
        startPosX = startPosX + 480;
    }
}

/**
 * Loads and renders everything. Called by game.js when game is finished.
 */
function initialiseLeaderboard() {
    //playEndSound();
    uploadScore();
    ctx.fillStyle = brandColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    Leaderboard();
    addButton();
    renderLeaderboardButtons();
    addLeaderboardEventListeners();
    getLeaderboard();
    leaderboardInitialised = true;
}