<template>
  <div>
    <div 
      class="hoarding-nav flex-initial px-4 py-2 fixed top-0 left-0 w-full h-full bg-white transition-all duration-500" 
      style="z-index: 99;" 
      v-bind:class="{hoarding : hoarding}">
      <div>
          <h1 class="text-2xl px-4 font-bold text-blue-800 mb-4"> HordingLocation </h1>
          <!-- <div v-for="loc in location" v-bind:key="loc.id" class="text-2xl border border-gray-600 font-bold text-blue-800 hover:bg-jaffa-400"> {{loc.title}} </div> -->
          <ul>
            <li v-for="loc in location" v-bind:key="loc.id">
              <a class="py-1 px-4 block" href="#">
                {{loc.title}}
              </a>
            </li>
          </ul>
      </div>
    </div>
    <button type="button" @click="toggleHoarding" 
    class="fab w-12 h-12 flex rounded-full bg-red-600 text-white text-lg shadow-md fixed p-4" 
    style="right: 1rem; bottom: 2rem; z-index: 999;">
      <i class="fa fa-filter"></i>
    </button>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dashboardSideNav',
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      location: [
        { id: 1, title: 'Delhi' },
        { id: 2, title: 'Mumbai' },
        { id: 3, title: 'Chennai' },
      ],
      hoarding: false,
    };
  },
  methods: {
    toggleHoarding() {
      this.hoarding = !this.hoarding;
    },
  },
};
</script>

<style scoped>
.hoarding-nav{transform: translateY(100%);}
.hoarding-nav.hoarding{transform: translateY(0px);}
</style>
