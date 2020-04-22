import companyActionModule from './company-action';

const initializeState = () => ({
  partnerCompany: {},
  company: {},
  companies: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setPartnerCompanyInState(state, payload) {
      state.partnerCompany = Object.keys(payload).length ? payload : {};
    },
    setCompanyInState(state, payload) {
      state.company = Object.keys(payload).length ? payload : {};
    },
    setCompaniesInState(state, payload) {
      state.companies = payload.length ? payload : [];
    },
    createCompanyInState(state, payload) {
      state.company = Object.keys(payload).length ? payload : {};
    },
    updateCompanyInState(state, payload) {
      state.company = Object.keys(payload).length ? payload : {};
    },
  },
  actions: companyActionModule({ $http, $vf, $apollo }),
  getters: {
    partnerCompany: (state) => state.partnerCompany,
    company: (state) => state.company,
    companies: (state) => state.companies,
  },
});
