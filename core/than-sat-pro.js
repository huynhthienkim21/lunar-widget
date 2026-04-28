const PRIORITY = {
  "Cát": 2,
  "Trung": 1,
  "Hung": 0
};

// ================= RULES =================
const RULES = [

// ===== 1. ĐÀO HOA =====
{
  name: "Đào Hoa",
  type: "Cát",
  weight: 2,
  check: t => {
    const map = { "Tý":"Dậu","Ngọ":"Mão","Mão":"Tý","Dậu":"Ngọ" };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 2. THIÊN ẤT =====
{
  name: "Thiên Ất Quý Nhân",
  type: "Cát",
  weight: 5,
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

// ===== 3. VĂN XƯƠNG =====
{
  name: "Văn Xương",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Tỵ","Ất":"Ngọ","Bính":"Thân","Đinh":"Dậu",
      "Mậu":"Thân","Kỷ":"Dậu","Canh":"Hợi","Tân":"Tý",
      "Nhâm":"Dần","Quý":"Mão"
    };
    return map[t.ngay.can] === t.ngay.chi;
  }
},

// ===== 4. HOA CÁI =====
{
  name: "Hoa Cái",
  type: "Trung",
  weight: 2,
  check: t => ["Thìn","Tuất","Sửu","Mùi"].includes(t.ngay.chi)
},

// ===== 5. THIÊN MÃ =====
{
  name: "Thiên Mã",
  type: "Cát",
  weight: 3,
  check: t => {
    const map = {
      "Dần":"Thân","Thân":"Dần",
      "Tỵ":"Hợi","Hợi":"Tỵ"
    };
    return map[t.nam.chi] === t.ngay.chi;
  }
},

// ===== 6. LỘC TỒN =====
{
  name: "Lộc Tồn",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Dần","Ất":"Mão","Bính":"Tỵ","Đinh":"Ngọ",
      "Mậu":"Tỵ","Kỷ":"Ngọ","Canh":"Thân","Tân":"Dậu",
      "Nhâm":"Hợi","Quý":"Tý"
    };
    return map[t.ngay.can] === t.ngay.chi;
  }
},

// ===== 7. KIẾP SÁT =====
{
  name: "Kiếp Sát",
  type: "Hung",
  weight: 4,
  check: t => t.ngay.can === "Canh"
},

// ===== 8. CÔ THẦN =====
{
  name: "Cô Thần",
  type: "Hung",
  weight: 3,
  check: t => ["Dần","Thân","Tỵ","Hợi"].includes(t.ngay.chi)
},

// ===== 9. QUẢ TÚ =====
{
  name: "Quả Tú",
  type: "Hung",
  weight: 3,
  check: (t) => {
  const groupMap = { ... };

  const quaTu = groupMap[t.nam.chi];

  return (
    quaTu === t.ngay.chi ||
    quaTu === t.gio.chi
  );
},

// ===== 10. THIÊN LA =====
{
  name: "Thiên La",
  type: "Hung",
  weight: 4,
  check: t => t.ngay.chi === "Tuất"
},

// ===== 11. ĐỊA VÕNG =====
{
  name: "Địa Võng",
  type: "Hung",
  weight: 4,
  check: t => t.ngay.chi === "Thìn"
},

// ===== 12. THIÊN HỶ =====
{
  name: "Thiên Hỷ",
  type: "Cát",
  weight: 3,
  check: t => {
    const map = {
      "Tý":"Dậu","Sửu":"Thân","Dần":"Mùi","Mão":"Ngọ",
      "Thìn":"Tỵ","Tỵ":"Thìn","Ngọ":"Mão","Mùi":"Dần",
      "Thân":"Sửu","Dậu":"Tý","Tuất":"Hợi","Hợi":"Tuất"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
}

// ===== 13. NGUYỆT ĐỨC =====
{
  name: "Nguyệt Đức",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Dần":"Nhâm","Mão":"Nhâm","Thìn":"Canh",
      "Tỵ":"Canh","Ngọ":"Bính","Mùi":"Bính",
      "Thân":"Giáp","Dậu":"Giáp","Tuất":"Nhâm",
      "Hợi":"Nhâm","Tý":"Canh","Sửu":"Canh"
    };
    return map[t.thang.chi] === t.ngay.can;
  }
},

// ===== 14. THIÊN ĐỨC =====
{
  name: "Thiên Đức",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Dần":"Giáp","Mão":"Giáp","Thìn":"Nhâm",
      "Tỵ":"Nhâm","Ngọ":"Bính","Mùi":"Bính",
      "Thân":"Canh","Dậu":"Canh","Tuất":"Giáp",
      "Hợi":"Giáp","Tý":"Nhâm","Sửu":"Nhâm"
    };
    return map[t.thang.chi] === t.ngay.can;
  }
},

