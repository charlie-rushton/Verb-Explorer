//Author: Sam Bentley
const TOP_BAR_HEIGHT = 50
const QUESTION_BAR_HEIGHT = 150;
const QUESTIONS_PER_LEVEL = 5;

var questions = [];
var answers = [];
var wrongAnsweredQuestions = [];
var corrections = [];
var currentQuestion;
var correctAns = 0;
var levelNumber = 1;
var questionNumber = 1;
var levelScreen = false;
var questionText = "";
var score = 0;
var time = 15.00;
var transitionTimer = 3; //Set to a constant after finished development (3 secods is ideal)
var questionAnswered = false;
var lives = 5;
var qResponse;
var textInput;
var gameOver = false;
var clickAnswer = new Audio("../sounds/Click_On.wav");
var endSound = new Audio("../sounds/Ta_Da.wav");
var correctAnswerSound = new Audio("../sounds/correct.wav");
var wrongAnswerSound = new Audio("../sounds/wrong.wav");
clickAnswer.preload = 'auto';
clickAnswer.load();
endSound.preload = 'auto';
endSound.load();
correctAnswerSound.preload = 'auto';
wrongAnswerSound.load();

var submitButton = {
    colour: "white",
    width: 100,
    height: 50,
    top: 450,
    left: 465,
    text: "Submit",
    text_color: 'black'
};

pushTestAnswers();

function playClickSound() {
    var click = clickAnswer.cloneNode();
    click.volume = 1;
    click.play();
}
function playEndSound() {
    var click = endSound.cloneNode();
    click.volume = 1;
    click.play();
}
function playCorrectSound() {
    var click = correctAnswerSound.cloneNode();
    click.volume = 1;
    click.play();
}
function playWrongSound() {
    var click = wrongAnswerSound.cloneNode();
    click.volume = 1;
    click.play();
}

/**
 * Send AJAX request to PHP file to return 5 questions for current level.
 */
function getLevelQuestions() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            questions[0] = response['question1'];
            questions[1] = response['question2'];
            questions[2] = response['question3'];
            questions[3] = response['question4'];
            questions[4] = response['question5'];
            console.log(response);
            console.log(questions);
            currentQuestion = questions[0];
            questionText = currentQuestion['question'];
            correctAns = currentQuestion['correctAnswer'];
            answers[0].correct = false;
            answers[1].correct = false;
            answers[2].correct = false;
            answers[3].correct = false;
            answers[correctAns].correct = true;
        }
    };
    xmlhttp.open("POST", "get_questions.php", true);
    xmlhttp.send(levelNumber);
}

/**
 * Add click listener to canvas for multiple choice questions.
 */
function addEventListeners() {
    canvas.addEventListener('click', clickListener, false);
}

/**
 * The click listener for multiple choice questions.
 */
function clickListener(event) {
    playClickSound();
    var x = event.offsetX;
    var y = event.offsetY;
    answers.forEach(function (answer) {
        if (y > answer.top && y < answer.top + answer.height && x > answer.left && x < answer.left + answer.width) {
            playClickSound();
            if (answer.correct && !questionAnswered && time > 0.01) {
                score += Math.round(10 * time);
                questionAnswered = true;
                playCorrectSound();
            }
            else if (!questionAnswered) {
                questionAnswered = true;
                lives -= 1;
                playWrongSound();
                if (lives == 0) {
                    canvas.removeEventListener('click', clickListener, false);
                    gameOver = true;
                    initialiseLeaderboard();
                }
            }
        }
    })
}

/**
 * Timer function is called every 10ms. re-renders the timer bar and checks if the 
 * game is over or question answered. Deals with events if the timer runs out by loading the 
 * next question or level.
 */
function timer() {
    //Level Screens
    if (!gameOver) {
        if (levelScreen && transitionTimer > 0.01) {
            showLevelScreen();
            transitionTimer -= 0.01;
            if (transitionTimer <= 0.01) {
                levelScreen = false;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                transitionTimer = 3;
                time = 15;
                if (levelNumber > 6) {
                    renderTextInput();
                }
            }
        }
        else {
            if (time > 0.01 && !questionAnswered) {
                //No timer fot levels 7 plus (text input)
                if (levelNumber <= 6) {
                    time -= 0.01;
                }
            }
            if (time <= 0.01 && !questionAnswered) {
                questionAnswered = true;
                lives -= 1;
            }
            if (questionAnswered && transitionTimer >= 0.01) {
                transitionTimer -= 0.01;
            }
            else if (questionAnswered && transitionTimer <= 0.01 && lives > 0) {
                //Transition to next question
                questionAnswered = false;
                transitionTimer = 3;
                if (questionNumber < 5) {
                    time = 15;
                    nextQuestion();
                }
                else if (levelNumber < 6) {
                    //Load next multiple choice level.
                    levelNumber++;
                    levelScreen = true;
                    questionNumber = 1;
                    getLevelQuestions();
                    addEventListeners();
                    transitionTimer = 3;

                }
                else if (levelNumber >= 6) {
                    //Display typed input questions.
                    levelNumber++;
                    levelScreen = true;
                    questionNumber = 1;
                    //renderTextInput();
                    canvas.removeEventListener('click', clickListener, false);
                    getLevelQuestions();
                }
                else if (levelNumber == 11) {
                    //End game. Show incorrect answers screen and leaderboards.
                }
            }
            render();
        }
    }
    else if (!leaderboardInitialised) {
        initialiseLeaderboard();
    }
}

