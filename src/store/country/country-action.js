import COUNTRIES from '@/graphql/countries/countries.gql';
import COUNTRY_ADD from '@/graphql/countries/createCountry.gql';
import COUNTRY_UPDATE from '@/graphql/countries/updateCountry.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addCountry(context, payload) {
    const {
      name, alpha2code, alpha3code, isonumeric, continent,
    } = payload;
    if (!name || !alpha2code || !alpha3code || !isonumeric || !continent) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: COUNTRY_ADD,
      variables: {
        name, alpha2code, alpha3code, isonumeric, continent,
      },
    });
    if (data && data.createCompany) {
      data = data.createCompany;
      context.commit('setAddCountryInState', data);
    }
    return data;
  },
  async getCountries(context) {
    let { data } = await $apollo.query({ query: COUNTRIES });
    if (data && data.countries && data.countries.length > 0) {
      data = data.countries;
      context.commit('setCountriesInState', data);
    }
    return data;
  },
  async updateCountry(context, payload) {
    const {
      id, name, description, image, addressId,
    } = payload;
    if (!id || !name || !description || !image || !addressId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: COUNTRY_UPDATE,
      variables: payload,
    });
    if (data && data.updateCompany) {
      data = data.updateCompany;
      context.commit('setUpdateCountryInState', data);
    }
    return data;
  },
  async getCountry(context) {
    let { data } = await $apollo.query({ query: COUNTRIES });
    if (data && data.countries && data.countries.length > 0) {
      data = data.countries[0];
      context.commit('setCountryInState', data);
    }
    return data;
  },
});
