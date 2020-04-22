<template>
  <main class="app-root-wrapper">
    <vue-progress-bar :class="deviceClass" class="top-progress-bar" />
    <device-view :class="deviceClass" />
    <div v-if="!isApp && updateExists" class="fixed z-20 inset-0 full-width my-5">
      <p class="py-3 w-4/5 text-center bg-gray-800 rounded text-white text-sm flex justify-center align-center mx-auto">
        New version of Apna Ad Lgao is available
        <button id="refresh-button" class="uppercase ml-1 font-bold text-blue-500" @click="refreshApp">
          <i class="fa fa-refresh" />Update
        </button>
      </p>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import {
  isIOS,
  isAndroid,
  isSafari,
  isMobile,
} from 'mobile-device-detect';

const getAppVersion = () => {
  const url = `/package.json?c=${Date.now()}`;
  const headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  };

  return fetch(url, { headers }).then((response) => response.json());
};

export default {
  name: 'App',
  components: {
    DeviceView: () => {
      if (isMobile) {
        return import('./Mobile.vue');
      }
      return import('./Mobile.vue');
    },
  },
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
  computed: {
    deviceClass() {
      let classStr = ' ';
      classStr += isMobile ? ' mobile-wrapper ' : ' desktop-wrapper';
      classStr += isSafari ? ' safari ' : '';
      classStr += isIOS ? ' ios' : '';
      classStr += isAndroid ? ' android' : '';
      classStr += this.$route.name !== 'Dashboard.Article.Detail' ? ' ios-safe-padding-top' : '';
      return classStr;
    },
  },
  mounted() {
    const handleScreenFocus = () => {
      if (isIOS && document.visibilityState === 'visible') {
        const currentVersion = global.localStorage.getItem('appVersion');

        getAppVersion()
          .then((data) => {
            if (data.version !== currentVersion) {
              global.localStorage.setItem('appVersion', data.version);
              this.showRefreshUI({});
            }
          });
      }
    };

    document.addEventListener('visibilitychange', handleScreenFocus);
    // ---
    // Custom code to let user update the app
    // when a new service worker is available
    // ---
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });

    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return;
        this.refreshing = true;
        // Here the actual reload of the page occurs
        window.location.reload(true);
      });
    }

    this.$cordova.on('deviceready', () => {
      this.updateBiometricStatus();
      this.cordovaInit();
      this.setUpFirebase();
      this.checkRootedDevice();
      this.checkSSLPinning();
      this.setScheduledNotifications();
    });
  },
  methods: {
    ...mapActions(['biometricLogin', 'updateBiometricStatus']),
    hideMessage() {
      this.showMessage = false;
    },
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp() {
      window.location.reload(true);
      this.updateExists = false;
      if (!this.registration || !this.registration.waiting) return;
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage('skipWaiting');
    },
    cordovaInit() {
      if (window.universalLinks) {
        window.universalLinks.subscribe('universalLinkEvent', (eventData) => {
          // console.log(`window universal event: ${eventData}`);
          // eslint-disable-next-line
          // alert(`Did launch application from the link: ${JSON.stringify(eventData)}`);
          const {
            path, hash, host, url, params,
          } = eventData;
          console.log(`path is: ${path}`); //eslint-disable-line
          console.log(`host is: ${host}`); //eslint-disable-line
          console.log(`url is: ${url}`); //eslint-disable-line
          console.log(`params are: ${params}`); //eslint-disable-line
          if (hash) {
            this.$router.replace(`${hash}`);
          }
        });
      } else {
        console.log('============================ Universal links not registered =========================='); //eslint-disable-line
      }

      if (cordova.plugins.SecureStorage) {
        window.plugins.secureStorage = new cordova.plugins.SecureStorage(
          (() => {
            console.log('pulseKeychainStorage successfully initialized'); // eslint-disable-line
          }),
          ((error) => {
            console.log(`Error in initalizing pulseKeychainStorage ${error}`); // eslint-disable-line
          }),
          'pulseKeychainStorage',
        );
      }

      this.biometricLogin();
    },
    setUpFirebase() {
      if (window.FirebasePlugin) {
        window.FirebasePlugin.subscribe('global');
        // window.FirebasePlugin.subscribe('test');
        window.FirebasePlugin.grantPermission();
        window.FirebasePlugin.hasPermission((data) => {}); // eslint-disable-line
        /* eslint-disable */
        window.FirebasePlugin.getToken((token) => {
          console.log('device token', token); // eslint-disable-line
        }, (error) => {
          console.log('device token err', error); // eslint-disable-line
        });
        window.FirebasePlugin.onTokenRefresh((token) => {
          console.log('device', token); // eslint-disable-line
        }, (error) => {
          console.log('device err', error); // eslint-disable-line
        });
        window.FirebasePlugin.onNotificationOpen((notification) => {
          window.FirebasePlugin.clearAllNotifications();
          // console.log(`error on notification open: ${notification}`);
          if (notification && notification.reviewCompanyId) {
            this.$router.replace(`dashboard/review/company/${notification.reviewCompanyId}`);
          }
          // console.log(`error on notification open: `,JSON.stringify(notification));
        }, (error) => {
          console.log(`error on notification open: ${error}`);
        });
        /* eslint-enable */
      }
    },
    checkRootedDevice() {
      if ((window.aditya !== null && window.aditya !== undefined) && (window.aditya.rootdetection !== null && window.aditya.rootdetection !== undefined)
    && (window.aditya.rootdetection.RootDetection !== null && window.aditya.rootdetection.RootDetection !== undefined)) {
        window.aditya.rootdetection.RootDetection.isDeviceRooted((val) => {
          if ((val !== null && val !== undefined) && (val.isRootDevice !== null && val.isRootDevice !== undefined) && val.isRootDevice === true) {   /* eslint-disable-line */
            alert('This device is rooted, pulse can not be run on this device'); // eslint-disable-line
          }
        }, (err) => {}); // eslint-disable-line
      }
    },
    checkSSLPinningForASite(server, fingerprint) {
      function successCallback(message) {   /* eslint-disable-line */
      // Message is always: CONNECTION_SECURE.
      // Now do something with the trusted server.
        console.log('connection is valid!');   /* eslint-disable-line */
      }

      function errorCallback(message) {
        function alertDismissed() {
          cordova.plugins.exit();
        }

        if (navigator.notification) {
          navigator.notification.alert(
            message,
            alertDismissed, // callback
            'Security Error', // title
            'Close', // buttonName
          );
        } else cordova.plugins.exit();

        if (message === 'CONNECTION_NOT_SECURE') {
          // console.log('Aditya: error found CONNECTION_NOT_SECURE');
        // There is likely a man in the middle attack going on, be careful!
          cordova.plugins.exit();
        } else if (message.indexOf('CONNECTION_FAILED') > -1) {
          // console.log('Aditya: error found CONNECTION_FAILED');
        // There was no connection (yet). Internet may be down. Try again (a few times) after a little timeout.
          alert('Internet may be down. Try again after a while.');   /* eslint-disable-line */
        }
      }

      if (window.plugins && window.plugins.sslCertificateChecker) {
        window.plugins.sslCertificateChecker.check(
          successCallback,
          errorCallback,
          server,
          fingerprint,
        );
      }
    },
    checkSSLPinning() {
      const server = 'https://pulse.azurefd.net';
      const fingerprint = 'B6 9B 29 62 D8 14 1A 91 12 B4 F0 ED A4 D6 A2 13 5E BE 0B F7 AC 5B 41 A9 36 32 1A 93 C9 E7 1E 75';
      this.checkSSLPinningForASite(server, fingerprint);
    },
    setScheduledNotifications() {
      if (window.cordova && cordova.plugins.notification) {
        cordova.plugins.notification.local.cancelAll();
        cordova.plugins.notification.local.schedule({
          id: 1,
          title: 'Pulse input reminder',
          text: 'It is time to give inputs for the assigned accounts.',
          trigger: {
            every: {
              weekday: 1,
              hour: 10,
              minute: 0,
            },
            count: 365,
          },
        });
      }
    },
  },
};
</script>

<style src="@/styles/tailwind.css" />
<style src="@fortawesome/fontawesome-free/css/all.css" />
