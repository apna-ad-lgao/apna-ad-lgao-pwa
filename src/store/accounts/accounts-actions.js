// eslint-disable-next-line no-unused-vars
export default ({ $http, $vf, $apollo }) => ({
  login(context, payload) {
    context.commit('clearToastNotificationsState');
    return $http
      .post('/api/v1/auth/login', payload, {
        requestName: 'login',
      })
      .then(async (res) => {
        const response = res.data;
        response.user = response;
        delete response.data;

        $http.defaults.headers.common.Authorization = `Bearer ${response.token}`;
        try {
          localStorage.setItem('accessToken', response.token);
          await $vf.setItem('accessToken', response.token);
          await $vf.setItem('user', response.user);
        } catch (e) {
          alert('Error setting localforage values'); // eslint-disable-line
          if (window.cordova && window.plugins.exit) cordova.plugins.exit();
        }

        context.commit('setLoggedInState', response);
        // context.commit('setNextRouteState', {
        //   next: context.rootState.route.query.redirect ? context.rootState.route.query.redirect : '/dashboard/tasks',
        // });

        context.commit('setNextRouteState', {
          next: context.rootState.route.query.redirect ? context.rootState.route.query.redirect : '/dashboard/tasks',
        });

        return response;
      });
  },

  biometricLogin(context) {
    context.dispatch('clearToastNotificationsState');
    const cleanup = () => {
      window.plugins.secureStorage.clear(() => {
        console.log('passwordCreds Cleared'); // eslint-disable-line
      },
      () => {
        console.warn('Error clearing passwordCreds'); // eslint-disable-line
      });
      context.dispatch('logout');
      navigator.splashscreen.hide();
    };

    if (window.Fingerprint && window.plugins.secureStorage) {
      window.plugins.secureStorage.keys((keys) => {
        if (keys.includes('passwordCreds')) {
          window.Fingerprint.isAvailable(() => {
            // window.Fingerprint.didFingerprintDatabaseChange((changed) => {
            // if (!changed) {
            window.Fingerprint.show({
              clientId: 'Verify biometric authentication', // Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
              clientSecret: 'o7aoOMYUbyxaD23oFAnJ', // Necessary for Android encrpytion of keys. Use random secret key.
            }, // this will be shown in the native scanner popup
            () => {
              window.plugins.secureStorage.get(
                async (value) => {
                  // navigator.splashscreen.show();
                  const [username, password] = value.split(':::');
                  try {
                    await context.dispatch('login', {
                      username,
                      password,
                      type: 'biometric',
                    });
                    // setTimeout(() => {
                    // context.commit('setNextRouteState', {
                    //   next: '/dashboard/articles',
                    // });
                    // }, 150);
                    navigator.splashscreen.hide();
                  } catch (e) {
                    console.log('exception is: ', e); // eslint-disable-line
                    alert('Authentication error. Password might have changed. Please login again.'); // eslint-disable-line
                    cleanup();
                  }
                },
                () => {
                    alert('Critical error in getting the keychain value. Please login again.'); // eslint-disable-line
                  cleanup();
                },
                'passwordCreds',
              );
            },
            () => {
                console.warn('Biometric ID failure'); // eslint-disable-line
              cleanup();
            });
            // }
            // });
          },
          () => {
            console.warn('Biometric ID not available'); // eslint-disable-line
            setTimeout(() => {
              navigator.splashscreen.hide();
            }, 1000);
          });
        } else {
          console.warn('Password creds does not exist in keychain.'); // eslint-disable-line
          setTimeout(() => {
            navigator.splashscreen.hide();
          }, 1000);
        }
      },
      () => {
        console.warn('Error accessing keychain storage.'); // eslint-disable-line
      });
    }
  },

  register(context, payload) {
    context.commit('clearToastNotificationsState');
    return $http
      .post('/api/v1/auth/register', payload, {
        requestName: 'register',
      })
      .then(async (res) => {
        const response = res.data;
        return response;
      });
  },

  async getSessionFromLocalDb(context) {
    const [accessToken, user] = await Promise.all([$vf.getItem('accessToken'), $vf.getItem('user')]);
    const obj = {
      accessToken,
      user,
    };
    context.commit('updateSessionFromLocalDbInStore', obj);
    return obj;
  },

  async logout(context, redirectUrl) {
    delete $http.defaults.headers.common.Authorization;
    await $vf.clear();
    localStorage.clear();
    console.warn(`/login${redirectUrl && typeof (redirectUrl) === 'string' ? `?redirect=${redirectUrl}` : ''}`); //eslint-disable-line
    context.commit('setNextRouteState', {
      next: `#/login${redirectUrl && typeof (redirectUrl) === 'string' ? `?redirect=${redirectUrl}` : ''}`,
    });
    context.commit('setLoggedOutState');
  },

  getProfile(context) {
    return $http.get('/api/v1/account/profile', {
      requestName: 'getProfile',
    })
      .then((res) => {
        const response = res.data;
        context.commit('setProfileState', response);
        return response;
      });
  },

});
