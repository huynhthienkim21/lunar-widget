const PRIORITY = {
  "Cát": 2,
  "Trung": 1,
  "Hung": 0
};

const RULES = [

{
  name: "Đào Hoa",
  type: "Cát",
  weight: 2,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = { "Tý":"Dậu","Ngọ":"Mão","Mão":"Tý","Dậu":"Ngọ" };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

{
  name: "Thiên Ất Quý Nhân",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["ngay"],
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

{
  name: "Văn Xương",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay"],
  check: t => {
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
  type: "Trung",
  weight: 2,
  element: null,
  target: ["ngay"],
  check: t => ["Thìn","Tuất","Sửu","Mùi"].includes(t.ngay.chi)
},

{
  name: "Thiên Mã",
  type: "Cát",
  weight: 3,
  element: null,
  target: ["nam","ngay"],
  check: t => {
    const map = {
      "Dần":"Thân","Thân":"Dần",
      "Tỵ":"Hợi","Hợi":"Tỵ"
    };
    return map[t.nam.chi] === t.ngay.chi;
  }
},

{
  name: "Lộc Tồn",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay"],
  check: t => {
    const map = {
      "Giáp":"Dần","Ất":"Mão","Bính":"Tỵ","Đinh":"Ngọ",
      "Mậu":"Tỵ","Kỷ":"Ngọ","Canh":"Thân","Tân":"Dậu",
      "Nhâm":"Hợi","Quý":"Tý"
    };
    return map[t.ngay.can] === t.ngay.chi;
  }
},

{
  name: "Kiếp Sát",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["ngay"],
  check: t => t.ngay.can === "Canh"
},

{
  name: "Cô Thần",
  type: "Hung",
  weight: 3,
  element: null,
  target: ["ngay"],
  check: t => ["Dần","Thân","Tỵ","Hợi"].includes(t.ngay.chi)
},

{
  name: "Quả Tú",
  type: "Hung",
  weight: 3,
  element: null,
  target: ["nam","ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.nam.chi] === t.ngay.chi ||
           map[t.nam.chi] === t.gio.chi;
  }
},

{
  name: "Thiên La",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["ngay"],
  check: t => t.ngay.chi === "Tuất"
},

{
  name: "Địa Võng",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["ngay"],
  check: t => t.ngay.chi === "Thìn"
},

{
  name: "Thiên Hỷ",
  type: "Cát",
  weight: 3,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Dậu","Sửu":"Thân","Dần":"Mùi","Mão":"Ngọ",
      "Thìn":"Tỵ","Tỵ":"Thìn","Ngọ":"Mão","Mùi":"Dần",
      "Thân":"Sửu","Dậu":"Tý","Tuất":"Hợi","Hợi":"Tuất"
    };
    return map[t.ngay.chi] === t.gio.chi;
  }
},

  {
  name: "Nguyệt Đức",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Dần":"Nhâm","Mão":"Nhâm","Thìn":"Canh",
      "Tỵ":"Canh","Ngọ":"Bính","Mùi":"Bính",
      "Thân":"Giáp","Dậu":"Giáp","Tuất":"Nhâm",
      "Hợi":"Nhâm","Tý":"Canh","Sửu":"Canh"
    };
    return map[t.thang?.chi] === t.ngay?.can;
  }
},

{
  name: "Thiên Đức",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Dần":"Giáp","Mão":"Giáp","Thìn":"Nhâm",
      "Tỵ":"Nhâm","Ngọ":"Bính","Mùi":"Bính",
      "Thân":"Canh","Dậu":"Canh","Tuất":"Giáp",
      "Hợi":"Giáp","Tý":"Nhâm","Sửu":"Nhâm"
    };
    return map[t.thang?.chi] === t.ngay?.can;
  }
},

{
  name: "Thiên Đức Hợp",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Dần":"Đinh","Mão":"Đinh","Thìn":"Ất",
      "Tỵ":"Ất","Ngọ":"Tân","Mùi":"Tân",
      "Thân":"Kỷ","Dậu":"Kỷ","Tuất":"Đinh",
      "Hợi":"Đinh","Tý":"Ất","Sửu":"Ất"
    };
    return map[t.thang?.chi] === t.ngay?.can;
  }
},

