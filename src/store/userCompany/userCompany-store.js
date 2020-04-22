import mediaTypeActionModule from './userCompany-action';

const initializeState = () => ({
  mediaType: {},
  mediaTypes: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setMediaTypeInState(state, payload) {
      state.mediaType = Object.keys(payload).length ? payload : {};
    },
    setMediaTypesInState(state, payload) {
      state.mediaTypes = payload.length ? payload : [];
    },
    setAddMediaTypeInState(state, payload) {
      state.mediaType = Object.keys(payload).length ? payload : {};
    },
    setUpdateMediaTypeInState(state, payload) {
      state.mediaType = Object.keys(payload).length ? payload : {};
    },
  },
  actions: mediaTypeActionModule({ $http, $vf, $apollo }),
  getters: {
    mediaType: (state) => state.mediaType,
    mediaTypes: (state) => state.mediaTypes,
  },
});
