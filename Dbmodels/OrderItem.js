
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderItemSchema = new Schema({
    orderId:Number,
    productId:Number,
    quantity:Number,
    totalPrice:Number,
    shipmentCost:Number,
    taxAmount:Number
});

var orderItem = mongoose.model('orderItem',orderItemSchema);

module.exports = orderItem;