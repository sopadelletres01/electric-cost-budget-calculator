const router = require('express').Router();

const Price = require('../models/Price.model');
const Appliance = require('../models/Appliance.model');
const ApiService = require('../services/electricPrice.service');
const calculatePrice = require("../utils/calculatePrice")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/test', async (req, res, next) => {
  //const price =  await Price.findById(id)
  const prices = await Price.find({});
  const appliances = await Appliance.find({});
  const price = prices[0];
  //const appliance = appliances[0]
  const index = prices.indexOf(price);
  let minutes = 20;
  let numberOfHours = Math.floor(minutes / 60);
  console.log(numberOfHours);
  if (numberOfHours < 1) {
    let power = 0.00345; //MW
    let hours = minutes / 60;
    let energy = power * hours;
    let pricee = (price.price * energy) / 1; //€ / MWh
    let total = pricee;
    console.log('pow', power, 'hours', hours, 'energy', energy, 'price', pricee, 'total', total);
  }

  res.render('test');
});



router.post('/test', async (req, res, next) => {

  const {
    data: { hour: minHour, price: minPrice },
  } = await ApiService.min();

  const selectedAppliance = await Appliance.findById(req.body.applianceId).populate("type consum")
  const selectedPrice = await Price.findById(req.body.priceId)
  const price = await Price.findOne({hour:minHour})

  const total = await calculatePrice(req, res);
  const minTotal = await calculatePrice(req, res, price._id);
  
  const diferencia = total - minTotal

  res.render('budget/detailBudget',{
    minPrice:price,
    selectedPrice,
    selectedAppliance,
    total : total.toFixed(2),
    diferencia : diferencia.toFixed(2),
    minTotal : minTotal.toFixed(2),
    selectedMinutes: req.body.minutes
  });
});
 
//We have to return:
//Selected power 🆗
//Selected appliance 🆗
 //Budget multplier applied to price 🆗
//Selected initialHour 🆗
//Selected minutes 🆗
//Calculated price 🆗

//Optimal hour
//Optimal price

module.exports = router;
