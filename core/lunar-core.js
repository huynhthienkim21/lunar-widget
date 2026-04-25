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

// ===== SUN LONGITUDE =====
function getSunLongitude(jdn, timeZone){
  let T = (jdn - 2451545.5 - timeZone/24) / 36525;
  let T2 = T*T;
  let dr = Math.PI/180;

  let M = 357.52910 + 35999.05030*T - 0.0001559*T2;
  let L0 = 280.46645 + 36000.76983*T;

  let DL = (1.914600 - 0.004817*T)*Math.sin(dr*M)
         + (0.019993 - 0.000101*T)*Math.sin(2*dr*M)
         + 0.000290*Math.sin(3*dr*M);

  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI*2 * Math.floor(L/(Math.PI*2));

  return Math.floor(L / Math.PI * 6);
}

// ===== NEW MOON =====
function getNewMoonDay(k, timeZone){
  let T = k / 1236.85;
  let T2 = T*T;
  let T3 = T2*T;
  let dr = Math.PI/180;

  let Jd1 = 2415020.75933 + 29.53058868*k
    + 0.0001178*T2 - 0.000000155*T3;

  Jd1 += 0.00033 * Math.sin((166.56 + 132.87*T - 0.009173*T2)*dr);

  let M = 359.2242 + 29.10535608*k - 0.0000333*T2 - 0.00000347*T3;
  let Mpr = 306.0253 + 385.81691806*k + 0.0107306*T2 + 0.00001236*T3;
  let F = 21.2964 + 390.67050646*k - 0.0016528*T2 - 0.00000239*T3;

  let C1 = (0.1734 - 0.000393*T)*Math.sin(M*dr)
    + 0.0021*Math.sin(2*dr*M)
    - 0.4068*Math.sin(Mpr*dr)
    + 0.0161*Math.sin(2*dr*Mpr)
    - 0.0004*Math.sin(3*dr*Mpr)
    + 0.0104*Math.sin(2*dr*F)
    - 0.0051*Math.sin((M+Mpr)*dr)
    - 0.0074*Math.sin((M-Mpr)*dr);

  let deltaT = (T < -11)
    ? 0.001 + 0.000839*T + 0.0002261*T2
    : -0.000278 + 0.000265*T;

  return Math.floor(Jd1 + C1 - deltaT + 0.5 + timeZone/24);
}

// ===== MONTH 11 =====
function getLunarMonth11(yy, timeZone){
  let off = jdFromDate(31,12,yy) - 2415021;
  let k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);

  let sunLong = getSunLongitude(nm, timeZone);
  if(sunLong >= 9){
    nm = getNewMoonDay(k-1, timeZone);
  }

  return nm;
}

// ===== LEAP =====
function getLeapMonthOffset(a11, timeZone){
  let k = Math.floor((a11 - 2415021.076998695)/29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone);

  do{
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone);
  } while(arc != last && i < 14);

  return i-1;
}

// ===== SOLAR → LUNAR =====
function convertSolar2Lunar(dd, mm, yy, timeZone){
  let dayNumber = jdFromDate(dd,mm,yy);
  let k = Math.floor((dayNumber - 2415021.076998695)/29.530588853);
  let monthStart = getNewMoonDay(k+1, timeZone);

  if(monthStart > dayNumber){
    monthStart = getNewMoonDay(k, timeZone);
  }

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear;

  if(a11 >= monthStart){
    lunarYear = yy;
    a11 = getLunarMonth11(yy-1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy+1, timeZone);
  }

  let lunarDay = dayNumber - monthStart + 1;
  let diff = Math.floor((monthStart - a11)/29);
  let lunarLeap = 0;
  let lunarMonth = diff + 11;

  if(b11 - a11 > 365){
    let leapDiff = getLeapMonthOffset(a11, timeZone);
    if(diff >= leapDiff){
      lunarMonth = diff + 10;
      if(diff == leapDiff) lunarLeap = 1;
    }
  }

  if(lunarMonth > 12) lunarMonth -= 12;
  if(lunarMonth >= 11 && diff < 4) lunarYear -= 1;

  return [lunarDay, lunarMonth, lunarYear, lunarLeap];
}

// ===== LUNAR → SOLAR =====
function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone){
  let k, a11, b11, off, leapOff, leapMonth, monthStart;

  if(lunarMonth < 11){
    a11 = getLunarMonth11(lunarYear-1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
    b11 = getLunarMonth11(lunarYear+1, timeZone);
  }

  off = lunarMonth - 11;
  if(off < 0) off += 12;

  if(b11 - a11 > 365){
    leapOff = getLeapMonthOffset(a11, timeZone);
    leapMonth = leapOff - 2;
    if(leapMonth < 0) leapMonth += 12;

    if(lunarLeap != 0 && lunarMonth != leapMonth){
      return [0,0,0];
    }
    else if(lunarLeap != 0 || off >= leapOff){
      off += 1;
    }
  }

  k = Math.floor(0.5 + (a11 - 2415021.076998695)/29.530588853);
  monthStart = getNewMoonDay(k + off, timeZone);

  let jd = monthStart + lunarDay - 1;

  return jdToDate(jd);
}

// ===== CAN CHI =====
const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

function getYearCanChi(year){
  return CAN[(year+6)%10] + " " + CHI[(year+8)%12];
}

function getDayCanChi(dd, mm, yy){
  const jd = jdFromDate(dd, mm, yy);
  return CAN[(jd+9)%10] + " " + CHI[(jd+1)%12];
}

function getHourChi(hour){
  return CHI[Math.floor((hour+1)/2)%12];
}

function getHourCanChi(dd, mm, yy, hour){
  const jd = jdFromDate(dd, mm, yy);
  const dayCan = (jd + 9) % 10;
  const chi = Math.floor((hour+1)/2)%12;

  // bảng chuẩn thật (KHÔNG dùng công thức)
  const table = [
    [0,1,2,3,4,5,6,7,8,9,0,1], // Giáp
    [2,3,4,5,6,7,8,9,0,1,2,3], // Ất
    [4,5,6,7,8,9,0,1,2,3,4,5], // Bính
    [6,7,8,9,0,1,2,3,4,5,6,7], // Đinh
    [8,9,0,1,2,3,4,5,6,7,8,9], // Mậu
    [0,1,2,3,4,5,6,7,8,9,0,1], // Kỷ
    [2,3,4,5,6,7,8,9,0,1,2,3], // Canh
    [4,5,6,7,8,9,0,1,2,3,4,5], // Tân
    [6,7,8,9,0,1,2,3,4,5,6,7], // Nhâm
    [8,9,0,1,2,3,4,5,6,7,8,9]  // Quý
  ];

  const canIndex = table[dayCan][chi];

  return CAN[canIndex] + " " + CHI[chi];
}

module.exports = {
  convertSolar2Lunar,
  convertLunar2Solar,
  getYearCanChi,
  getDayCanChi,
  getHourCanChi,
  getHourChi
};
