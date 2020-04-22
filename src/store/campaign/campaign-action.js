import CAMPAIGNS from '@/graphql/campaign/campaigns.gql';
import CAMPAIGN_ADD from '@/graphql/campaign/createCampaign.gql';
import CAMPAIGN_UPDATE from '@/graphql/campaign/updateCampaign.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addCampaign(context, payload) {
    const {
      uuid, model, platform, fingerprint,
    } = payload;
    if (!uuid || !model || !platform || !fingerprint) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: CAMPAIGN_ADD,
      variables: {
        uuid, model, platform, fingerprint,
      },
    });
    if (data && data.createCampaign) {
      data = data.createCampaign;
      context.commit('setAddCampaignInState', data);
    }
    return data;
  },
  async getCampaigns(context) {
    let { data } = await $apollo.query({ query: CAMPAIGNS });
    if (data && data.campaigns && data.campaigns.length > 0) {
      data = data.campaigns;
      context.commit('setCampaignsInState', data);
    }
    return data;
  },
  async updateCampaign(context, payload) {
    const {
      id, fingerprint,
    } = payload;
    if (!id || !fingerprint) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: CAMPAIGN_UPDATE,
      variables: payload,
    });
    if (data && data.updateCampaign) {
      data = data.updateCampaign;
      context.commit('setUpdateCampaignInState', data);
    }
    return data;
  },
  async getCampaign(context) {
    let { data } = await $apollo.query({ query: CAMPAIGNS });
    if (data && data.campaigns && data.campaigns.length > 0) {
      data = data.campaigns[0];
      context.commit('setCampaignInState', data);
    }
    return data;
  },
});
