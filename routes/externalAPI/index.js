const router = require('express').Router();
const {promisify} = require('util');
const ApiService = require('../../services/electricPrice.service');
//const { get, set } = require('../../utils/redis');
const Redis = require('ioredis');
const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

const get = async (key) => {
  
  const value = await redisClient.get(key);
  return value

}

const set = async (data,key) => {
  
  await redisClient.set(key, JSON.stringify(data));
  redisClient.quit();

}



const redisDemo = async (data) => {
  // Connect to Redis at 127.0.0.1, port 6379.
  console.log(typeof JSON.stringify(data));

  // Set key "prices" to have value "Simon Prickett".
  await redisClient.set('prices', JSON.stringify(data));

  // Get the value held at key "prices" and log it.
  const value = await redisClient.get('prices');
  console.log(value);

  // Disconnect from Redis.
  redisClient.quit();
};

router.get('/', async (req, res) => {
  try {
    const priceFromRedis = await get("prices")
    if(priceFromRedis){
      console.log("REDIS DATA",JSON.parse(priceFromRedis))
      return res.render("index")
    }
    const prices = await ApiService.index();
    await set(prices.data);
    res.render('index');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
