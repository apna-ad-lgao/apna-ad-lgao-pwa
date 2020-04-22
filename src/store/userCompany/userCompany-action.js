import USERCOMPANIES from '@/graphql/userCompanies/userCompanies.gql';
import USERCOMPANY_ADD from '@/graphql/userCompanies/createUserCompany.gql';
import USERCOMPANY_UPDATE from '@/graphql/userCompanies/updateUserCompany.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addUserComapny(context, payload) {
    const { name } = payload;
    if (!name) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: USERCOMPANY_ADD,
      variables: {
        name,
      },
    });
    if (data && data.createUserComapny) {
      data = data.createUserComapny;
      context.commit('setAddUserComapnyInState', data);
    }
    return data;
  },
  async getUserComapnies(context) {
    let { data } = await $apollo.query({ query: USERCOMPANIES });
    if (data && data.userCompanies && data.userCompanies.length > 0) {
      data = data.userCompanies;
      context.commit('setUserComapniesInState', data);
    }
    return data;
  },
  async updateUserComapny(context, payload) {
    const {
      id, name, isHidden,
    } = payload;
    if (!id || !name || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: USERCOMPANY_UPDATE,
      variables: payload,
    });
    if (data && data.updateUserComapny) {
      data = data.updateUserComapny;
      context.commit('setUpdateUserComapnyInState', data);
    }
    return data;
  },
  async getUserComapny(context) {
    let { data } = await $apollo.query({ query: USERCOMPANIES });
    if (data && data.userCompanies && data.userCompanies.length > 0) {
      data = data.userCompanies[0];
      context.commit('setUserComapnyInState', data);
    }
    return data;
  },
});
