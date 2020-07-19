<template>
    <div class="banner bg-local py-16 pb-16 flex" style="background-image: url(https://seo.secretlab.pw/seolight/wp-content/uploads/revslider/slider2/slider2-1.jpg)">
      <div class="container m-auto">
        <div class="text-white text-center max-w-xs mx-auto">
          <h1 class="text-5xl font-extrabold leading-tight">Find Yourself Outside.</h1>
          <p class="text-sm my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button type="button" class="px-8 py-1 bg-red-600 hover:bg-red-700 focus:bg-red-700 transition duration-700 ease-in-out rounded-full text-sm h-8 w-32">Discover</button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dashboardBanner',
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
    };
  },
};
</script>

<style scoped>
  .banner{height: 500px; border-radius: 0 0 2rem 2rem;}
  @media only screen and (min-width: 640px) {
    .banner{border-radius: 0 0 5rem 5rem;}
  }
</style>
