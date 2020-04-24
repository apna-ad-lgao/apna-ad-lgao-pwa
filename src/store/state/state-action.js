import STATES from '@/graphql/states/states.gql';
import STATE_ADD from '@/graphql/states/createState.gql';
import STATE_UPDATE from '@/graphql/states/updateState.gql';
import GET_STATES_FOR_COUNTRY from '@/graphql/states/getStatesForCountry.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addState(context, payload) {
    const { name } = payload;
    if (!name) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: STATE_ADD,
      variables: {
        name,
      },
    });
    if (data && data.createState) {
      data = data.createState;
      context.commit('setAddStateInState', data);
    }
    return data;
  },
  async getStates(context) {
    let { data } = await $apollo.query({ query: STATES });
    if (data && data.states && data.states.length > 0) {
      data = data.states;
      context.commit('setStatesInState', data);
    }
    return data;
  },
  async getStatesByCountryId(context, payload) {
    let { countryId } = payload;
    let { data } = await $apollo.query({ query: GET_STATES_FOR_COUNTRY,
      variables: { countryId, isHidden: false, },
    });
    if (data && data.states && data.states.length > 0) {
      data = data.states;
      context.commit('setStatesInState', data);
    }
    return data;
  },
  async updateState(context, payload) {
    const {
      id, name, isHidden,
    } = payload;
    if (!id || !name || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: STATE_UPDATE,
      variables: payload,
    });
    if (data && data.updateState) {
      data = data.updateState;
      context.commit('setUpdateStateInState', data);
    }
    return data;
  },
});
