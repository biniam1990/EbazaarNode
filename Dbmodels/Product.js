var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc = require('mongoose-auto-increment');
var catalogDb = require('./Catalog');
autoInc.initialize(mongoose.connection);

var productSchema = new Schema({
    productName:String,
    totalQuantity:Number,
    pricePerUnit:Number,
    manufactDate:Date,
    description:String,
    catalogId:{
        type: Number,
        ref:"catalog"
    }
});
productSchema.plugin(autoInc.plugin,'product');

productSchema.pre('save',function(next){
    var catalogId = this.catalogId;
    catalogDb.findOne({_id:catalogId},(err,data)=>{
        if(data)
          return next();
        else
           next(new Error("Foreign key reference, invalid Catalog ID"));
    });
});

var product = mongoose.connection.model('product',productSchema);

module.exports= product;