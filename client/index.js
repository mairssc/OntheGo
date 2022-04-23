function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Creates randomUrl based on date for the first 13 additional chars, then after can add additional chars
async function randomUrl() {
    let url = "http://localhost:8080/roomDisplay?token=";
    data = {
        calendar: {
        summary: "Null",
        start: {
          dateTime: "1900-01-14T20:00:00.000Z",
          timeZone: "America/Los_Angeles"
        },
        end: {
          dateTime: "1900-01-14T22:00:00.000Z",
          timeZone: "America/Los_Angeles"
        }
      }
    }
    console.log(data.calendar.start.dateTime)
    let room = await fetch('/room/add', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response => response.json())
    return url + room.token;
}

async function postURL() {
    url = await randomUrl(); 
    window.location.href = url;
}