{
  name: "Nguyệt Đức Hợp",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Dần":"Tân","Mão":"Tân","Thìn":"Kỷ",
      "Tỵ":"Kỷ","Ngọ":"Quý","Mùi":"Quý",
      "Thân":"Đinh","Dậu":"Đinh","Tuất":"Tân",
      "Hợi":"Tân","Tý":"Kỷ","Sửu":"Kỷ"
    };
    return map[t.thang?.chi] === t.ngay?.can;
  }
},

{
  name: "Thiên Quan Quý Nhân",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
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
    return map[t.ngay?.can]?.includes(t.gio?.chi);
  }
},

{
  name: "Thiên Phúc Quý Nhân",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Dậu","Ất":"Thân","Bính":"Hợi","Đinh":"Tuất",
      "Mậu":"Tý","Kỷ":"Sửu","Canh":"Dần","Tân":"Mão",
      "Nhâm":"Thìn","Quý":"Tỵ"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Thiên Trù",
  type: "Cát",
  weight: 3,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Tý","Ất":"Sửu","Bính":"Dần","Đinh":"Mão",
      "Mậu":"Thìn","Kỷ":"Tỵ","Canh":"Ngọ","Tân":"Mùi",
      "Nhâm":"Thân","Quý":"Dậu"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Hồng Loan",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Mão","Sửu":"Dần","Dần":"Sửu","Mão":"Tý",
      "Thìn":"Hợi","Tỵ":"Tuất","Ngọ":"Dậu","Mùi":"Thân",
      "Thân":"Mùi","Dậu":"Ngọ","Tuất":"Tỵ","Hợi":"Thìn"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Văn Khúc",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Tý","Ất":"Ngọ","Bính":"Mão","Đinh":"Dậu",
      "Mậu":"Thìn","Kỷ":"Tuất","Canh":"Sửu","Tân":"Mùi",
      "Nhâm":"Dần","Quý":"Thân"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Học Đường",
  type: "Cát",
  weight: 3,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Dần","Ất":"Mão","Bính":"Tỵ","Đinh":"Ngọ",
      "Mậu":"Thân","Kỷ":"Dậu","Canh":"Hợi","Tân":"Tý",
      "Nhâm":"Thìn","Quý":"Sửu"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Quốc Ấn",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Tuất","Ất":"Hợi","Bính":"Sửu","Đinh":"Dần",
      "Mậu":"Thìn","Kỷ":"Tỵ","Canh":"Mùi","Tân":"Thân",
      "Nhâm":"Dậu","Quý":"Tuất"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Kim Quỹ",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Sửu","Sửu":"Tý","Dần":"Hợi","Mão":"Tuất",
      "Thìn":"Dậu","Tỵ":"Thân","Ngọ":"Mùi","Mùi":"Ngọ",
      "Thân":"Tỵ","Dậu":"Thìn","Tuất":"Mão","Hợi":"Dần"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Thiên Lộc",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Dần","Ất":"Mão","Bính":"Tỵ","Đinh":"Ngọ",
      "Mậu":"Tỵ","Kỷ":"Ngọ","Canh":"Thân","Tân":"Dậu",
      "Nhâm":"Hợi","Quý":"Tý"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Long Đức",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Tý":"Thân","Sửu":"Dậu","Dần":"Tuất","Mão":"Hợi",
      "Thìn":"Tý","Tỵ":"Sửu","Ngọ":"Dần","Mùi":"Mão",
      "Thân":"Thìn","Dậu":"Tỵ","Tuất":"Ngọ","Hợi":"Mùi"
    };
    return map[t.thang?.chi] === t.ngay?.chi;
  }
},

{
  name: "Giải Thần",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Tý":"Dậu","Sửu":"Thân","Dần":"Mùi","Mão":"Ngọ",
      "Thìn":"Tỵ","Tỵ":"Thìn","Ngọ":"Mão","Mùi":"Dần",
      "Thân":"Sửu","Dậu":"Tý","Tuất":"Hợi","Hợi":"Tuất"
    };
    return map[t.thang?.chi] === t.ngay?.chi;
  }
},

