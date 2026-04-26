const fs = require('fs');
const path = require('path');

let cache = {
  tietkhi: null,
  solarLunar: null
};

function loadCache(){

  if(!cache.tietkhi){
    cache.tietkhi = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'data/tietkhi-2026.json'),
        'utf-8'
      )
    );
  }

  if(!cache.solarLunar){
    cache.solarLunar = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'data/solar-lunar-2026.json'),
        'utf-8'
      )
    );
  }
}

function getTietKhi(){
  loadCache();
  return cache.tietkhi;
}

function getSolarLunar(){
  loadCache();
  return cache.solarLunar;
}

module.exports = {
  getTietKhi,
  getSolarLunar
};
