var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    customerId:Number,
    creditCard:{
        nameOnCard:String,
          cardType:String,
          cardNumber:Number,
          expDate:Date
    },
    address:{
          street:String,
          state:String,
          city:String,
          zipcode:String
      },
  totalPrice:Number,
  totalTax:Number,
  totalAmountCharged:Number
});

var order = mongoose.model('order',orderSchema);

module.exports = order;