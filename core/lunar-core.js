// ===== JD =====
function jdFromDate(dd, mm, yy){
  let a = Math.floor((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;

  return dd + Math.floor((153*m+2)/5) + 365*y
    + Math.floor(y/4) - Math.floor(y/100)
    + Math.floor(y/400) - 32045;
}

function jdToDate(jd){
  let a = jd + 32044;
  let b = Math.floor((4*a+3)/146097);
  let c = a - Math.floor((b*146097)/4);

  let d = Math.floor((4*c+3)/1461);
  let e = c - Math.floor((1461*d)/4);

  let m = Math.floor((5*e+2)/153);

  let day = e - Math.floor((153*m+2)/5) + 1;
  let month = m + 3 - 12*Math.floor(m/10);
  let year = b*100 + d - 4800 + Math.floor(m/10);

  return [day, month, year];
}

// ===== SUN LONGITUDE (24 TIẾT KHÍ) =====
function getSunLongitude(jdn, timeZone){
  let T = (jdn - 2451545.5 - timeZone/24) / 36525;
  let dr = Math.PI/180;

  let M = 357.52910 + 35999.05030*T;
  let L0 = 280.46645 + 36000.76983*T;

  let DL = 1.9146*Math.sin(dr*M)
         + 0.019993*Math.sin(2*dr*M);

  let L = (L0 + DL) * dr;
  L = L - Math.PI*2 * Math.floor(L/(Math.PI*2));

  return Math.floor(L / Math.PI * 12); // 🔥 24 tiết khí
}

// ===== CAN CHI =====
const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ===== NĂM =====
function getYearCanChi(year){
  return CAN[(year+6)%10] + " " + CHI[(year+8)%12];
}

// ===== NGÀY (fix giờ Tý) =====
function getDayCanChi(dd, mm, yy, hour){
  let jd = jdFromDate(dd, mm, yy);

  if(hour >= 23 || hour < 1){
    jd -= 1;
  }

  return CAN[(jd+9)%10] + " " + CHI[(jd+1)%12];
}

// ===== GIỜ =====
function getHourCanChi(dd, mm, yy, hour){
  let jd = jdFromDate(dd, mm, yy);

  if(hour >= 23 || hour < 1){
    jd -= 1;
  }

  const dayCan = (jd+9)%10;
  const chi = Math.floor((hour+1)/2)%12;

  const startCan = [0,2,4,6,8,0,2,4,6,8];
  const can = (startCan[dayCan] + chi) % 10;

  return CAN[can] + " " + CHI[chi];
}

function getHourChi(hour){
  return CHI[Math.floor((hour+1)/2)%12];
}

module.exports = {
  jdFromDate,
  jdToDate,
  getSunLongitude,
  getYearCanChi,
  getDayCanChi,
  getHourCanChi,
  getHourChi,
  CAN,
  CHI
};
