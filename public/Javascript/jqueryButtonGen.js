import patientsFile from "/public/JSON/patientData.json" with {type:"json"};

const JSONpatients = patientsFile.Patients;

$(document).ready(function(){
    console.log(JSONpatients)
    
    let row = $("<tr></tr>")
    $.each(JSONpatients,function(index,ele){ 
        let name = (ele.FName + ele.LName).replace(/\s/g, '');
        console.log(name)
        var button = $(`
            <td>
                <div class="patientButton">
                    <table>
                    <div>
                        <tr>
                            <td>
                                <img id="PatientPhoto" src=${ele.picLocation} alt="person"></img>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id=${ele.FName + ele.LName} class="selectText">${ele.FName + " " + ele.LName}</p>
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
        console.log(index)

        if((index + 1) % 4 == 0){
            $("#PatientSelectTable").append(row)
            row = $("<tr></tr>")
        }
    })

    $('.selectPatButton').click(function() {
        var id = $(this).attr('id')
        localStorage.setItem("name",id)
    })

    $("#PatientSelectTable").append(row)
})