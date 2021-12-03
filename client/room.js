var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
async function newElement() {
  const params = {}
      document.location.search.substr(1).split('&').forEach(pair => {
      [key, value] = pair.split('=');
      params[key] = value;
  })
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value + " paid for by " + params.name;
  var t = document.createTextNode(inputValue);
  var nameValue = document.getElementById("peopleInput").value;
  var u = document.createTextNode(nameValue);
  var costValue = document.getElementById("costInput").value;
  var v = document.createTextNode(costValue);
  linebreak = document.createElement("br");
  linebreak2 = document.createElement("br");
  li.appendChild(t);
  li.appendChild(linebreak);
  li.appendChild(u);
  li.appendChild(linebreak2);
  li.appendChild(v); 
  if (inputValue === '' || nameValue === '' || costValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }

  fetch('/purchase/add?name=' + params.name + '&token=' + params.token, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      purchaseName: inputValue,
      owe: nameValue.split(', '),
      price: Number(costValue),
      purchaser: params.name
    })
  }).then(resp => resp.json()).then(data => console.log(data))

  
  document.getElementById("myInput").value = "";
  document.getElementById("peopleInput").value = "";
  document.getElementById("costInput").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    console.log('going')
      close[i].onclick = function(e) {
      let arr = Array.from(close)
      var div = this.parentElement;
      div.style.display = "none";
      fetch('/purchase/delete?token=' + params.token, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          purchaseIndex: arr.indexOf(e.target)
        })
      })
    }
  }
}

async function newElement2() {
  const params = {}
      document.location.search.substr(1).split('&').forEach(pair => {
      [key, value] = pair.split('=');
      params[key] = value;
  })
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput2").value;
  var t = document.createTextNode(inputValue);
  linebreak = document.createElement("br");
  linebreak2 = document.createElement("br");
  li.appendChild(document.createTextNode(params.name + ":"))
  li.appendChild(linebreak2)
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL2").appendChild(li);
  }

  fetch('/bulletin/post?name=' + params.name + '&token=' + params.token, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      post: inputValue,
      poster: params.name
    })
  }).then(resp => resp.json()).then(data => console.log(data)) 

  
  document.getElementById("myInput2").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
      close[i].onclick = function(e) {
      let arr = Array.from(close)
      var div = this.parentElement;
      div.style.display = "none";
      fetch('/bulletin/delete?token=' + params.token, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          postIndex: arr.indexOf(e.target)
        })
      })
    }
  }

}

async function startCalender() {
    let authUrl = await getData('/calendar/getAuthUrl?uri=' + encodeURIComponent(window.location.href), {})
    .then(res => res.json()); 
    location.href = authUrl;
}

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

document.getElementById("savebutton").addEventListener("click", async () => {
  console.log("made it to save")
  const title = document.getElementById("title").value
  const description= document.getElementById("description").value
  const destination = document.getElementById("destination").value
  const start = document.getElementById("start").value
  const end = document.getElementById("end").value
  const sT = document.getElementById("startTime").value
  const eT = document.getElementById("endTime").value

  if (title) {
    const params = {}
      document.location.search.substr(1).split('&').forEach(pair => {
      [key, value] = pair.split('=');
      params[key] = value;
      })
      fetch("/room/updatetitle?token=" + params.token, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: title})
      })

  }

  if (destination) {
    const params = {}
      document.location.search.substr(1).split('&').forEach(pair => {
      [key, value] = pair.split('=');
      params[key] = value;
      })
      fetch("/room/updatedestination?token=" + params.token, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({destination: destination})
      })
  }


  if (description) {
    const params = {}
      document.location.search.substr(1).split('&').forEach(pair => {
      [key, value] = pair.split('=');
      params[key] = value;
      })


    fetch("/room/description?token=" + params.token, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description: description})
    })
  }

  function setHours(dt, h) {
    var s = /(\d+):(\d+)(.+)/.exec(h);
    console.log(s)
    if (s[3] == " AM" && s[1] == "12") {
      dt.setHours(0);
    } else {
      dt.setHours(s[3] === " PM" ? 
      12 + parseInt(s[1], 10) : 
      parseInt(s[1], 10));
    }
    dt.setMinutes(parseInt(s[2],10));
  }

  startTime = new Date(start);
  setHours(startTime, sT)
  endTime = new Date(end);
  setHours(endTime, eT)
  
  if (startTime != "Invalid Date" && endTime != "Invalid Date") {
    if (startTime > endTime) {
      console.log('prob')
      console.log(startTime)
      console.log(endTime)
      return;
    }
    let s = startTime.toISOString();
    let e = endTime.toISOString();
    let test = new Date(e);
    console.log(endTime)
    console.log(test)
    console.log(s);
    console.log(e);
    const params = {}
      document.location.search.substr(1).split('&').forEach(pair => {
      [key, value] = pair.split('=');
      params[key] = value;
      })
      fetch("/room/time?token=" + params.token, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        start: s,
        end: e
      })
    })
  }

})