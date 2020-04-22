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
    stateId: 0,
    userId: 0,
  },
  partnerAddresses: [],
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
    },
    setPartnerAddressesesInState(state, payload) {
      state.partnerAddresses = payload.length ? payload : [];
    },
    setAddPartnerAddressInState(state, payload) {
      state.partnerAddress = Object.keys(payload).length ? payload : {};
    },
    setUpdatePartnerAddressInState(state, payload) {
      state.partnerAddress = Object.keys(payload).length ? payload : {};
    },
  },
  actions: partnerActionModule({ $http, $vf, $apollo }),
  getters: {
    address: (state) => state.address,
    addresses: (state) => state.addresses,
    partnerAddress: (state) => state.partnerAddress,
    partnerAddresses: (state) => state.partnerAddresses,
  },
});
