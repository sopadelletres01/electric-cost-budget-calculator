/* const redis = require('redis');
const PORT_REDIS = process.env.PORT || 6379;
const redisClient = redis.createClient(PORT_REDIS);
const set = async (key, value) => {
  await redisClient.set(key, JSON.stringify(value));
};
const get = async (req, res, next) => {
  let key = req.route.path;
  await redisClient.get(key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) res.status(200).send(JSON.parse(data));
    else next();
  });
};

module.exports = {
  set,
  get,
};
 */