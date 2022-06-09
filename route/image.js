var express = require('express');
var router = express.Router();
const { dirname } = require('path');
const path = require('path');

// express validator
const { check, validationResult } = require('express-validator');

const upload = require('../service/upload');
const Resize = require('../service/resize');
const fileService = require('../service/file');
const collage = require('../service/collage');
const baseImage = require('../service/base_image');
const { strategy } = require('sharp');

const appDir = dirname(require.main.filename);


router.get('/', function (req, res) {
  res.send('image index');
})

router.post('/cdir', 
  [
    check('dir_name', 'Name is required').notEmpty()
  ],
  function (req, res) {
  let errors = validationResult(req);
  if(!errors.isEmpty()) {
    console.log(errors.mapped())
    res.send(errors.mapped())
  }
  else {
    const dirName = req.query.dir_name;
    const p = path.join(appDir, '/public/image/' + dirName);
    fileService.createDirectory(p);
    res.send('created dir');
  }
  
})

router.post('/', upload.single('image'), async function (req, res) {
  const dirName = req.query.dir_name;
  const iCounter = req.query.i_c;
  const imagePath = path.join(appDir, '/public/image/' + dirName);
  const ext = req.file.originalname.split('.')[1];
  const fileUpload = new Resize(iCounter + '.' + ext, imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});

router.post('/collage', async  function (req, res) {
  const dirName = req.query.dir_name;
  const mode = req.query.mode;
  const dirPath = path.join(appDir, '/public/image/' + dirName);
  res.send(await collage(dirPath, dirName, mode, res));
})

router.post('/base', async function (req, res) {
  const dirName = req.query.dir_name;
  const mode = req.query.mode;
  const dirPath = path.join(appDir, '/public/image/' + dirName);

  await baseImage(dirPath , dirName, mode);
})

module.exports = router;