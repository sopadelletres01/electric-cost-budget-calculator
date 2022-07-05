const router = require('express').Router();
const mongoose = require('mongoose');
const {
  createAppliance,
  findAllAppliances,
} = require('../controllers/appliance');
const { findConsumAndType } = require('../controllers/consum');

router.get('/create', async (req, res, next) => {
  try {
    const consumType = await findConsumAndType();
    console.log('consumo y tipo', consumType);
    res.render('appliance/addAppliance', { consumType });
  } catch (error) {
    console.log('hay un error', error);
  }
});
router.post('/create', createAppliance);

module.exports = router;
