import adminActionModule from './admin-action';

const initializeState = () => ({
  users: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setUserAndCompaniesInState(state, payload) {
      state.users = payload.length ? payload : [];
    },
  },
  actions: adminActionModule({ $http, $vf, $apollo }),
  getters: {
    users: (state) => state.users,
  },
});
