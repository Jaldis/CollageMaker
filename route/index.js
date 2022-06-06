var imageRoute = require('./image')
var global = require('../config/global')

function setRoute(app) {

    app.get('/', function (req, res) {
        res.sendFile(global.VIEW_ENTRY)
    }) 
    
    app.use('/image',imageRoute)
    
}

module.exports = setRoute;
