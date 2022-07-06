const router = require('express').Router();

const {
  createAppliance,
  findAllAppliances,


} = require('../controllers/appliance');
const { findConsumAndTypeS,findConsumAndTypeL,findApplinceS } = require('../controllers/consum');

router.get('/create', async (req, res, next) => {
  try {
    const consumTypeS = await findConsumAndTypeS();
    const consumTypeL = await findConsumAndTypeL();
      
     // console.log('consumo y tipo',consumTypeS);
    res.render('appliance/addAppliance', { consumTypeS, consumTypeL });
  } catch (error) {
    console.log('hay un error', error);
  }
});
router.post('/create', createAppliance);

router.get('/budget', async (req, res, next) => { 
  try {
    const userId = req.session;
    console.log(userId)
    const type = req.params
    console.log(type)
    const consumTypeS = await findApplinceS(userId, type);
    console.log('tipos de consumo en los Esporádicos', { consumTypeS })
    // res.render('buget/createBudget', { consumTypeS })
  } catch (error) {
    console.log('error en la ruta de coger los electrodomésticos de un usuario', error)
  }
})

module.exports = router;
