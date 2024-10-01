function changeNotes(increase){ //Changes around the text in the previous notes tab. Work in Progress
    let numShow = document.getElementById("numShow");
    let number = Number(numShow.value);

    if (increase) {
        number += 1
    }else{
        if (number != 1){
            number -= 1
        }
    }
    numShow.value = number
}