import COMPANIES from '@/graphql/companies/companies.gql';
import COMPANY_ADD from '@/graphql/companies/createCompanies.gql';
import COMPANY_UPDATE from '@/graphql/companies/updateCompanies.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addCompany(context, payload) {
    const {
      name, description, image, isParentCompany, addressId,
    } = payload;
    if (!name || !description || !image || !addressId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: COMPANY_ADD,
      variables: {
        name, description, image, isParentCompany, addressId,
      },
    });
    if (data && data.createCompany) {
      data = data.createCompany;
      context.commit('createCompanyInState', data);
    }
    return data;
  },
  async getCompanies(context) {
    let { data } = await $apollo.query({ query: COMPANIES });
    if (data && data.companies && data.companies.length > 0) {
      data = data.companies;
      context.commit('setCompaniesInState', data);
    }
    return data;
  },
  async updateCompany(context, payload) {
    const {
      id, name, description, image, addressId,
    } = payload;
    if (!id || !name || !description || !image || !addressId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: COMPANY_UPDATE,
      variables: payload,
    });
    if (data && data.updateCompany) {
      data = data.updateCompany;
      context.commit('updateCompanyInState', data);
    }
    return data;
  },
  async getPartnerCompany(context) {
    let { data } = await $apollo.query({ query: COMPANIES });
    if (data && data.companies && data.companies.length > 0) {
      data = data.companies[0];
      context.commit('setPartnerCompanyInState', data);
    }
    return data.companies;
  },
});
