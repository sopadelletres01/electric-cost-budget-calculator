const router = require('express').Router();
const {promisify} = require('util');
const ApiService = require('../../services/electricPrice.service');
//const { get, set } = require('../../utils/redis');
const Redis = require('ioredis');
/* const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
}); */

const redisClient = new Redis(`redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_CLOUD_PORT}/0`);

const get = async (key) => {
  
  const value = await redisClient.get(key);
  return value

}

const set = async (key,data) => {
  
  await redisClient.set(key, JSON.stringify(data));

}


router.get('/', async (req, res) => {
  try {
    const priceFromRedis = await redisClient.get('prices');
    if(priceFromRedis){
      console.log("REDIS DATA",JSON.parse(priceFromRedis))
      return res.render("index")
    }
    const prices = await ApiService.index();
    await set("prices",prices.data);
    const price = await get("prices")
    console.log(price)
    res.render('index');
  } catch (error) {
    res.status(500).send(error.message);
  }

});

module.exports = router;
