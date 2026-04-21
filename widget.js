// ====== CAN - CHI ======
const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

function getYearCanChi(year){
  return CAN[(year+6)%10] + " " + CHI[(year+8)%12];
}

// ====== JULIAN DAY (để tính ngày can chi) ======
function jdFromDate(dd, mm, yy){
  let a = Math.floor((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;

  return dd + Math.floor((153*m+2)/5) + 365*y
    + Math.floor(y/4) - Math.floor(y/100)
    + Math.floor(y/400) - 32045;
}

function getDayCanChi(date){
  const dd = date.getDate();
  const mm = date.getMonth()+1;
  const yy = date.getFullYear();

  const jd = jdFromDate(dd,mm,yy);

  const can = CAN[(jd + 9) % 10];
  const chi = CHI[(jd + 1) % 12];

  return can + " " + chi;
}

// ====== TIẾT KHÍ (gần đúng) ======
const TIET_KHI = [
  ["Lập Xuân","02-04"],
  ["Vũ Thủy","02-19"],
  ["Kinh Trập","03-06"],
  ["Xuân Phân","03-21"],
  ["Thanh Minh","04-05"],
  ["Cốc Vũ","04-20"],
  ["Lập Hạ","05-05"],
  ["Tiểu Mãn","05-21"],
  ["Mang Chủng","06-06"],
  ["Hạ Chí","06-21"],
  ["Tiểu Thử","07-07"],
  ["Đại Thử","07-23"],
  ["Lập Thu","08-08"],
  ["Xử Thử","08-23"],
  ["Bạch Lộ","09-08"],
  ["Thu Phân","09-23"],
  ["Hàn Lộ","10-08"],
  ["Sương Giáng","10-23"],
  ["Lập Đông","11-07"],
  ["Tiểu Tuyết","11-22"],
  ["Đại Tuyết","12-07"],
  ["Đông Chí","12-22"],
  ["Tiểu Hàn","01-06"],
  ["Đại Hàn","01-20"]
];

function getTietKhi(date){
  const year = date.getFullYear();

  let closest = "";
  let minDiff = Infinity;

  TIET_KHI.forEach(t => {
    const d = new Date(`${year}-${t[1]}`);
    const diff = Math.abs(date - d);

    if(diff < minDiff){
      minDiff = diff;
      closest = t[0];
    }
  });

  return closest;
}

// ====== MAIN ======
const now = new Date(); // đổi thành ngày test nếu cần

const year = now.getFullYear();
const key = now.toISOString().slice(0,10);

// ====== LOAD DATASET ÂM LỊCH ======
fetch(`./data/lunar-${year}.json`)
  .then(r => r.json())
  .then(data => {

    const l = data[key];

    // DƯƠNG LỊCH
    document.getElementById("solar").innerText =
      now.toLocaleDateString("vi-VN");

    // ÂM LỊCH
    if(l){
      document.getElementById("lunar").innerText =
        `Âm: ${l[0]}/${l[1]}/${l[2]}`;
    } else {
      document.getElementById("lunar").innerText =
        "Không có dữ liệu";
    }

    // CAN CHI NĂM
    document.getElementById("canchi").innerText =
      "Năm: " + getYearCanChi(year);

    // CAN CHI NGÀY
    document.getElementById("daycanchi").innerText =
      "Ngày: " + getDayCanChi(now);

    // TIẾT KHÍ
    document.getElementById("tietkhi").innerText =
      "Tiết khí: " + getTietKhi(now);

  })
  .catch(() => {
    document.getElementById("lunar").innerText = "Lỗi load dữ liệu";
  });
