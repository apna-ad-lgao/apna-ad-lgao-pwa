import companyActionModule from './company-action';

const initializeState = () => ({
  partnerCompany: {
    name: '',
    description: '',
    image: '',
    industryId: 0,
    gst: 0,
    addressId: 0,
  },
  partnerCompanies: [],
  partnerCompanyEditable: false,
  company: {},
  companies: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setPartnerCompanyInState(state, payload) {
      state.partnerCompany = Object.keys(payload).length ? payload : {};
      if (state.partnerCompany && state.partnerCompany.id > 0) {
        state.partnerCompanyEditable = true;
      }
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
    createPartnerCompanyInState(state, payload) {
      state.company = Object.keys(payload).length ? payload : {};
      if (state.partnerCompany && state.partnerCompany.id > 0) {
        state.partnerCompanyEditable = true;
      }
    },
    updateCompanyInState(state, payload) {
      state.company = Object.keys(payload).length ? payload : {};
    },
  },
  actions: companyActionModule({ $http, $vf, $apollo }),
  getters: {
    partnerCompanyEditable: (state) => state.partnerCompanyEditable,
    partnerCompany: (state) => state.partnerCompany,
    partnerCompanies: (state) => state.partnerCompanies,
    company: (state) => state.company,
    companies: (state) => state.companies,
  },
});
