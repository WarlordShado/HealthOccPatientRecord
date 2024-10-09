
export function URLExist(url){
    var http = new XMLHttpRequest();
    http.open('HEAD',url,false)
    http.send();
    if(http.status != 404){
        return true
    }
    return false
}

export function setNotes(num){
    let numShow = document.getElementById("numShow");
    numShow.value = num
}
