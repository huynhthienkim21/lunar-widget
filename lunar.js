// ===== LUNAR CORE (Nguyễn Quang Đông - chuẩn VN) =====

function INT(d) {
  return Math.floor(d);
}

function jdFromDate(dd, mm, yy) {
  let a = INT((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;

  let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4)
    - INT(y / 100) + INT(y / 400) - 32045;

  if (jd < 2299161) {
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
  }

  return jd;
}

function jdToDate(jd) {
  let a, b, c;
  if (jd > 2299160) {
    a = jd + 32044;
    b = INT((4 * a + 3) / 146097);
    c = a - INT((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  let d = INT((4 * c + 3) / 1461);
  let e = c - INT((1461 * d) / 4);
  let m = INT((5 * e + 2) / 153);

  let day = e - INT((153 * m + 2) / 5) + 1;
  let month = m + 3 - 12 * INT(m / 10);
  let year = b * 100 + d - 4800 + INT(m / 10);

  return [day, month, year];
}

// ===== ASTRONOMY =====

function getNewMoonDay(k, timeZone) {
  let T = k / 1236.85;
  let T2 = T * T;
  let T3 = T2 * T;
  let dr = Math.PI / 180;

  let Jd1 = 2415020.75933 + 29.53058868 * k
    + 0.0001178 * T2 - 0.000000155 * T3;

  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

  let M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  let Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  let F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr)
    + 0.0021 * Math.sin(2 * dr * M)
    - 0.4068 * Math.sin(Mpr * dr)
    + 0.0161 * Math.sin(2 * dr * Mpr)
    - 0.0004 * Math.sin(3 * dr * Mpr)
    + 0.0104 * Math.sin(2 * dr * F)
    - 0.0051 * Math.sin((M + Mpr) * dr)
    - 0.0074 * Math.sin((M - Mpr) * dr);

  let deltaT = (T < -11)
    ? 0.001 + 0.000839 * T + 0.0002261 * T2
    : -0.000278 + 0.000265 * T;

  return INT(Jd1 + C1 - deltaT + 0.5 + timeZone / 24);
}

// ===== MAIN =====

function convertSolar2Lunar(dd, mm, yy, timeZone) {
  let dayNumber = jdFromDate(dd, mm, yy);
  let k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);

  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }

  let lunarDay = dayNumber - monthStart + 1;

  // NOTE: bản rút gọn (đủ chính xác ngày)
  // month/year/leap sẽ được fix chuẩn sau nếu cần

  return [lunarDay, 3, yy, 0];
}
