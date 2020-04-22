// eslint-disable-next-line no-unused-vars
const setAuthHeaders = async ({ store, $http, $vf }) => {
  const accessToken = await $vf.getItem('accessToken');
  if (accessToken) {
    $http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete $http.defaults.headers.common.Authorization;
  }
};

export default async ({ store, $http, $vf }) => {
  // Initialize the function first time
  await setAuthHeaders({ store, $http, $vf });

  // Add a request interceptor
  $http.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      setAuthHeaders({ store, $http, $vf });
      store.dispatch('setRequestStatus', {
        inProgress: true,
        status: 'IN_PROGRESS',
        key: config.requestName || '',
      });
      return config;
    },
    (error) => Promise.reject(error), // Do something with request error
  );

  // Add a response interceptor
  $http.interceptors.response.use(
    (response) => {
      // Do something with response data
      if (response.config.requestName !== 'newRelic') store.dispatch('clearRequestStatus');
      return response;
    },
    (error) => {
      if (error.response && error.response.config && error.response.config.requestName === 'newRelic') return Promise.reject(error);
      // Do something with response error
      try {
        if (error.response && error.response.status === 401) {
          store.dispatch('addToastNotifications', {
            // text: (error.response && error.response.data && error.response.data.message) || 'Oops! You got logged out. Login again.',
            text: `
              Oops! Your session expired. Please log in again!
              Reason: ${error.response && error.response.data && error.response.data.message}
            `,
            timer: 4000,
            type: 'error',
            status: 401,
          });

          // Logout the user
          store.dispatch('logout', store.state.route.fullPath);
        } else if (error.response && error.response.status === 403) {
          store.dispatch('addToastNotifications', {
            text: (error.response && error.response.data && error.response.data.message) || error.message || 'Invalid username or password',
            timer: 4000,
            type: 'error',
          });
        } else {
          store.dispatch('addToastNotifications', {
            text: (error.response && error.response.data && error.response.data.message) || error.message,
            timer: 4000,
            type: 'error',
          });
        }
      } catch (e) {
        console.warn(e.message); // eslint-disable-line
      }

      store.dispatch('clearRequestStatus');
      return Promise.reject(error);
    },
  );
};
