// ===== CAN - CHI =====
const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ===== NĂM =====
function getYearCanChi(year){
  return CAN[(year+6)%10] + " " + CHI[(year+8)%12];
}

// ===== JD =====
function jdFromDate(dd, mm, yy){
  let a = Math.floor((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;

  return dd + Math.floor((153*m+2)/5) + 365*y
    + Math.floor(y/4) - Math.floor(y/100)
    + Math.floor(y/400) - 32045;
}

// ===== NGÀY =====
function getDayCanChi(date){
  const jd = jdFromDate(
    date.getDate(),
    date.getMonth()+1,
    date.getFullYear()
  );

  const can = CAN[(jd + 9) % 10];
  const chi = CHI[(jd + 1) % 12];

  return can + " " + chi;
}

// ===== GIỜ =====
function getHourCanChi(date){
  const hour = date.getHours();
  const dayCanIndex = (jdFromDate(
    date.getDate(),
    date.getMonth()+1,
    date.getFullYear()
  ) + 9) % 10;

  const chiIndex = Math.floor((hour + 1) / 2) % 12;
  const canIndex = (dayCanIndex * 2 + chiIndex) % 10;

  return CAN[canIndex] + " " + CHI[chiIndex];
}

// ===== TIẾT KHÍ CHUẨN (mốc) =====
const TIET_KHI = [
  ["Lập Xuân","02-04",0],
  ["Kinh Trập","03-06",1],
  ["Thanh Minh","04-05",2],
  ["Lập Hạ","05-05",3],
  ["Mang Chủng","06-06",4],
  ["Tiểu Thử","07-07",5],
  ["Lập Thu","08-08",6],
  ["Bạch Lộ","09-08",7],
  ["Hàn Lộ","10-08",8],
  ["Lập Đông","11-07",9],
  ["Đại Tuyết","12-07",10],
  ["Tiểu Hàn","01-06",11]
];

// ===== THÁNG CAN CHI (THEO TIẾT KHÍ) =====
function getMonthCanChi(date){
  const year = date.getFullYear();

  let monthIndex = 0;

  for(let i=0;i<TIET_KHI.length;i++){
    const d = new Date(`${year}-${TIET_KHI[i][1]}`);
    if(date >= d){
      monthIndex = TIET_KHI[i][2];
    }
  }

  // can tháng phụ thuộc can năm
  const yearCan = (year + 6) % 10;
  const canIndex = (yearCan * 2 + monthIndex) % 10;

  return CAN[canIndex] + " " + CHI[(monthIndex + 2) % 12];
}

// ===== TIẾT KHÍ HIỂN THỊ =====
function getTietKhi(date){
  const year = date.getFullYear();
  let current = "";

  TIET_KHI.forEach(t=>{
    const d = new Date(`${year}-${t[1]}`);
    if(date >= d){
      current = t[0];
    }
  });

  return current;
}

// ===== MAIN =====
const now = new Date(); // test: new Date("2026-04-21 10:00")

const year = now.getFullYear();
const key = now.toISOString().slice(0,10);

// ===== LOAD ÂM LỊCH =====
fetch(`./data/lunar-${year}.json`)
  .then(r => r.json())
  .then(data => {

    const l = data[key];

    // DƯƠNG
    document.getElementById("solar").innerText =
      now.toLocaleDateString("vi-VN");

    // ÂM
    document.getElementById("lunar").innerText =
      l ? `Âm: ${l[0]}/${l[1]}/${l[2]}` : "Không có data";

    // BÁT TỰ
    document.getElementById("year").innerText =
      "Năm: " + getYearCanChi(year);

    document.getElementById("month").innerText =
      "Tháng: " + getMonthCanChi(now);

    document.getElementById("day").innerText =
      "Ngày: " + getDayCanChi(now);

    document.getElementById("hour").innerText =
      "Giờ: " + getHourCanChi(now);

    document.getElementById("tietkhi").innerText =
      "Tiết khí: " + getTietKhi(now);

  });
