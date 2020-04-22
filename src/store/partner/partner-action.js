import CURRENT_USER from '@/graphql/users/users.gql';
import ADD_ADDRESS from '@/graphql/addresses/createAddress.gql';
import ADDRESSES from '@/graphql/addresses/addresses.gql';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addPartnerCompanyAddress(context, payload) {
    const {
      name, building, landmark, street, pincode, stateId, isAdmin,
    } = payload;
    // if (!name || !building || !landmark || !street || !pincode || !stateId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: ADD_ADDRESS,
      variables: {
        name, building, landmark, street, pincode, stateId, isAdmin,
      },
    });
    if (data && data.createAddress) {
      data = data.createAddress;
      context.commit('setAddPartnerCompanyAddressInState', data);
    }
    return data;
  },
  async getPartnerCompanyAddress(context) {
    let { data } = await $apollo.query({ query: ADDRESSES });
    if (data && data.addresses && data.addresses.length > 0) {
      data = data.addresses[0];
      context.commit('setPartnerCompanyAddressInState', data);
    }
    return data;
  },
  async getPartnerBanners(context) {
    const { data } = await $apollo.query({ query: CURRENT_USER });
    context.commit('setPartnerBannersInState', data.banners);
    return data.banners;
  },
});
