var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var customer = require('./Dbmodels/Customer');
var payment = require('./Dbmodels/Payment');
var address = require('./Dbmodels/Address');
var shopCart= require('./Dbmodels/ShoppingCart');
var custRoute= require('./routes/customer');
var shopCartRoute= require('./routes/shoppingCart');


var product = require('./routes/product');
var catalog = require('./routes/catalog');
var order = require('./routes/order');


var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@ds155961.mlab.com:55961/ebazaardb');


var newAdress= address({street:'1000N',state:'IA',city:'fairfield',zipcode:52557});
var newPayment= payment({nameOnCard:'Biniam',cardType:'visa',cardNumber:3241,expDate:new Date("2020-12-11")});
var defaultCustomer= customer({customerProfile:
  {firstName:'Biniam',lastName:'Shibru',ssn:123456,isAdmin:true, userName:'bini',password:'123'},
  address:newAdress,payment:newPayment});  
var defaultShopCart= shopCart({customerId:4,payment:newPayment,
  address:newAdress, totalPrice:100,totalTax:35,totalAmountCharged:135});

  // defaultShopCart.save(function(err){
  //   if(err)console.log(err)
  //   else{  
  //     console.log('successfully saved');
  //   }
  // });
  // defaultCustomer.save(function(err){
  // if(err)  console.log(err)
  // else{
  //   console.log('customer data saved');
  // } 
  // });
// newAdress.save(function(err){
// console.log(err);  
// })

//var newAdress= address({street:'1000N',state:'IA',city:'fairfield',zipcode:52557});
// newAdress.save(function(err){
//   console.log(err); 
// });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use('/customer',custRoute);
app.use('/shoppingCart',shopCartRoute);

//set the CORS request headers
app.all('*', function(req,res,next){
 res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
})

app.use('/product',product);
app.use('/catalog',catalog);
app.use('/order',order);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(4000);
module.exports = app;
