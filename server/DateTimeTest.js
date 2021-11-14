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


var d = new Date(2022, 0, 14, 12);
var d2 = new Date(2022, 0, 14, 14);
var date = d.toISOString();
var date2 = d2.toISOString();

console.log(date)
console.log(date2)