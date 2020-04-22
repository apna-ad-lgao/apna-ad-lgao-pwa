import INDUSTRIES from '@/graphql/industries/industries.gql';
import INDUSTRY_ADD from '@/graphql/industries/createIndustry.gql';
import INDUSTRY_UPDATE from '@/graphql/industries/updateIndustry.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addIndustry(context, payload) {
    const { name } = payload;
    if (!name) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: INDUSTRY_ADD,
      variables: {
        name,
      },
    });
    if (data && data.createIndustry) {
      data = data.createIndustry;
      context.commit('setAddIndustryInState', data);
    }
    return data;
  },
  async getIndustrys(context) {
    let { data } = await $apollo.query({ query: INDUSTRIES });
    if (data && data.industries && data.industries.length > 0) {
      data = data.industries;
      context.commit('setIndustrysInState', data);
    }
    return data;
  },
  async updateIndustry(context, payload) {
    const {
      id, name, isHidden,
    } = payload;
    if (!id || !name || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: INDUSTRY_UPDATE,
      variables: payload,
    });
    if (data && data.updateIndustry) {
      data = data.updateIndustry;
      context.commit('setUpdateIndustryInState', data);
    }
    return data;
  },
  async getIndustry(context) {
    let { data } = await $apollo.query({ query: INDUSTRIES });
    if (data && data.industries && data.industries.length > 0) {
      data = data.industries[0];
      context.commit('setIndustryInState', data);
    }
    return data.industries;
  },
});
