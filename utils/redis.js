/* const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
}); */
const Redis = require('ioredis');

const redisClient = new Redis(`redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_CLOUD_PORT}/0`);

const get = async key => {
  const value = await redisClient.get(key);
  return value;
};

const set = async (key, data) => {
  await redisClient.set(key, JSON.stringify(data));
};

module.exports = { get, set };
