const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ===== CAN CHI =====
function getYearCanChi(year){
  return CAN[(year+6)%10] + " " + CHI[(year+8)%12];
}

function getZodiac(year){
  return CHI[(year+8)%12];
}

// ===== TIẾT KHÍ (mốc gần đúng) =====
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

// ===== MAIN =====
const now = new Date(); // dùng thật

document.getElementById("solar").innerText =
  now.toLocaleDateString("vi-VN");

document.getElementById("canchi").innerText =
  getYearCanChi(now.getFullYear());

document.getElementById("zodiac").innerText =
  "Con giáp: " + getZodiac(now.getFullYear());

document.getElementById("tietkhi").innerText =
  "Tiết khí: " + getTietKhi(now);
