
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var customer= require('../Dbmodels/Customer');

var autoInc = require('mongoose-auto-increment');
autoInc.initialize(mongoose.connection);

var shoppingCartSchema = new Schema({
 customerId:{type:Number,
   ref:'customer'},
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
})

shoppingCartSchema.plugin(autoInc.plugin,'shoppingCart');

shoppingCartSchema.pre('save', function(next){
    var customerId= this.customerId;
    customer.findOne({_id:customerId}).exec(function(err,data){
        if(data){
            return next();
        }
        else{
            next(new Error("foreign key reference error"));
        }
    })
});


var shopCart= mongoose.model('shoppingCart',shoppingCartSchema);

module.exports=shopCart;
