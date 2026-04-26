const PI = Math.PI;

// ===== JD =====
function jdFromDate(dd, mm, yy){
  let a = Math.floor((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12*a - 3;

  return dd + Math.floor((153*m+2)/5) + 365*y
    + Math.floor(y/4) - Math.floor(y/100)
    + Math.floor(y/400) - 32045;
}

// ===== SUN LONGITUDE (FULL 360°) =====
function getSunLongitudeDegree(jdn){
  let T = (jdn - 2451545.0) / 36525;
  let T2 = T*T;

  let L0 = 280.46646 + 36000.76983*T;
  let M = 357.52911 + 35999.05029*T;

  let C = (1.914602 - 0.004817*T)*Math.sin(M*PI/180)
        + 0.019993*Math.sin(2*M*PI/180)
        + 0.000289*Math.sin(3*M*PI/180);

  let trueLong = L0 + C;

  return (trueLong % 360);
}

// ===== 24 TIẾT KHÍ =====
function getTietKhiIndex(jdn){
  const deg = getSunLongitudeDegree(jdn);
  return Math.floor(deg / 15); // 24 tiết khí
}

module.exports = {
  jdFromDate,
  getSunLongitudeDegree,
  getTietKhiIndex
};
