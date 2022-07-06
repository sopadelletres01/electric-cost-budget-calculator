require('dotenv/config');
const ApiService = require('../services/electricPrice.service');

const Price = require('../models/Price.model');
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(response => {
    console.log('Base de datos conectada');
    return ApiService.index();
  })
  .then(data => {
    let parsedData = Object.values(data.data).map(val => {
      return {
        date:val.date,
        hour:val.hour,
        isCheap: val['is-cheap'],
        isCheap: val['is-under-avg'],
        market:val.market,
        price: val.price,
        units: val.units,
      };
    });
    console.log("Parsed",parsedData)
    return Price.insertMany(parsedData)
  })
  .then(response=>{
    console.log("Gucci")
  })

  .catch(e => console.log('error', e));
