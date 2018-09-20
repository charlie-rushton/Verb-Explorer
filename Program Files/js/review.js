var leaderBoardButton = {
    colour: questionBarColor,
    width: 500,
    height: 75,
    top: canvas.height - 150,
    left: canvas.width / 2 - 250,
    text: "View Leaderboard",
    text_color: 'white'
};

function showReview() {
    leaderboardInitialised = true;
    clearCanvas();
    ctx.fillStyle = brandColor;
    ctx.fillStyle = "white";
    var startXPos = 200;
    var startYPos = 300;
    for (i = 0; i < 5; i++) {
        ctx.fillText(wrongAnsweredQuestions[i], startXPos, startYPos + i * 50);
        ctx.fillText("Correct Answer", startXPos, startYPos + (i * 50) + 20);
        ctx.fillText(corrections[i], startXPos, startYPos + (i * 50) + 50);
    }
}

function addNameInputEventListeners() {
    canvas.addEventListener('click', leaderboardButtonClickListener, false);
}

function addLeaderboardButton() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = startleaderBoardButtonButton.colour;
    ctx.fillRect(leaderBoardButton.left, leaderBoardButton.top, leaderBoardButton.width, 
    leaderBoardButton.height);
    ctx.font = "36px cymraeg";
    ctx.fillStyle = leaderBoardButton.text_color;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    console.log(ctx.textBaseline);
    ctx.fillText(leaderBoardButton.text, leaderBoardButton.left + leaderBoardButton.width / 2,
        leaderBoardButton.top + (leaderBoardButton.height / 4));
}

function leaderboardButtonClickListener() {
    var x = event.offsetX;
        var y = event.offsetY;
        if (y > leaderBoardButton.top && y < leaderBoardButton.top + leaderBoardButton.height
            && x > leaderBoardButton.left && x < leaderBoardButton.left + leaderBoardButton.width) {
            canvas.removeEventListener('click', leaderboardButtonClickListener, false);
            initialiseLeaderboard();
        }
}