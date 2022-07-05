const router = require('express').Router();
const {promisify} = require('util');
const ApiService = require('../../services/electricPrice.service');
//const { get, set } = require('../../utils/redis');
const Redis = require('ioredis');
const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

/* const redisClient = new Redis({
  host: process.env.REDIS_URL,
  port: process.env.PORT_REDIS_CLOUD,
  username: "default",
  password: process.env.REDIS_PASSWORD,
  family : '6'
}); */

/* const redisClient = new Redis({
  host:"redis-10582.c135.eu-central-1-1.ec2.cloud.redislabs.com:10582",
  username:"Cram",
  password:"Cram123."
}); */

const get = async (key) => {
  
  const value = await redisClient.get(key);
  return value

}

const set = async (key,data) => {
  
  await redisClient.set(key, JSON.stringify(data));

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
