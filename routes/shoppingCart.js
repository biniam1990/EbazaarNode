var express= require('express');
var router= express.Router();
var shopCart = require('../Dbmodels/ShoppingCart');
var customer = require('../Dbmodels/Customer');
var cartItem= require('../Dbmodels/ShoppingCartItem');
//returns cart given customer Id as query
//default customerId=0
router.get('/:id', function(req,res,next){
      var query= {customerId:req.params.id}; 
      shopCart.find(query).exec(function(err,data){
          res.json(data);
      })
});

router.post('/',function(req,res,next){
    /// the top level cart information is saved first
    //TopLevelCart
    var shop= new shopCart(req.body.TopLevelCart);
    shop.save(function(err,data){
    if(err) res.end(err+"");
    else{
        //in the req.body the cartItems must be sent attached and saved 
        //cartItems
        for(let it of req.body.cartItems){ 
          it["shopCartId"]=data["_id"];
           console.dir(it);
       var item = new cartItem(it);
            item.save(function(err,itemData){
                if(err) { console.log('error');
                    res.end(err+"");}
                else{ 
                    //res.json(itemData);
                    console.log('saved the item');
                }
            })
        }
        console.log('successfully saved');
             res.json(data);
    }
}) 
    });

//update customer payment information given the cartId 
router. put('/:id', function(req,res,next){
    var cartId= req.params.id;
    var query= {_id:cartId};
    var operator= {payment:req.body.payment};
    console.log(req.body);
    shopCart.update(query,operator,{upsert:true}, function(err,numUpdate){
        if(err) console.log(err);
        else{
            console.log('updated',numUpdate);
            //res.send("successully updated");
            res.json(numUpdate);
        }
    })
});

router.delete('/:id',function(req,res,next){
    var cartId= req.params.id;
    var query= {_id:cartId};
    shopCart.remove(query, function(err,numUpdate){
        if(err)console.log(err);
        else{
            console.log('deleted',numUpdate);
            res.send("successfully deleted");}
        })
});

function getNextSequence(name){
    var ret= shopCart.findAndModify({
        query:{_id:name},
        update:{$inc:{seq:1}},
        new:true
    });
    return ret.seq;
}
module.exports=router;