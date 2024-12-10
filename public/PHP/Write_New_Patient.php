<?php

include_once "Get_Patient_Photo_Data.php";

try{

    echo("PHP Action File Begun");
    echo("<br>");
    echo("----------------------------------------");
    echo("<br>");

    echo("Connection Started");
    echo("<br>");
    echo("Connection Info:");

    $host="itpwebserver";
    $port=3306;
    $socket="default";
    $user="hocc";
    $password="hoccclients";
    $dbname="patientdatabase";

    echo($host . ",\n");
    echo($port. ",\n");
    echo($socket. ",\n");
    echo($user. ",\n");
    echo($password. ",\n");
    echo($dbname. ",\n");
    echo("<br>");

    echo("Connection Status: ");

    echo(getPhoto());

    $dtbconn = new mysqli($host, $user, $password, $dbname, port: $port, socket:$socket);

    if ($dtbconn->connect_error){
        die("Could not connect to the database server". mysqli_connect_error());
    }
    else{
        echo("..........Connected");
        echo("<br>");
        echo("----------------------------------------");
        echo("<br>");
        echo("POST Retrieveal Started");
        echo("<br>");

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
        $emergencycomntactlastname = $_POST['emContactLName'];
        $emergencycontactrelationship = $_POST['relate'];

        $allergies = $_POST['allergies'];

        
        echo("POST Data:");
        echo("<br>");
        echo("Main Patient Data:");
        echo("<br>");
        echo($firstname.",". $lastname.",".$prefixes.",".$address.",".$phonenumber.",".$insurnaceprovider.",".$insurancenumber.",".$birthdate.",".$middleinital);
        echo("<br>");
        echo("Emergency Data:");
        echo("<br>");
        echo($emergencycontactphonenumber.",".$emergencycontactfirstname.",".$emergencycomntactlastname.",".$emergencycontactrelationship);
        echo("<br>");
        echo("Allergies Data:");
        echo("<br>");
        echo($allergies);
        echo("<br>");    

        echo("----------------------------------------");
        echo("<br>");
        echo("Record Validation Started");
        echo("<br>");

        $sql = "SELECT * from PatientTable";
        if ($result = mysqli_query($dtbconn, $sql)) {
            $patientcount = mysqli_num_rows( $result );        
            echo("Original Patient Count: ");
            echo($patientcount);
            echo("<br>");        
            if ( $patientcount <= 0){
                $patientcount = '1';            
                echo("Patient Count Changed to 1, No Records were Found");
                echo("<br>");            
                }
        }
        try{
            echo("----------------------------------------");
            echo("<br>");
            echo("SQL Insertion Started");
            echo("<br>");
            
            echo("Insert Into PatientTable");        
            $sql = "INSERT INTO 'PatientTable' ('PatientID','PatientInfo','Physician','EmergencyContact','TodaysVisit', 'PatientMedicalInfo') 
            VALUES ('$patientcount' ,'$patientcount','$patientcount','$patientcount','$patientcount','$patientcount')";
                //Primary Key, Foreign Keys        
            echo("Attributes: " . "PatientID"."PatientInfo"."Physician"."EmergencyContact"."TodaysVisit". "PatientMedicalInfo");
            echo("<br>");
            echo("Values: " . $patientcount.",".$patientcount.",".$patientcount.",".$patientcount.",".$patientcount.",".$patientcount);
            echo("<br>");    
            
            echo("Insert Into PatientInfoTable");        
            $sql = "INSERT INTO 'PatientInfoTable' ('PatientInfoID','FirstName','LastName','Prefixes','Address','PhoneNumber','InsuranceProvider','InsuranceNumber','MiddleInital','BirthDate') 
            VALUES ('$patientcount','$firstname','$lastname','$prefixes','$address','$phonenumber','$insurnaceprovider','$insurancenumber','$middleinital','$birthdate' )";
                //Primary Key, Attributes        
                echo("Attributes: ". "PatientInfoID"."FirstName"."LastName"."Prefixes"."Address"."PhoneNumber"."InsuranceProvider"."InsuranceNumber"."MiddleInital"."BirthDate");
                echo("<br>");
                echo("Values: " . $patientcount .",". $firstname .",". $lastname .",". $prefixes .",". $address .",". $phonenumber .",". $insurnaceprovider .",". $insurancenumber .",". $middleinital .",". $birthdate);
                echo("<br>");     
            
            echo("Insert Into EmergencyContactTable");        
            $sql = "INSERT INTO 'EmergencyContactTable' ('EmergencyContactID','EmergencyContactPhoneNumber','EmergencyContactLastName','EmergencyContactFirstName','EmergencyContactRelationship') 
            VALUES ('$patientcount','$emergencycontactphonenumber','$emergencycomntactlastname','$emergencycontactfirstname','$emergencycontactrelationship')";
                //Primary Key, Attributes        
                echo("Attributes: ". "EmergencyContactID"."EmergencyContactPhoneNumber"."EmergencyContactLastName"."EmergencyContactFirstName"."EmergencyContactRelationship");
                echo("<br>");
                echo("Values: " . $patientcount .",". $emergencycontactphonenumber .",". $emergencycomntactlastname .",". $emergencycontactfirstname.",".$emergencycontactrelationship);
                echo("<br>");

            echo("Insert Into PatientMedicalInfo");        
            $sql = "INSERT INTO 'PatientMedicalInfo' ('PatientMedicalInfoID','PatientDiagnoses','PatientSymptoms','PatientVitals','PatientHistory','PatientMedications','PatientVaccinations') 
            VALUES ('$patientcount','$patientcount','$patientcount','$patientcount','$patientcount','$patientcount','$patientcount')";
                //Primary Key, Foreign Keys        
                echo("Attributes: " . "PatientMedicalInfoID"."PatientDiagnoses"."PatientSymptoms"."PatientVitals"."PatientHistory"."PatientMedications"."PatientVaccinations");
                echo("<br>");
                echo("Values: " .$patientcount .",". $patientcount .",". $patientcount .",". $patientcount .",". $patientcount .",". $patientcount .",". $patientcount);
                echo("<br>");  
            
            echo("Insert Into VitalsTable");    
            $sql = "INSERT INTO 'VitalsTable' ('VitalsID','VitalsDateTime','Allergies','Temperature','Pulse','RespirationsBloodInfo','PainScaleRating')
            VALUES ('$patientcount','$patientcount','$patientcount','$patientcount','$patientcount','$patientcount','$patientcount','a')";
                //Primary Key, Foreign Keys, String        
                echo("Attributes: " . "VitalsID"."VitalsDateTime"."Allergies"."Temperature"."Pulse"."RespirationsBloodInfo"."PainScaleRating");
                echo("<br>");
                echo("Values: " . $patientcount .",". $patientcount .",". $patientcount .",". $patientcount .",". $patientcount .",". $patientcount .",". $patientcount .",". "a");
                echo("<br>");   
            
            echo("Insert Into AllergiesTable");        
            $sql = "INSERT INTO 'AllergiesTable' ('AllergiesID','Allergies') 
            VALUES ('$patientcount','$allergies')" ;
                //Primary Key, ID, Array
                echo("Attributes: " . "AllergiesID". "Allergies");
                echo("<br>");
                echo("Values: " . $patientcount . $allergies);
                echo("<br>");
        }
        catch (Exception $SQLError){
            echo"SQL Insert Error". $SQLError;
            
            echo("<br>");
            
        }
        echo("<br>");
        echo("----------------------------------------");
        echo("<br>");
        echo("****");
        echo("<br>");

        $dtbconn->close();
    }
    }
    catch (Exception $PHPError){
        echo"PHP Error". $PHPError;
        echo("<br>");
    }
?>