const JSONVital = JSON.parse(localStorage.getItem("Vital"))

$(document).ready(function() {
    let currentIndex;
    displayObj(JSONVital[0]);

    $("#datePicker").datepicker({ //Use JQUERY date picker to get dates with ease
        dateFormat: 'mm-dd-yy'
    });
    $("#datePicker").change(function(){
        var vitalObj;
        let selectDate = $(this).datepicker('getDate'); //Get Date from Picker
        let date = new Date(selectDate); //turn into obj
        let dateToCheck = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(); //Convert into usable format
        let stopCheck = false;
        $.each(JSONVital, function(index,item) { //Checks for the first record with a matching date
            if (item.Date == dateToCheck && !stopCheck){
                currentIndex = index + 1;
                vitalObj = item;
                stopCheck = true; //In place so if multiple notes are on one date, they dont get overriden
            }
        })
        if (vitalObj != null){ //Displays the Vital Object
            setNotes(currentIndex);
            displayObj(vitalObj);
        }
    });

    $("#hisInc").click(() => {
        let num = changeNotes(true);
        if (num < JSONVital.length){
            displayObj(JSONVital[num]);
        };
    });

    $("#hisDec").click(() => {
        let num = changeNotes(false);
        if (num < JSONVital.length){  
            displayObj(JSONVital[num]);
        };
    });
})

function setNotes(num){
    let numShow = document.getElementById("numShow");
    numShow.value = num;
}

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

Temperature - 
    Reading - ${obj.Temp}
    Method - ${obj.TempSite}

Pulse - 
    Reading - ${obj.Pulse}
    Pulse Ox - ${obj.PulseOx}
    
Blood Pressure - 
    Reading - ${obj.BP}
    Method - ${obj.BPMethod}
    `;

    let displayNotes = `
Physician - ${obj.Doctor}

Diagnosis - ${obj.Notes.Diagnosis}
Secondary Diagnosis - ${obj.Notes.SecDiagnosis}

Treatment - ${obj.Notes.Treatment}

Notes - 
${obj.Notes.Notes}
    `;

    $("#Date").val(obj.Date);
    $("#Notes").val(displayNotes);
    $("#VitalInfo").val(displayTextVitals);

};