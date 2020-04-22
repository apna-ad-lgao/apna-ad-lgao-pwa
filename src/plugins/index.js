import Vue from 'vue';
import vf from 'vue-forage';
import VeeValidate from 'vee-validate';
import VueProgressBar from 'vue-progressbar';

const req = require.context('./', true, /\.(js|vue)$/i);
const filteredFiles = req.keys().filter((key) => !key.includes('/index.js'));
filteredFiles.forEach((plugin) => {
  Vue.use(req(plugin).default);
});

Vue.use(vf);
Vue.use(VeeValidate, {
  delay: 100,
});
Vue.use(VueProgressBar, {
  // color: '#FF545E',
  color: '#00ADCF',
  failedColor: '#FF545E',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
  autoFinish: false,
});

