var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catalogSchema = new Schema({
    catalogName:String
});


var catalog = mongoose.model('catalog',catalogSchema);

module.exports= catalog;