{
  name: "Thiên Giải",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Tý":"Dần","Sửu":"Mão","Dần":"Thìn","Mão":"Tỵ",
      "Thìn":"Ngọ","Tỵ":"Mùi","Ngọ":"Thân","Mùi":"Dậu",
      "Thân":"Tuất","Dậu":"Hợi","Tuất":"Tý","Hợi":"Sửu"
    };
    return map[t.thang?.chi] === t.ngay?.chi;
  }
},

{
  name: "Địa Giải",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.thang?.chi] === t.ngay?.chi;
  }
},

{
  name: "Thiên Y",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Tý":"Sửu","Sửu":"Dần","Dần":"Mão","Mão":"Thìn",
      "Thìn":"Tỵ","Tỵ":"Ngọ","Ngọ":"Mùi","Mùi":"Thân",
      "Thân":"Dậu","Dậu":"Tuất","Tuất":"Hợi","Hợi":"Tý"
    };
    return map[t.thang?.chi] === t.ngay?.chi;
  }
},

{
  name: "Phúc Đức",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["thang","ngay"],
  check: t => t.thang?.chi === t.ngay?.chi
},

{
  name: "Thiên Ân",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Tý":"Dần","Sửu":"Mão","Dần":"Thìn","Mão":"Tỵ",
      "Thìn":"Ngọ","Tỵ":"Mùi","Ngọ":"Thân","Mùi":"Dậu",
      "Thân":"Tuất","Dậu":"Hợi","Tuất":"Tý","Hợi":"Sửu"
    };
    return map[t.thang?.chi] === t.ngay?.chi;
  }
},

{
  name: "Địa Ân",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.thang?.chi] === t.ngay?.chi;
  }
},

{
  name: "Tam Kỳ Quý Nhân",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["nam","thang","ngay"],
  check: t => {
    const set = ["Giáp","Mậu","Canh"];
    return set.includes(t.nam?.can) &&
           set.includes(t.thang?.can) &&
           set.includes(t.ngay?.can);
  }
},

{
  name: "Tứ Linh",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["nam","thang","ngay"],
  check: t => {
    const set = ["Thìn","Tuất","Sửu","Mùi"];
    return set.includes(t.nam?.chi) &&
           set.includes(t.thang?.chi) &&
           set.includes(t.ngay?.chi);
  }
},

{
  name: "Thiên Xá",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Dần":"Mậu","Mão":"Mậu","Thìn":"Giáp",
      "Tỵ":"Giáp","Ngọ":"Nhâm","Mùi":"Nhâm",
      "Thân":"Canh","Dậu":"Canh","Tuất":"Mậu",
      "Hợi":"Mậu","Tý":"Giáp","Sửu":"Giáp"
    };
    return map[t.thang?.chi] === t.ngay?.can;
  }
},

{
  name: "Tai Sát",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu",
      "Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu",
      "Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Thiên Sát",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Mùi","Sửu":"Thân","Dần":"Dậu","Mão":"Tuất",
      "Thìn":"Hợi","Tỵ":"Tý","Ngọ":"Sửu","Mùi":"Dần",
      "Thân":"Mão","Dậu":"Thìn","Tuất":"Tỵ","Hợi":"Ngọ"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Địa Sát",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Thân","Sửu":"Dậu","Dần":"Tuất","Mão":"Hợi",
      "Thìn":"Tý","Tỵ":"Sửu","Ngọ":"Dần","Mùi":"Mão",
      "Thân":"Thìn","Dậu":"Tỵ","Tuất":"Ngọ","Hợi":"Mùi"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Tang Môn",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["nam","ngay"],
  check: t => {
    const map = {
      "Tý":"Dần","Sửu":"Mão","Dần":"Thìn","Mão":"Tỵ",
      "Thìn":"Ngọ","Tỵ":"Mùi","Ngọ":"Thân","Mùi":"Dậu",
      "Thân":"Tuất","Dậu":"Hợi","Tuất":"Tý","Hợi":"Sửu"
    };
    return map[t.nam?.chi] === t.ngay?.chi;
  }
},

{
  name: "Điếu Khách",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["nam","ngay"],
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.nam?.chi] === t.ngay?.chi;
  }
},

