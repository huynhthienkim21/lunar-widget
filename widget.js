// ===== TIMEZONE VN =====
const now = new Date(
  new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
);

// ===== CAN CHI =====
const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ===== JD =====
function jdFromDate(dd, mm, yy){
  let a = Math.floor((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;

  return dd + Math.floor((153*m+2)/5) + 365*y
    + Math.floor(y/4) - Math.floor(y/100)
    + Math.floor(y/400) - 32045;
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

// ===== CAN CHI =====
function getYearCanChi(year){
  return CAN[(year+6)%10] + " " + CHI[(year+8)%12];
}

function getDayCanChi(date){
  const jd = jdFromDate(
    date.getDate(),
    date.getMonth()+1,
    date.getFullYear()
  );
  return CAN[(jd+9)%10] + " " + CHI[(jd+1)%12];
}

function getHourCanChi(date){
  const hour = date.getHours();
  const jd = jdFromDate(
    date.getDate(),
    date.getMonth()+1,
    date.getFullYear()
  );

  const dayCan = (jd+9)%10;
  const chi = Math.floor((hour+1)/2)%12;
  const can = (dayCan*2 + chi)%10;

  return CAN[can] + " " + CHI[chi];
}

// ===== THÁNG CAN CHI =====
function getMonthCanChi(date){
  const jd = jdFromDate(
    date.getDate(),
    date.getMonth()+1,
    date.getFullYear()
  );

  // lấy tiết khí (0–23)
  const sun = getSunLongitude(jd, 7);

  // chia lại thành 12 tháng (mỗi 2 tiết = 1 tháng)
  const monthIndex = Math.floor((sun + 1) / 2) % 12;

  // map chi tháng (Dần = 0)
  const chiIndex = (monthIndex + 2) % 12;

  // can tháng
  const yearCan = (date.getFullYear() + 6) % 10;
  const canIndex = (yearCan * 2 + monthIndex) % 10;

  return CAN[canIndex] + " " + CHI[chiIndex];
}

// ===== TIẾT KHÍ =====
function getTietKhi(date){
  const jd = jdFromDate(
    date.getDate(),
    date.getMonth()+1,
    date.getFullYear()
  );

  const index = getSunLongitude(jd,7);

  const names = [
    "Xuân Phân","Thanh Minh","Cốc Vũ",
    "Lập Hạ","Tiểu Mãn","Mang Chủng",
    "Hạ Chí","Tiểu Thử","Đại Thử",
    "Lập Thu","Xử Thử","Bạch Lộ",
    "Thu Phân","Hàn Lộ","Sương Giáng",
    "Lập Đông","Tiểu Tuyết","Đại Tuyết",
    "Đông Chí","Tiểu Hàn","Đại Hàn",
    "Lập Xuân","Vũ Thủy","Kinh Trập"
  ];

  return names[index];
}

// ===== MAIN =====
const l = convertSolar2Lunar(
  now.getDate(),
  now.getMonth()+1,
  now.getFullYear(),
  7
);

document.getElementById("solar").innerText =
  now.toLocaleDateString("vi-VN");

document.getElementById("lunar").innerText =
  `Âm: ${l[0]}/${l[1]}/${l[2]}${l[3] ? " (nhuận)" : ""}`;

document.getElementById("year").innerText =
  "Năm: " + getYearCanChi(now.getFullYear());

document.getElementById("month").innerText =
  "Tháng: " + getMonthCanChi(now);

document.getElementById("day").innerText =
  "Ngày: " + getDayCanChi(now);

document.getElementById("hour").innerText =
  "Giờ: " + getHourCanChi(now);

document.getElementById("tietkhi").innerText =
  "Tiết khí: " + getTietKhi(now);
