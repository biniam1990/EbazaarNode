var express = require('express');
var router = express.Router();
var productDb = require('../Dbmodels/Product');

router.get('/',function(req,res,next){ //get all products
   productDb.find({},function(err,data){
        if(err)
            console.log(err);
        res.json(data);
        res.end();
   });
});

router.get('/:id',function(req,res,next){ //get product by Id
    productDb.find({_id:req.params.id},function(err,data){
        if(err)
        console.log(err)
        res.json(data);
    })
});

router.delete('/:id',function(req,res,next){ //delete product by Id
   productDb.remove({_id:req.params.id},function(err,data){
        if(err)
          console.log(err);
         
         res.json(data);
         res.end();
   });
});

router.post('/',function(req,res,next){ //insert product
    var newProduct = productDb(req.body);
    console.log(newProduct);
    newProduct.save(function(err){
        if(err){
            res.write(err+"");
            res.end();
        }
        res.end();
    });
});

router.put('/:id',function(req,res,next){
    console.log('here');
    var updateProduct = req.body;
    console.log("Id"+req.params.id);
    productDb.update({_id:req.params.id},updateProduct,function(err,data){
        if(err)
          console.log(err)
        res.json(data);
    });
});

module.exports = router;