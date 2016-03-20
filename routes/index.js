var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var webshot = require('webshot');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  var url = req.body.webURL;
  if (url) {
    var timestamp = new Date();
    var imageName = 'snapt' + timestamp.getMinutes() + timestamp.getMilliseconds() + '.png';

    webshot(url, imageName, function(err) {
      if (err) {
        console.log('webshot_err: ' + err);
        return res.json({success: false, error: err})
      }

      var imagePath = path.join(__dirname, '..', imageName);
      var base64Image = new Buffer(fs.readFileSync(imagePath)).toString('base64');
      fs.unlink(imagePath);

      console.log('Screenshot saved');
      res.json({success: true, image: base64Image})
    });

  } else {
    res.json({success: false})
  }
});

module.exports = router;
