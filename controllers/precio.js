const Price = require('../models/Price.model');



exports.findHours = async () => {
  try {
      const hours = await Price.find();
        console.log('estas son la horas',hours)
   
      return hours
    
  } catch (error) {
    console.log('error a la hora de bucar el consumo y el tipo Short', error);
  }
};