// ===== 15. THIÊN ĐỨC HỢP =====
{
  name: "Thiên Đức Hợp",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Dần":"Đinh","Mão":"Đinh","Thìn":"Ất",
      "Tỵ":"Ất","Ngọ":"Tân","Mùi":"Tân",
      "Thân":"Kỷ","Dậu":"Kỷ","Tuất":"Đinh",
      "Hợi":"Đinh","Tý":"Ất","Sửu":"Ất"
    };
    return map[t.thang.chi] === t.ngay.can;
  }
},

// ===== 16. NGUYỆT ĐỨC HỢP =====
{
  name: "Nguyệt Đức Hợp",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Dần":"Tân","Mão":"Tân","Thìn":"Kỷ",
      "Tỵ":"Kỷ","Ngọ":"Quý","Mùi":"Quý",
      "Thân":"Đinh","Dậu":"Đinh","Tuất":"Tân",
      "Hợi":"Tân","Tý":"Kỷ","Sửu":"Kỷ"
    };
    return map[t.thang.chi] === t.ngay.can;
  }
},

// ===== 17. THIÊN QUAN QUÝ NHÂN =====
{
  name: "Thiên Quan Quý Nhân",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":["Mùi","Sửu"],
      "Ất":["Thân","Tỵ"],
      "Bính":["Dậu","Hợi"],
      "Đinh":["Tuất","Tỵ"],
      "Mậu":["Hợi","Dậu"],
      "Kỷ":["Tỵ","Thân"],
      "Canh":["Sửu","Mùi"],
      "Tân":["Dần","Ngọ"],
      "Nhâm":["Mão","Tỵ"],
      "Quý":["Thìn","Mão"]
    };
    return map[t.ngay.can]?.includes(t.gio.chi);
  }
},

