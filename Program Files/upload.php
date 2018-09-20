<?php
/*connecting to database*/
$hn = 'INSERT YOUR SERVER IP ADDRESS HERE';
$un = 'INSERT YOUR SERVER USERNAME HERE';
$pw = 'INSERT YOUR SERVER PASSWORD HERE';
$db = 'INSERT YOUR DATABASE SCHEMA NAME HERE';
ini_set("display_errors", 1);
require_once 'upload.php';
$conn = new mysqli($hn, $un, $pw, $db);
if ($conn->connect_error) die($conn->connect_error);

//Users name
$name = $_POST["name"];

$target_dir = "faceAvatars/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        /*echo "File is an image - " . $check["mime"] . ".";*/
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "<br>Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "<br>Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "<br>Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "<br>Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";        
        $insertion = "INSERT INTO UserA(name, avatarDir)
                      VALUES ('$name', '$target_file')";
        $result = $conn->query($insertion);
        if(!$result) die($conn->error);
    } else {
    
    }
    
}
echo "<form action=\"file_ex.php\">
      <input type=\"submit\" value=\"Back to home\" />
      </form><br>";
echo "<form action=\"game.html\">
      <input type=\"submit\" value=\"To game\" />
      </form>";
?>