'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const http = require('http');
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
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
  } else if (req.method === 'GET' && req.url === '/pets/0'){
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      } else {

        const pets = JSON.parse(petsJSON);
        const petJSON = JSON.stringify(pets[0]);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petJSON);
      }
    });
  } else if (req.method === 'GET' && req.url === '/pets/1'){
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      } else {

        const pets = JSON.parse(petsJSON);
        const petJSON = JSON.stringify(pets[1]);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petJSON);
      }
    });
  } else if (req.method === 'GET' && req.url === '/pets/2') {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  } else if (req.method === 'GET' && req.url === '/pets/-1') {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});


server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
