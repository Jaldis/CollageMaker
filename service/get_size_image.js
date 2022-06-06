const sharp = require('sharp');
const path = require('path');

async function getImageSize(filePath) {
    
    const image = await sharp(filePath)
    const metadata = await image.metadata()
    return {
        width : metadata.width,
        height : metadata.height
    }
   
}


module.exports = getImageSize