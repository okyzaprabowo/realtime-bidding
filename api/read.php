<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bid";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, bidder_name, bidder_value, bidder_timestamp FROM bidder";
$result = $conn->query($sql);

// $sth = mysqli_query($sql, true);
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);
$conn->close();
?>