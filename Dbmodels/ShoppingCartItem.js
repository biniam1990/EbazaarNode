var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shCartItSchema = new Schema({
   shopCartId:Number,
   productId:Number,
   quantity:Number,
   totalPrice:Number,
   taxAmount:Number
});

var cartItem= mongoose.model('ShoppingCartItem',shCartItSchema);

module.exports= cartItem;