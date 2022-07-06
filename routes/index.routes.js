const router = require('express').Router();

const Price = require("../models/Price.model")
const Appliance = require("../models/Appliance.model")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/test", async (req, res, next) => {

  //const price =  await Price.findById(id)
  const prices = await Price.find({})
  const appliances = await Appliance.find({})
  const price = prices[0]
  //const appliance = appliances[0]
  const index = prices.indexOf(price)
  let minutes = 20
  let numberOfHours = Math.floor(minutes / 60)
  console.log(numberOfHours)
  if(numberOfHours < 1) {
    let power = 0.00345 //MW
    let hours = minutes / 60
    let energy = power * hours
    let pricee = (price.price * energy) / 1 //€ / MWh 
    let total = pricee 
    console.log("pow",power, "hours",hours, "energy",energy, "price",pricee ,"total",total)
  }




  res.render('test');
})

module.exports = router;
