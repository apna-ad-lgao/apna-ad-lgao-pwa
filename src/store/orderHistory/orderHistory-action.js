import ORDERHISTORIES from '@/graphql/orderHistories/orderHistories.gql';
import ORDERHISTORY_ADD from '@/graphql/orderHistories/createOrderHistory.gql';
import ORDERHISTORIES_DELETE from '@/graphql/orderHistories/deleteOrderHistory.gql';
import ORDERHISTORY_UPDATE from '@/graphql/orderHistories/updateOrderHistory.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addOrderHistory(context, payload) {
    const {
      total, status, fromDate, toDate, userId, bannerId,
    } = payload;
    if (!total || !status || !fromDate || !toDate || !userId || !bannerId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: ORDERHISTORY_ADD,
      variables: {
        total, status, fromDate, toDate, userId, bannerId,
      },
    });
    if (data && data.createOrderHistoryType) {
      data = data.createOrderHistoryType;
      context.commit('setAddOrderHistoriesInState', data);
    }
    return data;
  },
  async getOrderHistories(context) {
    let { data } = await $apollo.query({ query: ORDERHISTORIES });
    if (data && data.tags && data.tags.length > 0) {
      data = data.tags;
      context.commit('setOrderHistoriesInState', data);
    }
    return data;
  },
  async deleteOrderHistories(context, payload) {
    const {
      id, name, isHidden,
    } = payload;
    if (!id || !name || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: ORDERHISTORIES_DELETE,
      variables: payload,
    });
    if (data && data.updateOrderHistoryType) {
      data = data.updateOrderHistoryType;
      context.commit('setDeleteOrderHistoriesInState', data);
    }
    return data;
  },
  async updateOrderHistory(context, payload) {
    const {
      id, name, isHidden,
    } = payload;
    if (!id || !name || !isHidden) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: ORDERHISTORY_UPDATE,
      variables: payload,
    });
    if (data && data.updateOrderHistoryType) {
      data = data.updateOrderHistoryType;
      context.commit('setUpdateOrderHistoryInState', data);
    }
    return data;
  },
  async getOrderHistory(context) {
    let { data } = await $apollo.query({ query: ORDERHISTORIES });
    if (data && data.tags && data.tags.length > 0) {
      data = data.tags[0];
      context.commit('setOrderHistoryInState', data);
    }
    return data;
  },
});
