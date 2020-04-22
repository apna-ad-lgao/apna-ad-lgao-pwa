import userActionModule from './user-action';

const initializeState = () => ({
  userDetail: {},
  users: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setUserInState(state, payload) {
      state.userDetail = Object.keys(payload).length ? payload : {};
    },
    setUsersInState(state, payload) {
      state.users = payload.length ? payload : [];
    },
    setAddUserInState(state, payload) {
      state.userDetail = Object.keys(payload).length ? payload : {};
    },
    setUpdateUserInState(state, payload) {
      state.users = Object.keys(payload).length ? payload : {};
    },
    setActivateUserInState(state, payload) {
      state.userDetail = Object.keys(payload).length ? payload : {};
    },
    setDeleteUserInState(state, payload) {
      state.userDetail = Object.keys(payload).length ? payload : {};
    },
  },
  actions: userActionModule({ $http, $vf, $apollo }),
  getters: {
    userDetail: (state) => state.userDetail,
    users: (state) => state.users,
  },
});
