var mergeImages = require('merge-images-v2');
const path = require('path');
const fs = require('fs');
const Canvas = require('canvas');
var sharp = require('sharp')
var baseImage = require('./base_image')
var getImageSize = require('./get_size_image')

const { dirname } = require('path');
const appDir = dirname(require.main.filename);

module.exports = async function(dirName, name, mode, res) {

    

    let files = [];
    let grid = []
    let merged = []
    let filesMeta = []
    files = fs.readdirSync(dirName);

    for(i = 0; i < files.length; i++) {
        if(files[i].split('.')[0] != name) {
            let filePath = appDir + '/public/image/' + name + '/' + files[i]
            let dim = await getImageSize(filePath)
            filesMeta.push( {
                file: 'image/' + name + '/' + files[i],
                width : dim.width,
                height : dim.height
            })
        }
    }

   
    let x = 0;
    let y = 0;
    let r = 0;
    let maxWidth = 0
  
    // let c = []
    // let ci = 0

    const base_image = 'image/' + name + '/' + name + '.png'
    merged.push({
        src: base_image, x: 0, y: 0
    })

    if(mode == '4x3') {
        for(i = 0; i < filesMeta.length; i++){

           

            merged.push({
                src : filesMeta[i].file,
                x:  x,
                y:  y,
            }) 
            
            
            x += filesMeta[i].width;
            r++

            if(r > 3) {
                r = 0
                y += filesMeta[i].height;
                if(x > maxWidth)
                    maxWidth = x
                x = 0            
            } 

           
        }
    }
    if(maxWidth == 0) 
        maxWidth = x
    console.log('max width ' + maxWidth)
    console.log('max height ' + y)

    await baseImage(dirName,name, mode, maxWidth, y)
    
    console.log(filesMeta)
    console.log(merged)

    return merged;


    // if(mode == '4x3') {
    //     grid = [
    //         {x:0,y:0}, 
    //         {x:300,y:0},
    //         {x:600,y:0},
    //         {x:900,y:0},
    //         {x:0,y:300},
    //         {x:300,y:300},
    //         {x:600,y:300},
    //         {x:900,y:300},
    //         {x:0,y:600},
    //         {x:300,y:600},
    //         {x:600,y:600},
    //         {x:900,y:600},
    //     ]
    // }
    // const base_image = 'image/' + name + '/' + name + '.png'
    // merged.push({
    //     src: base_image, x: 0, y: 0
    // })

    // // console.log(files)
    // // console.log(grid)
    // for(i = 0; i < files.length; i++) {
    //     if(files[i].split('.')[0] != name) {
    //         merged.push({
    //             src : 'image/' + name + '/' + files[i],
    //             x: grid[i].x,
    //             y: grid[i].y
    //         })
    //     }
       
    // }
    // //console.log(merged)
    // return merged;

    // return [
    //     { src: 'image/aaa/final.png', x: 0, y: 0 },
    //     { src: 'image/aaa/1.jpg', x: 0, y: 0 },
    //     { src: 'image/aaa/2.jpg', x: 300, y: 0 }
    // ]
    // for(i = 0; i < files.length; i++) {
    //    files[i] = path.join(dirName,files[i]);
    //    images.push({
    //     input: files[i],
    //     gravity: 'southeast'
    //    })

    // }
}