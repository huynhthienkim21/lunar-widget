const { getTietKhi } = require('./dataset');
const {
  getYearCanChi,
  getDayCanChi,
  getHourCanChi
} = require('./lunar-core');

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ================= NGŨ HÀNH =================
const NGU_HANH = {
  "Giáp":"Mộc","Ất":"Mộc",
  "Bính":"Hỏa","Đinh":"Hỏa",
  "Mậu":"Thổ","Kỷ":"Thổ",
  "Canh":"Kim","Tân":"Kim",
  "Nhâm":"Thủy","Quý":"Thủy"
};

// ================= ẨN CAN =================
const HIDDEN = {
  "Tý":["Quý"],"Sửu":["Kỷ","Quý","Tân"],"Dần":["Giáp","Bính","Mậu"],
  "Mão":["Ất"],"Thìn":["Mậu","Ất","Quý"],"Tỵ":["Bính","Mậu","Canh"],
  "Ngọ":["Đinh","Kỷ"],"Mùi":["Kỷ","Đinh","Ất"],"Thân":["Canh","Nhâm","Mậu"],
  "Dậu":["Tân"],"Tuất":["Mậu","Tân","Đinh"],"Hợi":["Nhâm","Giáp"]
};

// ================= ÂM DƯƠNG =================
const AM_DUONG = {
  "Giáp":1,"Bính":1,"Mậu":1,"Canh":1,"Nhâm":1,
  "Ất":0,"Đinh":0,"Kỷ":0,"Tân":0,"Quý":0
};

// ================= SINH KHẮC =================
const SINH = { "Mộc":"Hỏa","Hỏa":"Thổ","Thổ":"Kim","Kim":"Thủy","Thủy":"Mộc" };
const KHAC = { "Mộc":"Thổ","Thổ":"Thủy","Thủy":"Hỏa","Hỏa":"Kim","Kim":"Mộc" };

// ================= TRƯỜNG SINH =================
const TRUONG_SINH = {
  "Mộc":["Hợi","Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất"],
  "Hỏa":["Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi","Tý","Sửu"],
  "Thổ":["Thân","Dậu","Tuất","Hợi","Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi"],
  "Kim":["Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi","Tý","Sửu","Dần","Mão","Thìn"],
  "Thủy":["Thân","Dậu","Tuất","Hợi","Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi"]
};

// ================= THẬP THẦN =================
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

// ================= VƯỢNG SUY =================
function getVuongSuy(can, chi){
  const hanh = NGU_HANH[can];
  const list = TRUONG_SINH[hanh];
  return list.indexOf(chi); // 0–11
}

// ================= TIẾT KHÍ → THÁNG =================
function getMonthCanChi(date){

  const tk = getTietKhi(date.getFullYear());

  const TIET = [
    "Lập Xuân","Kinh Trập","Thanh Minh","Lập Hạ",
    "Mang Chủng","Tiểu Thử","Lập Thu","Bạch Lộ",
    "Hàn Lộ","Lập Đông","Đại Tuyết","Tiểu Hàn"
  ];

  const tiet = tk.filter(t => TIET.includes(t.name));

  let index = 0;
  for(let i=0;i<tiet.length;i++){
    if(date >= new Date(tiet[i].time)) index = i;
  }

  const chiIndex = (index + 2) % 12;

  const yearCanIndex = (date.getFullYear()+6)%10;
  const startCan = [2,4,6,8,0,2,4,6,8,0];
  const canIndex = (startCan[yearCanIndex] + index) % 10;

  return { can: CAN[canIndex], chi: CHI[chiIndex] };
}

// ================= ĐẠI VẬN =================
function isForward(yearCan, gender){
  const isYang = AM_DUONG[yearCan];
  return (gender === "male" && isYang) || (gender === "female" && !isYang);
}

function getStartAge(birthDate, tietKhiList, forward){

  let target;

  if(forward){
    target = tietKhiList.find(t => new Date(t.time) > birthDate);
  }else{
    const reversed = [...tietKhiList].reverse();
    target = reversed.find(t => new Date(t.time) < birthDate);
  }

  if(!target) return 0;

  const diffDays = Math.abs(
    (new Date(target.time) - birthDate) / (1000*60*60*24)
  );

  return +(diffDays / 3).toFixed(1);
}

