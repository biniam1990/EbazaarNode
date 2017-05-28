var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerDb = require('./Customer');
var autoInc = require('mongoose-auto-increment');
autoInc.initialize(mongoose.connection);

var orderSchema = new Schema({
    customerId:{
      type:Number,
      ref:"customers"
    },
    payment:{
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
orderSchema.plugin(autoInc.plugin,'order')

orderSchema.pre('save',function(next){
    var customerId = this.customerId;
    console.log('Id :'+this.customerId);
    customerDb.findOne({'_id':customerId},(err,data)=>{
        if(data)
            next();
        else
           next(new Error("Foreign key reference, invalid Customer ID"));
    });
});

var order = mongoose.model('order',orderSchema);

module.exports = order;