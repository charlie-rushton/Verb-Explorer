<?php
// Author: Ben Winter, Sam Bentley

// This file selects 5 questions in random order for the level supplied.

/*connecting to database*/
error_reporting(E_ALL ^ E_WARNING);
$hn = 'INSERT YOUR SERVER IP ADDRESS HERE';
$un = 'INSERT YOUR SERVER USERNAME HERE';
$pw = 'INSERT YOUR SERVER PASSWORD HERE';
$db = 'INSERT YOUR DATABASE SCHEMA NAME HERE';
ini_set("display_errors", 1);
$conn = new mysqli($hn, $un, $pw, $db);
if ($conn->connect_error) die($conn->connect_error);
//Get data from POST. In this case it is the level number in raw data.
//$levelNumber = 1;
$levelNumber = file_get_contents("php://input");
//Get 5 randomly selected questions for the current level.
$question = "SELECT questionTitle FROM welshQuestion
                    WHERE levelID = '$levelNumber' ORDER BY RAND() LIMIT 5;";
$result = $conn->query($question);
if(!$result) die($conn->error);

$rows = $result->num_rows; //Should always be 5
// Create a keyed array. Each question will map to a 2d array holding questions and answers
$rowArray = [
    "question1" => "",
    "question2" => "",
    "question3" => "",
    "question4" => "",
    "question5" => "",
];
// Loop through all 5 of the selected questions
for ($j = 0; $j < $rows; ++$j)
{
	$row = $result->fetch_array(MYSQLI_ASSOC);
	$key = "question" . ($j + 1);
	
	$title = $row['questionTitle'];
	
	$questionArray = [
	    "question" => $title,
	    ];
	
	$title = mysqli_real_escape_string($conn, $title);
	//This is to check the questionID
	    $checker = "SELECT questionID
                FROM welshQuestion
                WHERE questionTitle='$title';";
	$checkerResult = $conn->query($checker);
	if(!$checkerResult) die($conn->error);
	
	$rows2 = $checkerResult->num_rows;
	
	for ($k = 0; $k < $rows2; ++$k)
	{
		$checkerResult->data_seek($k);
		$row = $checkerResult->fetch_array(MYSQLI_ASSOC);
	}
	
	$IDofthequestion = $row['questionID'];
	$IDofthequestion = mysqli_real_escape_string($conn, $IDofthequestion);
	//Select the correct and incorrect answers to the question ID
	$answer =  "SELECT a.answerValue, a.correctAnswer
			FROM AnswerA a, welshQuestion q
			WHERE a.questionID=q.questionID AND a.questionID='$IDofthequestion'
			ORDER BY RAND();";
	$answerResult = $conn->query($answer);
	if(!$answerResult) die($conn->error);
	
	$rows3 = $answerResult->num_rows;
	$buttonPressed = NULL;
	
	$ansnum = 0;
	$ansarray = [];
	for ($l = 0; $l < $rows3; ++$l)
	    {
		$answerResult->data_seek($l);
		$row4 = $answerResult->fetch_array(MYSQLI_ASSOC);
		
		$answerVal = $row4['answerValue'];
		
		array_push($ansarray, $answerVal);
		$correctAnswer = $row4['correctAnswer'];
		if ($correctAnswer == 1)
			        {
			$ansnum = $l;
		}
		
		if (isset($_POST['button'])) echo $_POST['button'];
		else $name = "(Not entered)";
	}
	$correctArray = [
	    "correctAnswer" => $ansnum,
	    ];
	//Add the three keyed arrays together
	$rowArray[$key] = $questionArray + $ansarray + $correctArray;
}
echo json_encode($rowArray);

//Below code is not used by the game.

$CheckIfAnswerCorrect = "SELECT a.correctAnswer
                            FROM AnswerA a, welshQuestion q
                            WHERE a.questionID = q.questionID AND a.questionID = 
                            '$IDofthequestion' AND a.correctAnswer = '1';";
$ifAnswerCorrect = $conn->query($CheckIfAnswerCorrect);
if(!$ifAnswerCorrect) die($conn->error);

$rows5 = $ifAnswerCorrect->num_rows;

for ($l = 0; $l < $rows5; ++$l)
    {
	$ifAnswerCorrect->data_seek($l);
	$row5 = $ifAnswerCorrect->fetch_array(MYSQLI_ASSOC);
	
	$rightAnswer = $row5['correctAnswer'];
}

// Close connections and statements
$result->close();
$checkerResult->close();
$answerResult->close();
$ifAnswerCorrect->close();
$conn->close();
?>