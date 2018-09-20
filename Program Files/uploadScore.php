<?php
	// Authors: ben Winter, Sam Bentley
	// This file inserts the provided score into the users table in the database.

	/*connecting to database*/
	error_reporting(E_ALL ^ E_WARNING);
	$hn = 'INSERT YOUR SERVER IP ADDRESS HERE';
	$un = 'INSERT YOUR SERVER USERNAME HERE';
	$pw = 'INSERT YOUR SERVER PASSWORD HERE';
	$db = 'INSERT YOUR DATABASE SCHEMA NAME HERE';
	ini_set("display_errors", 1);
	require_once 'uploadScore.php';
	$conn = new mysqli($hn, $un, $pw, $db);
	if ($conn->connect_error) die($conn->connect_error);

	/*$input = file_get_contents("php://input");
	$input = json_decode( $input );
	*/
	$arr = $_REQUEST["q"];
	$input = json_decode($arr);

	$stmt = $conn->prepare("INSERT INTO `UserA`(name, avatarDir, score) VALUES (?, ?, ?)");
	$stmt->bind_param("ssi", $name, $avatarDir, $score);

	$name = $input[0];
	$avatarDir = $input[1];
	$score = $input[2];
	$score = (int)$score;

	$stmt->execute();

	$stmt->close();
	$conn->close();
?>