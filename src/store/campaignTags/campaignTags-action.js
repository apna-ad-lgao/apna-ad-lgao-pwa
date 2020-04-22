import CAMPAIGNTAGS from '@/graphql/campaignTags/campaignTags.gql';
import CAMPAIGNTAGS_ADD from '@/graphql/campaignTags/createCampaignTags.gql';
import CAMPAIGNTAGS_UPDATE from '@/graphql/campaignTags/updateCampaignTags.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addCampaignTag(context, payload) {
    const {
      uuid, model, platform, fingerprint,
    } = payload;
    if (!uuid || !model || !platform || !fingerprint) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: CAMPAIGNTAGS_ADD,
      variables: {
        uuid, model, platform, fingerprint,
      },
    });
    if (data && data.createCampaignTag) {
      data = data.createCampaignTag;
      context.commit('setAddCampaignTagInState', data);
    }
    return data;
  },
  async getCampaignTags(context) {
    let { data } = await $apollo.query({ query: CAMPAIGNTAGS });
    if (data && data.campaignTags && data.campaignTags.length > 0) {
      data = data.campaignTags;
      context.commit('setCampaignTagsInState', data);
    }
    return data;
  },
  async updateCampaignTag(context, payload) {
    const {
      id, fingerprint,
    } = payload;
    if (!id || !fingerprint) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: CAMPAIGNTAGS_UPDATE,
      variables: payload,
    });
    if (data && data.updateCampaignTag) {
      data = data.updateCampaignTag;
      context.commit('setUpdateCampaignTagInState', data);
    }
    return data;
  },
  async getCampaignTag(context) {
    let { data } = await $apollo.query({ query: CAMPAIGNTAGS });
    if (data && data.campaignTags && data.campaignTags.length > 0) {
      data = data.campaignTags[0];
      context.commit('setCampaignTagInState', data);
    }
    return data.campaignTags;
  },
});