// ===== 18. THIÊN PHÚC QUÝ NHÂN =====
{
  name: "Thiên Phúc Quý Nhân",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Dậu","Ất":"Thân","Bính":"Hợi","Đinh":"Tuất",
      "Mậu":"Tý","Kỷ":"Sửu","Canh":"Dần","Tân":"Mão",
      "Nhâm":"Thìn","Quý":"Tỵ"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 19. THIÊN TRÙ =====
{
  name: "Thiên Trù",
  type: "Cát",
  weight: 3,
  check: t => {
    const map = {
      "Giáp":"Tý","Ất":"Sửu","Bính":"Dần","Đinh":"Mão",
      "Mậu":"Thìn","Kỷ":"Tỵ","Canh":"Ngọ","Tân":"Mùi",
      "Nhâm":"Thân","Quý":"Dậu"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 20. HỒNG LOAN =====
{
  name: "Hồng Loan",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Mão","Sửu":"Dần","Dần":"Sửu","Mão":"Tý",
      "Thìn":"Hợi","Tỵ":"Tuất","Ngọ":"Dậu","Mùi":"Thân",
      "Thân":"Mùi","Dậu":"Ngọ","Tuất":"Tỵ","Hợi":"Thìn"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 21. VĂN KHÚC =====
{
  name: "Văn Khúc",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Tý","Ất":"Ngọ","Bính":"Mão","Đinh":"Dậu",
      "Mậu":"Thìn","Kỷ":"Tuất","Canh":"Sửu","Tân":"Mùi",
      "Nhâm":"Dần","Quý":"Thân"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 22. HỌC ĐƯỜNG =====
{
  name: "Học Đường",
  type: "Cát",
  weight: 3,
  check: t => {
    const map = {
      "Giáp":"Dần","Ất":"Mão","Bính":"Tỵ","Đinh":"Ngọ",
      "Mậu":"Thân","Kỷ":"Dậu","Canh":"Hợi","Tân":"Tý",
      "Nhâm":"Thìn","Quý":"Sửu"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 23. QUỐC ẤN =====
{
  name: "Quốc Ấn",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Giáp":"Tuất","Ất":"Hợi","Bính":"Sửu","Đinh":"Dần",
      "Mậu":"Thìn","Kỷ":"Tỵ","Canh":"Mùi","Tân":"Thân",
      "Nhâm":"Dậu","Quý":"Tuất"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 24. KIM QUỸ =====
{
  name: "Kim Quỹ",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Sửu","Sửu":"Tý","Dần":"Hợi","Mão":"Tuất",
      "Thìn":"Dậu","Tỵ":"Thân","Ngọ":"Mùi","Mùi":"Ngọ",
      "Thân":"Tỵ","Dậu":"Thìn","Tuất":"Mão","Hợi":"Dần"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
}

// ===== 25. THIÊN LỘC =====
{
  name: "Thiên Lộc",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Giáp":"Dần","Ất":"Mão","Bính":"Tỵ","Đinh":"Ngọ",
      "Mậu":"Tỵ","Kỷ":"Ngọ","Canh":"Thân","Tân":"Dậu",
      "Nhâm":"Hợi","Quý":"Tý"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 26. LONG ĐỨC =====
{
  name: "Long Đức",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Thân","Sửu":"Dậu","Dần":"Tuất","Mão":"Hợi",
      "Thìn":"Tý","Tỵ":"Sửu","Ngọ":"Dần","Mùi":"Mão",
      "Thân":"Thìn","Dậu":"Tỵ","Tuất":"Ngọ","Hợi":"Mùi"
    };
    return map[t.thang.chi] === t.ngay.chi;
  }
},

// ===== 27. GIẢI THẦN =====
{
  name: "Giải Thần",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Dậu","Sửu":"Thân","Dần":"Mùi","Mão":"Ngọ",
      "Thìn":"Tỵ","Tỵ":"Thìn","Ngọ":"Mão","Mùi":"Dần",
      "Thân":"Sửu","Dậu":"Tý","Tuất":"Hợi","Hợi":"Tuất"
    };
    return map[t.thang.chi] === t.ngay.chi;
  }
},

// ===== 28. THIÊN GIẢI =====
{
  name: "Thiên Giải",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Dần","Sửu":"Mão","Dần":"Thìn","Mão":"Tỵ",
      "Thìn":"Ngọ","Tỵ":"Mùi","Ngọ":"Thân","Mùi":"Dậu",
      "Thân":"Tuất","Dậu":"Hợi","Tuất":"Tý","Hợi":"Sửu"
    };
    return map[t.thang.chi] === t.ngay.chi;
  }
},

// ===== 29. ĐỊA GIẢI =====
{
  name: "Địa Giải",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.thang.chi] === t.ngay.chi;
  }
},

// ===== 30. THIÊN Y =====
{
  name: "Thiên Y",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Tý":"Sửu","Sửu":"Dần","Dần":"Mão","Mão":"Thìn",
      "Thìn":"Tỵ","Tỵ":"Ngọ","Ngọ":"Mùi","Mùi":"Thân",
      "Thân":"Dậu","Dậu":"Tuất","Tuất":"Hợi","Hợi":"Tý"
    };
    return map[t.thang.chi] === t.ngay.chi;
  }
},

// ===== 31. PHÚC ĐỨC =====
{
  name: "Phúc Đức",
  type: "Cát",
  weight: 5,
  check: t => t.thang.chi === t.ngay.chi
},

// ===== 32. THIÊN ÂN =====
{
  name: "Thiên Ân",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Dần","Sửu":"Mão","Dần":"Thìn","Mão":"Tỵ",
      "Thìn":"Ngọ","Tỵ":"Mùi","Ngọ":"Thân","Mùi":"Dậu",
      "Thân":"Tuất","Dậu":"Hợi","Tuất":"Tý","Hợi":"Sửu"
    };
    return map[t.thang.chi] === t.ngay.chi;
  }
},

