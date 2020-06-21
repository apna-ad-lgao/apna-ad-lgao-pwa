<template>      
  <div class="bg-gray-100 py-2">
    Imagine walking into an apartment. As the door swings open, you find yourself bombarded by vast amounts of unnecessary clutter. <br>
    It has overrun the living area, the kitchen reeks of old garbage, the carpet is barely visible underneath the mounds of disorder. <br>
    You’re overwhelmed with the amount of stuff covering the entire space. In short, it’s a hot mess.
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DashboardMidView',
  data() {
    return {
        isApp: process.env.VUE_APP_RUN_ENV === 'app',
    };
  },
};
</script>