const Consumption = require('../models/Consumption.model');
const Type = require('../models/Type.model');
const Appliance = require('../models/Appliance.model')

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
        const type = await Type.find({ longDuration: true });
        console.log('esto son los tipos',type)
      return {
        consums,
        type,
      };
    } catch (error) {
      console.log('error a la hora de bucar el consumo y el tipo Long', error);
    }
};
exports.findTypesS = async () => { 
  try {
    const typeShort = await Type.find({ longDuration: false })
    console.log('tipos de corto Uso', typeShort)
    return typeShort
  } catch (error) {
    console.log('error de consulta solamente de tipos',error)
  }
}
exports.findApplianceS = async (userId) => { 
  try {
    
    const myAppliances = await Appliance.find({ userId: userId, longDuration:false }).populate("type")
    console.log('mis electrodomesticos', myAppliances)
    return myAppliances
    
  } catch (error) {

    console.log('error de consulta', error)
  }


}