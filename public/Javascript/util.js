export function URLExist(url){ //Checks if a specifyed File Path exists 
    var http = new XMLHttpRequest();
    http.open('HEAD',url,false);
    http.send();
    if(http.status != 404 && url){
        return true;
    };
    return false;
};

export function reformatJSON(patName,json){ //Reformatts the data to a more usable format
    let patientInfoObj = json[patName]["Patient_Info_Table"][0]
    let EMInfoObj = json[patName]["Emergency_Contact_Table"][0]
    console.log(json[patName]["Allergies_Table"][0]["Allergies"])

    let mainObj = {
        [patName]:{
            "Title":patientInfoObj["PatientTitle"],
            "FName":patientInfoObj["FirstName"],
            "MName":patientInfoObj["MiddleInit"],
            "LName":patientInfoObj["LastName"],
            "BDay":patientInfoObj["Birthday"],
            "Address":patientInfoObj["Address"],
            "PhoneNum":patientInfoObj["PhoneNumber"],
            "EMContactName":EMInfoObj["EmergencyContactFirstName"] + " " + EMInfoObj["EmergencyContactLastName"],
            "EMContactPhone":EMInfoObj["EmergencyContactPhoneNumber"],
            "EMRelation":EMInfoObj["EmergencyContactRelation"],
            "InsureProv":patientInfoObj["InsuranceProvider"],
            "InsureNum":patientInfoObj["InsuranceNumber"],
            "Allergies":json[patName]["Allergies_Table"][0]["Allergies"],
            "Vitals":[],
            "Medication":[],
            "Immunization":[]
        }
    }
    let allVitalsObj = json[patName]["Vitals_Table"]

    allVitalsObj.forEach((element,index) => {

        let currentMedicalHistObj = json[patName]["Medical_History_Table"][index]
        let currentDiagObj = json[patName]["Diagnoses_Table"][index]
        console.log(currentDiagObj)

        let vitalObj = {
            "Date":element["VitalsDate"],
            "Doctor":"Dr. Jim Jhones",
            "Time":element["VitalsTime"],
            "Temp":json[patName]["Temperature_Table"][element["VitalsTemperature"]-1]["Temperature"],
            "TempSite":json[patName]["Temperature_Table"][element["VitalsTemperature"]-1]["TemperatureSite"],
            "Pulse":json[patName]["Pulse_Table"][element["VitalsPulse"]-1]["Pulse"],
            "PulseOx":json[patName]["Pulse_Table"][element["VitalsPulse"]-1]["PulseOX"],
            "PulseSite":json[patName]["Pulse_Table"][element["VitalsPulse"]-1]["PulseSite"],
            "Respirations":json[patName]["Respirations_Table"][element["VitalsRespirations"]-1]["Respirations"],
            "BP":json[patName]["Blood_Table"][element["VitalsBloodInfo"]-1]["BloodPressure"],
            "BPMethod":json[patName]["Blood_Table"][element["VitalsBloodInfo"]-1]["BloodPressureMethod"],
            "Notes":{
                "Diagnosis":currentDiagObj["DiagnosesPrimary"], //Not Showing Up, FIX!!!!!!!!!!!!!!
                "SecDiagnosis":currentDiagObj["DiagnosesSecondary"],
                "Notes":"Died from Stage 17 Cancer",
                "Treatment":currentMedicalHistObj["IllnessTreatment"]
            }
        }
        mainObj[patName]["Vitals"].push(vitalObj)
    });

    let medicalObj = json[patName]["Medications_Table"]

    medicalObj.forEach((element) => {
        let medObj = {
            "DateMed":element["MedicationDate"],
            "PrescriberName":element["MedicationPrescriber"],
            "MedName":element["MedicationName"],
            "DispIns":element["MedicationInstructions"],
            "Purpose":element["MedicationPurpose"],
            "Dosage":element["MedicationDosage"],
            "Refills":element["MedicationsRefills"]
        }
        mainObj[patName]["Medication"].push(medObj)
    })

    let vaccineObj = json[patName]["Vaccinations_Table"]

    vaccineObj.forEach((element) => {
        let vacObj = {
            "DateVac":element["VaccineDate"],
            "PrescriberName":element["VaccinationsLastNamePresciber"],
            "MedName":element["VaccineName"],
            "Purpose":element["VaccinationsPurpose"],
            "Site":element["VaccineSite"],
            "Dosage":element["VaccineDosage"],
            "NextVac":element["VaccinationsDosageNextDoseDate"]
        }
        mainObj[patName]["Immunization"].push(vacObj)
    })

    return JSON.stringify(mainObj[patName])
}