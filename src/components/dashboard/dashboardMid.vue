<template>
  <div class="container mx-auto" style="margin-top: -5rem;">
    <div class="grid gap-3 sm:grid-cols-4 p-4 text-center">
      <div
class="p-5 bg-white rounded-lg shadow-xl"
v-for="(hoard,index) in hoarding"
v-bind:key="index"
      :class="{'bg-jaffa-700': index % 2 === 0, 'bg-jaffa-800': index % 2 !== 0 }">
        <figure class="">
          <img class="w-12 mx-auto" v-bind:src="hoard.imageRef"/>
        </figure>
        <h4 class="font-black text-md mt-3 mb-3">{{ hoard.name }}</h4>
        <p class="text-xs">{{ hoard.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DashboardMidView',
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      hoarding: [
        {
          id: 1,
          imageRef: 'https://cdn.iconscout.com/icon/free/png-512/mobile-concept-ads-advertise-touch-pay-per-click-2-35280.png',
          name: 'Heading',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        },
        {
          id: 2,
          imageRef: 'https://cdn.iconscout.com/icon/free/png-512/mobile-concept-ads-advertise-touch-pay-per-click-2-35280.png',
          name: 'Heading',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        },
        {
          id: 3,
          imageRef: 'https://cdn.iconscout.com/icon/free/png-512/mobile-concept-ads-advertise-touch-pay-per-click-2-35280.png',
          name: 'Heading',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        },
		    {
          id: 4,
          imageRef: 'https://cdn.iconscout.com/icon/free/png-512/mobile-concept-ads-advertise-touch-pay-per-click-2-35280.png',
          name: 'Heading',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        },
      ],
    };
  },
};
</script>