// ===== 33. ĐỊA ÂN =====
{
  name: "Địa Ân",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.thang.chi] === t.ngay.chi;
  }
},

// ===== 34. TAM KỲ QUÝ NHÂN =====
{
  name: "Tam Kỳ Quý Nhân",
  type: "Cát",
  weight: 5,
  check: t => {
    const set = ["Giáp","Mậu","Canh"];
    return set.includes(t.nam.can) &&
           set.includes(t.thang.can) &&
           set.includes(t.ngay.can);
  }
},

// ===== 35. TỨ LINH =====
{
  name: "Tứ Linh",
  type: "Cát",
  weight: 5,
  check: t => {
    const set = ["Thìn","Tuất","Sửu","Mùi"];
    return set.includes(t.nam.chi) &&
           set.includes(t.thang.chi) &&
           set.includes(t.ngay.chi);
  }
},

// ===== 36. THIÊN XÁ =====
{
  name: "Thiên Xá",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Dần":"Mậu","Mão":"Mậu","Thìn":"Giáp",
      "Tỵ":"Giáp","Ngọ":"Nhâm","Mùi":"Nhâm",
      "Thân":"Canh","Dậu":"Canh","Tuất":"Mậu",
      "Hợi":"Mậu","Tý":"Giáp","Sửu":"Giáp"
    };
    return map[t.thang.chi] === t.ngay.can;
  }
}

// ===== 37. TAI SÁT =====
{
  name: "Tai Sát",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu",
      "Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu",
      "Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 38. THIÊN SÁT =====
{
  name: "Thiên Sát",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Tý":"Mùi","Sửu":"Thân","Dần":"Dậu","Mão":"Tuất",
      "Thìn":"Hợi","Tỵ":"Tý","Ngọ":"Sửu","Mùi":"Dần",
      "Thân":"Mão","Dậu":"Thìn","Tuất":"Tỵ","Hợi":"Ngọ"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 39. ĐỊA SÁT =====
{
  name: "Địa Sát",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Tý":"Thân","Sửu":"Dậu","Dần":"Tuất","Mão":"Hợi",
      "Thìn":"Tý","Tỵ":"Sửu","Ngọ":"Dần","Mùi":"Mão",
      "Thân":"Thìn","Dậu":"Tỵ","Tuất":"Ngọ","Hợi":"Mùi"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 40. TANG MÔN =====
{
  name: "Tang Môn",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Dần","Sửu":"Mão","Dần":"Thìn","Mão":"Tỵ",
      "Thìn":"Ngọ","Tỵ":"Mùi","Ngọ":"Thân","Mùi":"Dậu",
      "Thân":"Tuất","Dậu":"Hợi","Tuất":"Tý","Hợi":"Sửu"
    };
    return map[t.nam.chi] === t.ngay.chi;
  }
},

// ===== 41. ĐIẾU KHÁCH =====
{
  name: "Điếu Khách",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.nam.chi] === t.ngay.chi;
  }
},

