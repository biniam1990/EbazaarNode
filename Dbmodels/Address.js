var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc= require('mongoose-auto-increment');
autoInc.initialize(mongoose.connection);
var addressSchema = new Schema(
    {
          street:String,
          state:String,
          city:String,
          zipcode:String
      } );

addressSchema.plugin(autoInc.plugin,'address');
  var address = mongoose.model('address',addressSchema);
  
  module.exports= address;    
 