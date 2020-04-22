import partnerActionModule from './partner-action';

const initializeState = () => ({
  partnerCompany: {},
  partnerCompanyAddress: {},
  partnerBanners: [],
  partnerOrders: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setPartnerCompanyInState(state, payload) {
      state.partnerCompany = Object.keys(payload).length ? payload : {};
    },
    setAddPartnerCompanyAddressInState(state, payload) {
      state.partnerCompanyAddress = Object.keys(payload).length ? payload : {};
    },
    setPartnerCompanyAddressInState(state, payload) {
      state.partnerCompanyAddress = Object.keys(payload).length ? payload : {};
    },
    setPartnerBannersInState(state, payload) {
      state.partnerBanners = payload.length ? payload : [];
    },
    setPartnerOrdersInState(state, payload) {
      state.partnerOrders = payload.length ? payload : [];
    },
  },
  actions: partnerActionModule({ $http, $vf, $apollo }),
  getters: {
    partnerCompany: (state) => state.partnerCompany,
    partnerCompanyAddress: (state) => state.partnerCompanyAddress,
    partnerBanners: (state) => state.partnerBanners,
    partnerOrders: (state) => state.partnerOrders,
  },
});
