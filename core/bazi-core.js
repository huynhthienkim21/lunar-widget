const {
  jdFromDate,
  getSunLongitude,
  getYearCanChi,
  getDayCanChi,
  getHourCanChi
} = require('./lunar-core.js');

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ===== NGŨ HÀNH =====
const NGU_HANH_CAN = {
  "Giáp":"Mộc","Ất":"Mộc",
  "Bính":"Hỏa","Đinh":"Hỏa",
  "Mậu":"Thổ","Kỷ":"Thổ",
  "Canh":"Kim","Tân":"Kim",
  "Nhâm":"Thủy","Quý":"Thủy"
};

// ===== ÂM DƯƠNG =====
const AM_DUONG = {
  "Giáp":"Dương","Bính":"Dương","Mậu":"Dương","Canh":"Dương","Nhâm":"Dương",
  "Ất":"Âm","Đinh":"Âm","Kỷ":"Âm","Tân":"Âm","Quý":"Âm"
};

// ===== THẬP THẦN (đơn giản hóa) =====
function getThapThan(dayCan, otherCan){
  if(dayCan === otherCan) return "Tỷ Kiên";

  const sameElement = NGU_HANH_CAN[dayCan] === NGU_HANH_CAN[otherCan];

  if(sameElement){
    return AM_DUONG[dayCan] === AM_DUONG[otherCan] ? "Tỷ Kiên" : "Kiếp Tài";
  }

  // sinh khắc cơ bản (rút gọn để dùng nhanh)
  return "Khác hành";
}

// ===== THÁNG CAN CHI (tiết khí) =====
function getMonthCanChi(dd, mm, yy, timeZone){
  const jd = jdFromDate(dd, mm, yy);
  const sunLong = getSunLongitude(jd, timeZone);

  const monthChiIndex = (sunLong + 2) % 12;

  const yearCanIndex = (yy + 6) % 10;
  const monthStartCan = [2,4,6,8,0,2,4,6,8,0];

  const monthCanIndex = (monthStartCan[yearCanIndex] + monthChiIndex) % 10;

  return {
    can: CAN[monthCanIndex],
    chi: CHI[monthChiIndex]
  };
}

// ===== TỨ TRỤ =====
function buildBaZi(dd, mm, yy, hour, minute, timeZone){
  // 🔥 FIX giờ Tý thuộc ngày trước
  let adjDay = dd, adjMonth = mm, adjYear = yy;
  if(hour >= 23 || hour < 1){
    const jd = jdFromDate(dd, mm, yy) - 1;
    const d = require('./lunar-core.js').jdToDate(jd);
    adjDay = d[0];
    adjMonth = d[1];
    adjYear = d[2];
  }

  // YEAR
  const yearCC = getYearCanChi(yy).split(" ");

  // MONTH
  const monthCC = getMonthCanChi(adjDay, adjMonth, adjYear, timeZone);

  // DAY
  const dayCC = getDayCanChi(adjDay, adjMonth, adjYear, hour).split(" ");

  // HOUR
  const hourCC = getHourCanChi(adjDay, adjMonth, adjYear, hour).split(" ");

  const dayCan = dayCC[0];

  return {
    tru: {
      nam: { can: yearCC[0], chi: yearCC[1] },
      thang: { can: monthCC.can, chi: monthCC.chi },
      ngay: { can: dayCC[0], chi: dayCC[1] },
      gio: { can: hourCC[0], chi: hourCC[1] }
    },

    ngu_hanh: {
      nam: NGU_HANH_CAN[yearCC[0]],
      thang: NGU_HANH_CAN[monthCC.can],
      ngay: NGU_HANH_CAN[dayCC[0]],
      gio: NGU_HANH_CAN[hourCC[0]]
    },

    thap_than: {
      nam: getThapThan(dayCan, yearCC[0]),
      thang: getThapThan(dayCan, monthCC.can),
      gio: getThapThan(dayCan, hourCC[0])
    }
  };
}

module.exports = {
  buildBaZi
};
