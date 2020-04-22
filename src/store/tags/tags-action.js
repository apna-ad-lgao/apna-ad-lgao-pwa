import TAGS from '@/graphql/tags/tags.gql';
import TAG_ADD from '@/graphql/tags/createTags.gql';
import TAGS_DELETE from '@/graphql/tags/deleteTags.gql';
import TAG_UPDATE from '@/graphql/tags/updateTags.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addTag(context, payload) {
    const { name } = payload;
    if (!name) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: TAG_ADD,
      variables: {
        name,
      },
    });
    if (data && data.createTagType) {
      data = data.createTagType;
      context.commit('setAddTagsInState', data);
    }
    return data;
  },
  async getTags(context) {
    let { data } = await $apollo.query({ query: TAGS });
    if (data && data.tags && data.tags.length > 0) {
      data = data.tags;
      context.commit('setTagsInState', data);
    }
    return data;
  },
  async deleteTags(context, payload) {
    const {
      id, name, isHidden,
    } = payload;
    if (!id || !name || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: TAGS_DELETE,
      variables: payload,
    });
    if (data && data.updateTagType) {
      data = data.updateTagType;
      context.commit('setDeleteTagsInState', data);
    }
    return data;
  },
  async updateTag(context, payload) {
    const {
      id, name, isHidden,
    } = payload;
    if (!id || !name || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: TAG_UPDATE,
      variables: payload,
    });
    if (data && data.updateTagType) {
      data = data.updateTagType;
      context.commit('setUpdateTagsInState', data);
    }
    return data;
  },
  async getTag(context) {
    let { data } = await $apollo.query({ query: TAGS });
    if (data && data.tags && data.tags.length > 0) {
      data = data.tags[0];
      context.commit('setTagInState', data);
    }
    return data;
  },
});
