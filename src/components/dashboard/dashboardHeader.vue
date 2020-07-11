<template>
  <div id="header" class="flex items-center bg-transparent fixed top-0 left-0 w-full"  v-bind:class="{fixedHeader: scrollPosition > 100}">
        <div class="text-gray-700 px-4 my-2">
          <img class="w-50 h-10" src="https://whiteandblack.in/wp-content/uploads/2018/10/Branding-Blog-Image-Blog.jpg"/>
        </div>

        <div class="relative mx-auto text-gray-600">
          <input type="text" name="" placeholder="Search apna ad.." class="border-2 border-gray-500 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"/>
          <input class="border-gray-500 font-bold bg-jaffa-400 px-4 py-2 mx-2 hover:bg-red-700" type="button" value="Search">
        </div>

        <ul class="menu list-none float-right">
            <li class="p-2 px-4 m-2 inline-block"><a class="text-white" href="#">Home</a></li>
            <li class="p-2 px-4 m-2 inline-block"><a class="text-white" href="#">About</a></li>
            <li class="p-2 px-4 m-2 inline-block"><a class="text-white" href="#">Service</a></li>
            <li class="p-2 px-4 m-2 inline-block"><a class="text-white" href="#">Gallery</a></li>
            <li class="p-2 px-4 m-2 inline-block"><a class="text-white" href="#">Contact</a></li>
        </ul>
      </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dashboardHeader',
  el: '#header',
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      scrollPosition: null
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  }
};
</script>

<style scoped>
div.fixedHeader{background: #fff; z-index: 9999; box-shadow: 0 0 10px 1px rgba(0,0,0,0.1);}
div.fixedHeader .menu li a{color: #444;}
</style>
