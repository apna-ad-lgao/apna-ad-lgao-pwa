import mediaTypeActionModule from './userDevice-action';

const initializeState = () => ({
  userDevice: {},
  userDevices: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setUserDeviceInState(state, payload) {
      state.userDevice = Object.keys(payload).length ? payload : {};
    },
    setUserDevicesInState(state, payload) {
      state.userDevices = payload.length ? payload : [];
    },
    setAddUserDeviceInState(state, payload) {
      state.userDevice = Object.keys(payload).length ? payload : {};
    },
    setUpdateUserDeviceInState(state, payload) {
      state.userDevice = Object.keys(payload).length ? payload : {};
    },
  },
  actions: mediaTypeActionModule({ $http, $vf, $apollo }),
  getters: {
    userDevice: (state) => state.userDevice,
    userDevices: (state) => state.userDevices,
  },
});
