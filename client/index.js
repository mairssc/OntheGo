function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Creates randomUrl based on date for the first 13 additional chars, then after can add additional chars
async function randomUrl() {
    let url = "http://localhost:8080/roomDisplay?token=";
    data = {
        "calendar": {
        "summary": "Test 123",
        "start": {
          "dateTime": "2022-01-14T20:00:00.000Z",
          "timeZone": "America/Los_Angeles"
        },
        "end": {
          "dateTime": "2022-01-14T22:00:00.000Z",
          "timeZone": "America/Los_Angeles"
        }
      }
    }
    console.log(data.calendar.start.dateTime)
    let room = await fetch('/room/add', {
        method: "POST",
        body: data
    })
    url += room.token
    return url;
}

async function postURL() {
    url = await randomUrl(); 
    link = document.getElementById("newurl"); 
    link.href = url; 
    link.innerText = url; 
    startButton = document.getElementById("startbutton");
    startButton.remove(); 
}
