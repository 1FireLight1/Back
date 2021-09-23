/*const express = require('express');
const http = require('http');
const cors = require('cors');
const { read } = require('fs');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
app.use(restify.json());*/
var restify = require('restify');
var server = restify.createServer({
  name: 'Hello World!',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.bodyParser({ mapParams: true }));

server.get('/locations/:name', function(req, res, next){
var name_value  = req.params.name;
res.contentType = 'json';

console.log(req.params.name_value);
console.log(req.body.test);
});

/*
app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD =  ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

pp.get('/test', (req, res) => {
  res.status(200).json({ message: 'KKKKKK'});
  
})

app.post('/test', (req, res) => {
    res.status(200).json({ message: 'FDFFFFF'});   
  })

  app.get('/sum', (req, res) => {
    c = req.body.a + req.body.b;  
    res.status(200).json({c});   
  })
  app.get('/reverseCase', (req, res) => {
    a = req.body.str;
    b = '';
    for (let i in a){
          a[i].toLowerCase() == a[i] ? b += a[i].toUpperCase() : b+= a[i].toLowerCase();
    } 
    res.status(200).json({b});    
  })

  app.get('/reverseArray', (req, res) => {
    a = req.body.st;
    b = [];
    a.forEach((element,index) => {
       b[index] = a[a.length - index - 1];
    });
    res.status(200).json({b});    
  })



http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})
*/
server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
  });