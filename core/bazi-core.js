const { getTietKhi } = require('./dataset');
const {
  getYearCanChi,
  getDayCanChi,
  getHourCanChi
} = require('./lunar-core');

// ===== CONSTANT =====
const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

const NGU_HANH = {
  "Giáp":"Mộc","Ất":"Mộc",
  "Bính":"Hỏa","Đinh":"Hỏa",
  "Mậu":"Thổ","Kỷ":"Thổ",
  "Canh":"Kim","Tân":"Kim",
  "Nhâm":"Thủy","Quý":"Thủy"
};

const HIDDEN = {
  "Tý":["Quý"],"Sửu":["Kỷ","Quý","Tân"],"Dần":["Giáp","Bính","Mậu"],
  "Mão":["Ất"],"Thìn":["Mậu","Ất","Quý"],"Tỵ":["Bính","Mậu","Canh"],
  "Ngọ":["Đinh","Kỷ"],"Mùi":["Kỷ","Đinh","Ất"],"Thân":["Canh","Nhâm","Mậu"],
  "Dậu":["Tân"],"Tuất":["Mậu","Tân","Đinh"],"Hợi":["Nhâm","Giáp"]
};

// ===== SINH KHẮC =====
const SINH = { "Mộc":"Hỏa","Hỏa":"Thổ","Thổ":"Kim","Kim":"Thủy","Thủy":"Mộc" };
const KHAC = { "Mộc":"Thổ","Thổ":"Thủy","Thủy":"Hỏa","Hỏa":"Kim","Kim":"Mộc" };

// ===== TRƯỜNG SINH =====
const TRUONG_SINH = {
  "Mộc":["Hợi","Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất"],
  "Hỏa":["Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi","Tý","Sửu"],
  "Thổ":["Thân","Dậu","Tuất","Hợi","Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi"],
  "Kim":["Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi","Tý","Sửu","Dần","Mão","Thìn"],
  "Thủy":["Thân","Dậu","Tuất","Hợi","Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi"]
};

// ===== THẬP THẦN =====
function getThapThan(dayCan, otherCan){
  const d = NGU_HANH[dayCan];
  const o = NGU_HANH[otherCan];

  if(d === o) return "Tỷ Kiên";

  if(SINH[d] === o) return "Thực Thần";
  if(KHAC[d] === o) return "Tài";

  if(SINH[o] === d) return "Ấn";
  if(KHAC[o] === d) return "Quan";

  return "Khác";
}

// ===== VƯỢNG SUY =====
function getTrangThai(can, chi){
  const hanh = NGU_HANH[can];
  const list = TRUONG_SINH[hanh];
  return list.indexOf(chi);
}

// ===== THẦN SÁT (CORE) =====
function getThanSat(tru){
  const result = [];

  if(tru.ngay.chi === "Tý" && tru.gio.chi === "Dậu"){
    result.push("Đào Hoa");
  }

  if(tru.nam.chi === "Ngọ"){
    result.push("Thiên Ất Quý Nhân");
  }

  return result;
}

// ===== YEAR =====
function getBaZiYear(date){
  const tk = getTietKhi(date.getFullYear());
  const lapXuan = tk.find(t => t.name === "Lập Xuân");

  return date < new Date(lapXuan.time)
    ? date.getFullYear() - 1
    : date.getFullYear();
}

// ===== MONTH =====
function getMonthCanChi(date){
  const tk = getTietKhi(date.getFullYear());

  const TIET = ["Lập Xuân","Kinh Trập","Thanh Minh","Lập Hạ","Mang Chủng","Tiểu Thử","Lập Thu","Bạch Lộ","Hàn Lộ","Lập Đông","Đại Tuyết","Tiểu Hàn"];

  const tiet = tk.filter(t => TIET.includes(t.name));

  let index = 0;
  for(let i=0;i<tiet.length;i++){
    if(date >= new Date(tiet[i].time)) index = i;
  }

  const chiIndex = (index + 2) % 12;
  const yearCan = (getBaZiYear(date)+6)%10;
  const startCan = [2,4,6,8,0,2,4,6,8,0];
  const canIndex = (startCan[yearCan] + index) % 10;

  return { can: CAN[canIndex], chi: CHI[chiIndex] };
}

// ===== ĐẠI VẬN =====
function getDaiVan(year, gender){
  const result = [];
  let start = year + (gender === "male" ? 10 : 8);

  for(let i=0;i<8;i++){
    result.push(start + i*10);
  }

  return result;
}

// ===== LƯU NIÊN =====
function getLuuNien(year){
  return Array.from({length:10}, (_,i)=>year+i);
}

// ===== BUILD =====
function buildBaZi(dd, mm, yy, hour=0, gender="male"){

  const date = new Date(`${yy}-${mm}-${dd}T${hour}:00:00+07:00`);

  const yearRaw = getYearCanChi(getBaZiYear(date)).split(" ");
  const dayRaw = getDayCanChi(dd, mm, yy).split(" ");
  const hourRaw = getHourCanChi(dd, mm, yy, hour).split(" ");
  const month = getMonthCanChi(date);

  const tru = {
    nam:{can:yearRaw[0],chi:yearRaw[1]},
    thang:month,
    ngay:{can:dayRaw[0],chi:dayRaw[1]},
    gio:{can:hourRaw[0],chi:hourRaw[1]}
  };

  // ===== THẬP THẦN =====
  const thap_than = {
    nam: getThapThan(tru.ngay.can, tru.nam.can),
    thang: getThapThan(tru.ngay.can, tru.thang.can),
    gio: getThapThan(tru.ngay.can, tru.gio.can)
  };

  // ===== VƯỢNG SUY =====
  const vuong_suy = {
    nam: getTrangThai(tru.ngay.can, tru.nam.chi),
    thang: getTrangThai(tru.ngay.can, tru.thang.chi),
    ngay: getTrangThai(tru.ngay.can, tru.ngay.chi),
    gio: getTrangThai(tru.ngay.can, tru.gio.chi)
  };

  return {
    tru,
    thap_than,
    vuong_suy,
    than_sat: getThanSat(tru),
    dai_van: getDaiVan(yy, gender),
    luu_nien: getLuuNien(yy)
  };
}

module.exports = { buildBaZi };
