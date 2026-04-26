const { buildBaZi } = require('../core/bazi-core.js');

module.exports = (req, res) => {
  try{
    const { day, month, year, hour, minute } = req.query;

    const data = buildBaZi(
      +day,
      +month,
      +year,
      +hour || 0,
      +minute || 0,
      7
    );

    res.json(data);

  }catch(e){
    res.status(500).json({error:e.message});
  }
};
