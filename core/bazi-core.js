const { getTietKhi } = require('./dataset');
const {
  getYearCanChi,
  getDayCanChi,
  getHourCanChi
} = require('./lunar-core');

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// ===== YEAR (LẬP XUÂN) =====
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

// ===== BUILD =====
function buildBaZi(dd, mm, yy, hour=0){

  const date = new Date(`${yy}-${mm}-${dd}T${hour}:00:00+07:00`);

  const yearRaw = getYearCanChi(getBaZiYear(date));
  const dayRaw = getDayCanChi(dd, mm, yy);
  const hourRaw = getHourCanChi(dd, mm, yy, hour);

  if(!yearRaw || !dayRaw || !hourRaw){
    throw new Error("CanChi null");
  }

  const year = yearRaw.split(" ");
  const day = dayRaw.split(" ");
  const hourCC = hourRaw.split(" ");
  const month = getMonthCanChi(date);

  return {
    tru:{
      nam:{can:year[0],chi:year[1]},
      thang:month,
      ngay:{can:day[0],chi:day[1]},
      gio:{can:hourCC[0],chi:hourCC[1]}
    }
  };
}

module.exports = { buildBaZi };