{
  name: "Phi Nhận",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Mão","Sửu":"Thìn","Dần":"Tỵ","Mão":"Ngọ",
      "Thìn":"Mùi","Tỵ":"Thân","Ngọ":"Dậu","Mùi":"Tuất",
      "Thân":"Hợi","Dậu":"Tý","Tuất":"Sửu","Hợi":"Dần"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Huyết Nhận",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Mão","Ất":"Thìn","Bính":"Ngọ","Đinh":"Mùi",
      "Mậu":"Ngọ","Kỷ":"Mùi","Canh":"Dậu","Tân":"Tuất",
      "Nhâm":"Tý","Quý":"Sửu"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Kiếp Phá",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu",
      "Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu",
      "Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Không Vong",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":["Tuất","Hợi"],"Ất":["Tuất","Hợi"],
      "Bính":["Thân","Dậu"],"Đinh":["Thân","Dậu"],
      "Mậu":["Ngọ","Mùi"],"Kỷ":["Ngọ","Mùi"],
      "Canh":["Thìn","Tỵ"],"Tân":["Thìn","Tỵ"],
      "Nhâm":["Dần","Mão"],"Quý":["Dần","Mão"]
    };
    return map[t.ngay?.can]?.includes(t.gio?.chi);
  }
},

{
  name: "Tuần Không",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp-Tý":["Tuất","Hợi"],
      "Giáp-Tuất":["Thân","Dậu"],
      "Giáp-Thân":["Ngọ","Mùi"],
      "Giáp-Ngọ":["Thìn","Tỵ"],
      "Giáp-Thìn":["Dần","Mão"],
      "Giáp-Dần":["Tý","Sửu"]
    };
    const key = `${t.ngay?.can}-${t.ngay?.chi}`;
    return map[key]?.includes(t.gio?.chi);
  }
},

{
  name: "Triệt Không",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["nam","ngay"],
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
    return map[t.nam?.can]?.includes(t.ngay?.chi);
  }
},

{
  name: "Thiên Không",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Địa Không",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Thân","Sửu":"Dậu","Dần":"Tuất","Mão":"Hợi",
      "Thìn":"Tý","Tỵ":"Sửu","Ngọ":"Dần","Mùi":"Mão",
      "Thân":"Thìn","Dậu":"Tỵ","Tuất":"Ngọ","Hợi":"Mùi"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Địa Không",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Thân","Sửu":"Dậu","Dần":"Tuất","Mão":"Hợi",
      "Thìn":"Tý","Tỵ":"Sửu","Ngọ":"Dần","Mùi":"Mão",
      "Thân":"Thìn","Dậu":"Tỵ","Tuất":"Ngọ","Hợi":"Mùi"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Đại Hao",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["nam","ngay"],
  check: t => {
    const map = {
      "Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu",
      "Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu",
      "Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"
    };
    return map[t.nam?.chi] === t.ngay?.chi;
  }
},

{
  name: "Tiểu Hao",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["nam","ngay"],
  check: t => {
    const map = {
      "Tý":"Tỵ","Sửu":"Ngọ","Dần":"Mùi","Mão":"Thân",
      "Thìn":"Dậu","Tỵ":"Tuất","Ngọ":"Hợi","Mùi":"Tý",
      "Thân":"Sửu","Dậu":"Dần","Tuất":"Mão","Hợi":"Thìn"
    };
    return map[t.nam?.chi] === t.ngay?.chi;
  }
},

{
  name: "Dịch Mã",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Dần","Sửu":"Hợi","Dần":"Thân","Mão":"Tỵ",
      "Thìn":"Thân","Tỵ":"Hợi","Ngọ":"Dần","Mùi":"Tỵ",
      "Thân":"Dần","Dậu":"Hợi","Tuất":"Thân","Hợi":"Tỵ"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Cô Loan",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Mão","Sửu":"Tỵ","Dần":"Ngọ","Mão":"Dậu",
      "Thìn":"Tý","Tỵ":"Sửu","Ngọ":"Dần","Mùi":"Mão",
      "Thân":"Thìn","Dậu":"Tỵ","Tuất":"Ngọ","Hợi":"Mùi"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Quả Tú (Năm)",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["nam","ngay"],
  check: t => {
    const map = {
      "Tý":"Tuất","Sửu":"Hợi","Dần":"Tý","Mão":"Sửu",
      "Thìn":"Dần","Tỵ":"Mão","Ngọ":"Thìn","Mùi":"Tỵ",
      "Thân":"Ngọ","Dậu":"Mùi","Tuất":"Thân","Hợi":"Dậu"
    };
    return map[t.nam?.chi] === t.ngay?.chi;
  }
},

