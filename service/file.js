var fs = require('fs');
//var rimraf = require("rimraf");

function createDirectory(dir) {
    
    if (fs.existsSync(dir))
        fs.rmdirSync(dir, { recursive: true, force: true });
        //rimraf(dir, function () { console.log("done"); });
    
    fs.mkdirSync(dir);
   
}


module.exports = {
    createDirectory
}