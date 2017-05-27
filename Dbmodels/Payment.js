
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    nameOnCard:String,
          cardType:String,
          cardNumber:Number,
          expDate:Date
});

var payment = mongoose.model('payment',paymentSchema);
module.exports=payment;