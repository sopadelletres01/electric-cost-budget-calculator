const router = require('express').Router();
const ApiService = require('../../services/electricPrice.service');
const { get, set } = require('../../utils/redis');

router.get('/', async (req, res) => {
  try {
    const priceFromRedis = await get('prices');
    if (priceFromRedis) {
      console.log('REDIS DATA', JSON.parse(priceFromRedis));
      return res.render('index');
    }
    const prices = await ApiService.index();
    await set('prices', prices.data);
    const price = await get('prices');
    console.log(price);
    res.render('index');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
