'use strict';

/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const http = require('http');
const port = process.env.PORT || 8000;
const regExp = /^\/pets\/(.*)$/;

const server = http.createServer((req, res) => {
  const indexPet = req.url.substring(req.url.lastIndexOf('/') + 1);
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');

        return res.end('Internal Server Error');
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });

    return;
  }
  if (req.method === 'GET' && regExp.test(req.url)) {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');

        return res.end('Internal Server Error');
      }
      const pets = JSON.parse(petsJSON);

      if (indexPet > pets.length - 1 || indexPet < 0) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
      } else {
        const petJSON = JSON.stringify(pets[indexPet]);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petJSON);
      }
    });
  }
  else if (req.method === 'POST' && req.url === '/pets') {
    let bodyJSON = '';

    req.on('data', (chunk) => {
      bodyJSON += chunk.toString();
    });

    req.on('end', () => {
      // eslint-disable-next-line max-statements
      fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
        if (readErr) {
          throw readErr;
        }

        const body = JSON.parse(bodyJSON);
        const pets = JSON.parse(petsJSON);
        const age = Number.parseInt(body.age);
        const kind = body.kind;
        const name = body.name;

        if (Number.isNaN(age) || !kind || !name) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Bad Request');

          return;
        }

        const pet = { age, kind, name };

        pets.push(pet);

        const petJSON = JSON.stringify(pet);
        const newPetsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
          if (writeErr) {
            throw writeErr;
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(petJSON);
        });
      });
    });
  }
  else if (req.url === '/' || !regExp.test(req.url)) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