// ===== 42. PHI NHẬN =====
{
  name: "Phi Nhận",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Mão","Sửu":"Thìn","Dần":"Tỵ","Mão":"Ngọ",
      "Thìn":"Mùi","Tỵ":"Thân","Ngọ":"Dậu","Mùi":"Tuất",
      "Thân":"Hợi","Dậu":"Tý","Tuất":"Sửu","Hợi":"Dần"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 43. HUYẾT NHẬN =====
{
  name: "Huyết Nhận",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Giáp":"Mão","Ất":"Thìn","Bính":"Ngọ","Đinh":"Mùi",
      "Mậu":"Ngọ","Kỷ":"Mùi","Canh":"Dậu","Tân":"Tuất",
      "Nhâm":"Tý","Quý":"Sửu"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 44. KIẾP PHÁ =====
{
  name: "Kiếp Phá",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu",
      "Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu",
      "Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 45. KHÔNG VONG =====
{
  name: "Không Vong",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Giáp":["Tuất","Hợi"],"Ất":["Tuất","Hợi"],
      "Bính":["Thân","Dậu"],"Đinh":["Thân","Dậu"],
      "Mậu":["Ngọ","Mùi"],"Kỷ":["Ngọ","Mùi"],
      "Canh":["Thìn","Tỵ"],"Tân":["Thìn","Tỵ"],
      "Nhâm":["Dần","Mão"],"Quý":["Dần","Mão"]
    };
    return map[t.ngay.can]?.includes(t.gio.chi);
  }
},

// ===== 46. TUẦN KHÔNG =====
{
  name: "Tuần Không",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Giáp-Tý":["Tuất","Hợi"],
      "Giáp-Tuất":["Thân","Dậu"],
      "Giáp-Thân":["Ngọ","Mùi"],
      "Giáp-Ngọ":["Thìn","Tỵ"],
      "Giáp-Thìn":["Dần","Mão"],
      "Giáp-Dần":["Tý","Sửu"]
    };
    const key = `${t.ngay.can}-${t.ngay.chi}`;
    return map[key]?.includes(t.gio.chi);
  }
},

// ===== 47. TRIỆT KHÔNG =====
{
  name: "Triệt Không",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Giáp":["Thân","Dậu"],
      "Ất":["Ngọ","Mùi"],
      "Bính":["Thìn","Tỵ"],
      "Đinh":["Dần","Mão"],
      "Mậu":["Tý","Sửu"],
      "Kỷ":["Tuất","Hợi"],
      "Canh":["Thân","Dậu"],
      "Tân":["Ngọ","Mùi"],
      "Nhâm":["Thìn","Tỵ"],
      "Quý":["Dần","Mão"]
    };
    return map[t.nam.can]?.includes(t.ngay.chi);
  }
},

// ===== 48. THIÊN KHÔNG =====
{
  name: "Thiên Không",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
}

// ===== 49. ĐỊA KHÔNG =====
{
  name: "Địa Không",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Thân","Sửu":"Dậu","Dần":"Tuất","Mão":"Hợi",
      "Thìn":"Tý","Tỵ":"Sửu","Ngọ":"Dần","Mùi":"Mão",
      "Thân":"Thìn","Dậu":"Tỵ","Tuất":"Ngọ","Hợi":"Mùi"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 50. ĐẠI HAO =====
{
  name: "Đại Hao",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu",
      "Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu",
      "Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"
    };
    return map[t.nam.chi] === t.ngay.chi;
  }
},

// ===== 51. TIỂU HAO =====
{
  name: "Tiểu Hao",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Tỵ","Sửu":"Ngọ","Dần":"Mùi","Mão":"Thân",
      "Thìn":"Dậu","Tỵ":"Tuất","Ngọ":"Hợi","Mùi":"Tý",
      "Thân":"Sửu","Dậu":"Dần","Tuất":"Mão","Hợi":"Thìn"
    };
    return map[t.nam.chi] === t.ngay.chi;
  }
},

