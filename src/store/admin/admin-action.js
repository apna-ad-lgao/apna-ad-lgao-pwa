import CURRENT_USER from '@/graphql/users/users.gql';

export default ({ $http, $vf, $apollo }) => ({
  async getUsers(context) {
    let { data } = await $apollo.query({ query: CURRENT_USER });
    if (data && data.users && data.user.length > 0) {
      data = data.users;
      context.commit('setUserAndCompaniesInState', data);
    }
    return data;
  },
});
