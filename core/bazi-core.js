const { getTietKhi } = require('./dataset');
const {
  getYearCanChi,
  getDayCanChi,
  getHourCanChi
} = require('./lunar-core.js');

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ===== SAFE DATE =====
function buildDateVN(dd, mm, yy, hour=0, minute=0){
  return new Date(`${yy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}T${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:00+07:00`);
}

// ===== LẤY TIẾT KHÍ HIỆN TẠI =====
function getMonthCanChi(date){

  const { getTietKhi } = require('./dataset');

  // chỉ lấy "TIẾT"
  const TIET = [
    "Tiểu Hàn","Lập Xuân","Kinh Trập","Thanh Minh",
    "Lập Hạ","Mang Chủng","Tiểu Thử","Lập Thu",
    "Bạch Lộ","Hàn Lộ","Lập Đông","Đại Tuyết"
  ];

  // lọc danh sách tiết
  const tietOnly = tietkhi.filter(t => TIET.includes(t.name));

  let index = 0;

  for(let i=0;i<tietOnly.length;i++){
    if(date >= new Date(tietOnly[i].time)){
      index = i;
    }
  }

  // mapping tháng
  const monthChiIndex = (index + 1) % 12; // Dần = index 1

  const baziYear = getBaZiYear(date);
  const yearCanIndex = (baziYear + 6) % 10;

  const startCan = [2,4,6,8,0,2,4,6,8,0];
  const monthCanIndex = (startCan[yearCanIndex] + index) % 10;

  return {
    can: CAN[monthCanIndex],
    chi: CHI[monthChiIndex]
  };
}

// ===== XỬ LÝ NĂM BÁT TỰ (LẬP XUÂN) =====
function getBaZiYear(date){

  const tietkhi = getTietKhi();

  const lapXuan = tietkhi.find(t => t.name === "Lập Xuân");

  if(!lapXuan){
    return date.getFullYear(); // fallback
  }

  if(date < new Date(lapXuan.time)){
    return date.getFullYear() - 1;
  }

  return date.getFullYear();
}

// ===== THÁNG THEO TIẾT KHÍ =====
function getMonthCanChi(date){

  const index = getTietKhiIndex(date);

  // ❗ nếu chưa tới tiết khí đầu năm → coi là tháng 12 năm trước
  let monthIndex = Math.floor(index / 2);

  if(index < 0){
    monthIndex = 11;
  }

  const monthChiIndex = (monthIndex + 2) % 12;

  const baziYear = getBaZiYear(date);
  const yearCanIndex = (baziYear + 6) % 10;

  const startCan = [2,4,6,8,0,2,4,6,8,0];
  const monthCanIndex = (startCan[yearCanIndex] + monthIndex) % 10;

  return {
    can: CAN[monthCanIndex],
    chi: CHI[monthChiIndex]
  };
}

// ===== BUILD BÁT TỰ =====
function buildBaZi(dd, mm, yy, hour=0, minute=0){

  const date = buildDateVN(dd, mm, yy, hour, minute);

  // ===== NĂM =====
  const baziYear = getBaZiYear(date);
  const year = getYearCanChi(baziYear).split(" ");

  // ===== THÁNG =====
  const month = getMonthCanChi(date);

  // ===== NGÀY =====
  const day = getDayCanChi(dd, mm, yy, hour).split(" ");

  // ===== GIỜ =====
  const hourCC = getHourCanChi(dd, mm, yy, hour).split(" ");

  return {
    tru:{
      nam:{can:year[0],chi:year[1]},
      thang:{can:month.can,chi:month.chi},
      ngay:{can:day[0],chi:day[1]},
      gio:{can:hourCC[0],chi:hourCC[1]}
    }
  };
}

module.exports = {
  buildBaZi
};
