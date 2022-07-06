const httpCnf = require('./httpConfig');

class ApiService {
  static index() {
    return httpCnf.get('/all?zone=PCB');
  }
  static show(resource, id) {
    return httpCnf.get(`/${resource}/${id}`);
  }
  static create(resource, data) {
    return httpCnf.post(`/${resource}`, data);
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
