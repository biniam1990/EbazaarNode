var express = require('express');
var router = express.Router();
var catalogDb = require('../Dbmodels/Catalog');

router.get('/',function(req,res,next){
    catalogDb.find({},function(err,data){
        if(err)
          console.log(err);
        res.json(data);
        res.end();
    });
});

router.get('/:id',function(req,res,next){
    catalogDb.find({_id:req.params.id},function(err,data){
        if(err)
          console.log(err);

          res.json(data);
          res.end();
    });
});

router.put('/:id',function(req,res,next){
    catalogDb.findOneAndUpdate({_id:req.params.id},req.body,function(err,data){
        if(err)
          console.log(err)

          res.json(data);
          res.end();
    });
});

router.delete('/:id',function(req,res,next){
    catalogDb.remove({_id:req.params.id},function(err){
        if(err)
          console.log(err);
          res.end();
    });
});

router.post('/',function(req,res,next){
    newCatalog = catalogDb(req.body);
    newCatalog.save(function(err,data){
        if(err)
        console.log(err);
        res.end();
    });
});

module.exports = router;