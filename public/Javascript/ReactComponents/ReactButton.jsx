import React from "react";
import patientsFile from "/public/JSON/patientData.json" with {type:"json"};

const JSONpatients = patientsFile.Patients;

function PatientButtonComponent({img,fname,lname}){
    return (
        <td>
            <div class="PatientButton">
                <tr>
                    <td>
                        <img id="PatientPhoto" scr={img}></img>
                    </td>
                    <td>
                        <p id="selectText">{fname + " " + lname}</p>
                    </td>
                    <td>
                        <a href="record.html">
                            <button class="formButton">View Patient</button>
                        </a>
                    </td>
                </tr>
            </div>
        </td>
    )
}

export default function ButtonGallery(){
    let gallery = []
    let buttons = [] //ADD GALLERY JSX

    JSONpatients.forEach(patient => {
        buttons.push(<PatientButtonComponent img={patient.picLocation} fname={patient.FName} lname={patient.LName} />)  
    })
    
    count = 1
    buttonFillArr = []
    buttons.forEach(button => {
        buttonFillArr.push(button)
        if (count % 4 ==0){
            gallery.push(buttonFillArr)
            buttonFillArr = []
        }
        count += 1
    })
    return (
        <table>
            {gallery}
        </table>
    )
}