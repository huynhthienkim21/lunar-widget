const {
  convertSolar2Lunar,
  convertLunar2Solar,
  getYearCanChi,
  getDayCanChi,
  getHourCanChi,
  getHourChi
} = require('../core/lunar-core.js');

function getNowVN(){
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
}

module.exports = (req, res) => {
  try {
    const { type, day, month, year, hour, minute, leap } = req.query;

    let dd = +day;
    let mm = +month;
    let yy = +year;

    if(!dd || !mm || !yy){
      const now = getNowVN();
      dd = now.getDate();
      mm = now.getMonth()+1;
      yy = now.getFullYear();
    }

    let hh = hour !== undefined ? +hour : getNowVN().getHours();
    let mi = minute !== undefined ? +minute : getNowVN().getMinutes();

    let solar, lunar;

    if(type === "lunar2solar"){
      const s = convertLunar2Solar(dd, mm, yy, +leap || 0, 7);
      solar = `${s[0]}/${s[1]}/${s[2]}`;
      lunar = `${dd}/${mm}/${yy}`;

      dd = s[0];
      mm = s[1];
      yy = s[2];
    } else {
      const l = convertSolar2Lunar(dd, mm, yy, 7);
      solar = `${dd}/${mm}/${yy}`;
      lunar = `${l[0]}/${l[1]}/${l[2]}`;
    }

    const yearCC = getYearCanChi(yy);
    const dayCC = getDayCanChi(dd, mm, yy, hh);
    const hourCC = getHourCanChi(dd, mm, yy, hh);
    const hourChi = getHourChi(hh);

    return res.json({
      solar,
      lunar,
      canchi: {
        year: yearCC,
        day: dayCC,
        hour: hourCC
      },
      hour: {
        time: `${String(hh).padStart(2,'0')}:${String(mi).padStart(2,'0')}`,
        chi: hourChi
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};
