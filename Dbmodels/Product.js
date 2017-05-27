var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    catalogId:Number,
    productName:String,
    totalQuantity:Number,
    pricePerUnit:Number,
    manufactDate:Date,
    description:String
});

var product = mongoose.model('product',productSchema);

module.exports= product;