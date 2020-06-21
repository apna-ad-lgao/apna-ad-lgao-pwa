<template>      
  <div class="flex bg-gray-200">
        <div class="flex-initial text-gray-700 px-4 py-2 m-2">
          <img class="w-50 h-10" src="https://whiteandblack.in/wp-content/uploads/2018/10/Branding-Blog-Image-Blog.jpg"/>
        </div>
        
        <div class="flex-initial text-gray-700 pt-2 relative mx-auto text-gray-600">
          <input type="text" name="" placeholder="Search apna ad.." class="border-2 border-gray-500 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"/>
          <input class="border-gray-500 px-4 py-2 m-2" type="button" value="Search">
        </div>

        <div class="flex-initial text-gray-700">
        <ul class="list-none float-right">
        <button>
            <li class="p-4 m-2 font-sans inline-block"><a class="text-blue-800 border-solid hover:text-red-800" href="#">Home</a></li>
            <li class="p-4 m-2 font-sans inline-block"><a class="text-blue-800 border-solid hover:text-red-800" href="#">About</a></li>
            <li class="p-4 m-2 font-sans inline-block"><a class="text-blue-800 border-solid hover:text-red-800" href="#">Service</a></li>
            <li class="p-4 m-2 font-sans inline-block"><a class="text-blue-800 border-solid hover:text-red-800" href="#">Gallery</a></li>
            <li class="p-4 m-2 font-sans inline-block"><a class="text-blue-800 border-solid hover:text-red-800" href="#">Contact</a></li>
          </button>
        </ul>     
        </div> 
      </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dashboardHeader',
  data() {
    return {
        isApp: process.env.VUE_APP_RUN_ENV === 'app',
    };
  },
};
</script>