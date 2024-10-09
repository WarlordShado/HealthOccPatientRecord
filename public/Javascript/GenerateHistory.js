import patientsFile from "/public/JSON/PatientJSONStructure.json" with {type:"json"};
import { setNotes } from "./util.js";

const JSONVital = patientsFile[localStorage.getItem("name")]["Vitals"];


$(document).ready(function() {
    let currentIndex;

    $("#datePicker").datepicker({ //Use JQUERY date picker to get dates with ease
        dateFormat: 'mm-dd-yy'
    });
    $("#datePicker").change(function(){
        var vitalObj;
        let selectDate = $(this).datepicker('getDate'); //Get Date from Picker
        let date = new Date(selectDate); //turn into obj
        let dateToCheck = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(); //Convert into usable format
        let stopCheck = false;
        $.each(JSONVital, function(index,item) {
            if (item.Date == dateToCheck && !stopCheck){
                currentIndex = index + 1;
                vitalObj = item;
                stopCheck = true;
            }
        })
        if (vitalObj != null){
            setNotes(currentIndex);
            displayObj(vitalObj);
        }
        
    });

    $("#hisInc").click(() => {
        let num = changeNotes(true)
        if (num < JSONVital.length){
            displayObj(JSONVital[num]);
        };
    });

    $("#hisDec").click(() => {
        let num = changeNotes(false)
        if (num < JSONVital.length){  
            displayObj(JSONVital[num]);
        };
        
    });
})

function changeNotes(increase){ //Changes around the text in the previous notes tab. Work in Progress
    let numShow = document.getElementById("numShow");
    let number = Number(numShow.value);

    if (increase) {
        number += 1;
    }else{
        if (number != 1){
            number -= 1;
        }
    };
    numShow.value = number;
    return number - 1;
}

function displayObj(obj){
    let displayTextVitals = `
Time - ${obj.Time}

Tempeture - 
    Reading - ${obj.Temp}
    Method - ${obj.TempSite}

Pulse - 
    Reading - ${obj.Pulse}
    Pulse Ox - ${obj.PulseOx}
    
Blood Pressure - 
    Blood Type - ${obj.BloodType}
    Reading - ${obj.BP}
    Method - ${obj.BPMethod}
    `;

    let displayNotes = `
Phyisician - ${obj.Doctor}

Diagnosis - ${obj.Notes.Diagnosis}
Secondary Diagnosis - ${obj.Notes.SecDiagnosis}

Treatment - ${obj.Notes.Treatment}

Notes - 
${obj.Notes.Notes}
    `;

    $("#Date").val(obj.Date);
    $("#Notes").val(displayNotes);
    $("#VitalInfo").val(displayTextVitals);

}