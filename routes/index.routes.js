const router = require('express').Router();

const Price = require('../models/Price.model');
const Appliance = require('../models/Appliance.model');
const ApiService = require('../services/electricPrice.service');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/test', async (req, res, next) => {
  //const price =  await Price.findById(id)
  const prices = await Price.find({});
  const appliances = await Appliance.find({});
  const price = prices[0];
  //const appliance = appliances[0]
  const index = prices.indexOf(price);
  let minutes = 20;
  let numberOfHours = Math.floor(minutes / 60);
  console.log(numberOfHours);
  if (numberOfHours < 1) {
    let power = 0.00345; //MW
    let hours = minutes / 60;
    let energy = power * hours;
    let pricee = (price.price * energy) / 1; //€ / MWh
    let total = pricee;
    console.log('pow', power, 'hours', hours, 'energy', energy, 'price', pricee, 'total', total);
  }

  res.render('test');
});

const calculatePrice = async (req, res, pId) => {
  //Precio minimo
  const { applianceId, priceId, minutes } = req.body;


  //Get electrodomésticos
  const appliance = await Appliance.findById(applianceId).populate('type consum');
  //Get price object {price:234, hour:13-14}
  const ID = pId || priceId
  const price = await Price.findById(ID);
  //Horas con decimales
  let totalHours = minutes / 60;
  //Horas sin decimales
  let completeHours = Math.floor(minutes / 60);
  //Minutos sobrantes a partir del residuo de las horas
  let restMinutes = ((minutes / 60).toFixed(2).split('.')[1] * 60) / 100;
  //Potencia calculado con el multiplicador
  let pow = appliance.type.power[1] * appliance.consum.budget;
  console.log('budget', appliance.consum.budget);
  console.log('POW', pow);
  console.log('CHOUR', completeHours);
  console.log('THOUR', totalHours);
  //{$and:[{hour:{$gt:"01-02"}},{hour:{$lt:"04-05"}}]}
  //console.log(pricesArr)
  //console.log(price)
  let total = 0;
  if (totalHours <= 1) {
    let power = appliance.type.power[1]; //MW
    let hours = minutes / 60;
    let energy = power * hours;
    let pricee = (price.price * energy) / 1; //€ / MWh
    total = pricee;
    console.log('pow(Mw)', power, 'hours', hours, 'energy(Mwh)', energy, 'price(€)', pricee, 'total(€)', total);
  }
  if (totalHours > 1) {
    const hourRange = price.hour; // 03 - 04
    //Buscamos la ultima franja horaria congiendo el hourRange y sumandole a la segunda posicion el numero de horas completas
    const lastHour = Number(hourRange.split('-')[1]) + completeHours; // 6
    const secondLastHour = lastHour - 1; // 5
    //Aqui faltaria comprobar que si la hora es mayor de 10 no hace falta añadirle un 0 delante
    const last = lastHour >= 10 ? lastHour : `0${lastHour}`;
    const first = secondLastHour >= 10 ? secondLastHour : `0${secondLastHour}`;
    const lastHourRange = `${first}-${last}`;
    //Generamos un array de precios que va desde la hora seleccionada hasta la ultima franja (cogemos la ultima incluida para usarla mas tarde)
    const pricesRange = await Price.find({ $and: [{ hour: { $gte: hourRange } }, { hour: { $lte: lastHourRange } }] });
    console.log('range', hourRange);
    console.log('last', lastHour);
    console.log('lastrange', lastHourRange);
    //console.log("pricesRange",pricesRange)
    //Iteramos sobre el array de precios que hemos generado
    for (let index = 0; index < pricesRange.length - 1; index++) {
      const element = pricesRange[index];
      let power = appliance.type.power[1]; //MW
      let hours = 1;
      let energy = power * hours;
      let pricee = (element.price * energy) / 1; //€ / MWh
      total += pricee;
      console.log('pow(Mw)', power, 'hours', hours, 'energy(Mwh)', energy, 'price(€)', pricee, 'total(€)', total);
    }
    console.log('TOTAL', total);

    let power = appliance.type.power[1]; //MW
    let hours = restMinutes / 60;
    let energy = power * hours;
    //Seleccionamos el ultimo resultado del array de prices
    let pricee = (pricesRange.slice(-1)[0].price * energy) / 1; //€ / MWh
    console.log('PRiceee', pricee);
    //Sumamos el precio de los minutos restantes a la suma
    total += pricee;
    console.log('TOTAL', total);
  }
  console.log('CompleteHours', totalHours);
  console.log('MinutosRestantes', restMinutes);

  return total
};



