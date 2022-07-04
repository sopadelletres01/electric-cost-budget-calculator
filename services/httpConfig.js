const axios = require('axios');
let url = process.env.EXTERNAL_API_URL;
console.log('url', url);
const httpCnf = axios.create({
  baseURL: url,
  header: {
    'Content-Type': 'application/json',
  },
});
module.exports = httpCnf;
