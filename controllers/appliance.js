const validator = require('validator');
const Appliance = require('../models/Appliance.model');

exports.createAppliance = async (req, res, next) => {
    try {
        const { type, consum, longDuration } = req.body;
        const  user=req.session.user
        const userId= user._id
        await Appliance.create({ type, consum, userId, longDuration })
        console.log('El electrodoméstico ha sido creado CORRECTAMENTE.')
        res.status(200).redirect(`/appliance/?userId=${userId}`)
    } catch (err) {
        console.log('hay un error', err)
    }
}

exports.findAllAppliances = async (req, res, next) => { 
    try {
        const userId = req.query;
        console.log('userId', userId)
        await Appliance.find()

    } catch (error) { 
        console.log('hay error a la hora de mostrar los Electrodomésticos', error)
    }
}