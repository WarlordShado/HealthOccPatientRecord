import patientsFile from "../JSON/ReformattedTestData.json" with {type:"json"};
import { URLExist, reformatJSON } from "./util.js";


$(document).ready(function(){
    /*
    //Use to get Data from PHP file
    $.get("../PHP/Get_Patient.php",function(data){
        PatientJSON = JSON.parse(data);
    })
    */
    prepareInfo();

    let PatientJSON = JSON.parse(localStorage.getItem("Patient")); //ADD JSON retrieval TO ALL SCRIPTS

    //Store IDs for faster generation process
    const arrID = ["patTitle","patFName","patMName","patLName","patBDay","patAddress","patPhoneNum","patEMContactName","patEMContactPhone","patEMRelation","patInsureProv","patInsureNum","patAllergies"];
    let objProps = Object.keys(PatientJSON);//Returns ever element in the JSON structure
    let count = 0;
    objProps.forEach(key => { //Loops through the JSON data and finds the corresponding ID number
        $("#" + arrID[count]).text(PatientJSON[key])
        count += 1;
    });

    let jointName = PatientJSON.FName + PatientJSON.LName;

    let url = URLExist("Photo/"+ jointName + ".png") ? "Photo/"+ jointName + ".png" : "Photo/default.png"; //Checks if patient photo exists
    $("#PatientPhoto").attr("src",url);
});

function prepareInfo(){ //Stores all needed info for later use
    let patName = localStorage.getItem("name");

    let PatientJSON = JSON.parse(reformatJSON(patName,patientsFile));
    let JSONMed = PatientJSON["Medication"];
    let JSONVac = PatientJSON["Immunization"];
    let JSONVital = PatientJSON["Vitals"];

    localStorage.setItem("Patient",JSON.stringify(PatientJSON));
    localStorage.setItem("Meds",JSON.stringify(JSONMed));
    localStorage.setItem("Vac",JSON.stringify(JSONVac));
    localStorage.setItem("Vital",JSON.stringify(JSONVital));
};