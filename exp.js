var express = require('express');
var app = express();
var router  = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// npm install ejs 
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//console.log(app);

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/jook',function(req,res){
	res.send("Hey");
});

app.get('/restart',function(req,res){
	res.send("Hi 5555");
	
});

 app.post('/restart',function(req,res){
 	res.send("Hi Post");
 });


app.get('/repeat/:number',function(req,res){
	res.send("Url Data >>>> " + req.params.number);
});

app.get('/example',function(req,res){

	res.render('example.html');
	
	
});

app.use(require('express-jquery')('/jquery.js'));
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/example',function(req,res){
	console.log("High-Low");
	console.log(req.body.name);
	res.send("Ok Ja!!!");


});


app.listen(3000)