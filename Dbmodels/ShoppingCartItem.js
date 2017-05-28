var mongoose = require('mongoose');
var shopCartDb= require('../Dbmodels/ShoppingCart');
var productDB= require('../Dbmodels/Product');
var Schema = mongoose.Schema;
var autoInc= require('mongoose-auto-increment');
autoInc.initialize(mongoose.connection);

var cartItemSchema = new Schema({
   shopCartId:{type:Number,ref: 'shoppingCart'},
   productId:{type:Number,ref:'product'},
   quantity:Number,
   totalPrice:Number,
   taxAmount:Number
});
 cartItemSchema.plugin(autoInc.plugin,'shoppingCartItem');

cartItemSchema.pre('save', function(next){
    var productId= this.productId;
    var shopCartId= this.shopCartId;
    shopCartDb.findOne({_id:shopCartId}).exec(function(err,data){
        if(data){
            
            productDB.findOne({_id:productId}).exec(function(err,data){
                if(data) {return next();
                console.dir(data);}
                else{
                    return new Error("Foreign key reference error");
                }
            })
        }
      else{
          return new Error("Foreign key reference error");
      }

    })
})

var cartItem= mongoose.model('shoppingCartItem',cartItemSchema);

module.exports= cartItem;