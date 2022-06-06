
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

module.exports =  {
    PORT : 8080,
    // VIEW_ENTRY : __dirname + '/index.html'
    VIEW_ENTRY : appDir + '/index.html'
 }
 