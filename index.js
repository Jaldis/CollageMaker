var global = require('./config/global')
var path = require('path')

var express = require('express');
var app = express()


require('./config/config')(app)
require('./route')(app)


app.listen(global.PORT, function () {
    console.log('listening at port ' + global.PORT)
})