const router = require('express').Router();
const mongoose = require('mongoose');
const {createAppliance, findAllAppliances} = require('../controllers/appliance')



router.get('/appliance/create', (req, res, next) => {
    try {
        const idUser = req.query;
        console.log(idUser)
        res.status(200).render('appliance/addAppliance')
    } catch (error) {
        
        console.log('hay un error', error)
    }
});
router.post('/appliance/create', createAppliance);

