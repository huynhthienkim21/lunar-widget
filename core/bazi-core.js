const {
  jdFromDate,
  getSunLongitude,
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

// ===== THÁNG (TIẾT KHÍ) =====
function getMonthCanChi(dd, mm, yy, tz){
  const jd = jdFromDate(dd, mm, yy);
  const sl = getSunLongitude(jd, tz);

  const monthIndex = Math.floor((sl + 1)/2)%12;
  const monthChiIndex = (monthIndex + 2)%12;

  const yearCanIndex = (yy+6)%10;
  const startCan = [2,4,6,8,0,2,4,6,8,0];
  const monthCanIndex = (startCan[yearCanIndex] + monthIndex)%10;

  return {
    can: CAN[monthCanIndex],
    chi: CHI[monthChiIndex]
  };
}

// ===== DỤNG THẦN (đơn giản) =====
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

// ===== BUILD =====
function buildBaZi(dd, mm, yy, hour, minute, tz){

  const year = getYearCanChi(yy).split(" ");
  const month = getMonthCanChi(dd, mm, yy, tz);
  const day = getDayCanChi(dd, mm, yy, hour).split(" ");
  const hourCC = getHourCanChi(dd, mm, yy, hour).split(" ");

  return {
    tru:{
      nam:{can:year[0],chi:year[1]},
      thang:{can:month.can,chi:month.chi},
      ngay:{can:day[0],chi:day[1]},
      gio:{can:hourCC[0],chi:hourCC[1]}
    },

    an_can:{
      nam:HIDDEN[year[1]],
      thang:HIDDEN[month.chi],
      ngay:HIDDEN[day[1]],
      gio:HIDDEN[hourCC[1]]
    },

    ngu_hanh:{
      nam:NGU_HANH[year[0]],
      thang:NGU_HANH[month.can],
      ngay:NGU_HANH[day[0]],
      gio:NGU_HANH[hourCC[0]]
    },

    dung_than:getDungThan(day[0])
  };
}

module.exports = {
  buildBaZi
};
