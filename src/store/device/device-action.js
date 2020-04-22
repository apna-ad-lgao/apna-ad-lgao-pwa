import DEVICES from '@/graphql/countries/countries.gql';
import DEVICE_ADD from '@/graphql/countries/createDevice.gql';
import DEVICE_UPDATE from '@/graphql/countries/updateDevice.gql';
import { AUTH_ERRORS } from '../../utils/error';

// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  async addDevice(context, payload) {
    const {
      uuid, model, platform, fingerprint,
    } = payload;
    if (!uuid || !model || !platform || !fingerprint) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: DEVICE_ADD,
      variables: {
        uuid, model, platform, fingerprint,
      },
    });
    if (data && data.createDevice) {
      data = data.createDevice;
      context.commit('setAddDeviceInState', data);
    }
    return data;
  },
  async getDevices(context) {
    let { data } = await $apollo.query({ query: DEVICES });
    if (data && data.devices && data.devices.length > 0) {
      data = data.devices;
      context.commit('setDevicesInState', data);
    }
    return data;
  },
  async updateDevice(context, payload) {
    const {
      id, fingerprint,
    } = payload;
    if (!id || !fingerprint) throw new Error(AUTH_ERRORS.INVALID_DETAIL.message);
    let { data } = await $apollo.mutate({
      mutation: DEVICE_UPDATE,
      variables: payload,
    });
    if (data && data.updateDevice) {
      data = data.updateDevice;
      context.commit('setUpdateDeviceInState', data);
    }
    return data;
  },
  async getDevice(context) {
    let { data } = await $apollo.query({ query: DEVICES });
    if (data && data.devices && data.devices.length > 0) {
      data = data.devices[0];
      context.commit('setDeviceInState', data);
    }
    return data.devices;
  },
});
