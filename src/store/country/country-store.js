import companyActionModule from './country-action';

const initializeState = () => ({
  country: {},
  countries: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setCountryInState(state, payload) {
      state.country = Object.keys(payload).length ? payload : {};
    },
    setCountriesInState(state, payload) {
      state.countries = payload.length ? payload : [];
    },
    setAddCountryInState(state, payload) {
      state.country = Object.keys(payload).length ? payload : {};
    },
    setUpdateCountryInState(state, payload) {
      state.country = Object.keys(payload).length ? payload : {};
    },
  },
  actions: companyActionModule({ $http, $vf, $apollo }),
  getters: {
    country: (state) => state.country,
    countries: (state) => state.countries,
  },
});