// ===== 52. DỊCH MÃ =====
{
  name: "Dịch Mã",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Dần","Sửu":"Hợi","Dần":"Thân","Mão":"Tỵ",
      "Thìn":"Thân","Tỵ":"Hợi","Ngọ":"Dần","Mùi":"Tỵ",
      "Thân":"Dần","Dậu":"Hợi","Tuất":"Thân","Hợi":"Tỵ"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 53. CÔ LOAN =====
{
  name: "Cô Loan",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Mão","Sửu":"Tỵ","Dần":"Ngọ","Mão":"Dậu",
      "Thìn":"Tý","Tỵ":"Sửu","Ngọ":"Dần","Mùi":"Mão",
      "Thân":"Thìn","Dậu":"Tỵ","Tuất":"Ngọ","Hợi":"Mùi"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 54. QUẢ TÚ (THEO NĂM) =====
{
  name: "Quả Tú (Năm)",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.nam.chi] === t.ngay.chi;
  }
},

// ===== 55. ÂM DƯƠNG SAI LỆCH =====
{
  name: "Âm Dương Sai Lệch",
  type: "Trung",
  weight: 3,
  check: t => {
    const yang = ["Giáp","Bính","Mậu","Canh","Nhâm"];
    const isYangCan = yang.includes(t.ngay.can);

    const chiOrder = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
    const index = chiOrder.indexOf(t.ngay.chi);
    const isYangChi = index % 2 === 0;

    return (isYangCan && !isYangChi) || (!isYangCan && isYangChi);
  }
},

// ===== 56. THIÊN DIÊU =====
{
  name: "Thiên Diêu",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Dậu","Sửu":"Thân","Dần":"Mùi","Mão":"Ngọ",
      "Thìn":"Tỵ","Tỵ":"Thìn","Ngọ":"Mão","Mùi":"Dần",
      "Thân":"Sửu","Dậu":"Tý","Tuất":"Hợi","Hợi":"Tuất"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 57. THIÊN HÌNH =====
{
  name: "Thiên Hình",
  type: "Hung",
  weight: 5,
  check: t => {
    const map = {
      "Giáp":"Tỵ","Ất":"Ngọ","Bính":"Thân","Đinh":"Tuất",
      "Mậu":"Thân","Kỷ":"Tuất","Canh":"Tý","Tân":"Dần",
      "Nhâm":"Thìn","Quý":"Ngọ"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 58. THIÊN KHỐC =====
{
  name: "Thiên Khốc",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu",
      "Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu",
      "Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"
    };
    return map[t.nam.chi] === t.ngay.chi;
  }
},

// ===== 59. THIÊN HƯ =====
{
  name: "Thiên Hư",
  type: "Hung",
  weight: 4,
  check: t => {
    const map = {
      "Tý":"Tỵ","Sửu":"Ngọ","Dần":"Mùi","Mão":"Thân",
      "Thìn":"Dậu","Tỵ":"Tuất","Ngọ":"Hợi","Mùi":"Tý",
      "Thân":"Sửu","Dậu":"Dần","Tuất":"Mão","Hợi":"Thìn"
    };
    return map[t.nam.chi] === t.ngay.chi;
  }
},

// ===== 60. HUYỀN VŨ =====
{
  name: "Huyền Vũ",
  type: "Hung",
  weight: 3,
  check: t => ["Tý","Hợi"].includes(t.ngay.chi)
}

// ===== 61. KIM DƯ =====
{
  name: "Kim Dư",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Thìn","Ất":"Tỵ","Bính":"Ngọ","Đinh":"Mùi",
      "Mậu":"Thân","Kỷ":"Dậu","Canh":"Tuất","Tân":"Hợi",
      "Nhâm":"Tý","Quý":"Sửu"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 62. NGỌC ĐƯỜNG =====
{
  name: "Ngọc Đường",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Tý":"Dậu","Sửu":"Thân","Dần":"Mùi","Mão":"Ngọ",
      "Thìn":"Tỵ","Tỵ":"Thìn","Ngọ":"Mão","Mùi":"Dần",
      "Thân":"Sửu","Dậu":"Tý","Tuất":"Hợi","Hợi":"Tuất"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 63. THIÊN QUAN =====
{
  name: "Thiên Quan",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Mùi","Ất":"Thân","Bính":"Dậu","Đinh":"Tuất",
      "Mậu":"Hợi","Kỷ":"Tý","Canh":"Sửu","Tân":"Dần",
      "Nhâm":"Mão","Quý":"Thìn"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 64. ĐỊA QUAN =====
{
  name: "Địa Quan",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Sửu","Ất":"Tý","Bính":"Hợi","Đinh":"Dậu",
      "Mậu":"Dậu","Kỷ":"Hợi","Canh":"Mùi","Tân":"Thân",
      "Nhâm":"Tỵ","Quý":"Mão"
    };
    return map[t.ngay.can] === t.gio.chi;
  }
},

// ===== 65. THIÊN TÀI =====
{
  name: "Thiên Tài",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Mậu","Ất":"Kỷ","Bính":"Canh","Đinh":"Tân",
      "Mậu":"Nhâm","Kỷ":"Quý","Canh":"Giáp","Tân":"Ất",
      "Nhâm":"Bính","Quý":"Đinh"
    };
    return map[t.ngay.can] === t.gio.can;
  }
},

// ===== 66. THIÊN QUAN TINH =====
{
  name: "Thiên Quan Tinh",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Canh","Ất":"Tân","Bính":"Nhâm","Đinh":"Quý",
      "Mậu":"Giáp","Kỷ":"Ất","Canh":"Bính","Tân":"Đinh",
      "Nhâm":"Mậu","Quý":"Kỷ"
    };
    return map[t.ngay.can] === t.gio.can;
  }
},

