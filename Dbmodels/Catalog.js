var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc = require('mongoose-auto-increment');
autoInc.initialize(mongoose.connection);

var catalogSchema = new Schema({
    catalogName:String
});

catalogSchema.plugin(autoInc.plugin,'catalogue');

var catalog = mongoose.model('catalog',catalogSchema);

module.exports= catalog;