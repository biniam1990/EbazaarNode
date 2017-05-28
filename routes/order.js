var express = require('express');
var router = express.Router();
var orderDb = require('../Dbmodels/Order');

router.get('/', function (req, res, next) {
    orderDb.find({}, function (err, data) {
        if (err)
            console.log(err);
        res.json(data);
        res.end();
    });
});

router.get('/:id', function (req, res, next) {
    orderDb.find({_id: req.params.id}, function (err, data) {
        if (err)
            console.log(err)
        res.json(data);
        res.end();
    });
});

router.post('/', function (req, res, next) {
    var order = req.body;
    var orderitems = req.body.orderItems;
    delete order.orderItems;
    var newOrder = orderDb(order);

    console.log(order);

    newOrder.save(function (err,data) {
        if (err){
             console.log(err);
             res.end('Error Saving Order')
        }
        else{
            console.log(data);
            for(orderitem in orderitems){
                orderitem.orderId = data._id;
                newOrderItem = orderItemsDb(orderitem);
                newOrderItem.save(function(err,data){
                    if(err)
                      console.log(err);
                });
            }
        }
        res.end();
    });
});

router.put('/:id', function (req, res, next) {
    var updateOrder = req.body;
    orderDb.findOneAndUpdate({ _id: req.params.id }, updateOrder, function (err, data) {
        if (err)
            console.log(err);
        res.json(data);
        res.end();
    });
});

router.delete('/:id', function () {
    orderDb.remove({ _id: req.params.id }, function (err) {
        if (err)
            console.log(err);
        res.end();
    });
});


module.exports = router;