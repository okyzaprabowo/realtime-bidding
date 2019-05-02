<?php

require("phpMQTT.php");

$host         = "localhost";
$username     = "root";
$password     = "123456";
$dbname       = "bid";

$server = "broker.hivemq.com";     // change if necessary io.adafruit.com
$port = 1883;                   // set your password
$client_id = "bid-notification-bkm02"; // make sure this is unique for connecting to sever - you could use uniqid()

/* Create connection */
$conn = new mysqli($host, $username, $password, $dbname);

/* Check connection */
if ($conn->connect_error) {

     die("Connection to database failed: " . $conn->connect_error);
}

/* Get data from Client side using $_POST array */
$bidder_name  = $_POST['bidder_name'];
$bidder_value  = $_POST['bidder_value'];

$sql = "INSERT INTO bidder (bidder_name, bidder_value) VALUES ('". $bidder_name ."', '" . $bidder_value ."')";

if (mysqli_query($conn, $sql)) {
	// $mqtt = new phpMQTT($server, $port, $client_id);
	// if ($mqtt->connect(true, NULL, $username, $password)) {
	// 	$mqtt->publish("mqtt/bidapp/bkmraya02", "query");
	// 	$mqtt->close();
	// } else {
	//     echo "Time out!\n";
	// }

	// Try this if you use Heroku
	try{
		file_get_contents("https://bid-publisher.herokuapp.com");
    	echo "[using herokuapp] New record created successfully";
	}
	catch(Exception $e) {
	  echo 'Message: ' .$e->getMessage();
	}
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
