const router = require('express').Router();
const { findApplianceS } = require('../controllers/consum');
const { findHours } = require('../controllers/precio');

const Price = require('../models/Price.model');
const Appliance = require('../models/Appliance.model');
const ApiService = require('../services/electricPrice.service');
const calculatePrice = require('../utils/calculatePrice');

//1a vista
router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.user;
    const myAppliances = await findApplianceS(userId);
    const hours = await findHours();
    console.log(myAppliances, hours);
    res.render('budget/createBudget', { myAppliances, hours });
  } catch (error) {
    console.log('error la consultar las horas.', error);
  }
});
//1r post

router.post('/create', async (req, res, next) => {
  const {
    data: { hour: minHour, price: minPrice },
  } = await ApiService.min();

  const selectedAppliance = await Appliance.findById(req.body.applianceId).populate('type consum');
  const selectedPrice = await Price.findById(req.body.priceId);
  const price = await Price.findOne({ hour: minHour });

  const total = await calculatePrice(req, res);
  const minTotal = await calculatePrice(req, res, price._id);

  const diferencia = total - minTotal;

  res.render('budget/detailBudget', {
    minPrice: price,
    selectedPrice,
    selectedAppliance,
    total: total.toFixed(2),
    diferencia: diferencia.toFixed(2),
    minTotal: minTotal.toFixed(2),
    selectedMinutes: req.body.minutes,
  });
});



module.exports = router;
