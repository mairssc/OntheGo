// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
// https://developers.google.com/gmail/markup/reference/datetime-formatting
// new Date()
// new Date(value)
// new Date(dateString)
// new Date(dateObject)

// new Date(year, monthIndex)
// new Date(year, monthIndex, day)
// new Date(year, monthIndex, day, hours)
// new Date(year, monthIndex, day, hours, minutes)
// new Date(year, monthIndex, day, hours, minutes, seconds)
// new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)

//"2013-02-14T13:15:03-08:00" (YYYY-MM-DDTHH:mm:ssZ).


// example calendar
// {
//     "summary": "Test 123",
//     "start": {
//       "dateTime": "2022-01-14T20:00:00.000Z",
//       "timeZone": "America/Los_Angeles"
//     },
//     "end": {
//       "dateTime": "2022-01-14T22:00:00.000Z",
//       "timeZone": "America/Los_Angeles"
//     }
//   }

var d = new Date(2022, 0, 14, 12);
var d2 = new Date(2022, 0, 14, 14);

function setHours(dt, h) {
    var s = /(\d+):(\d+)(.+)/.exec(h);
    dt.setHours(s[3] === "pm" ? 
      12 + parseInt(s[1], 10) : 
      parseInt(s[1], 10));
    dt.setMinutes(parseInt(s[2],10));
  }

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
d3 = new Date("11/21/2021")
setHours(d3, "3:30am");

console.log(formatAMPM(d3))


// d3.setHours(1)
// console.log(d3.getUTCHours())
// formatDate(d3.getUTCHours(), d3.getUTCMinutes())
// console.log(d3 == "Invalid Date");
// console.log(d3.toISOString())
// var date = d.toISOString();
// var date2 = d2.toISOString();


// console.log(date);
// console.log(date2);