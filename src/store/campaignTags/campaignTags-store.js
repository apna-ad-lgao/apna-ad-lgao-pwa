import campaignTagsActionModule from './campaignTags-action';

const initializeState = () => ({
  campaignTag: {},
  campaignTags: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setCampaignTagInState(state, payload) {
      state.campaignTag = Object.keys(payload).length ? payload : {};
    },
    setCountriesInState(state, payload) {
      state.campaignTags = payload.length ? payload : [];
    },
    setAddCampaignTagInState(state, payload) {
      state.campaignTag = Object.keys(payload).length ? payload : {};
    },
    setUpdateCampaignTagInState(state, payload) {
      state.campaignTag = Object.keys(payload).length ? payload : {};
    },
  },
  actions: campaignTagsActionModule({ $http, $vf, $apollo }),
  getters: {
    campaignTag: (state) => state.campaignTag,
    campaignTags: (state) => state.campaignTags,
  },
});