/**
 * Renders the whole screen.
 */
function render() {
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px cymraeg";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    if (levelNumber < 7) {
        renderButtons();
    }
    else {
        //Render canvas input.
        //renderTextInput();
    }
    renderTopBar();
    renderQuestionBar();
    renderTimer();
    renderTimerBar();
    renderLives();
};

/**
 * Renders the text input field for text answer questions using the CanvasInput library
 * Renders the submit button.
 */
function renderTextInput() {
    canvas.removeEventListener('click', submitCLickListener, false);
    textInput = new CanvasInput({
        canvas: canvas,
        fontSize: 18,
        fontFamily: 'Arial',
        fontColor: '#212121',
        fontWeight: 'bold',
        width: 350,
        height: 30,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        boxShadow: '1px 1px 0px #fff',
        innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        value: "",
        x: canvas.width / 3,
        y: (canvas.height / 2) + 15
    });

    textInput.render();
    textInput.focus();

    answers.forEach(function (answer) {
        try {
            var t = currentQuestion[answer.number];
            answer.text = t;
        }
        catch (err) {

        }
    });

    //Draw Submit button
    ctx.fillStyle = submitButton.colour;
    ctx.fillRect(submitButton.left, submitButton.top, submitButton.width, submitButton.height);
    ctx.font = "24px cymraeg";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = submitButton.text_color;
    ctx.fillText("Submit", submitButton.left + 100 / 2, submitButton.top + 5);
    //Add click listener for submit button
    canvas.addEventListener('click', submitCLickListener, false);

}

/**
 * The click listener for the text input submit button. Compares the input answer to the correct answer
 */
function submitCLickListener(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    console.log('Clicked', x, y);
    if (y > submitButton.top && y < submitButton.top + submitButton.height
        && x > submitButton.left && x < submitButton.left + submitButton.width) {
        if (textInput.value().toUpperCase() === answers[correctAns].text.toUpperCase()) {
            console.log('Correct answer');
            score += 100;
            playCorrectSound();
        }
        else {
            //User entered the wrong answer
            wrongAnsweredQuestions.push(currentQuestion);
            corrections.push(answers[correctAns].text);
            lives--;
            playWrongSound();
            if (lives == 0) {
                //TODO: 
                //Do gameover/Leaderboard stuff
                gameOver = true;
                canvas.removeEventListener('click', submitCLickListener, false);
                initialiseLeaderboard();
                //showReview();
            }
        }
        if (levelNumber == 10 && questionNumber == 5) {
            gameOver = true;
            initialiseLeaderboard();
            //showReview();
        }
        textInput.destroy();
        if (questionNumber < 5 && levelNumber <= 10 && !gameOver) {
            textInput = new CanvasInput({
                canvas: canvas,
                fontSize: 18,
                fontFamily: 'Arial',
                fontColor: '#212121',
                fontWeight: 'bold',
                width: 350,
                height: 30,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 3,
                boxShadow: '1px 1px 0px #fff',
                innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                value: "",
                x: canvas.width / 3,
                y: (canvas.height / 2) + 15
            });
            textInput.render();
            nextQuestion();
            answers.forEach(function (answer) {
                try {
                    var t = currentQuestion[answer.number];
                    answer.text = t;
                }
                catch (err) {

                }
            });
        }
        else if (!gameOver) {
            levelNumber++;
            levelScreen = true;
            questionNumber = 1;
            canvas.removeEventListener('click', clickListener, false);
            getLevelQuestions();
        }
    }
}

/**
 * Renders the multiple chouce buttons.
 */
function renderButtons() {
    //console.log("Buttons rendered");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = brandColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    answers.forEach(function (answer) {
        if (questionAnswered) {
            if (answer.correct) {
                ctx.fillStyle = "green";
            }
            else ctx.fillStyle = "red";
            var strokeSize = 5
            ctx.fillRect(answer.left - strokeSize, answer.top - strokeSize, answer.width + 2 * strokeSize,
                answer.height + 2 * strokeSize);
        }
        ctx.fillStyle = answer.colour;
        ctx.fillRect(answer.left, answer.top, answer.width, answer.height);
        ctx.font = "40px cymraeg";
        ctx.fillStyle = answer.text_color;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        try {
            var t = currentQuestion[answer.number];
            answer.text = t;
        }
        catch (err) {

        }

        ctx.fillText(answer.text, answer.left + answer.width / 2, answer.top + (answer.height / 3));
    });
}

/**
 * Renders the top bar with score and level number.
 */
