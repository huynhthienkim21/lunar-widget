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

// ===== SINH KHẮC =====
const SINH = { "Mộc":"Hỏa","Hỏa":"Thổ","Thổ":"Kim","Kim":"Thủy","Thủy":"Mộc" };
const KHAC = { "Mộc":"Thổ","Thổ":"Thủy","Thủy":"Hỏa","Hỏa":"Kim","Kim":"Mộc" };

// ===== MÙA =====
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
    if(date >= new Date(tiet[i].time)) index = i;
  }

  const chiIndex = (index + 1) % 12;

  const year = getBaZiYear(date);
  const yearCan = (year+6)%10;

  const startCan = [2,4,6,8,0,2,4,6,8,0];
  const canIndex = (startCan[yearCan] + index) % 10;

  return { can: CAN[canIndex], chi: CHI[chiIndex] };
}

// ===== BUILD =====
function buildBaZi(dd, mm, yy, hour=0){

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

  return analyze(tru);
}

// ===== PHÂN TÍCH =====
function analyze(tru){

  const elements = { Mộc:0, Hỏa:0, Thổ:0, Kim:0, Thủy:0 };

  // ===== thiên can =====
  Object.values(tru).forEach(p=>{
    elements[ NGU_HANH[p.can] ] += 10;
  });

  // ===== ẩn can =====
  Object.values(tru).forEach(p=>{
    HIDDEN[p.chi].forEach(h=>{
      elements[ NGU_HANH[h] ] += 5;
    });
  });

  // ===== mùa =====
  const season = SEASON[tru.thang.chi];
  elements[season] += 15;

  const dayElement = NGU_HANH[tru.ngay.can];

  // ===== tính thân vượng / nhược =====
  let support = 0;
  let oppose = 0;

  Object.keys(elements).forEach(e=>{
    if(e === dayElement || SINH[e] === dayElement){
      support += elements[e];
    } else if(KHAC[e] === dayElement){
      oppose += elements[e];
    }
  });

  const strength = support - oppose;

  // ===== chọn dụng thần =====
  let dung_than;
  let hy_than;

  if(strength > 20){
    // quá mạnh → tiết
    dung_than = KHAC[dayElement];
    hy_than = SINH[KHAC[dayElement]];
  }
  else if(strength < -20){
    // quá yếu → sinh
    dung_than = SINH[dayElement];
    hy_than = SINH[dung_than];
  }
  else{
    // trung bình → cân bằng
    dung_than = SINH[dayElement];
    hy_than = KHAC[dayElement];
  }

  return {
    tru,
    score: elements,
    strength,
    dung_than,
    hy_than
  };
}

module.exports = { buildBaZi };
