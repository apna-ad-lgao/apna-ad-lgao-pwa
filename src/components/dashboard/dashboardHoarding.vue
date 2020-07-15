<template>
<div class="pb-5">
  <h1 class="text-center font-bold mt-4 mb-2 text-2xl">{{heading}}</h1>
  <div class="grid gap-3 sm:grid-cols-4 p-4 text-center">
      <div
class="p-5 bg-white rounded-lg shadow-xl"
v-for="(hoard,index) in hoarding"
v-bind:key="index"
      :class="{'bg-jaffa-700': index % 2 === 0, 'bg-jaffa-800': index % 2 !== 0 }">
        <figure class="relative flex flex-col items-center">
          <span class="flex w-full rounded-lg overflow-hidden h-48 lg:h-32 md:h-32 sm:h-20">
            <img class="rounded-lg object-cover object-center" v-bind:src="hoard.imageRef"/>
          </span>
          <button type="button" class="text-sm absolute bg-white px-2 py-1 rounded-lg shadow-lg h-8 w-8 flex text-red-600" style="right: 0.5rem; top: 0.5rem;"><i class="fa fa-shopping-cart m-auto"></i></button>
          <div class="text-sm rounded-lg absolute bottom-0 bg-white px-4 py-1 text-red-600" style="margin-bottom: -0.9rem;">&#8377; {{ hoard.amt }}</div>
        </figure>
        <h4 class="font-black text-md mt-6">{{ hoard.name }}</h4>
      </div>
    </div>
</div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dashboardHoarding',
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      heading: 'Explore Hoarding',
      hoarding: [
        {
          id: 1, imageRef: 'https://applatide.com/images/best-mobile-ad-formats.png', name: 'Shimla', amt: '1000',
        },
        {
          id: 2, imageRef: 'https://d540vms5r2s2d.cloudfront.net/mad/uploads/mad_blog_5e6b65a1a78411584096673.png', name: 'Manali', amt: '2100',
        },
        {
          id: 3, imageRef: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBdTQ5QY7EDfuHYFoYnHwIZycIlqWSfbHvsNq1sgS70kaKbGo&s', name: 'Kashmir', amt: '1100',
        },
		    {
          id: 4, imageRef: 'https://d540vms5r2s2d.cloudfront.net/mad/uploads/mad_blog_5e6b65a1a78411584096673.png', name: 'Dheradun', amt: '1000',
        },
        {
          id: 5, imageRef: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBdTQ5QY7EDfuHYFoYnHwIZycIlqWSfbHvsNq1sgS70kaKbGo&s', name: 'Goa', amt: '50000',
        },
        {
          id: 6, imageRef: 'https://applatide.com/images/best-mobile-ad-formats.png', name: 'Pondicherry', amt: '11000',
        },
      ],
    };
  },
};
</script>
