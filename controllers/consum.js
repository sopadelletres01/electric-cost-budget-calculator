const Consumption = require('../models/Consumption.model');
const Type = require('../models/Type.model');

exports.findConsumAndTypeS = async () => {
  try {
    const consums = await Consumption.find();
    const type = await Type.find({longDuration:false});
    return {
      consums,
      type,
    };
  } catch (error) {
    console.log('error a la hora de bucar el consumo y el tipo Short', error);
  }
};

exports.findConsumAndTypeL = async () => {
    try {
      const consums = await Consumption.find();
        const type = await Type.find({longDuration: true});
  
      return {
        consums,
        type,
      };
    } catch (error) {
      console.log('error a la hora de bucar el consumo y el tipo Long', error);
    }
  };