{
  name: "Âm Dương Sai Lệch",
  type: "Trung",
  weight: 3,
  element: null,
  target: ["ngay"],
  check: t => {
    const yang = ["Giáp","Bính","Mậu","Canh","Nhâm"];
    const isYangCan = yang.includes(t.ngay?.can);

    const chiOrder = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
    const index = chiOrder.indexOf(t.ngay?.chi);
    const isYangChi = index % 2 === 0;

    return (isYangCan && !isYangChi) || (!isYangCan && isYangChi);
  }
},

{
  name: "Thiên Diêu",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Dậu","Sửu":"Thân","Dần":"Mùi","Mão":"Ngọ",
      "Thìn":"Tỵ","Tỵ":"Thìn","Ngọ":"Mão","Mùi":"Dần",
      "Thân":"Sửu","Dậu":"Tý","Tuất":"Hợi","Hợi":"Tuất"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Thiên Hình",
  type: "Hung",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Tỵ","Ất":"Ngọ","Bính":"Thân","Đinh":"Tuất",
      "Mậu":"Thân","Kỷ":"Tuất","Canh":"Tý","Tân":"Dần",
      "Nhâm":"Thìn","Quý":"Ngọ"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Thiên Khốc",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["nam","ngay"],
  check: t => {
    const map = {
      "Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu",
      "Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu",
      "Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"
    };
    return map[t.nam?.chi] === t.ngay?.chi;
  }
},

{
  name: "Thiên Hư",
  type: "Hung",
  weight: 4,
  element: null,
  target: ["nam","ngay"],
  check: t => {
    const map = {
      "Tý":"Tỵ","Sửu":"Ngọ","Dần":"Mùi","Mão":"Thân",
      "Thìn":"Dậu","Tỵ":"Tuất","Ngọ":"Hợi","Mùi":"Tý",
      "Thân":"Sửu","Dậu":"Dần","Tuất":"Mão","Hợi":"Thìn"
    };
    return map[t.nam?.chi] === t.ngay?.chi;
  }
},

{
  name: "Huyền Vũ",
  type: "Hung",
  weight: 3,
  element: "Thủy",
  target: ["ngay"],
  check: t => ["Tý","Hợi"].includes(t.ngay?.chi)
},

{
  name: "Kim Dư",
  type: "Cát",
  weight: 4,
  element: "Kim",
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Thìn","Ất":"Tỵ","Bính":"Ngọ","Đinh":"Mùi",
      "Mậu":"Thân","Kỷ":"Dậu","Canh":"Tuất","Tân":"Hợi",
      "Nhâm":"Tý","Quý":"Sửu"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Ngọc Đường",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Tý":"Dậu","Sửu":"Thân","Dần":"Mùi","Mão":"Ngọ",
      "Thìn":"Tỵ","Tỵ":"Thìn","Ngọ":"Mão","Mùi":"Dần",
      "Thân":"Sửu","Dậu":"Tý","Tuất":"Hợi","Hợi":"Tuất"
    };
    return map[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Thiên Quan",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Mùi","Ất":"Thân","Bính":"Dậu","Đinh":"Tuất",
      "Mậu":"Hợi","Kỷ":"Tý","Canh":"Sửu","Tân":"Dần",
      "Nhâm":"Mão","Quý":"Thìn"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Địa Quan",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Sửu","Ất":"Tý","Bính":"Hợi","Đinh":"Dậu",
      "Mậu":"Dậu","Kỷ":"Hợi","Canh":"Mùi","Tân":"Thân",
      "Nhâm":"Tỵ","Quý":"Mão"
    };
    return map[t.ngay?.can] === t.gio?.chi;
  }
},

{
  name: "Thiên Tài",
  type: "Cát",
  weight: 4,
  element: "Tài",
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Mậu","Ất":"Kỷ","Bính":"Canh","Đinh":"Tân",
      "Mậu":"Nhâm","Kỷ":"Quý","Canh":"Giáp","Tân":"Ất",
      "Nhâm":"Bính","Quý":"Đinh"
    };
    return map[t.ngay?.can] === t.gio?.can;
  }
},

