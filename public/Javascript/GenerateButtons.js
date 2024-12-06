const fs = require("fs")
import patientsFile from "../JSON/patientPhotoData.json" with {type:"json"};
import { URLExist } from "./util.js";

const JSONpatients = patientsFile.Patients;

$(document).ready(function(){
    
    let row = $("<tr></tr>");
    $.each(JSONpatients,function(index,ele){ 
        let name = (ele.FName + ele.LName).replace(/\s/g, ''); //Concatinates name and removes spaces

        let picLoc = URLExist(ele.picLocation) ? ele.picLocation : "Photo/default.png"; //Sets pic to default if no picture is avalibe

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
        `);

        row.append(button);

        if((index + 1) % 4 == 0){
            $("#PatientSelectTable").append(row);
            row = $("<tr></tr>");
        };
    });

    $("#PatientSelectTable").append(row);

    $('#newPatForm').submit(function() { //Get the File and Upload it. Create Entry in patientPhotoData.json
        let fNameVal = $("input[name='fName']").val()
        let lNameVal = $("input[name='lName']").val()
        alert(nameVal)
    });

    $('.selectPatButton').click(function() { //Stores name so info can be retrieved for later calculations
        var id = $(this).attr('id');
        localStorage.setItem("name",id);
    });

    $("#Search").on("keyup",function(){
        var value = $(this).val().toLowerCase(); //Gets value for search bar
        $(".selectText").filter(function(){ //Hids patient names that dont match the value supplied
            let id = $(this).text().replace(/\s/g, '') + "ButtonContain";
            return $("#" + id).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

