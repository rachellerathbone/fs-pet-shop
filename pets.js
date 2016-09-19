'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];
const age = Number(process.argv[3]);
const kind = process.argv[4];
const name = process.argv[5];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) throw err;

    const pets = JSON.parse(data);
    if (age >= pets.length || age < 0) {
      console.error(`Usage: ${node} ${file} read INDEX`);
      process.exit(1);
    } else if (!age) {
      console.log(pets);
    } else {
      console.log(pets[age]);
    }

  });
  } else if (cmd === 'create') {
    fs.readFile(petsPath, 'utf8', (readErr, data) => {
      if (readErr) throw readErr;

      const pets = JSON.parse(data);

      if (!age || !kind || !name || isNaN(age)) {
        console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
        process.exit(1);
      }

      let newPet = {}
      newPet.age = age;
      newPet.kind = kind;
      newPet.name = name;
      pets.push(newPet);


      const petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, (writeErr) => {
          if (writeErr) {
            throw writeErr;
          }

          console.log(newPet);
        });
      });
    } else {
      console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
      process.exit(1);
    }
