function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const params = {}
    document.location.search.substr(1).split('&').forEach(pair => {
    [key, value] = pair.split('=');
    params[key] = value;
})


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
// Example POST method implementation:
async function postData(url = '', body = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(url = '', body = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function postURL() {
    url = randomUrl(); 
    link = document.getElementById("newurl"); 
    link.href = url; 
    link.innerText = url; 
    startButton = document.getElementById("startbutton");
    startButton.remove(); 
    postData('./room/add', {}).then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    })
}

//Put in room.js
function addUser(user) {
    url = window.location.href + '&user=' + user;
    //send user to url with getData(url, {})
}

function addCalendarInfo(calendar) {
    postData('http://localhost:8080/calendar/')
}