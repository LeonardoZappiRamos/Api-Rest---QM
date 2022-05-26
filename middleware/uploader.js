const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, `reports/${req.body.role}/`)
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname)
  }
})

const uploader = multer({storage: storage});

module.exports.uploader = uploader