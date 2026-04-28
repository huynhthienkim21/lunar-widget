const RULES = [

  // ===== ĐÀO HOA =====
  {
    name: "Đào Hoa",
    check: t => {
      const map = { "Tý":"Dậu","Ngọ":"Mão","Mão":"Tý","Dậu":"Ngọ" };
      return map[t.ngay.chi] === t.gio.chi;
    }
  },

  // ===== HỒNG DIỄM =====
  {
    name: "Hồng Diễm",
    check: t => {
      const map = {
        "Giáp":"Dậu","Ất":"Thân","Bính":"Mùi","Đinh":"Ngọ",
        "Mậu":"Tỵ","Kỷ":"Thìn","Canh":"Mão","Tân":"Dần",
        "Nhâm":"Sửu","Quý":"Tý"
      };
      return map[t.ngay.can] === t.ngay.chi;
    }
  },

  // ===== THIÊN ẤT =====
  {
    name: "Thiên Ất Quý Nhân",
    check: t => {
      const map = {
        "Giáp":["Sửu","Mùi"],"Ất":["Tý","Thân"],
        "Bính":["Hợi","Dậu"],"Đinh":["Hợi","Dậu"],
        "Mậu":["Sửu","Mùi"],"Kỷ":["Tý","Thân"],
        "Canh":["Ngọ","Dần"],"Tân":["Ngọ","Dần"],
        "Nhâm":["Mão","Tỵ"],"Quý":["Mão","Tỵ"]
      };
      return map[t.ngay.can]?.includes(t.ngay.chi);
    }
  },

  // ===== VĂN XƯƠNG =====
  {
    name: "Văn Xương",
    check: t => {
      const map = {
        "Giáp":"Tỵ","Ất":"Ngọ","Bính":"Thân","Đinh":"Dậu",
        "Mậu":"Thân","Kỷ":"Dậu","Canh":"Hợi","Tân":"Tý",
        "Nhâm":"Dần","Quý":"Mão"
      };
      return map[t.ngay.can] === t.ngay.chi;
    }
  },

  // ===== HOA CÁI =====
  {
    name: "Hoa Cái",
    check: t => ["Thìn","Tuất","Sửu","Mùi"].includes(t.ngay.chi)
  },

  // ===== KIẾP SÁT =====
  {
    name: "Kiếp Sát",
    check: t => t.ngay.can === "Canh"
  },

  // ===== CÔ THẦN =====
  {
    name: "Cô Thần",
    check: t => ["Dần","Thân","Tỵ","Hợi"].includes(t.ngay.chi)
  },

  // ===== QUẢ TÚ =====
  {
    name: "Quả Tú",
    check: t => ["Tý","Ngọ","Mão","Dậu"].includes(t.ngay.chi)
  },

  // ===== THIÊN MÃ =====
  {
    name: "Thiên Mã",
    check: t => {
      const map = {
        "Dần":"Thân","Thân":"Dần",
        "Tỵ":"Hợi","Hợi":"Tỵ"
      };
      return map[t.nam.chi] === t.ngay.chi;
    }
  },

  // ===== TƯỚNG TINH =====
  {
    name: "Tướng Tinh",
    check: t => ["Tý","Ngọ","Mão","Dậu"].includes(t.nam.chi)
  },

  // ===== THIÊN HỶ =====
  {
    name: "Thiên Hỷ",
    check: t => t.thang.chi === "Dậu"
  },

  // ===== NGUYỆT ĐỨC =====
  {
    name: "Nguyệt Đức",
    check: t => t.thang.can === "Giáp"
  },

  // ===== THIÊN ĐỨC =====
  {
    name: "Thiên Đức",
    check: t => t.ngay.can === "Ất"
  },

  // ===== THIÊN LA =====
  {
    name: "Thiên La",
    check: t => t.ngay.chi === "Tuất"
  },

  // ===== ĐỊA VÕNG =====
  {
    name: "Địa Võng",
    check: t => t.ngay.chi === "Thìn"
  },

  // ===== PHỤ TINH =====
  {
    name: "Phúc Tinh",
    check: t => t.ngay.can === "Nhâm"
  },

  {
    name: "Lộc Tồn",
    check: t => {
      const map = {
        "Giáp":"Dần","Ất":"Mão","Bính":"Tỵ","Đinh":"Ngọ",
        "Mậu":"Tỵ","Kỷ":"Ngọ","Canh":"Thân","Tân":"Dậu",
        "Nhâm":"Hợi","Quý":"Tý"
      };
      return map[t.ngay.can] === t.ngay.chi;
    }
  }

];

// ===== ENGINE =====
function getThanSat(tru){
  return RULES
    .filter(r => {
      try { return r.check(tru); }
      catch { return false; }
    })
    .map(r => r.name);
}

module.exports = { getThanSat };
