import bannerActionModule from './banner-action';

const initializeState = () => ({
  banner: {},
  banners: [],
  partnerBanner: {},
  partnerBanners: [],
  publicBanner: {},
  publicBanners: [],
});

export default ({ $http, $vf, $apollo }) => ({
  state: initializeState(),
  mutations: {
    setBannerInState(state, payload) {
      state.banner = Object.keys(payload).length ? payload : {};
    },
    setBannersInState(state, payload) {
      state.banners = Object.keys(payload).length ? payload : {};
    },
    setPartnerBannerInState(state, payload) {
      state.partnerBanner = Object.keys(payload).length ? payload : {};
    },
    setPartnerBannersInState(state, payload) {
      state.partnerBanners = Object.keys(payload).length ? payload : {};
    },
    setAddPartnerBannerInState(state, payload) {
      state.partnerBanner = Object.keys(payload).length ? payload : {};
    },
    setUpdatePartnerBannersInState(state, payload) {
      state.partnerBanner = Object.keys(payload).length ? payload : {};
    },
    setPublicBannerInState(state, payload) {
      state.publicBanner = Object.keys(payload).length ? payload : {};
    },
    setPublicBannersInState(state, payload) {
      state.publicBanners = Object.keys(payload).length ? payload : {};
    },
  },
  actions: bannerActionModule({ $http, $vf, $apollo }),
  getters: {
    banner: (state) => state.banner,
    banners: (state) => state.banners,
    partnerBanner: (state) => state.partnerBanner,
    partnerBanners: (state) => state.partnerBanners,
    publicBanner: (state) => state.publicBanner,
    publicBanners: (state) => state.publicBanners,
  },
});