function renderTopBar() {
    ctx.clearRect(0, 0, canvas.width, TOP_BAR_HEIGHT);
    ctx.fillStyle = topBarColor;
    ctx.fillRect(0, 0, canvas.width, TOP_BAR_HEIGHT);
    ctx.font = "30px cymraeg";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("Level " + levelNumber, 5, 5);

    ctx.font = "30px cymraeg";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.fillText("Score: " + score, canvas.width - 5, 5);
}

/**
 * Renders the question bar with question text.
 */
function renderQuestionBar() {
    ctx.clearRect(0, TOP_BAR_HEIGHT, canvas.width, QUESTION_BAR_HEIGHT);
    ctx.fillStyle = questionBarColor;
    ctx.fillRect(0, TOP_BAR_HEIGHT, canvas.width, QUESTION_BAR_HEIGHT + 35);
    ctx.font = "30px cymraeg";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Question " + questionNumber, canvas.width / 2, 70);
    ctx.fillText(questionText, canvas.width / 2, 100);
}

/**
 * Renders the timer text.
 */
function renderTimer() {
    ctx.clearRect(canvas.width / 2 - 200, 150, 400, 150);
    renderQuestionBar();
    ctx.font = "30px cymraeg";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Time Remaining: " + time.toFixed(0), canvas.width / 2, 150);
}

/**
 * Renders the timer bar with the correct percentage of the time remaining.
 */
function renderTimerBar() {
    var barTop = TOP_BAR_HEIGHT + QUESTION_BAR_HEIGHT;
    var barHeight = 30;
    ctx.clearRect(0, barTop, canvas.width, barHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(0, barTop, canvas.width, barHeight);
    ctx.fillStyle = topBarColor;
    ctx.fillRect(0, barTop, canvas.width * (time / 15), barHeight);
}

/**
 * Render the lives bar and lives.
 */
function renderLives() {
    var barTop = TOP_BAR_HEIGHT + QUESTION_BAR_HEIGHT + 35;
    barHeight = 30;
    ctx.clearRect(canvas.width - 230, barTop, 200, barHeight);
    ctx.fillStyle = topBarColor;
    ctx.beginPath();
    ctx.moveTo(canvas.width - 200, barTop);
    ctx.lineTo(canvas.width - 200, barTop + barHeight);
    ctx.lineTo(canvas.width - 230, barTop);
    ctx.fill();
    ctx.fillRect(canvas.width - 200, barTop, 200, barHeight);
    ctx.font = "24px cymraeg";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("Lives: ", canvas.width - 190, barTop);
    var circleSpacing = 22;

    // Draw five purple circles
    for (i = 0; i < 5; i++) {
        ctx.fillStyle = questionBarColor;
        ctx.beginPath();
        ctx.arc(canvas.width - 110 + (i * circleSpacing), barTop + 15, 8, 0, Math.PI * 2, true); // Outer circle
        ctx.fill();
    }

    // Draw white circles for number of lives remaining
    for (i = 0; i < lives; i++) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(canvas.width - 110 + (i * circleSpacing), barTop + 15, 8, 0, Math.PI * 2, true); // Outer circle
        ctx.fill();
    }

}

/**
 * Add the buttons answers to array at the start.
 */
function pushTestAnswers() {
    answers.push({
        colour: buttonColor,
        width: 330,
        height: 100,
        top: 350,
        left: 200,
        text: "Answer 1",
        number: 0,
        text_color: brandColor,
        correct: false
    });

    answers.push({
        colour: buttonColor,
        width: 330,
        height: 100,
        top: 350,
        left: 550,
        text: "Answer 2",
        number: 1,
        text_color: brandColor,
        correct: false
    });

    answers.push({
        colour: buttonColor,
        width: 330,
        height: 100,
        top: 500,
        left: 200,
        text: "Answer 3",
        number: 2,
        text_color: brandColor,
        correct: false
    });

    answers.push({
        colour: buttonColor,
        width: 330,
        height: 100,
        top: 500,
        left: 550,
        text: "Answer 4",
        number: 3,
        text_color: brandColor,
        correct: false
    });
}

/**
 * Display the level screen before questions.
 */
function showLevelScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = brandColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white"
    ctx.font = "72px cymraeg";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("Level " + levelNumber, canvas.width / 2, canvas.height / 2);
}

/**
 * Initialise the game
 */
function initialise() {
    levelScreen = true;
    getLevelQuestions();
    addEventListeners();
}

/**
 * Load next question.
 */
function nextQuestion() {
    questionNumber++;
    currentQuestion = questions[questionNumber - 1];
    questionText = currentQuestion['question'];
    correctAns = currentQuestion['correctAnswer'];
    answers[0].correct = false;
    answers[1].correct = false;
    answers[2].correct = false;
    answers[3].correct = false;
    answers[correctAns].correct = true;
    /*renderQuestionBar();
    renderButtons();
    addEventListeners();*/
    render();
}

/**
 * Start the game and set timer for the timer() function to be called.
 */
function startGame() {
    initialise();
    setInterval(timer, 10);
}
