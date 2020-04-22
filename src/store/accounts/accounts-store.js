// import dayJs from 'dayjs';
import accountsActionModule from './accounts-actions';

const initializeState = () => ({
  accessToken: null,
  user: {},
});

export default ({ $http, $vf, $apollo }) => ({
  state: {
    ...initializeState(),
  },
  mutations: {
    setLoggedInState(state, payload) {
      state.toke = payload.user.token ? payload.user.token : null;
      state.user = payload.user ? { ...payload.user } : {};
    },
    setLoggedOutState(state) {
      Object.assign(state, initializeState());
    },
    setProfileState(state, payload) {
      state.profile = Object.keys(payload).length ? payload : {};
    },
    setProfilePreferencesInState(state, payload) {
      state.preferences = Object.keys(payload).length ? payload : {};
    },
    updateSessionFromLocalDbInStore(state, payload) {
      state.accessToken = payload.accessToken || null;
      state.user = payload.user || {};
    },
  },
  actions: accountsActionModule({ $http, $vf, $apollo }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    user: (state) => {
      const user = { ...state.user };
      const fullName = `${user.firstName ? `${user.firstName}` : ''}${user.middleName
        ? ` ${user.middleName}`
        : ''} ${user.lastName ? `${user.lastName}` : ''}`;
      user.fullName = fullName;
      return user;
    },
  },
});
