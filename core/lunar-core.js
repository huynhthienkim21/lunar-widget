const { getSolarLunar } = require('./dataset');

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ===== LUNAR =====
function convertSolar2Lunar(dd, mm, yy){
  const data = getSolarLunar(yy);

  const key = `${yy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;

  const result = data[key];

  if(!result) return null;

  return {
    day: result.lunar[0],
    month: result.lunar[1],
    year: result.lunar[2]
  };
}
function convertLunar2Solar(dd, mm, yy){
  const data = getSolarLunar(yy);

  for(let key in data){
    const l = data[key].lunar;

    if(l[0] === dd && l[1] === mm && l[2] === yy){
      const [y,m,d] = key.split('-');
      return { day:+d, month:+m, year:+y };
    }
  }

  return null;
}
// ===== CAN CHI =====
function getYearCanChi(year){
  return CAN[(year+6)%10] + " " + CHI[(year+8)%12];
}

function jdSimple(dd, mm, yy){
  return Math.floor(Date.UTC(yy, mm-1, dd)/86400000 + 2440587.5);
}

function getDayCanChi(dd, mm, yy){
  const jd = jdSimple(dd, mm, yy);
  return CAN[(jd+9)%10] + " " + CHI[(jd+1)%12];
}

function getHourCanChi(dd, mm, yy, hour){
  const jd = jdSimple(dd, mm, yy);
  const dayCanIndex = (jd+9)%10;
  const chiIndex = Math.floor((hour+1)/2)%12;

  const startCan = [0,2,4,6,8,0,2,4,6,8];
  const canIndex = (startCan[dayCanIndex] + chiIndex) % 10;

  return CAN[canIndex] + " " + CHI[chiIndex];
}

module.exports = {
  convertSolar2Lunar,
  convertLunar2Solar,
  getYearCanChi,
  getDayCanChi,
  getHourCanChi
};
