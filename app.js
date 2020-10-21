var express = require('express');
var app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
  });

var server = app.listen(PORT, function () {

  console.log(`Express app listening at ${PORT}`);

});