{
  name: "Thiên Quan Tinh",
  type: "Cát",
  weight: 4,
  element: "Quan",
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Canh","Ất":"Tân","Bính":"Nhâm","Đinh":"Quý",
      "Mậu":"Giáp","Kỷ":"Ất","Canh":"Bính","Tân":"Đinh",
      "Nhâm":"Mậu","Quý":"Kỷ"
    };
    return map[t.ngay?.can] === t.gio?.can;
  }
},

{
  name: "Lộc Mã Đồng Hương",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["ngay","gio"],
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
    return loc[t.ngay?.can] === t.gio?.chi &&
           ma[t.ngay?.chi] === t.gio?.chi;
  }
},

{
  name: "Thiên Nguyệt Nhị Đức",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["thang","ngay"],
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
    return thien[t.thang?.chi] === t.ngay?.can ||
           nguyet[t.thang?.chi] === t.ngay?.can;
  }
},

{
  name: "Thiên Xá (Tăng cường)",
  type: "Cát",
  weight: 4,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    return t.thang?.can === t.ngay?.can;
  }
},

{
  name: "Nguyệt Xá",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["thang","ngay"],
  check: t => {
    const map = {
      "Dần":"Đinh","Mão":"Đinh","Thìn":"Ất",
      "Tỵ":"Ất","Ngọ":"Tân","Mùi":"Tân",
      "Thân":"Kỷ","Dậu":"Kỷ","Tuất":"Đinh",
      "Hợi":"Đinh","Tý":"Ất","Sửu":"Ất"
    };
    return map[t.thang?.chi] === t.ngay?.can;
  }
},

{
  name: "Thiên Tài Tinh",
  type: "Cát",
  weight: 4,
  element: "Tài",
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":"Mậu","Ất":"Kỷ","Bính":"Canh","Đinh":"Tân",
      "Mậu":"Nhâm","Kỷ":"Quý","Canh":"Giáp","Tân":"Ất",
      "Nhâm":"Bính","Quý":"Đinh"
    };
    return map[t.ngay?.can] === t.gio?.can;
  }
},

{
  name: "Thiên Quan Quý Nhân (Giờ)",
  type: "Cát",
  weight: 4,
  element: "Quan",
  target: ["ngay","gio"],
  check: t => {
    const map = {
      "Giáp":["Mùi","Sửu"],"Ất":["Thân","Tỵ"],
      "Bính":["Dậu","Hợi"],"Đinh":["Tuất","Tỵ"],
      "Mậu":["Hợi","Dậu"],"Kỷ":["Tỵ","Thân"],
      "Canh":["Sửu","Mùi"],"Tân":["Dần","Ngọ"],
      "Nhâm":["Mão","Tỵ"],"Quý":["Thìn","Mão"]
    };
    return map[t.ngay?.can]?.includes(t.gio?.chi);
  }
},

{
  name: "Phúc Tinh (Cao cấp)",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["ngay"],
  check: t => {
    return ["Giáp","Ất","Nhâm","Quý"].includes(t.ngay?.can);
  }
},

{
  name: "Lộc Khố",
  type: "Cát",
  weight: 4,
  element: "Thổ",
  target: ["ngay"],
  check: t => {
    return ["Thìn","Tuất","Sửu","Mùi"].includes(t.ngay?.chi);
  }
},

{
  name: "Tài Khố",
  type: "Cát",
  weight: 4,
  element: "Tài",
  target: ["nam","thang"],
  check: t => {
    return t.thang?.chi === t.nam?.chi;
  }
},

{
  name: "Quý Nhân Tổng Hợp",
  type: "Cát",
  weight: 5,
  element: null,
  target: ["nam","thang","ngay"],
  check: t => {
    return t.ngay?.can === t.thang?.can ||
           t.ngay?.can === t.nam?.can;
  }
}

// ================= ENGINE =================

function getThanSatPro(tru){

  const result = [];

  for(const rule of RULES){
    try{
      if(rule.check(tru)){
        result.push({
          name: rule.name,
          type: rule.type,
          score: rule.weight * (
            rule.type === "Cát" ? 1 :
            rule.type === "Hung" ? -1 : 0
          )
        });
      }
    }catch(e){
      // tránh crash nếu rule lỗi
    }
  }

  // sort:
  // 1. loại (Cát > Trung > Hung)
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