// ===== 67. LỘC MÃ ĐỒNG HƯƠNG =====
{
  name: "Lộc Mã Đồng Hương",
  type: "Cát",
  weight: 5,
  check: t => {
    const loc = {
      "Giáp":"Dần","Ất":"Mão","Bính":"Tỵ","Đinh":"Ngọ",
      "Mậu":"Tỵ","Kỷ":"Ngọ","Canh":"Thân","Tân":"Dậu",
      "Nhâm":"Hợi","Quý":"Tý"
    };
    const ma = {
      "Tý":"Dần","Sửu":"Hợi","Dần":"Thân","Mão":"Tỵ",
      "Thìn":"Thân","Tỵ":"Hợi","Ngọ":"Dần","Mùi":"Tỵ",
      "Thân":"Dần","Dậu":"Hợi","Tuất":"Thân","Hợi":"Tỵ"
    };
    return loc[t.ngay.can] === t.gio.chi &&
           ma[t.ngay.chi] === t.gio.chi;
  }
},

// ===== 68. THIÊN NGUYỆT NHỊ ĐỨC =====
{
  name: "Thiên Nguyệt Nhị Đức",
  type: "Cát",
  weight: 5,
  check: t => {
    const thien = {
      "Dần":"Giáp","Mão":"Giáp","Thìn":"Nhâm",
      "Tỵ":"Nhâm","Ngọ":"Bính","Mùi":"Bính",
      "Thân":"Canh","Dậu":"Canh","Tuất":"Giáp",
      "Hợi":"Giáp","Tý":"Nhâm","Sửu":"Nhâm"
    };
    const nguyet = {
      "Dần":"Nhâm","Mão":"Nhâm","Thìn":"Canh",
      "Tỵ":"Canh","Ngọ":"Bính","Mùi":"Bính",
      "Thân":"Giáp","Dậu":"Giáp","Tuất":"Nhâm",
      "Hợi":"Nhâm","Tý":"Canh","Sửu":"Canh"
    };
    return thien[t.thang.chi] === t.ngay.can ||
           nguyet[t.thang.chi] === t.ngay.can;
  }
},

