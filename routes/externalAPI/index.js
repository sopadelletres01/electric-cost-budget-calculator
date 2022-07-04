const router = require('express').Router();
const ApiService = require('../../services/electricPrice.service');

router.get('/', async (req, res) => {
  try {
    const prices = await ApiService.index();
    console.log(prices);
    res.render('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
