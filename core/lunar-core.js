const { getSolarLunar } = require('./dataset');

function convertSolar2Lunar(dd, mm, yy){
  const data = getSolarLunar(yy);
  const key = `${dd}/${mm}/${yy}`;

  return data[key] || null;
}

function convertLunar2Solar(dd, mm, yy){
  const data = getSolarLunar(yy);

  for(let key in data){
    const v = data[key];
    if(v.day === dd && v.month === mm && v.year === yy){
      const [d,m,y] = key.split('/');
      return { day:+d, month:+m, year:+y };
    }
  }
  return null;
}

module.exports = {
  convertSolar2Lunar,
  convertLunar2Solar
};
