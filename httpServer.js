'use strict';
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const http = require('http');
const port = process.env.PORT || 8000;
const regExp = /^\/pets\/(.*)$/;
const server = http.createServer((req, res) => {
  let indexPet = req.url.substring(req.url.lastIndexOf('/')+1);
  if (req.method === 'GET' && req.url === '/pets'){
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petsJSON);
      }
    });
    return;
  }
   if (req.method === 'GET' && regExp.test(req.url)){
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      } else {
        const pets = JSON.parse(petsJSON);
        if (indexPet > pets.length - 1 || indexPet < 0) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Not Found');
        } else {
        const petJSON = JSON.stringify(pets[indexPet]);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petsJSON);
      }}
    });
  }
  else if (req.method === 'POST') {
    if (typeof petsJSON === 'undefined') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Bad Request');
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(petsJSON);
  }
  else if (req.url === '/' || !regExp.test(req.url)){
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
module.exports = server;
