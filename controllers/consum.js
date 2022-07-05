const Consumption = require('../models/Consumption.model');
const Type=require('../mdoels/TypeElec.model')

exports.findConsum = async () => { 
    try {
        const consums = await Consumption.find();
        const type = await Type.find();
        return consums, type;
        
    } catch (error) { 
        console.log('error a la hora de bucar el consumo y el tipo',error);

    }
}