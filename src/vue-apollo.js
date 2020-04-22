import { onError } from 'apollo-link-error';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
// eslint-disable-next-line
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client';

const link = onError(({
  operation, graphQLErrors, networkError,
}) => {
  if (graphQLErrors) {
    // eslint-disable-next-line no-console
    graphQLErrors.map(({ message, locations, path }) => console.warn(
      '%c[GraphQL error]', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
      `Message: ${message}, Location: ${locations}, Path: ${path}, Operation: ${operation.operationName}`,
    ));
  }

  if (networkError) {
    const error = { ...networkError };
    const { bodyText, response, result } = error;
    if (response) {
      const { status } = response;
      if (status === 401 || status === 403) {
      // store.dispatch('addToastNotifications', {
      //   text: 'Oops! You got logged out. Login again.',
      //   timer: 4000,
      //   type: 'error',
      // });

        // Logout the user
        // store.dispatch('logout', store.state.route.fullPath);
        localStorage.clear();
        window.location.href = '#/login';
      }
      // eslint-disable-next-line no-console
      console.warn('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', bodyText || result);
    }
  } else {
    console.warn('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', 'server is offline');
  }
});

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = 'accessToken';

// Http endpoint
// const apiSuffix = '/api/v1/graphql';
const apiSuffix = '/graphql';
let httpEndpoint;
switch (process.env.VUE_APP_BUILD) {
  case 'production':
    httpEndpoint = `https://pulse.azurefd.net${apiSuffix}`;
    break;
  case 'development':
    httpEndpoint = `https://ohi-api-uat.azurewebsites.net${apiSuffix}`;
    break;
  default:
    httpEndpoint = `http://localhost:4001${apiSuffix}`;
    break;
}
// Files URL root
export const filesRoot = process.env.VUE_APP_FILES_ROOT || httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql'));

Vue.prototype.$filesRoot = filesRoot;

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://ohi-api-dev.azurewebsites.net/graphql',
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  httpLinkOptions: {
    headers: {
      'x-oauth-config-provider': 'okta-acf',
      // 'x-authorized-ohrid': 850046713,
    },
  },
  link,

  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  getAuth: () => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return `Bearer ${token}`;
  },

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
};

// Create apollo client
const { apolloClient, wsClient } = createApolloClient({
  ...defaultOptions,
  addTypename: false,
  inMemoryCacheOptions: {
    freezeResults: false,
  },
});
apolloClient.wsClient = wsClient;

export default apolloClient;

// Call this in the Vue app file
export function createProvider(store) {
  console.log('TCL: createProvider -> store', store);
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: 'cache-and-network',
        // fetchPolicy: 'network-only',
        // fetchPolicy: 'no-cache',
      },
    },
  });

  return apolloProvider;
}

// Manually call this when user log in
export async function onLogin(apolloClientLocal, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClientLocal.wsClient) restartWebsockets(apolloClientLocal.wsClient);
  try {
    await apolloClientLocal.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message);
  }
}

// Manually call this when user log out
export async function onLogout(apolloClientLocal) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClientLocal.wsClient) restartWebsockets(apolloClientLocal.wsClient);
  try {
    await apolloClientLocal.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message);
  }
}
