import USERDEVICES from '@/graphql/userDevices/userDevices.gql';
import USERDEVICE_ADD from '@/graphql/userDevices/createUserDevice.gql';
import USERDEVICE_UPDATE from '@/graphql/userDevices/updateUserDevice.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addUserDevice(context, payload) {
    const { userId, deviceId } = payload;
    if (!userId || !deviceId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: USERDEVICE_ADD,
      variables: {
        userId,
        deviceId,
      },
    });
    if (data && data.createUserDevice) {
      data = data.createUserDevice;
      context.commit('setAddUserDeviceInState', data);
    }
    return data;
  },
  async getUserDevices(context) {
    let { data } = await $apollo.query({ query: USERDEVICES });
    if (data && data.userDevices && data.userDevices.length > 0) {
      data = data.userDevices;
      context.commit('setUserDevicesInState', data);
    }
    return data;
  },
  async updateUserDevice(context, payload) {
    const {
      id, deviceId,
    } = payload;
    if (!id || !deviceId) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: USERDEVICE_UPDATE,
      variables: payload,
    });
    if (data && data.updateUserDevice) {
      data = data.updateUserDevice;
      context.commit('setUpdateUserDeviceInState', data);
    }
    return data;
  },
  async getUserDevice(context) {
    let { data } = await $apollo.query({ query: USERDEVICES });
    if (data && data.userDevices && data.userDevices.length > 0) {
      data = data.userDevices[0];
      context.commit('setUserDeviceInState', data);
    }
    return data;
  },
});
