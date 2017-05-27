
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema= new Schema({
      firstName:String,
      lastName:String,
      ssn:String,
      userName:String,
      password:String,
      isAdmin:Boolean,
      address:{
          street:String,
          state:String,
          city:String,
          zipcode:String
      },
      payment:{
          nameOnCard:String,
          cardType:String,
          cardNumber:Number,
          expDate:Date
      }
});

var Customer = mongoose.model('customer',customerSchema);

module.exports=Customer;