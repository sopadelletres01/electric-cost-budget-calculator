require('dotenv/config');

const appliance = [
  {
    type: '62c2ba91667021f2b600f1d6',
    consum: '62c4191a40b68b5d1f063b45',
    userId: '62c2ad1729c769382dd120c1',
    longDuration: true,
    totalCost: 20.78,
  },
  {
    type: '62c2bb27667021f2b600f1d8',
    consum: '62c4191a40b68b5d1f063b46',
    userId: '62c40feb7d98ad7dd0e7021b',
    longDuration: false,
    totalCost: 15.8,
  },
  {
    type: '62c2bf6b667021f2b600f1e2',
    consum: '62c4191a40b68b5d1f063b47',
    userId: '62c2ad1729c769382dd120c1',
    longDuration: false,
    totalCost: 12.8,
  },
];

const Appliance = require('../models/Appliance.model');
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(response => {
    console.log('Base de datos conectada');
    return Appliance.insertMany(appliance);
  })
  .then(response => {
    console.log('Electrodomésticos creadas correctamente');
    mongoose.connection.close();
  })
  .catch(e => console.log('error', e));
