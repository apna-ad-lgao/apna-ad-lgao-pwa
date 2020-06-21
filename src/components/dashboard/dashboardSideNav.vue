<template>
    <div class="flex-initial px-4 py-2 m-2">
          <span class="bg-blue-200 text-2xl border-4 border-gray-600"> HordingLocation </span>
          <ul>
            <li v-for="loc in location" v-bind:key="loc.id"><a class="bg-blue-200 hover:bg-blue-200 text-white font-bold" href="#">
              <span class="text-blue-500 hover:text-blue-800 py-4 px-4">{{loc.title}}</span>
              </a></li>
          </ul>
        </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dashboardSideNav',
  data() {
    return {
        isApp: process.env.VUE_APP_RUN_ENV === 'app',
        location: [
          { id: 1, title: 'Delhi' },
          { id: 2, title: 'Mumbai' },
          { id: 3, title: 'Chennai' }
        ]
    };
  },
};
</script>