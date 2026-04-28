const core = require('../core/lunar-core');

module.exports = (req,res)=>{
  try{
    const { day, month, year } = req.query;

    const lunar = core.convertSolar2Lunar(+day,+month,+year);

    res.json({ lunar });

  }catch(err){
    console.log(err);
    res.status(500).json({error:err.message});
  }
};
