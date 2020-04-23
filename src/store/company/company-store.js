import companyActionModule from './company-action';

const initializeState = () => ({
  partnerCompany: {
    name: '',
    description: '',
    image: '',
    industryId: 0,
    pincode: 110000,
  },
  partnerCompanies: [],
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
    partnerCompanies: (state) => state.partnerCompanies,
    company: (state) => state.company,
    companies: (state) => state.companies,
  },
});
