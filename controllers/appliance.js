const validator = require('validator');
const Appliance = require('../models/Appliance.model');
const Consumption = require('../models/Consumption.model');

exports.createAppliance = async (req, res, next) => {
  try {
    const { type, consum, longDuration, name } = req.body;
    const user = req.session.user;
    const userId = user._id;
    const appliance = await Appliance.create({ type, consum, userId, longDuration, name });
    console.log(appliance);
    console.log('El electrodoméstico ha sido creado CORRECTAMENTE.');
    res.status(200).redirect('/appliance/list');
  } catch (err) {
    console.log('hay un error', err);
  }
};

exports.listAppliance = async (req, res, next) => {
  try {
    const userId = req.session.user._id
    const appliances = await Appliance.find({ userId: userId }).populate("type consum")
    //_id : {$not : {$in : appliances.map(a=>a.consum._id) } }
    let total = 0
    appliances.forEach(a=>{
      total+=a.totalCost
    })
    console.log("total",total)
    const consumArr = await Consumption.find({})
    res.status(200).render('appliance/listAppliance', {appliances,consumArr,total});
  } catch (error) {
    console.log('hay error a la hora de mostrar los Electrodomésticos', error);
  }
};

exports.findAppliance = async (req, res, next) => {
  try {
    const applianceId = req.query;
    console.log('este id es del Appliance', applianceId);
    const appliance = await Appliance.find({ _id: applianceId });
    res.status(200).render('appliance/editAppliance', appliance);
  } catch (error) {
    console.log('El error es ', error);
  }
};

exports.updateAppliance = async (req, res, next) => {
  try {
    const {consum,name} = req.body
    const applianceId = req.params.id;
    console.log('este body ', req.body);
    console.log('este id es del Appliance', applianceId);
    const appliance = await Appliance.findByIdAndUpdate(applianceId,{consum,name},{new:true});
    console.log(appliance)
    res.redirect('/appliance/list');
  } catch (error) {
    console.log('El error es ', error);
  }
};

exports.updateApplianceCost = async (req, res, next) => {
  try {
    const {total,applianceId} = req.body
    const appliance = await Appliance.findById(applianceId);
    const update = {totalCost: Number(total) + appliance.totalCost}
    await appliance.update(update,{new:true})
    res.redirect('/appliance/list');
  } catch (error) {
    console.log('El error es ', error);
  }
};


exports.deleteAppliance = async (req,res,next) => {
  try{
    console.log(req.params.id)
    const appliance = await Appliance.findByIdAndDelete(req.params.id)
    console.log(appliance)
    res.redirect("/appliance/list")
  }catch(error){
    console.log('El error es ', error);
  }
}