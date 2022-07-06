require('dotenv/config');

const prices = await ;

const Consumption = require('../models/Consumption.model');
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(response => {
    console.log('Base de datos conectada');
    return Consumption.insertMany(consumptions);
  })
  .then(response => {
    console.log('Peliculas creadas correctamente');
    mongoose.connection.close();
  })
  .catch(e => console.log('error', e));
