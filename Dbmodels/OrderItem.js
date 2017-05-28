var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc = require('mongoose-auto-increment');
var orderDb = require('./Order');
var productDb = require('./Product');

autoInc.initialize(mongoose.initialize);
var orderItemSchema = new Schema({
    orderId:{
        type:Number,
        ref:'order'
    },
    productId:{
        type:Number,
        ref:'product'
    },
    quantity:Number,
    totalPrice:Number,
    shipmentCost:Number,
    taxAmount:Number
});

orderItemSchema.plugin(autoInc.plugin,'orderItem');
orderItemSchema.pre('save',function(next){
     //check orderId and ProductId reference
     productDb.findOne({_id:this.productId},function(err,data){
        if(data)
          next();
        else
          next(new Error("Foreign key reference, invalid Product ID"))
     });
     orderDb.findOne({_id:this.orderId},function(err,data){
            if(err)
              next();
            else
               next(new Error("Foreign key reference, invalid Product ID"));
     });
});

var orderItem = mongoose.model('orderItem',orderItemSchema);

module.exports = orderItem;