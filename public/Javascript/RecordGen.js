import patientsFile from "/public/JSON/PatientJSONStructure.json" with {type:"json"};
import { URLExist } from "./util.js";


$(document).ready(function(){
    /*
    //Use to get Data from PHP file
    $.get("PHPFILEHERE",function(data){
        PatientJSON = JSON.parse(data);
    })
    */

    let patName = localStorage.getItem("name")

    let PatientJSON = patientsFile[patName]

    const arrID = ["patTitle","patFName","patMName","patLName","patBDay","patAddress","patPhoneNum","patEMContactName","patEMContactPhone","patEMRelation","patInsureProv","patInsureNum","patAllergies"]
    let objProps = Object.keys(PatientJSON)
    let count = 0
    objProps.forEach(key => { //Make ARRAY with IDs in it.
        $("#" + arrID[count]).text(PatientJSON[key])
        count += 1
    });

    let url = "Photo/" + PatientJSON.FName + PatientJSON.LName + ".png"

    URLExist(url) ? $("#PatientPhoto").attr("src",url):$("#PatientPhoto").attr("src","Photo/default.png")
})