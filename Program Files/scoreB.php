<?php
// Author: Ben Winter, Sam Bentley
// Returns the top 10 players by score in the database.

	//connecting to database
	$hn = 'INSERT YOUR SERVER IP ADDRESS HERE';
	$un = 'INSERT YOUR SERVER USERNAME HERE';
	$pw = 'INSERT YOUR SERVER PASSWORD HERE';
	$db = 'INSERT YOUR DATABASE SCHEMA NAME HERE';
	require_once 'scoreB.php';
	$conn = new mysqli($hn, $un, $pw, $db);
	$checkScoreBoard = "SELECT score, name, avatarDir
						FROM UserA
						ORDER BY score DESC LIMIT 10;";
	$top10ScoreBoard = $conn->query($checkScoreBoard);       
	if(!$top10ScoreBoard) die($conn->error);      
    
	$rows = $top10ScoreBoard->num_rows;
	$playerArray = [
    "pos1" => "",
    "pos2" => "",
    "pos3" => "",
    "pos4" => "",
    "pos5" => "",
	"pos6" => "",
    "pos7" => "",
    "pos8" => "",
    "pos9" => "",
    "pos10" => "",
];
    
	for ($i = 0; $i < 10; ++$i)
	{
		$top10ScoreBoard->data_seek($i);
		$rows = $top10ScoreBoard->fetch_array(MYSQLI_ASSOC);
		$playerName = $rows['name'];
		$imgSrc = $rows['avatarDir'];
		$score = $rows['score'];
		$row = [$imgSrc, $playerName, $score];
		$key = "pos" . ($i + 1);
		$playerArray[$key] = $row;
	}
	echo json_encode($playerArray);
    
	$conn->close();
?>