const fs = require('fs');
const path = require('path');

// ===== CACHE RAM =====
let cache = {
  tietkhi: null,
  solarLunar: null
};

// ===== LOAD 1 LẦN =====
function loadCache(){

  if(!cache.tietkhi){
    cache.tietkhi = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, './dataset/tietkhi-2026.json'),
        'utf-8'
      )
    );
  }

  if(!cache.solarLunar){
    cache.solarLunar = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, './dataset/solar-lunar-2026.json'),
        'utf-8'
      )
    );
  }
}

// ===== GET =====
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