router.post('/test', async (req, res, next) => {

  const {
    data: { hour: minHour, price: minPrice },
  } = await ApiService.min();

  const selectedAppliance = await Appliance.findById(req.body.applianceId).populate("type consum")
  console.log("applainces",selectedAppliance)
  const selectedPrice = await Price.findById(req.body.priceId)
  const price = await Price.findOne({hour:minHour})

  const total = await calculatePrice(req, res);
  const minTotal = await calculatePrice(req, res, price._id);
  
  const diferencia = total - minTotal
  console.log("ToTALtOTAL",total)

  console.log("ToTALtOTAL",total)
  console.log("MINtOTAL",minTotal)
  console.log('hour', minHour, 'price', minPrice);
  res.render('budget/detailBudget',{
    minPrice:price,
    selectedPrice,
    selectedAppliance,
    total : total.toFixed(2),
    diferencia : diferencia.toFixed(2),
    minTotal : minTotal.toFixed(2),
    selectedMinutes: req.body.minutes
  });
});
 
//We have to return:
//Selected power 🆗
//Selected appliance 🆗
 //Budget multplier applied to price 🆗
//Selected initialHour 🆗
//Selected minutes 🆗
//Calculated price 🆗

//Optimal hour
//Optimal price

module.exports = router;


/* console.log('req', req.body);

  const { applianceId, priceId, minutes } = req.body;

  //Precio minimo
  const {
    data: { hour: minHour, price: minPrice },
  } = await ApiService.min();
  console.log('hour', minHour, 'price', minPrice);

  //Get electrodomésticos
  const appliance = await Appliance.findById(applianceId).populate('type consum');
  //Get price object {price:234, hour:13-14}
  const price = await Price.findById(priceId);
  //Horas con decimales
  let totalHours = minutes / 60;
  //Horas sin decimales
  let completeHours = Math.floor(minutes / 60);
  //Minutos sobrantes a partir del residuo de las horas
  let restMinutes = ((minutes / 60).toFixed(2).split('.')[1] * 60) / 100;
  //Potencia calculado con el multiplicador
  let pow = appliance.type.power[1] * appliance.consum.budget;
  console.log('budget', appliance.consum.budget);
  console.log('POW', pow);
  console.log('CHOUR', completeHours);
  console.log('THOUR', totalHours);
  //{$and:[{hour:{$gt:"01-02"}},{hour:{$lt:"04-05"}}]}
  //console.log(pricesArr)
  //console.log(price)
  if (totalHours < 1) {
    let power = appliance.type.power[1]; //MW
    let hours = minutes / 60;
    let energy = power * hours;
    let pricee = (price.price * energy) / 1; //€ / MWh
    let total = pricee;
    console.log('pow(Mw)', power, 'hours', hours, 'energy(Mwh)', energy, 'price(€)', pricee, 'total(€)', total);
  }
  if (totalHours > 1) {
    let totalRange = 0;
    const hourRange = price.hour; // 03 - 04
    //Buscamos la ultima franja horaria congiendo el hourRange y sumandole a la segunda posicion el numero de horas completas
    const lastHour = Number(hourRange.split('-')[1]) + completeHours; // 6
    const secondLastHour = lastHour - 1; // 5
    //Aqui faltaria comprobar que si la hora es mayor de 10 no hace falta añadirle un 0 delante
    const last = lastHour >= 10 ? lastHour : `0${lastHour}`;
    const first = secondLastHour >= 10 ? secondLastHour : `0${secondLastHour}`;
    const lastHourRange = `${first}-${last}`;
    //Generamos un array de precios que va desde la hora seleccionada hasta la ultima franja (cogemos la ultima incluida para usarla mas tarde)
    const pricesRange = await Price.find({ $and: [{ hour: { $gte: hourRange } }, { hour: { $lte: lastHourRange } }] });
    console.log('range', hourRange);
    console.log('last', lastHour);
    console.log('lastrange', lastHourRange);
    //console.log("pricesRange",pricesRange)
    //Iteramos sobre el array de precios que hemos generado
    for (let index = 0; index < pricesRange.length - 1; index++) {
      const element = pricesRange[index];
      let power = appliance.type.power[1]; //MW
      let hours = 1;
      let energy = power * hours;
      let pricee = (element.price * energy) / 1; //€ / MWh
      let total = pricee;
      totalRange += total;
      console.log('pow(Mw)', power, 'hours', hours, 'energy(Mwh)', energy, 'price(€)', pricee, 'total(€)', total);
    }
    console.log('TOTAL', totalRange);

    let power = appliance.type.power[1]; //MW
    let hours = restMinutes / 60;
    let energy = power * hours;
    //Seleccionamos el ultimo resultado del array de prices
    let pricee = (pricesRange.slice(-1)[0].price * energy) / 1; //€ / MWh
    console.log('PRiceee', pricee);
    //Sumamos el precio de los minutos restantes a la suma
    totalRange += pricee;
    console.log('TOTAL', totalRange);
  }
 */