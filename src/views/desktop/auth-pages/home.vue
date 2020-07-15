<template>
  <section class="auth-page h-screen bg-gray-100">
    <!-- component -->
    <modal></modal>
    <div class="main">
      <dashboardHeader></dashboardHeader>
      <dashboardBanner></dashboardBanner>
      <div class="py-2">
          <DashboardMidView></DashboardMidView>
      </div>
      <div class="container mx-auto">
        <div class="flex">          
          <dashboardHoarding></dashboardHoarding>
          
        </div>
      </div>
      <dashboardSideNav></dashboardSideNav>
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
import modal from '@/components/modal.vue';

export default {
  components: {
    dashboardBanner,
    DashboardMidView,
    dashboardHeader,
    dashboardSideNav,
    dashboardHoarding,
    dashboardFooter,
    modal
  },
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
    };
  },
};
</script>

<style lang="scss" src="@/styles/mobile/auth.scss" />
