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

// ===== ẨN CAN =====
const HIDDEN = {
  "Tý":["Quý"],
  "Sửu":["Kỷ","Quý","Tân"],
  "Dần":["Giáp","Bính","Mậu"],
  "Mão":["Ất"],
  "Thìn":["Mậu","Ất","Quý"],
  "Tỵ":["Bính","Mậu","Canh"],
  "Ngọ":["Đinh","Kỷ"],
  "Mùi":["Kỷ","Đinh","Ất"],
  "Thân":["Canh","Nhâm","Mậu"],
  "Dậu":["Tân"],
  "Tuất":["Mậu","Tân","Đinh"],
  "Hợi":["Nhâm","Giáp"]
};

// ===== NGŨ HÀNH SINH KHẮC =====
const SINH = {
  "Mộc":"Hỏa",
  "Hỏa":"Thổ",
  "Thổ":"Kim",
  "Kim":"Thủy",
  "Thủy":"Mộc"
};

const KHAC = {
  "Mộc":"Thổ",
  "Thổ":"Thủy",
  "Thủy":"Hỏa",
  "Hỏa":"Kim",
  "Kim":"Mộc"
};

// ===== MÙA → NGŨ HÀNH VƯỢNG =====
const SEASON = {
  "Dần":"Mộc","Mão":"Mộc",
  "Tỵ":"Hỏa","Ngọ":"Hỏa",
  "Thân":"Kim","Dậu":"Kim",
  "Hợi":"Thủy","Tý":"Thủy",
  "Thìn":"Thổ","Tuất":"Thổ","Sửu":"Thổ","Mùi":"Thổ"
};

// ===== YEAR =====
function getBaZiYear(date){
  const tk = getTietKhi(date.getFullYear());
  const lapXuan = tk.find(t => t.name === "Lập Xuân");

  if(!lapXuan) return date.getFullYear();

  return date < new Date(lapXuan.time)
    ? date.getFullYear() - 1
    : date.getFullYear();
}

// ===== MONTH =====
function getMonthCanChi(date){
  const tk = getTietKhi(date.getFullYear());

  const TIET = [
    "Tiểu Hàn","Lập Xuân","Kinh Trập","Thanh Minh",
    "Lập Hạ","Mang Chủng","Tiểu Thử","Lập Thu",
    "Bạch Lộ","Hàn Lộ","Lập Đông","Đại Tuyết"
  ];

  const tiet = tk.filter(t => TIET.includes(t.name));

  let index = 0;
  for(let i=0;i<tiet.length;i++){
    if(date >= new Date(tiet[i].time)){
      index = i;
    }
  }

  const chiIndex = (index + 1) % 12;

  const year = getBaZiYear(date);
  const yearCan = (year+6)%10;

  const startCan = [2,4,6,8,0,2,4,6,8,0];
  const canIndex = (startCan[yearCan] + index) % 10;

  return {
    can: CAN[canIndex],
    chi: CHI[chiIndex]
  };
}

// ===== ẨN CAN =====
function getHidden(tru){
  return {
    nam: HIDDEN[tru.nam.chi],
    thang: HIDDEN[tru.thang.chi],
    ngay: HIDDEN[tru.ngay.chi],
    gio: HIDDEN[tru.gio.chi]
  };
}

// ===== NGŨ HÀNH =====
function getNguHanh(tru){
  return {
    nam: NGU_HANH[tru.nam.can],
    thang: NGU_HANH[tru.thang.can],
    ngay: NGU_HANH[tru.ngay.can],
    gio: NGU_HANH[tru.gio.can]
  };
}

// ===== TÍNH VƯỢNG SUY =====
function evaluateStrength(tru){
  const day = NGU_HANH[tru.ngay.can];
  const season = SEASON[tru.thang.chi];

  let score = 0;

  if(day === season) score += 2; // vượng mùa
  if(SINH[season] === day) score += 1; // được sinh
  if(KHAC[season] === day) score -= 1; // bị khắc

  return score;
}

// ===== DỤNG THẦN CAO CẤP =====
function getDungThanAdvanced(tru){

  const day = NGU_HANH[tru.ngay.can];
  const strength = evaluateStrength(tru);

  // nhật chủ mạnh
  if(strength >= 2){
    return KHAC[day]; // lấy hành khắc để tiết
  }

  // nhật chủ yếu
  if(strength <= 0){
    return SINH[day]; // lấy hành sinh để trợ
  }

  // trung hòa
  return SINH[day];
}

// ===== BUILD =====
function buildBaZi(dd, mm, yy, hour=0){

  const date = new Date(`${yy}-${mm}-${dd}T${hour}:00:00+07:00`);

  const yearRaw = getYearCanChi(getBaZiYear(date));
  const dayRaw = getDayCanChi(dd, mm, yy);
  const hourRaw = getHourCanChi(dd, mm, yy, hour);

  const year = yearRaw.split(" ");
  const day = dayRaw.split(" ");
  const hourCC = hourRaw.split(" ");
  const month = getMonthCanChi(date);

  const tru = {
    nam:{can:year[0],chi:year[1]},
    thang:month,
    ngay:{can:day[0],chi:day[1]},
    gio:{can:hourCC[0],chi:hourCC[1]}
  };

  const an_can = getHidden(tru);
  const ngu_hanh = getNguHanh(tru);
  const dung_than = getDungThanAdvanced(tru);

  return {
    tru,
    an_can,
    ngu_hanh,
    dung_than
  };
}

module.exports = { buildBaZi };
