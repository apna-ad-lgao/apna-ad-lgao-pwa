import userCompanyActionModule from './userCompany-action';

const initializeState = () => ({
  userCompany: {},
  userCompanies: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setUserCompanyInState(state, payload) {
      state.userCompany = Object.keys(payload).length ? payload : {};
    },
    setUserCompaniesInState(state, payload) {
      state.userCompanies = payload.length ? payload : [];
    },
    setAddUserCompanyInState(state, payload) {
      state.userCompany = Object.keys(payload).length ? payload : {};
    },
    setUpdateUserCompanyInState(state, payload) {
      state.userCompany = Object.keys(payload).length ? payload : {};
    },
  },
  actions: userCompanyActionModule({ $http, $vf, $apollo }),
  getters: {
    userCompany: (state) => state.userCompany,
    userCompanies: (state) => state.userCompanies,
  },
});
