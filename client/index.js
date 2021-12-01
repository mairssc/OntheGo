function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Creates randomUrl based on date for the first 13 additional chars, then after can add additional chars
function randomUrl() {
    let length = 26;
    let url = "http://localhost:8080/";
    url += (new Date()).getTime();
    if (length > 13) {
        let charArray = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        length -= 13;
        for (var i = 0; i < length; i++) {
            url += charArray[getRandomInt(charArray.length - 1)];
        }
    }
    return url;
}

function postURL() {
    url = randomUrl(); 
    link = document.getElementById("newurl"); 
    link.href = url; 
    link.innerText = url; 
    startButton = document.getElementById("startbutton");
    startButton.remove(); 
}
