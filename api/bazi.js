const core = require('../core/bazi-core');

module.exports = (req,res)=>{
  try{
    const { day, month, year, hour } = req.query;

    const data = core.buildBaZi(+day,+month,+year,+hour);

    res.json(data);

  }catch(err){
    console.log(err);
    res.status(500).json({error:err.message});
  }
};
