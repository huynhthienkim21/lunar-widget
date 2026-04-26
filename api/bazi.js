const { buildBaZi } = require('../core/bazi-core.js');

module.exports = (req, res) => {
  try {
    const { day, month, year, hour, minute } = req.query;

    const dd = +day;
    const mm = +month;
    const yy = +year;
    const hh = +hour || 0;
    const mi = +minute || 0;

    const data = buildBaZi(dd, mm, yy, hh, mi, 7);

    return res.json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