function getDaiVan(tru, birthDate, gender){

  const tk = getTietKhi(birthDate.getFullYear());
  const forward = isForward(tru.nam.can, gender);
  const startAge = getStartAge(birthDate, tk, forward);

  const startCanIndex = CAN.indexOf(tru.thang.can);
  const startChiIndex = CHI.indexOf(tru.thang.chi);

  const result = [];

  for(let i=1;i<=8;i++){
    const step = forward ? i : -i;

    result.push({
      age: +(startAge + (i-1)*10).toFixed(1),
      can: CAN[(startCanIndex + step + 10)%10],
      chi: CHI[(startChiIndex + step + 12)%12]
    });
  }

  return result;
}

// ================= LƯU NIÊN =================
function getLuuNien(year){
  return Array.from({length:10}, (_,i)=>year+i);
}

// ================= THẦN SÁT =================
const THAN_SAT_RULES = [

  {
    name: "Đào Hoa",
    check: (t) => {
      const map = { "Tý":"Dậu","Ngọ":"Mão","Mão":"Tý","Dậu":"Ngọ" };
      return map[t.ngay.chi] === t.gio.chi;
    }
  },

  {
    name: "Thiên Ất Quý Nhân",
    check: (t) => {
      const map = {
        "Giáp":["Sửu","Mùi"],
        "Ất":["Tý","Thân"],
        "Bính":["Hợi","Dậu"],
        "Đinh":["Hợi","Dậu"],
        "Mậu":["Sửu","Mùi"],
        "Kỷ":["Tý","Thân"],
        "Canh":["Ngọ","Dần"],
        "Tân":["Ngọ","Dần"],
        "Nhâm":["Mão","Tỵ"],
        "Quý":["Mão","Tỵ"]
      };
      return map[t.ngay.can]?.includes(t.ngay.chi);
    }
  },

  {
    name: "Văn Xương",
    check: (t) => {
      const map = {
        "Giáp":"Tỵ","Ất":"Ngọ","Bính":"Thân","Đinh":"Dậu",
        "Mậu":"Thân","Kỷ":"Dậu","Canh":"Hợi","Tân":"Tý",
        "Nhâm":"Dần","Quý":"Mão"
      };
      return map[t.ngay.can] === t.ngay.chi;
    }
  },

  {
    name: "Hoa Cái",
    check: (t) => ["Thìn","Tuất","Sửu","Mùi"].includes(t.ngay.chi)
  }

];

function getThanSat(tru){
  return THAN_SAT_RULES
    .filter(r => r.check(tru))
    .map(r => r.name);
}

// ================= BUILD =================
function buildBaZi(dd, mm, yy, hour=0, gender="male"){

  const date = new Date(`${yy}-${mm}-${dd}T${hour}:00:00+07:00`);

  const yearRaw = getYearCanChi(yy).split(" ");
  const dayRaw = getDayCanChi(dd, mm, yy).split(" ");
  const hourRaw = getHourCanChi(dd, mm, yy, hour).split(" ");
  const month = getMonthCanChi(date);

  const tru = {
    nam:{can:yearRaw[0],chi:yearRaw[1]},
    thang:month,
    ngay:{can:dayRaw[0],chi:dayRaw[1]},
    gio:{can:hourRaw[0],chi:hourRaw[1]}
  };

  return {
    tru,
    an_can: {
      nam: HIDDEN[tru.nam.chi],
      thang: HIDDEN[tru.thang.chi],
      ngay: HIDDEN[tru.ngay.chi],
      gio: HIDDEN[tru.gio.chi]
    },
    thap_than: {
      nam: getThapThan(tru.ngay.can, tru.nam.can),
      thang: getThapThan(tru.ngay.can, tru.thang.can),
      gio: getThapThan(tru.ngay.can, tru.gio.can)
    },
    vuong_suy: {
      nam: getVuongSuy(tru.ngay.can, tru.nam.chi),
      thang: getVuongSuy(tru.ngay.can, tru.thang.chi),
      ngay: getVuongSuy(tru.ngay.can, tru.ngay.chi),
      gio: getVuongSuy(tru.ngay.can, tru.gio.chi)
    },
    than_sat: getThanSat(tru),
    dai_van: getDaiVan(tru, date, gender),
    luu_nien: getLuuNien(yy)
  };
}

module.exports = { buildBaZi };
