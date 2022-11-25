const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");

const app = express();

const Routes = require('./routes/main.routes');
const port = 2000;

app.use(cors());
app.set('port', process.env.port || port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', Routes);
app.get('*', function(req, res, next) {
  res.status(404);

  res.render('404.ejs', {
    title: "Page Not Found",
  });

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
