import USERS from '@/graphql/users/users.gql';
import USER_ADD from '@/graphql/users/createUser.gql';
import USER_ACTIVATE from '@/graphql/users/activateUser.gql';
import USER_DELETE from '@/graphql/users/deleteUser.gql';
import USER_UPDATE from '@/graphql/users/updateUser.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addUser(context, payload) {
    const { name } = payload;
    if (!name) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: USER_ADD,
      variables: {
        name,
      },
    });
    if (data && data.createUser) {
      data = data.createUser;
      context.commit('setAddUserInUser', data);
    }
    return data;
  },
  async getUsers(context) {
    let { data } = await $apollo.query({ query: USERS });
    if (data && data.users && data.users.length > 0) {
      data = data.users;
      context.commit('setUsersInUser', data);
    }
    return data;
  },
  async updateUser(context, payload) {
    const {
      id, name, isHidden,
    } = payload;
    if (!id || !name || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: USER_UPDATE,
      variables: payload,
    });
    if (data && data.updateUser) {
      data = data.updateUser;
      context.commit('setUpdateUserInUser', data);
    }
    return data;
  },
  async getUser(context) {
    let { data } = await $apollo.query({ query: USERS });
    if (data && data.users && data.users.length > 0) {
      data = data.users[0];
      context.commit('setUserInUser', data);
    }
    return data;
  },
  async activateUser(context, payload) {
    const {
      userId, isHidden,
    } = payload;
    if (!userId || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: USER_ACTIVATE,
      variables: payload,
    });
    if (data && data.users && data.users.length > 0) {
      data = data.users[0];
      context.commit('setActivateUserInState', data);
    }
    return data;
  },
  async deleteUser(context, payload) {
    const {
      userId, isHidden,
    } = payload;
    if (!userId || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: USER_DELETE,
      variables: payload,
    });
    if (data && data.users && data.users.length > 0) {
      data = data.users[0];
      context.commit('setDeleteUserInState', data);
    }
    return data;
  },
});
