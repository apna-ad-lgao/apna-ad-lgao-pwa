<template>
  <section class="auth-page bg-white h-screen">
      <!-- component -->
    <div class="main">
      <dashboardHeader></dashboardHeader>
      <dashboardBanner></dashboardBanner>
      <div class="py-2">
          <DashboardMidView></DashboardMidView>
      </div>
      <div class="container mx-auto">
        <div class="flex">
          <!-- <dashboardSideNav></dashboardSideNav> -->
          <dashboardHoarding></dashboardHoarding>
        </div>
      </div>
      <dashboardFooter></dashboardFooter>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dashboardBanner from '@/components/dashboard/dashboardBanner.vue';
import DashboardMidView from '@/components/dashboard/dashboardMid.vue';
import dashboardHeader from '@/components/dashboard/dashboardHeader.vue';
import dashboardSideNav from '@/components/dashboard/dashboardSideNav.vue';
import dashboardHoarding from '@/components/dashboard/dashboardHoarding.vue';
import dashboardFooter from '@/components/dashboard/dashboardFooter.vue';

export default {
  components: {
    dashboardBanner,
    DashboardMidView,
    dashboardHeader,
    dashboardSideNav,
    dashboardHoarding,
    dashboardFooter,
  },
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
    };
  },
};
</script>

<style lang="scss" src="@/styles/mobile/auth.scss" />
