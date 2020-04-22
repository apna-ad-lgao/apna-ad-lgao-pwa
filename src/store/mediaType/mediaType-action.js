import MEDIATYPES from '@/graphql/mediaTypes/mediaTypes.gql';
import MEDIATYPE_ADD from '@/graphql/mediaTypes/createMediaType.gql';
import MEDIATYPE_UPDATE from '@/graphql/mediaTypes/updateMediaType.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addMediaType(context, payload) {
    const { name } = payload;
    if (!name) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: MEDIATYPE_ADD,
      variables: {
        name,
      },
    });
    if (data && data.createMediaType) {
      data = data.createMediaType;
      context.commit('setAddMediaTypeInState', data);
    }
    return data;
  },
  async getMediaTypes(context) {
    let { data } = await $apollo.query({ query: MEDIATYPES });
    if (data && data.mediaTypes && data.mediaTypes.length > 0) {
      data = data.mediaTypes;
      context.commit('setMediaTypesInState', data);
    }
    return data;
  },
  async updateMediaType(context, payload) {
    const {
      id, name, isHidden,
    } = payload;
    if (!id || !name || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: MEDIATYPE_UPDATE,
      variables: payload,
    });
    if (data && data.updateMediaType) {
      data = data.updateMediaType;
      context.commit('setUpdateMediaTypeInState', data);
    }
    return data;
  },
  async getMediaType(context) {
    let { data } = await $apollo.query({ query: MEDIATYPES });
    if (data && data.mediaTypes && data.mediaTypes.length > 0) {
      data = data.mediaTypes[0];
      context.commit('setMediaTypeInState', data);
    }
    return data;
  },
});
