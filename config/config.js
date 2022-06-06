var express = require('express');
var bodyParser = require('body-parser')

var { dirname } = require('path');
var path = require('path')
const appDir = dirname(require.main.filename);





module.exports = function(app)  {
    app.use(express.static('public'));
    app.use( bodyParser.json() ); 
    app.use(bodyParser.urlencoded({ 
        extended: true
    })); 
}
 