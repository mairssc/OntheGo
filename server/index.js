//Running home.html and favorite.html via port
//Ex: http://localhost:8080/index.html will run home.html

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 8080;

//This is where we run CLIENTNNSNSNSNSNSN
app.use(express.static('../client'))


app.get("/get/sortedWardCount", (req, res) => {
    console.log('made it!!');
    console.log(sortedWardCount);

    res.send(items);
});

app.listen(port);
console.log('Server listening on port ' + port);