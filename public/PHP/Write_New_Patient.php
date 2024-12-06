<?php

$host = "itpwebserver";
$port = 3306;
$socket = "";
$user = "hocc";
$password = "hoccclients";
$dbname = "patientdatabase";

$conn = new mysqli($host, $user, $password, $dbname, port: $port, socket: $socket);
if ($conn->connect_error){
    die("connnection Error". $connn->connect_error);
}

$sql = "SELECT * from PatientTable"; {
    $patientcount = mysqli_num_rows( $result );
}

$firstname = $_POST['fName'];
$lastname = $_POST['lName'];
$prefixes = $_POST['title'];
$address = $_POST['address'];
$phonenumber = $_POST['pNum'];
$insurnaceprovider = $_POST['insureProv'];
$insurancenumber = $_POST['insureNum'];
$birthdate = $_POST['bDay'];
$middleinital = $_POST['mInit'];

$emergencycontactphonenumber = $_POST['emContactPhone'];
$emergencycontactfirstname = $_POST['emContactFName'];
$emergencycomntactlastname = $_POST['emCOntactLName'];
$emergencycontactrelationship = $_POST['relate'];

$allergies = $_POST['allergies'];

$sql = "INSERT INTO 'PatientTable' VALUES ('  $patientcount ','  $patientcount ','  $patientcount ','  $patientcount ','  $patientcount ','  $patientcount ' )" ;

$sql = "INSERT INTO 'PatientInfoTable' VALUES ('  $patientcount ', '$firstname','$lastname','$prefixes','$address','$phonenumber','$insurnaceprovider','$insurancenumber','$middleinital','$birthdate', )" ;

$sql = "INSERT INTO 'EmergencyContactTable' VALUES ('$emergencycontactrelationship',  ' $emergencycontactfirstname',' $emergencycomntactlastname',' $emergencycontactrelationship')" ;

$sql = "INSERT INTO 'PatientMedicalInfo' VALUES (' $patientcount', ' $patientcount', ' $patientcount', ' $patientcount', ' $patientcount', ' $patientcount', ' $patientcount' )" ;

$sql = "INSERT INTO 'VitalsTable' VALUES (' $patientcount', ' $patientcount',  ' $patientcount', ' $patientcount', ' $patientcount', ' $patientcount', ' $patientcount', '',)" ;

$sql = "INSERT INTO 'AllergiesTable' VALUES ('$patientcount', '$allergies' )" ;

if ($conn->multi_query($sql) === TRUE) {
    echo "Patient Added";
} else {
    echo "Wrtie Error: " . $sql . $conn->error;
}

$conn->close();
?>