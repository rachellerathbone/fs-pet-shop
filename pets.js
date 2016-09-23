#!/usr/bin/env node

/* eslint no-console: 0 */

'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];
const index = process.argv[3];

const age = process.argv[4];
const kind = process.argv[5];
const name = process.argv[6];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);

    if (Number.isNaN(index)) {
      process.exit();
    } if (index >= pets.length || index < 0) {
      console.error(`Usage: ${node} ${file} read INDEX`);
      process.exit(1);
    } else if (!index) {
      console.log(pets);
    } else {
      console.log(pets[index]);
    }
  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }

    const pets = JSON.parse(data);

    if (!index || !age || !kind || isNaN(index)) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    const newPet = {};

    newPet.age = Number(index);
    newPet.kind = age;
    newPet.name = kind;
    pets.push(newPet);

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });

    console.log(newPet);
  });
} else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }

    const pets = JSON.parse(data);

    if (!index || !age || !kind || isNaN(index) || !name) {
      console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
      process.exit(1);
    }

    const newPet = {};

    newPet.age = Number(age);
    newPet.kind = kind;
    newPet.name = name;
    pets[Number(index)] = newPet;

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });

    console.log(newPet);
  });
} else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data);

    if (!index || isNaN(index)) {
      console.error(`Usage: ${node} ${file} destroy INDEX`);
      process.exit(1);
    }
    if (pets.length < 1) {
      console.error('No pets to delete...');
      process.exit(1);
    }

    // const index = Number(index);
    const byebyePet = pets.splice(index, 1);

    console.log(byebyePet[0]);

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
