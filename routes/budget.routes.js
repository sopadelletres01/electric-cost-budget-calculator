const router = require('express').Router();
const csrf = require('csurf');

const csrfProteccion = csrf({cookie:true})
const {
    findApplianceS
} = require('../controllers/consum');
const { findHours}= require('../controllers/precio')


router.get('/',csrfProteccion,async (req, res, next) => { 
    try {
        const userId = req.session.user;
        const myAppliances = await findApplianceS(userId);
        const hours = await findHours();
        console.log(myAppliances, hours)
        res.render('budget/createBudget', {myAppliances, hours})
    } catch (error) { 
        console.log('error la consultar las horas.', error)

    }

})
module.exports=router