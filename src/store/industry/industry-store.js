import industryActionModule from './industry-action';

const initializeState = () => ({
  industry: {},
  industries: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setIndustryInState(state, payload) {
      state.industry = Object.keys(payload).length ? payload : {};
    },
    setIndustriesInState(state, payload) {
      state.industries = payload.length ? payload : [];
    },
    setAddIndustryInState(state, payload) {
      state.industry = Object.keys(payload).length ? payload : {};
    },
    setUpdateIndustryInState(state, payload) {
      state.industry = Object.keys(payload).length ? payload : {};
    },
  },
  actions: industryActionModule({ $http, $vf, $apollo }),
  getters: {
    industry: (state) => state.industry,
    industries: (state) => state.industries,
  },
});
