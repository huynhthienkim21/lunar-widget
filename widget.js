// ===== TIME VN =====
function getNow(){
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
}

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

// ===== 🔥 GIỜ BẮT ĐẦU NGÀY (GIỜ TÝ) =====
function getStartHourOfDay(date){
  const jd = jdFromDate(
    date.getDate(),
    date.getMonth()+1,
    date.getFullYear()
  );

  const dayCan = (jd+9)%10;

  // map chuẩn
  const tyMap = [0,2,4,6,8,0,2,4,6,8];

  const canIndex = tyMap[dayCan];

  return CAN[canIndex] + " Tý";
}

// ===== GIỜ HIỆN TẠI =====
function getHourChiName(date){
  const hour = date.getHours();
  return CHI[Math.floor((hour+1)/2)%12];
}

function getHourCanChi(date){
  const hour = date.getHours();
  const chiIndex = Math.floor((hour+1)/2)%12;

  const jd = jdFromDate(
    date.getDate(),
    date.getMonth()+1,
    date.getFullYear()
  );

  const dayCan = (jd+9)%10;
  const canIndex = (dayCan*2 + chiIndex)%10;

  return CAN[canIndex] + " " + CHI[chiIndex];
}

// ===== TIẾT KHÍ =====
async function getTietKhi(date){
  const res = await fetch("./data/tietkhi-2026.json");
  const data = await res.json();

  let current = null;

  for(let i=0;i<data.length;i++){
    const t = new Date(data[i].time);
    if(date >= t) current = data[i].name;
  }

  return current;
}

// ===== MAP THÁNG =====
function mapTietToMonth(tiet){
  const map = {
    "Lập Xuân":0, "Vũ Thủy":0,
    "Kinh Trập":1, "Xuân Phân":1,
    "Thanh Minh":2, "Cốc Vũ":2,
    "Lập Hạ":3, "Tiểu Mãn":3,
    "Mang Chủng":4, "Hạ Chí":4,
    "Tiểu Thử":5, "Đại Thử":5,
    "Lập Thu":6, "Xử Thử":6,
    "Bạch Lộ":7, "Thu Phân":7,
    "Hàn Lộ":8, "Sương Giáng":8,
    "Lập Đông":9, "Tiểu Tuyết":9,
    "Đại Tuyết":10, "Đông Chí":10,
    "Tiểu Hàn":11, "Đại Hàn":11
  };
  return map[tiet];
}

// ===== THÁNG CAN CHI =====
async function getMonthCanChi(date){
  const tiet = await getTietKhi(date);

  const monthIndex = mapTietToMonth(tiet);

  const lapXuan = new Date("2026-02-04T10:46:00+07:00");
  const year = date >= lapXuan ? 2026 : 2025;

  const yearCan = (year + 6) % 10;

  const canIndex = (yearCan * 2 + monthIndex + 2) % 10;
  const chiIndex = (monthIndex + 2) % 12;

  return CAN[canIndex] + " " + CHI[chiIndex];
}

// ===== CLOCK =====
function runClock(){
  setInterval(() => {
    const now = getNow();

    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');

    document.getElementById("clock").innerText = `${h}:${m}`;
    document.getElementById("hourChi").innerText =
      `Giờ ${getHourChiName(now)} (${getHourCanChi(now)})`;
  }, 1000);
}

// ===== MAIN =====
async function main(){
  const now = getNow();

  document.getElementById("solar").innerText =
    now.toLocaleDateString("vi-VN");

  const l = convertSolar2Lunar(
    now.getDate(),
    now.getMonth()+1,
    now.getFullYear(),
    7
  );

  document.getElementById("lunar").innerText =
    `Âm: ${l[0]}/${l[1]}/${l[2]}${l[3] ? " (nhuận)" : ""}`;

  document.getElementById("year").innerText =
    "Năm: " + getYearCanChi(now.getFullYear());

  document.getElementById("month").innerText =
    "Tháng: " + await getMonthCanChi(now);

  document.getElementById("day").innerText =
    "Ngày: " + getDayCanChi(now);

  // 🔥 HIỂN THỊ GIỜ BẮT ĐẦU NGÀY
  document.getElementById("startHour").innerText =
    "Giờ bắt đầu ngày: " + getStartHourOfDay(now);

  document.getElementById("tietkhi").innerText =
    "Tiết khí: " + await getTietKhi(now);
}

main();
runClock();
