import Axios from 'axios';

switch (process.env.VUE_APP_BUILD) {
  case 'production':
    Axios.defaults.baseURL = 'https://pulse.azurefd.net';
    break;
  case 'development':
    Axios.defaults.baseURL = 'https://ohi-api-uat.azurewebsites.net';
    break;
  default:
    Axios.defaults.baseURL = 'http://localhost:4001';
    break;
}
Axios.defaults.headers.common.Accept = 'application/json';
// Axios.defaults.headers.common.withCredentials = true;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return Axios;
      },
    },
  });
};
