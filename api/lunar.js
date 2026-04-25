const { convertSolar2Lunar, convertLunar2Solar } = require('../core/lunar-core');

module.exports = (req, res) => {
  const { type, day, month, year, leap } = req.query;

  if(type === "solar2lunar"){
    const r = convertSolar2Lunar(+day, +month, +year, 7);
    return res.json({
      lunarDay: r[0],
      lunarMonth: r[1],
      lunarYear: r[2],
      lunarLeap: r[3]
    });
  }

  if(type === "lunar2solar"){
    const r = convertLunar2Solar(+day, +month, +year, +leap || 0, 7);
    return res.json({
      day: r[0],
      month: r[1],
      year: r[2]
    });
  }

  return res.status(400).json({ error: "invalid type" });
};
