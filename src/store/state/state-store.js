import stateActionModule from './state-action';

const initializeState = () => ({
  state: {},
  states: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setStateInState(state, payload) {
      state.state = Object.keys(payload).length ? payload : {};
    },
    setStatesInState(state, payload) {
      state.states = payload.length ? payload : [];
    },
    setAddStateInState(state, payload) {
      state.state = Object.keys(payload).length ? payload : {};
    },
    setUpdateStateInState(state, payload) {
      state.state = Object.keys(payload).length ? payload : {};
    },
  },
  actions: stateActionModule({ $http, $vf, $apollo }),
  getters: {
    state: (state) => state.state,
    states: (state) => state.states,
  },
});
