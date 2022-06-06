// Resize.js

const sharp = require('sharp');
//const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(fileName, folder) {
    this.folder = folder;
    this.fileName = fileName;
  }
  async save(buffer) {
    const filepath = this.filepath(this.fileName);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return this.fileName;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;