import patientsFile from "../JSON/PatientJSONStructure.json" with {type:"json"};
import { URLExist } from "./util.js";


$(document).ready(function(){
    /*
    //Use to get Data from PHP file
    $.get("PHPFILEHERE",function(data){
        PatientJSON = JSON.parse(data);
    })
    */
    prepareInfo()

    let PatientJSON = JSON.parse(localStorage.getItem("Patient")) //ADD JSON RETRIVAL TO ALL SCRIPTS

    const arrID = ["patTitle","patFName","patMName","patLName","patBDay","patAddress","patPhoneNum","patEMContactName","patEMContactPhone","patEMRelation","patInsureProv","patInsureNum","patAllergies"]
    let objProps = Object.keys(PatientJSON)
    let count = 0
    objProps.forEach(key => { //Make ARRAY with IDs in it.
        $("#" + arrID[count]).text(PatientJSON[key])
        count += 1
    });

    let jointName = PatientJSON.FName + PatientJSON.LName

    let url = URLExist("Photo/"+ jointName + ".png") ? "Photo/"+ jointName + ".png" : "Photo/default.png"
    $("#PatientPhoto").attr("src",url)
})

function prepareInfo(){ //Stores all needed info for later use
    let patName = localStorage.getItem("name")
    console.log(patName)

    let PatientJSON = patientsFile[patName]
    let JSONMed = patientsFile[patName]["Medication"];
    let JSONVac = patientsFile[patName]["Immunization"];
    let JSONVital = patientsFile[patName]["Vitals"];

    localStorage.setItem("Patient",JSON.stringify(PatientJSON))
    localStorage.setItem("Meds",JSON.stringify(JSONMed))
    localStorage.setItem("Vac",JSON.stringify(JSONVac))
    localStorage.setItem("Vital",JSON.stringify(JSONVital))
}