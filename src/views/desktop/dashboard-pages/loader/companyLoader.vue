<template>
  <section class="px-4">
    <div
      v-for="n in 10"
      :key="n"
      class="
              border-b
              border-gray-200
              py-3
              w-full
              px-1
              block
              flex
              text-left
              justify-between
              pointer
              items-center
            "
    >
      <div class="flex-2">
        <content-loader
          :height="1.2"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect x="0%" y="40%" width="80%" height="85%" />
        </content-loader>
        <content-loader
          :height="1"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect x="0%" y="40%" width="60%" height="55%" />
        </content-loader>
      </div>
      <div class="flex-1">
        <div>
          <content-loader
            :height="5"
            :width="20"
            :speed="2"
            primary-color="#cccccc"
            secondary-color="#ecebeb"
          >
            <rect x="0%" y="40%" width="100%" height="65%" />
          </content-loader>
        </div>
      </div>
      <div class="flex-1">
        <div>
          <content-loader
            :height="5"
            :width="20"
            :speed="2"
            primary-color="#cccccc"
            secondary-color="#ecebeb"
          >
            <rect
              x="70%"
              y="30%"
              rx="2"
              ry="2"
              width="17%"
              height="65%"
            />
          </content-loader>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'CompanyLoader',
  components: { ContentLoader },
//   data() {
//     return {
//         upData:false,
//     };
// },
};
</script>

