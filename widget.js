console.log("widget loaded");

try {
  const now = new Date();

  const lunar = convertSolar2Lunar(
    now.getDate(),
    now.getMonth()+1,
    now.getFullYear(),
    7
  );

  document.getElementById("solar").innerText =
    now.toLocaleDateString("vi-VN");

  document.getElementById("lunar").innerText =
    `Âm: ${lunar.day}/${lunar.month}/${lunar.year}`;

} catch (e) {
  document.body.innerHTML = "Lỗi: " + e;
}