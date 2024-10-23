
export function URLExist(url){
    var http = new XMLHttpRequest();
    http.open('HEAD',url,false)
    http.send();
    if(http.status != 404 && url){
        return true
    }
    return false
}


