const httpCnf = require('./httpConfig');

class ApiService {
  static index() {
    return httpCnf.get('/all?zone=PCB');
  }
  static min() {
    return httpCnf.get('/min?zone=PCB');
  }
  static avg(resource, data) {
    return httpCnf.get('/avg?zone=PCB');
  }
  static update(resource, id, data) {
    console.log(`/${resource}/${id}`);
    return httpCnf.put(`/${resource}/${id}`, data);
  }
  static delete(resource, id) {
    return httpCnf.delete(`/${resource}/${id}`);
  }
}
module.exports = ApiService;
