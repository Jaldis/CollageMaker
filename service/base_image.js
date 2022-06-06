

var mergeImages = require('merge-images-v2');
const path = require('path');
const fs = require('fs');
const Canvas = require('canvas');
var sharp = require('sharp')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);


module.exports = async function(dirName, name, mode, width, height) {
   
    const def = path.join(appDir + '\\public','default.jpg')
    const base = path.join(dirName, name + '.png')
    console.log('def ' + def)
    console.log('base ' + base)
    console.log('name ' + name)
    if(mode == '4x3') {
        await sharp(def).resize(width, height).toFile(base);
    }
    else {
        await sharp(def).resize(width, height).toFile(base);
    }
   
}