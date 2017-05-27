var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema(
    {
          street:String,
          state:String,
          city:String,
          zipcode:String
      } );


  var address = mongoose.model('address',addressSchema);
  module.exports= address;    
 