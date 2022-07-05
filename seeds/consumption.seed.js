require('dotenv/config');

const consumptions = [
  {
    name: 'A',
    budget: 0.45,
  },
  {
    name: 'B',
    budget: 0.55,
  },
  {
    name: 'C',
    budget: 0.7,
  },
  {
    name: 'D',
    budget: 0.95,
  },
  {
    name: 'E',
    budget: 1.05,
  },
  {
    name: 'F',
    budget: 1.1,
  },
  {
    name: 'G',
    budget: 1.2,
  },
];

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
