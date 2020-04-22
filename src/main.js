import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import './plugins';
import './filters';
import './components/global';
import './registerServiceWorker';
import createRouter from './router';
import store from './store';
import requestInterceptors from './misc/request-interceptors';
import analytics from './analytics/new-relic';
import { createProvider } from './vue-apollo';

const isApp = process.env.VUE_APP_RUN_ENV === 'app';

if (!isApp && window.navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(
    (registrations) => {
      // eslint-disable-next-line
      for (const registration of registrations) {
        registration.unregister();
      }
    },
  ).catch(err => console.warn(err)); // eslint-disable-line
}

analytics.init();
window.gsa = analytics;

Vue.config.productionTip = false;

/*
 sync the router with the vuex store.
 this registers `store.state.route`
*/
const router = createRouter(store);
sync(store, router);

// configure your local storage
Vue.prototype.$vf.config({
  name: 'apna-ad-lgao-db',
});

store.dispatch('getSessionFromLocalDb').then(() => {
  /*
   Intercept all axios requests
   and update its state in store
  */
  requestInterceptors({
    router,
    store,
    $http: Vue.prototype.$http,
    $vf: Vue.prototype.$vf,
  });

  new Vue({
    router,
    store,
    apolloProvider: createProvider({
      inMemoryCacheOptions: {
        freezeResults: false,
      },
    }, store),
    render: (h) => h(App),
  }).$mount('#app');
});
