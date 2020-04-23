import partnerActionModule from './address-action';

const initializeState = () => ({
  address: {},
  addresses: [],
  partnerAddress: {
    name: '',
    building: '',
    landmark: '',
    street: '',
    pincode: 0,
    countryId: 102,
    stateId: 0,
    userId: 0,
  },
  partnerAddresses: [],
  partnerCompanyEditable: false,
  partnerCompanyAddressEditable: false,
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setAddressInState(state, payload) {
      state.address = Object.keys(payload).length ? payload : {};
    },
    setAddressesesInState(state, payload) {
      state.addresses = payload.length ? payload : [];
    },
    setPartnerAddressInState(state, payload) {
      state.partnerAddress = Object.keys(payload).length ? payload : {};
      if (state.partnerAddress && state.partnerAddress.id > 0) {
        state.partnerCompanyAddressEditable = true;
      }
    },
    setPartnerAddressesesInState(state, payload) {
      state.partnerAddresses = payload.length ? payload : [];
    },
    setAddPartnerAddressInState(state, payload) {
      state.partnerAddress = Object.keys(payload).length ? payload : {};
      if (state.partnerAddress && state.partnerAddress.id > 0) {
        state.partnerCompanyAddressEditable = true;
      }
    },
    setUpdatePartnerAddressInState(state, payload) {
      state.partnerAddress = Object.keys(payload).length ? payload : {};
      if (state.partnerAddress && state.partnerAddress.id > 0) {
        state.partnerCompanyAddressEditable = true;
      }
    },
    setCountryIdInState(state, payload) {
      state.partnerAddress.countryId = payload.countryId ? payload.countryId : 102;
    },
  },
  actions: partnerActionModule({ $http, $vf, $apollo }),
  getters: {
    address: (state) => state.address,
    addresses: (state) => state.addresses,
    partnerAddress: (state) => state.partnerAddress,
    partnerAddresses: (state) => state.partnerAddresses,
    partnerCompanyEditable: (state) => state.partnerCompanyAddressEditable,
    partnerCompanyAddressEditable: (state) => state.partnerCompanyAddressEditable,
  },
});
