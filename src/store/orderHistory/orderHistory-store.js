import orderHistoriesActionModule from './orderHistory-action';

const initializeState = () => ({
  orderHistory: {},
  orderHistories: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setOrderHistoryInState(state, payload) {
      state.orderHistory = Object.keys(payload).length ? payload : {};
    },
    setOrderHistoriesInState(state, payload) {
      state.orderHistories = payload.length ? payload : [];
    },
    setDeleteOrderHistoriesInState(state, payload) {
      state.orderHistories = payload.length ? payload : [];
    },
    setAddOrderHistoriesInState(state, payload) {
      state.orderHistory = Object.keys(payload).length ? payload : {};
    },
    setUpdateOrderHistoryInState(state, payload) {
      state.orderHistories = Object.keys(payload).length ? payload : {};
    },
  },
  actions: orderHistoriesActionModule({ $http, $vf, $apollo }),
  getters: {
    orderHistory: (state) => state.orderHistory,
    orderHistories: (state) => state.orderHistories,
  },
});
