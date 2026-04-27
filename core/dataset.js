const fs = require('fs');
const path = require('path');

let cache = {};

function load(file){
  if(!cache[file]){
    cache[file] = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'data', file),
        'utf-8'
      )
    );
  }
  return cache[file];
}

function getTietKhi(year){
  return load(`tietkhi-${year}.json`);
}

function getSolarLunar(year){
  return load(`solar-lunar-${year}.json`);
}

module.exports = {
  getTietKhi,
  getSolarLunar
};
