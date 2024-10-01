import patientsFile from "/public/JSON/patientData.json" with {type:"json"};

const JSONpatients = patientsFile.Patients;

//function generatePic(){
//    const node = document.getElementById("PatientButtonContain")
//    const contain = ReactDOM.createRoot(node)
//   console.log(ButtonGalley())
//    contain.render(<ButtonGallery/>)
//}

function generatePic(){
    let mainContain = document.getElementById("PatientSelectTable")
    let buttonArr = []

    //Creates each button for the patients
    JSONpatients.forEach(ele => {
        let data = document.createElement("td")

        let contain = createDiv("patientButton")
        let buttonTable = document.createElement("table")
        buttonTable.appendChild(makeButtonData(ele))
        contain.appendChild(buttonTable)
    
        data.appendChild(contain)
        buttonArr.push(data)
    });
    
    //Adds the buttons to the main container
    let count = 1
    let row = document.createElement("tr")
    buttonArr.forEach(ele => {
        row.appendChild(ele)

        if (count == 4){
            mainContain.appendChild(row)
            row = document.createElement("tr")
            count = 0
        }
        count += 1
    })
    //In place so that the final row apppends

    mainContain.appendChild(row)
    console.log(mainContain)
}


function makeButtonData(patient){
    let contain = createDiv("c")
    let rowImg = document.createElement("tr")

    //Create Img
    let dataImg = document.createElement("td")
    dataImg.appendChild(makeImage(patient.picLocation))
    rowImg.appendChild(dataImg)
    
    //Create Name
    let rowName = document.createElement("tr")
    let dataName = document.createElement("td")
    dataName.appendChild(makeName(patient.FName,patient.LName))
    rowName.appendChild(dataName)

    //Create Button
    let rowButton = makeButton()

    //Stick all elements together
    contain.appendChild(rowImg)
    contain.appendChild(rowName)
    contain.appendChild(rowButton)

    return contain
}

function makeButton() {
    let rowButton = document.createElement("tr")
    let dataButton = document.createElement("td")
    let link = document.createElement("a")
    link.setAttribute("href","record.html")
    let buttonText = document.createTextNode("View Patient")
    let button = document.createElement("button")
    button.setAttribute("class","formButton")
    button.appendChild(buttonText)


    link.appendChild(button)
    dataButton.appendChild(link)
    rowButton.appendChild(dataButton)

    return rowButton
}

function makeName(fname,lname) {
    var name = fname + " " + lname
    let text = document.createTextNode(name)
    let p = document.createElement("p")
    p.setAttribute("class","selectText")
    p.appendChild(text)
    return p
}

function makeImage(path){
    let image = document.createElement("img")
    image.setAttribute("id","PatientPhoto")
    image.setAttribute("src",path)
    image.setAttribute("alt","person")
    return image
}

function createDiv(cls){
    let contain = document.createElement('div')
    contain.setAttribute("class",cls)
    return contain
}

generatePic();