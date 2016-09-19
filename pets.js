'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) throw err;

    const pets = JSON.parse(data);

    console.log(pets);
  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) throw readErr;

    const pets = JSON.parse(data);
    const pet = process.argv[3];

    if (!pet) {
      console.error(`Usage: ${node} ${file} ${cmd} pet_NAME`);
      process.exit(1);
    }

    pets.push(pet);

    const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }

        console.log(pet);
      });
    });
  } else {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
  }
