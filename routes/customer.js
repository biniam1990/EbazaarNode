var express= require('express');
var router = express.Router();
var customer = require('../Dbmodels/Customer');

//returns the whole customer information 
// default customer data for custId=0
router.get('/:id', function(req,res,next){
     var custId= req.params.id;
     console.log(custId);
       customer.find({'_id':custId}).exec(function(err,data){
            res.json(data);
       })
});

//saves customer information
router.post('/',function(req,res,next){
    console.log(req.body);
   var  cust = new customer(req.body);
    cust.save(function(err){
        if(err)console.log(err);
        else {
            console.log('data saved');
            res.send('data saved');
        }
    })
});

//updates customer Address given the customer id as query parameter

router.put('/:id',function(req,res,next){
    var custId= req.params.id;
    console.log(custId);
    var query = {_id:custId};
    console.log(req.body);
    var operator= {$set:{address:req.body}};

    customer.update(query,operator,{upsert:true},function(err,numUpdate){
        if(err){
            console.log(err);  
        }
         else{
                console.log('successfully updated');
                res.send('successfully updated');
            }
    })
});

router.delete('/:id',function(req,res,next){
    var custId= req.params.custId;
    var query= {_id:custId};
    customer.remove(query, function(err,numDelete){
        if(err)console.log(err);
        else{
            console.dir('deleted',numDelete);
        }
    })
})

module.exports =router;