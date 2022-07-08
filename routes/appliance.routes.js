const router = require('express').Router();
const csrf = require('csurf');

const csrfProteccion = csrf({cookie:true})
const Appliance = require("../models/Appliance.model")
const Consumption = require("../models/Consumption.model")
const {
  createAppliance,
  listAppliance,
  updateAppliance,
  findAllAppliances,
  deleteAppliance,
  updateApplianceCost

} = require('../controllers/appliance');

const { findConsumAndTypeS, findConsumAndTypeL, findApplinceS } = require('../controllers/consum');

router.get('/create',csrfProteccion, async (req, res, next) => {
  try {
    const consumTypeS = await findConsumAndTypeS();
    const consumTypeL = await findConsumAndTypeL();
      
     // console.log('consumo y tipo',consumTypeS);
    res.render('appliance/addAppliance', { csrfToken: req.csrfToken(), consumTypeS, consumTypeL });
  } catch (error) {
    console.log('hay un error', error);
  }
});
router.post('/create', createAppliance);

router.get('/:id/update', async (req,res)=>{
  const appliance = await Appliance.findById(req.params.id).populate("type consum")
  const consumArr = await Consumption.find({})

  res.render("appliance/editAppliance",{appliance,consumArr})
});


router.post('/:id/update',updateAppliance);

router.post('/:id/updateCost', updateApplianceCost);

router.get('/list', listAppliance);

router.post('/:id/delete', deleteAppliance);


router.get('/budget',csrfProteccion, async (req, res, next) => { 
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
