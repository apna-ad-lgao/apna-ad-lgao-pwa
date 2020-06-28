<template>
  <div class="flex-initial grid gap-4 grid-cols-3">

          <div class="flex-1 px-4 py-2 m-2 border-2 hover:border-blue-600" v-for="(hoard,index) in hoarding" v-bind:key="index"
          :class="{'bg-jaffa-700': index % 2 === 0, 'bg-jaffa-800': index % 2 !== 0 }">
            <img v-bind:src="hoard.imageRef"/>
            <div class="flex justify-center text-blue-700">{{ hoard.name }}</div>
            <div class="flex justify-center text-blue-700">&#8377; {{ hoard.amt }}</div>
          </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dashboardHoarding',
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      hoarding: [
        {
          id: 1, imageRef: 'https://assets.materialup.com/uploads/3c97a1bf-ec13-4073-b17e-85bc7fec19b9/preview.jpg', name: 'Shimla', amt: '1000',
        },
        {
          id: 2, imageRef: 'https://assets.materialup.com/uploads/3c97a1bf-ec13-4073-b17e-85bc7fec19b9/preview.jpg', name: 'Manali', amt: '2100',
        },
        {
          id: 3, imageRef: 'https://assets.materialup.com/uploads/3c97a1bf-ec13-4073-b17e-85bc7fec19b9/preview.jpg', name: 'Kashmir', amt: '1100',
        },
		    {
          id: 4, imageRef: 'https://assets.materialup.com/uploads/3c97a1bf-ec13-4073-b17e-85bc7fec19b9/preview.jpg', name: 'Dheradun', amt: '1000',
        },
        {
          id: 5, imageRef: 'https://assets.materialup.com/uploads/3c97a1bf-ec13-4073-b17e-85bc7fec19b9/preview.jpg', name: 'Goa', amt: '50000',
        },
        {
          id: 6, imageRef: 'https://assets.materialup.com/uploads/3c97a1bf-ec13-4073-b17e-85bc7fec19b9/preview.jpg', name: 'Pondicherry', amt: '11000',
        },
      ],
    };
  },
};
</script>
