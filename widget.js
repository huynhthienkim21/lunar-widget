const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ===== YEAR =====
function getYearCanChi(year){
  return CAN[(year+6)%10] + " " + CHI[(year+8)%12];
}

// ===== DAY =====
function jdFromDate(dd, mm, yy){
  let a = Math.floor((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;

  return dd + Math.floor((153*m+2)/5) + 365*y
    + Math.floor(y/4) - Math.floor(y/100)
    + Math.floor(y/400) - 32045;
}

function getDayCanChi(date){
  const jd = jdFromDate(
    date.getDate(),
    date.getMonth()+1,
    date.getFullYear()
  );

  return CAN[(jd+9)%10] + " " + CHI[(jd+1)%12];
}

// ===== MAIN =====
const now = new Date("2026-04-21");

const solar = document.getElementById("solar");
const lunar = document.getElementById("lunar");
const yearEl = document.getElementById("year");
const dayEl = document.getElementById("day");

// ===== CALL CORE =====
const l = convertSolar2Lunar(
  now.getDate(),
  now.getMonth()+1,
  now.getFullYear(),
  7
);

// ===== RENDER =====
solar.innerText = now.toLocaleDateString("vi-VN");
lunar.innerText = `Âm: ${l[0]}/${l[1]}/${l[2]}`;
yearEl.innerText = "Năm: " + getYearCanChi(now.getFullYear());
dayEl.innerText = "Ngày: " + getDayCanChi(now);
