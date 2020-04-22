import ADD_ADDRESS from '@/graphql/addresses/createAddress.gql';
import ADDRESSES from '@/graphql/addresses/addresses.gql';
import UPDATE_ADDRESS from '@/graphql/addresses/updateAddress.gql';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async getAddress(context) {
    let { data } = await $apollo.query({ query: ADDRESSES });
    if (data && data.addresses && data.addresses.length > 0) {
      data = data.addresses[0];
      context.commit('setAddressInState', data);
    }
    return data;
  },
  async getAddresses(context, payload) {
    let { data } = await $apollo.query({ query: ADDRESSES });
    if (data && data.addresses && data.addresses.length > 0) {
      data = data.addresses;
      context.commit('setAddressInState', data);
    }
    return data;
  },
  async getPartnerAddress(context) {
    let { data } = await $apollo.query({ query: ADDRESSES });
    if (data && data.addresses && data.addresses.length > 0) {
      data = data.addresses[0];
      context.commit('setPartnerAddressInState', data);
    }
    return data;
  },
  async getPartnerAddresses(context, payload) {
    let { data } = await $apollo.query({ query: ADDRESSES });
    if (data && data.addresses && data.addresses.length > 0) {
      data = data.addresses;
      context.commit('setPartnerAddressesesInState', data);
    }
    return data;
  },
  async addPartnerAddress(context, payload) {
    const {
      name, building, landmark, street, pincode, stateId, userId, isAdmin,
    } = payload;
    if (!name || !building || !landmark || !street || !pincode || !stateId || !userId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: ADD_ADDRESS,
      variables: {
        name, building, landmark, street, pincode, stateId, isAdmin,
      },
    });
    if (data && data.createAddress) {
      data = data.createAddress;
      context.commit('setAddPartnerAddressInState', data);
    }
    return data;
  },
  async updatePartnerAddress(context, payload) {
    const {
      id, name, building, landmark, street, pincode, stateId, userId, isAdmin,
    } = payload;
    if (!id || !name || !building || !landmark || !street || !pincode || !stateId || !userId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: UPDATE_ADDRESS,
      variables: {
        id, name, building, landmark, street, pincode, stateId, userId, isAdmin,
      },
    });
    if (data && data.createAddress) {
      data = data.createAddress;
      context.commit('setAddPartnerAddressInState', data);
    }
    return data;
  },
});
