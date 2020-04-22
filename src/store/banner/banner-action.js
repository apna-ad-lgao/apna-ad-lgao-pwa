import CURRENT_USER from '@/graphql/users/users.gql';
import ADD_ADDRESS from '@/graphql/addresses/createAddress.gql';
import ADDRESSES from '@/graphql/addresses/addresses.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addPartnerCompanyAddress(context, payload) {
    const {
      name, building, landmark, street, pincode, stateId, isAdmin,
    } = payload;
    if (!name || !building || !landmark || !street || !pincode || !stateId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: ADD_ADDRESS,
      variables: {
        name, building, landmark, street, pincode, stateId, isAdmin,
      },
    });
    if (data && data.createAddress) {
      data = data.createAddress;
      context.commit('setAddPartnerBannerInState', data);
    }
    return data;
  },
  async getPartnerCompanyAddress(context) {
    let { data } = await $apollo.query({ query: ADDRESSES });
    if (data && data.addresses && data.addresses.length > 0) {
      data = data.addresses[0];
      context.commit('setPartnerBannerInState', data);
    }
    return data;
  },
  async getPartnerBanners(context) {
    let { data } = await $apollo.query({ query: CURRENT_USER });
    if (data && data.banners && data.banners.length > 0) {
      data = data.banners;
      context.commit('setPartnerBannersInState', data);
    }
    return data;
  },
});
