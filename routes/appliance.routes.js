const router = require('express').Router();
const mongoose = require('mongoose');
const {
  createAppliance,
  findAllAppliances,
} = require('../controllers/appliance');
const { findConsumAndTypeS,findConsumAndTypeL } = require('../controllers/consum');

router.get('/create', async (req, res, next) => {
  try {
    const consumTypeS = await findConsumAndTypeS();
    const consumTypeL = await findConsumAndTypeL();
      
      console.log('consumo y tipo', );
    res.render('appliance/addAppliance', { consumTypeS, consumTypeL });
  } catch (error) {
    console.log('hay un error', error);
  }
});
router.post('/create', createAppliance);

module.exports = router;
