const {
  jdFromDate,
  getSunLongitudeDegree
} = require('./astro-core.js');

const {
  getYearCanChi,
  getDayCanChi,
  getHourCanChi,
  CAN,
  CHI
} = require('./lunar-core.js');

// ===== NGŨ HÀNH =====
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

// ===== THÁNG THEO TIẾT KHÍ (CHUẨN) =====
function getMonthCanChi(dd, mm, yy){

 let jd = jdFromDate(dd, mm, yy);

// shift timezone VN
jd = jd - 0.5 + 7/24;
jd = Math.floor(jd);

  // 🌞 độ mặt trời 0–360
  const deg = getSunLongitudeDegree(jd, 7);

  // 24 tiết khí (mỗi 15 độ)
  const tiet = Math.floor(deg / 15);

  // chia thành 12 tháng
  const monthIndex = Math.floor((tiet + 1)/2) % 12;

  // Dần = tháng 1
  const monthChiIndex = (monthIndex + 2) % 12;

  // Can tháng phụ thuộc can năm
  const yearCanIndex = (yy + 6) % 10;

  const startCan = [0,2,4,6,8,0,2,4,6,8];

  const monthCanIndex = (startCan[yearCanIndex] + monthIndex) % 10;

  return {
    can: CAN[monthCanIndex],
    chi: CHI[monthChiIndex]
  };
}

// ===== DỤNG THẦN (CƠ BẢN NHƯNG DÙNG ĐƯỢC) =====
function getDungThan(dayCan){

  const hanh = NGU_HANH[dayCan];

  const map = {
    "Mộc":"Thủy",
    "Hỏa":"Mộc",
    "Thổ":"Hỏa",
    "Kim":"Thổ",
    "Thủy":"Kim"
  };

  return map[hanh];
}

// ===== BUILD FULL BÁT TỰ =====
function buildBaZi(dd, mm, yy, hour = 0, minute = 0){

  // ===== TRỤ =====
  const year = getYearCanChi(yy).split(" ");
  const month = getMonthCanChi(dd, mm, yy);
  const day = getDayCanChi(dd, mm, yy, hour).split(" ");
  const hourCC = getHourCanChi(dd, mm, yy, hour).split(" ");

  return {

    // ===== TỨ TRỤ =====
    tru:{
      nam:{can:year[0],chi:year[1]},
      thang:{can:month.can,chi:month.chi},
      ngay:{can:day[0],chi:day[1]},
      gio:{can:hourCC[0],chi:hourCC[1]}
    },

    // ===== ẨN CAN =====
    an_can:{
      nam:HIDDEN[year[1]],
      thang:HIDDEN[month.chi],
      ngay:HIDDEN[day[1]],
      gio:HIDDEN[hourCC[1]]
    },

    // ===== NGŨ HÀNH =====
    ngu_hanh:{
      nam:NGU_HANH[year[0]],
      thang:NGU_HANH[month.can],
      ngay:NGU_HANH[day[0]],
      gio:NGU_HANH[hourCC[0]]
    },

    // ===== DỤNG THẦN =====
    dung_than:getDungThan(day[0])
  };
}

module.exports = {
  buildBaZi
};
