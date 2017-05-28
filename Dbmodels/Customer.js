
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc= require('mongoose-auto-increment');
autoInc.initialize(mongoose.connection);

var customerSchema= new Schema({

    customerProfile:{
      firstName:String,
      lastName:String,
      ssn:String,
      isAdmin:Boolean,
      userName:String,
      password:String
    }, 
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

customerSchema.plugin(autoInc.plugin,'customer');
var Customer = mongoose.model('customer',customerSchema);

module.exports=Customer;