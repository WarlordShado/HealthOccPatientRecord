import patientsFile from "../JSON/patientData.json" with {type:"json"};
import { URLExist } from "./util.js";

const JSONpatients = patientsFile.Patients;

$(document).ready(function(){
    console.log(JSONpatients)
    
    let row = $("<tr></tr>")
    $.each(JSONpatients,function(index,ele){ 
        let name = (ele.FName + ele.LName).replace(/\s/g, '');

        let picLoc = URLExist(ele.picLocation) ? ele.picLocation : "Photo/default.png"

        var button = $(`
            <td id="${name + "ButtonContain"}">
                <div class="patientButton">
                    <table>
                    <div>
                        <tr>
                            <td>
                                <img id="PatientPhoto" src="${picLoc}" alt="person"></img>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id="${name + "Display"}" class="selectText">${ele.FName + " " + ele.LName}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="record.html"><button id="${name}" class="formButton selectPatButton">View Patient</button></a>
                            </td>
                        </tr>
                    </div>
                    </table>
                </div>
            </td>
        `)

        row.append(button)

        if((index + 1) % 4 == 0){
            $("#PatientSelectTable").append(row)
            row = $("<tr></tr>")
        }
    })

    $("#PatientSelectTable").append(row)

    $('.selectPatButton').click(function() {
        alert($(this).attr('id'))
        var id = $(this).attr('id')
        localStorage.setItem("name",id)
    })
    

    $("#Search").on("keyup",function(){
        var value = $(this).val().toLowerCase()
        $(".selectText").filter(function(){
            let id = $(this).text().replace(/\s/g, '') + "ButtonContain";
            return $("#" + id).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
        
    })
})

