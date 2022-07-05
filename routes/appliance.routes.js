const router = require('express').Router();
const mongoose = require('mongoose');
const { createAppliance, findAllAppliances } = require('../controllers/appliance')
const { findConsumAndType}=require('../controllers/consum')



router.get('/appliance/create', (req, res, next) => {
    try {
      
        const consumType = findConsumAndType();
        console.log('consumo y tipo',consumType)
        res.status(200).render('appliance/addAppliance',consumType);
    } catch (error) {
        
        console.log('hay un error', error)
    }
});
router.post('/appliance/create', createAppliance);


