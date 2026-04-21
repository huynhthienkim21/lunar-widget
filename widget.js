fetch("./lunar-data.json")
  .then(r => r.json())
  .then(data => {

    const now = new Date();
    const key = now.toISOString().slice(0,10);

    const l = data[key];

    document.getElementById("solar").innerText =
      now.toLocaleDateString("vi-VN");

    if(l){
      document.getElementById("lunar").innerText =
        `Âm: ${l[0]}/${l[1]}/${l[2]}`;
    } else {
      document.getElementById("lunar").innerText =
        "Không có dữ liệu";
    }

  })
  .catch(() => {
    document.getElementById("lunar").innerText = "Lỗi load dataset";
  });
