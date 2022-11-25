const fs = require('fs');

exports.homePage = (req, res) => {
  res.json({
    message: "Home Page"
  });
}


exports.saveJSON = (req, res) => {
  const data = JSON.stringify(req.body.data);
  console.log(data);

  const current = new Date();
  const time = current.toLocaleTimeString("en-US");
  console.log(time);
  
  const path = './upload/fine_tune.jsonl'; 
  try {
    if (fs.existsSync(path)) {
      console.log("File existed");
      fs.appendFile(path, "\n" + data, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    } else {
      fs.writeFile(path, data, 'utf8', function(err) {
        if (err) return console.log(err);
        console.log("saved successfully!");
        ;
      });
    }
  } catch(err) {
    console.error(err)
  }
  
  res.json({
    message: "success"
  });
}

