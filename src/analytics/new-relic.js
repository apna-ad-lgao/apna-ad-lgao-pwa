/* eslint-disable no-console */

import Axios from 'axios';
import * as mbd from 'mobile-device-detect';
import Localforage from 'localforage'; // eslint-disable-line
import { version } from '../../package.json';

const isProd = process.env.VUE_APP_BUILD === 'production';
const isApp = process.env.VUE_APP_RUN_ENV === 'app';
let subDomain = window.location.hostname.split('.azurefd.')[0] || 'localhost';
subDomain = subDomain.toLowerCase();
const isLocal = subDomain.includes('localhost') && !isProd && !isApp;

Axios.defaults.headers.common.Accept = 'application/json';
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.headers.common['X-Insert-Key'] = 'iaopqRPJy2MzMgQdKJpxziMbfebWZhzi';

let identity = {};

const flattenObject = (ob) => {
  const toReturn = {};
  Object.keys(ob).forEach((i) => {
    if ((typeof ob[i]) === 'object' && ob[i] !== null) {
      const flatObject = flattenObject(ob[i]);

      Object.keys(flatObject).forEach((x) => {
        toReturn[`${i}.${x}`] = flatObject[x];
      });
    } else {
      toReturn[i] = ob[i];
    }
  });
  return toReturn;
};

const QueryStringToJSON = (string) => {
  let pairs;
  if (string) pairs = string.slice(1).split('&');
  else pairs = window.location.search.slice(1).split('&');

  const result = {};
  pairs.forEach((p) => {
    let pair = p;
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
};

const sendEventData = async (payload) => Axios.post('https://insights-collector.newrelic.com/v1/accounts/1545251/events', payload, {
  requestName: 'newRelic',
});

const getUserIdentity = async () => {
  const { ohrId, login } = await Localforage.getItem('user') || {};
  identity = { ...identity, ohrId, login };
  return identity;
};

let deviceType = 'desktop';
if (mbd.isMobile) deviceType = 'mobile';
else if (mbd.isTablet) deviceType = 'tablet';

const getNewRelicDefaults = () => ({
  appId: window.location.origin.includes('pulse.genpact.com') || !!window.cordova ? 'XXX' : 'XXX',
  appName: window.location.origin.includes('pulse.genpact.com') || !!window.cordova ? 'Genpact_OHI_PROD' : 'Genpact_OHI_UAT',
  city: '',
  countryCode: '',
  deviceType,
  domain: window.location.hostname,
  pageUrl: window.location.href.split(window.location.origin)[1],
  // pagePath: window.location.pathname,
  pagePath: window.location.hash.split('#')[1].split('?')[0],
  pageQuery: QueryStringToJSON(`?${window.location.hash.split('#')[1].split('?')[1]}`),
  regionCode: '',
  userAgentName: mbd.browserName,
  userAgentOS: mbd.osName,
  userAgentVersion: mbd.fullBrowserVersion,
});

const getGlobalProperties = () => ({
  device: {
    mobileModel: (window.detect && window.detect.model) || mbd.mobileModel || null,
    mobileVendor: (window.detect && window.detect.manufacturer) || mbd.mobileVendor || null,
    osName: (window.detect && window.detect.platform) || mbd.osName || null,
    osVersion: (window.detect && window.detect.version) || mbd.osVersion || null,
    isAndroid: mbd.isAndroid || null,
    isBrowser: mbd.isBrowser || null,
    isChrome: mbd.isChrome || null,
    isChromium: mbd.isChromium || null,
    isConsole: mbd.isConsole || null,
    isEdge: mbd.isEdge || null,
    isFirefox: mbd.isFirefox || null,
    isIE: mbd.isIE || null,
    isIOS: mbd.isIOS || null,
    isMobile: mbd.isMobile || null,
    isMobileOnly: mbd.isMobileOnly || null,
    isMobileSafari: mbd.isMobileSafari || null,
    isOpera: mbd.isOpera || null,
    isSafari: mbd.isSafari || null,
    isSmartTV: mbd.isSmartTV || null,
    isTablet: mbd.isTablet || null,
    isWearable: mbd.isWearable || null,
    isWinPhone: mbd.isWinPhone || null,
    isYandex: mbd.isYandex || null,
    uuid: (window.detect && window.detect.uuid) || null,
    cordova: (window.detect && window.detect.cordova) || null,
    isApp: (window.detect && window.detect.cordova) || false,
    isVirtual: (window.detect && window.detect.isVirtual) || false,
    screen: {
      width: window.screen.width || null,
      height: window.screen.height || null,
      colorDepth: window.screen.colorDepth || null,
      availableScreenWidth: window.screen.availWidth || null,
      availableScreenHeight: window.screen.availHeight || null,
      viewportWidth: window.innerWidth || null,
      viewportHeight: window.innerHeight || null,
      devicePixelRatio: window.devicePixelRatio || null,
    },
  },
  browser: {
    browserName: mbd.browserName || null,
    browserVersion: mbd.browserVersion || null,
    engineName: mbd.engineName || null,
    engineVersion: mbd.engineVersion || null,
    fullBrowserVersion: mbd.fullBrowserVersion || null,
    userAgent: mbd.getUA || null,
    language: window.navigator.language || null,
    languages: (window.navigator.languages && window.navigator.languages[window.navigator.languages.length]) || null,
    doNotTrack: window.navigator.doNotTrack || null,
    cookieEnabled: window.navigator.cookieEnabled || null,
    localStorageEnabled: !!window.localStorage || null,
    sessionStorageEnabled: !!window.sessionStorage || null,
  },
  // location: {},
  appVersion: (window.detect && window.detect.cordova) || null,
  releaseTag: version,
  environment: isProd ? 'production' : 'development',
  identity,
});

export default {
  getGlobalProperties,
  init() {
    getUserIdentity();
  },
  register(properties) {
    identity = { ...properties };
  },
  setUserProperties(properties) {
    identity = { ...identity, ...properties };
  },
  resetUser() {
    identity = {};
  },
  track({ eventName = '', type, properties = {} }) {
    if (!type) throw new Error('\'type\' is required parameter to track events.');

    let eventProperties = properties;
    if (type === 'ScreenView') eventProperties = { screen: properties };
    else if (type === 'InteractionEvent') {
      if (!properties.name || !properties.action) throw new Error('\'name\' & \'action\' is required parameter to track \'InteractionEvent\' events.');
      eventProperties = {
        name: properties.name,
        action: properties.action,
        event: properties,
      };
    }

    const data = {
      eventType: type,
      name: eventName,
      timestamp: new Date().toISOString(),
      ...flattenObject(getGlobalProperties()),
      ...flattenObject(getNewRelicDefaults()),
      ...flattenObject(eventProperties),
    };
    if (!isProd && !isLocal) console.info('Sending analytics data: ', data);
    if (!isLocal) sendEventData(data);
  },
};
