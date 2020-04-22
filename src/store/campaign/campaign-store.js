import campaignActionModule from './campaign-action';

const initializeState = () => ({
  campaign: {},
  campaigns: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setCampaignInState(state, payload) {
      state.campaign = Object.keys(payload).length ? payload : {};
    },
    setCampaignsInState(state, payload) {
      state.campaigns = payload.length ? payload : [];
    },
    setAddCampaignInState(state, payload) {
      state.campaign = Object.keys(payload).length ? payload : {};
    },
    setUpdateCampaignInState(state, payload) {
      state.campaign = Object.keys(payload).length ? payload : {};
    },
  },
  actions: campaignActionModule({ $http, $vf, $apollo }),
  getters: {
    campaign: (state) => state.campaign,
    campaigns: (state) => state.campaigns,
  },
});
