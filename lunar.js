// ===== CONSTANT =====
const PI = Math.PI;

function INT(d){ return Math.floor(d); }

// ===== JULIAN DAY =====
function jdFromDate(dd, mm, yy){
  let a = INT((14-mm)/12);
  let y = yy+4800-a;
  let m = mm+12*a-3;
  return dd + INT((153*m+2)/5) + 365*y + INT(y/4)
         - INT(y/100) + INT(y/400) - 32045;
}

// ===== NEW MOON =====
function getNewMoonDay(k, timeZone){
  let T = k/1236.85;
  let T2 = T*T;
  let T3 = T2*T;
  let dr = PI/180;

  let Jd1 = 2415020.75933 + 29.53058868*k
    + 0.0001178*T2 - 0.000000155*T3;

  let M = 359.2242 + 29.10535608*k
    - 0.0000333*T2 - 0.00000347*T3;

  let Mpr = 306.0253 + 385.81691806*k
    + 0.0107306*T2 + 0.00001236*T3;

  let F = 21.2964 + 390.67050646*k
    - 0.0016528*T2 - 0.00000239*T3;

  let C1 = (0.1734 - 0.000393*T)*Math.sin(M*dr)
    + 0.0021*Math.sin(2*M*dr)
    - 0.4068*Math.sin(Mpr*dr)
    + 0.0161*Math.sin(2*Mpr*dr)
    - 0.0004*Math.sin(3*Mpr*dr)
    + 0.0104*Math.sin(2*F*dr)
    - 0.0051*Math.sin((M+Mpr)*dr)
    - 0.0074*Math.sin((M-Mpr)*dr)
    + 0.0004*Math.sin((2*F+M)*dr)
    - 0.0004*Math.sin((2*F-M)*dr);

  let JdNew = Jd1 + C1;
  return INT(JdNew + 0.5 + timeZone/24);
}

// ===== SUN LONGITUDE =====
function getSunLongitude(jdn, timeZone){
  let T = (jdn - 2451545.5 - timeZone/24)/36525;
  let T2 = T*T;
  let dr = PI/180;

  let M = 357.52910 + 35999.05030*T - 0.0001559*T2;
  let L0 = 280.46645 + 36000.76983*T;

  let DL = (1.914600 - 0.004817*T)*Math.sin(dr*M)
    + 0.019993*Math.sin(2*dr*M);

  let L = L0 + DL;
  L = L*dr;

  return INT(L/PI*6);
}

// ===== MONTH 11 =====
function getLunarMonth11(yy, timeZone){
  let off = jdFromDate(31,12,yy) - 2415021;
  let k = INT(off/29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  let sunLong = getSunLongitude(nm, timeZone);
  if(sunLong >= 9){
    nm = getNewMoonDay(k-1, timeZone);
  }
  return nm;
}

// ===== LEAP MONTH =====
function getLeapMonthOffset(a11, timeZone){
  let k = INT((a11 - 2415021.076998695)/29.530588853 + 0.5);
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

// ===== MAIN CONVERT =====
function convertSolar2Lunar(dd, mm, yy, timeZone=7){
  let dayNumber = jdFromDate(dd, mm, yy);
  let k = INT((dayNumber - 2415021.076998695)/29.530588853);

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
    lunarYear = yy+1;
    b11 = getLunarMonth11(yy+1, timeZone);
  }

  let lunarDay = dayNumber - monthStart + 1;
  let diff = INT((monthStart - a11)/29);
  let lunarMonth = diff + 11;

  let leap = 0;

  if(b11 - a11 > 365){
    let leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if(diff >= leapMonthDiff){
      lunarMonth = diff + 10;
      if(diff == leapMonthDiff){
        leap = 1;
      }
    }
  }

  if(lunarMonth > 12){
    lunarMonth -= 12;
  }

  if(lunarMonth >= 11 && diff < 4){
    lunarYear -= 1;
  }

  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    leap: leap
  };
}const now = new Date();
const dd = now.getDate();
const mm = now.getMonth() + 1;
const yy = now.getFullYear();

const lunar = convertSolar2Lunar(dd, mm, yy, 7);

document.getElementById("solar").innerText =
  `${dd}/${mm}/${yy}`;

document.getElementById("lunar").innerText =
  `Âm: ${lunar.day}/${lunar.month}/${lunar.year}` +
  (lunar.leap ? " (Nhuận)" : "");