// ===== 69. THIÊN XÁ (BỔ SUNG CHECK CHÉO) =====
{
  name: "Thiên Xá (Tăng cường)",
  type: "Cát",
  weight: 4,
  check: t => {
    return t.thang.can === t.ngay.can;
  }
},

// ===== 70. NGUYỆT XÁ =====
{
  name: "Nguyệt Xá",
  type: "Cát",
  weight: 5,
  check: t => {
    const map = {
      "Dần":"Đinh","Mão":"Đinh","Thìn":"Ất",
      "Tỵ":"Ất","Ngọ":"Tân","Mùi":"Tân",
      "Thân":"Kỷ","Dậu":"Kỷ","Tuất":"Đinh",
      "Hợi":"Đinh","Tý":"Ất","Sửu":"Ất"
    };
    return map[t.thang.chi] === t.ngay.can;
  }
},

// ===== 71. THIÊN TÀI TINH =====
{
  name: "Thiên Tài Tinh",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":"Mậu","Ất":"Kỷ","Bính":"Canh","Đinh":"Tân",
      "Mậu":"Nhâm","Kỷ":"Quý","Canh":"Giáp","Tân":"Ất",
      "Nhâm":"Bính","Quý":"Đinh"
    };
    return map[t.ngay.can] === t.gio.can;
  }
},

// ===== 72. THIÊN QUAN QUÝ NHÂN (BỔ SUNG) =====
{
  name: "Thiên Quan Quý Nhân (Giờ)",
  type: "Cát",
  weight: 4,
  check: t => {
    const map = {
      "Giáp":["Mùi","Sửu"],"Ất":["Thân","Tỵ"],
      "Bính":["Dậu","Hợi"],"Đinh":["Tuất","Tỵ"],
      "Mậu":["Hợi","Dậu"],"Kỷ":["Tỵ","Thân"],
      "Canh":["Sửu","Mùi"],"Tân":["Dần","Ngọ"],
      "Nhâm":["Mão","Tỵ"],"Quý":["Thìn","Mão"]
    };
    return map[t.ngay.can]?.includes(t.gio.chi);
  }
},

// ===== 73. PHÚC TINH CAO CẤP =====
{
  name: "Phúc Tinh (Cao cấp)",
  type: "Cát",
  weight: 5,
  check: t => {
    return ["Giáp","Ất","Nhâm","Quý"].includes(t.ngay.can);
  }
},

// ===== 74. LỘC KHỐ =====
{
  name: "Lộc Khố",
  type: "Cát",
  weight: 4,
  check: t => {
    const kho = ["Thìn","Tuất","Sửu","Mùi"];
    return kho.includes(t.ngay.chi);
  }
},

// ===== 75. TÀI KHỐ =====
{
  name: "Tài Khố",
  type: "Cát",
  weight: 4,
  check: t => {
    return t.thang.chi === t.nam.chi;
  }
},

// ===== 76. QUÝ NHÂN TỔNG HỢP =====
{
  name: "Quý Nhân Tổng Hợp",
  type: "Cát",
  weight: 5,
  check: t => {
    return t.ngay.can === t.thang.can || t.ngay.can === t.nam.can;
  }
}
  
];

// ================= ENGINE =================
function getThanSatPro(tru){

  const result = [];

  for(const rule of RULES){
    try{
      if(rule.check(tru)){
        result.push({
          name: rule.name,
          type: rule.type,
          score: rule.weight * (rule.type === "Cát" ? 1 : -1)
        });
      }
    }catch{}
  }

  // sort theo:
  // 1. loại (Cát trước)
  // 2. score cao → thấp
  result.sort((a,b)=>{
    if(PRIORITY[b.type] !== PRIORITY[a.type]){
      return PRIORITY[b.type] - PRIORITY[a.type];
    }
    return b.score - a.score;
  });

  return result;
}

module.exports = { getThanSatPro };
