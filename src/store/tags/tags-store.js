import tagsActionModule from './tags-action';

const initializeState = () => ({
  tag: {},
  tags: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setTagInState(state, payload) {
      state.tag = Object.keys(payload).length ? payload : {};
    },
    setTagsInState(state, payload) {
      state.tags = payload.length ? payload : [];
    },
    setDeleteTagsInState(state, payload) {
      state.tags = payload.length ? payload : [];
    },
    setAddTagsInState(state, payload) {
      state.tag = Object.keys(payload).length ? payload : {};
    },
    setUpdateTagsInState(state, payload) {
      state.tags = Object.keys(payload).length ? payload : {};
    },
  },
  actions: tagsActionModule({ $http, $vf, $apollo }),
  getters: {
    tag: (state) => state.tag,
    tags: (state) => state.tags,
  },
});
