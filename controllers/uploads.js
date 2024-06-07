
const {request, response} = require("express");

const uploaded = (req = request, res = response) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  try {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = __dirname + "/../../client/public/uploads/" + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err) return res.status(500).send(err);
      clientPath = "uploads/" + sampleFile.name;
      res.status(200).json({
        msg:"file was uploaded",
        clientPath
      })
    });
  } catch (error) {
    console.log(error);
  }
} 

  module.exports = {
    uploaded
  }