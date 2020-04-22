<template>
  <section
    :data-route-name="routeName"
    class="w-full md:w-2/3 mx-auto"
    :class="{
      'full-view': $route.name === 'Dashboard.Article.Detail',
      ' h-screen' : $route.name === 'Dashboard.Search',
      'header-colapsed' : !hideNavScroll,
      'footer-visible': footerVisible,
    }"
  >
    <transition name="fade">
      <!-- <Header
        v-if="$route.meta.showHeader"
        :user="user"
        :show-back="$route.meta.showBack || false"
        :class="{'no-shadow' : !showHeaderShadow}"
        @hideNavScroll="hideNavScrollFunc"
      /> -->
      <Header
        v-if="$route.meta.showHeader"
        :user="user"
        :show-back="$route.meta.showBack || false"
        @hideNavScroll="hideNavScrollFunc"
      />
    </transition>

    <div v-if="loading" class="text-center m-10 pt-10">
      <img class="mb-5 block mx-auto" src="/img/loader.gif" width="40" alt="Loader Gif">
      <p class="mx-auto leading-normal text-lg">
        Fetching your information
      </p>
    </div>
    <div v-else-if="error" class="text-center h-screen flex items-center justify-center flex-col mx-4">
      <p class="mx-auto leading-normal text-lg">
        {{ error }}
      </p>
      <button class="bg-brand-color button hover:bg-red-600 leading-normal mb-12 mt-5 py-2 w-1/2 rounded text-white" @click.prevent="logout">
        Logout
      </button>
    </div>
    <transition v-else-if="Object.keys(user).length" name="fade">
      <keep-alive exclude="TaskDetail">
        <router-view
          class="view main-cont"
          :user="user"
          :class="{ 'mt-12 pt-3' : $route.meta.showHeader && $route.meta.showBack, 'footer-visible': footerVisible }"
          @showHeaderShadowEvent="showHeaderShadowEventHandler"
        />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CURRENT_USER from '@/graphql/users/users.gql';

export default {
  name: 'DashboardRoot',
  components: {
    Header: () => import('@/components/desktop/header.vue'),
  },
  data() {
    return {
      user: {},
      error: '',
      loading: false,
      hideNavScroll: false,
      footerVisible: false,
      showHeaderShadow: false,
    };
  },
  computed: {
    ...mapGetters(['viewScrollPos']),
    routeName() {
      if (this.$route.meta.saveScrollPos && this.viewScrollPos[this.$route.name]) {
        // eslint-disable-next-line
        setTimeout(() => {
          window.scrollTo(this.viewScrollPos[this.$route.name].x, this.viewScrollPos[this.$route.name].y);
        }, 0);
      }
      return this.$route.name;
    },
  },
  // async beforeMount() {
  // if (this.$route.name === 'DashboardRootPage') this.$router.replace({ name: 'Dashboard.Tasks' });
  // await this.fetchUserPreferences();
  // },
  async beforeMount() {
    this.loading = true;
    try {
      const { data } = await this.$apollo.query({ query: CURRENT_USER, fetchPolicy: 'network-only' });
      // console.log('data --------> ', data);
      const user = (data.user && data.user[0]) || {};
      this.user = user;
      if (!Object.keys(user).length || (!parseInt(user.isAdmin, 10) && !parseInt(user.isVOC, 10) && !parseInt(user.isVOD, 10) && !parseInt(user.isReviewer, 10))) {
        this.error = `You do not have access to the application or your access has been revoked. Please contact the administrator.\nCode: ${!Object.keys(user).length ? 0 : 1}`;
      } else if (user && parseInt(user.isAdmin, 10) && !parseInt(user.isVOC, 10) && !parseInt(user.isVOD, 10) && !this.$route.name.includes('Dashboard.Review')) {
        this.$router.replace({ name: 'Dashboard.Review' });
      } else if (user && !parseInt(user.isAdmin, 10) && this.$route.name.includes('Dashboard.Review')) {
        this.$router.replace({ name: 'Dashboard.Tasks' });
      } else if (this.$route.name === 'DashboardRootPage') this.$router.replace({ name: 'Dashboard.Tasks' });
    } catch (e) {
      this.error = `You do not have access to the application or your access has been revoked. Please try to refresh or contact the administrator.\nCode: ${e.message}`;
      console.warn(e.message); // eslint-disable-line
      const error = { ...e };
      if (error.networkError && (error.networkError.statusCode === 401 || error.networkError.statusCode === 403)) {
        this.$store.dispatch('addToastNotifications', {
          text: 'Oops! You got logged out. Login again.',
          timer: 4000,
          type: 'error',
        });

        // Logout the user
        this.$store.dispatch('logout', this.$store.state.route.fullPath);
      }
    }
    this.loading = false;
  },
  methods: {
    ...mapActions(['logout']),
    hideNavScrollFunc(e) {
      this.hideNavScroll = e;
    },
    showHeaderShadowEventHandler(e) {
      this.showHeaderShadow = e;
    },
  },
};
</script>

<style>
  .main-cont {
    /* background: url('/img/backgrounds/bg_genpact_pattern_light.png') center center; */
    background-size: contain;
  }
  .dashboard-root-container {
    min-height: 100vh;
    padding: 50px 0 0 250px;
  }
</style>
