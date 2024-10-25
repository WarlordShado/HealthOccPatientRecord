const JSONMed = JSON.parse(localStorage.getItem("Meds"))
const JSONVac = JSON.parse(localStorage.getItem("Vac"))

$(document).ready(function(){
    $.each(JSONMed, function(key,value){writeLBX(key,value,"MedLBX")})
    $.each(JSONVac, function(key,value){writeLBX(key,value,"VacLBX")})
    
    document.getElementById("MedLBX").addEventListener('change',function(){ //Display med when med name is selected in the listbox
        displayMed(this)
    })

    document.getElementById("VacLBX").addEventListener('change',function(){ //Display vac when vac name is selected in the listbox
        displayVac(this)
    })
})

function writeLBX(key,value,container){ //Generates the meds from the json file
    let medName = value.MedName
    let medOption = $(`<option class="MedSelect" value="${key}">${medName}</option>`)
    $("#" + container).append(medOption)
}

function displayVac(objContain){
    let index = objContain.value
    
    let obj = JSONVac[index]

    let medInfo = `
    Date Prescribed - ${obj.DateVac}

    Prescriber Name - ${obj.PrescriberName}

    Vaccine Name - ${obj.MedName}

    Vaccine Purpose - ${obj.Purpose}

    Site - ${obj.Site}

    Dosage - ${obj.Dosage} Milligrams

    Next Vaccination Date - ${obj.NextVac}
    `

    $("#VaccinationInfo").val(medInfo)
}

function displayMed(objContain){
    let index = objContain.value
    
    let obj = JSONMed[index]

    let medInfo = `
    Date Prescribed - ${obj.DateMed}

    Prescriber Name - ${obj.PrescriberName}

    Medication Name - ${obj.MedName}

    Dispensing Instruction - ${obj.DispIns}

    Purpose - ${obj.Purpose}

    Dosage - ${obj.Dosage} Milligrams

    Refills - ${obj.Refills}
    `

    $("#MedicationInfo").val(medInfo)
}

