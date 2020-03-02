const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
app.get('/',(req,res)=>{
	res.send('Hello world!');
});

app.get('/example',()=>{
	res.send('hitting example page');
});

//route parameters
//for compulsory fields
app.get('/exam/:name/:age',(req,res)=>{
	res.send(req.params.name + ' : '+ req.params.age)
});


//route query parameter
//for optional parameters
app.get('/exam2/:name',(req,res)=>{
	res.send(req.query);
});

app.use('/public',express.static(path.join(__dirname,'static','index.html')));

app.get('/getfile',(req,res)=>{
	res.sendFile(path.join(__dirname,'static','index.html'));
});


app.post('/postdata',(req,res)=>{
	console.log(req.body);
	res.send(JSON.stringify(req.body));
});
app.listen(3000);