<template>
  <section class="auth-page bg-white h-screen">
      <!-- component -->
    <div class="main">

      <dashboardHeader></dashboardHeader>

      <div class="bg-gray-100 py-2">
        <DashboardMidView></DashboardMidView>
      </div>

      <div class="flex bg-jaffa-500">

        <dashboardSideNav></dashboardSideNav>

        <dashboardHoarding></dashboardHoarding>

      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DashboardMidView from '@/components/dashboard/dashboardMid.vue';
import dashboardHeader from '@/components/dashboard/dashboardHeader.vue';
import dashboardSideNav from '@/components/dashboard/dashboardSideNav.vue';
import dashboardHoarding from '@/components/dashboard/dashboardHoarding.vue';

export default {
  components: {
    DashboardMidView,
    dashboardHeader,
    dashboardSideNav,
    dashboardHoarding,
  },
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
    };
  },
};
</script>

<style lang="scss" src="@/styles/mobile/auth.scss" />
