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
            "
    >
      <div class="flex-2 leading-snug">
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
        <content-loader
          :height="1"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect x="0%" y="40%" width="70%" height="55%" />
        </content-loader>
      </div>
      <div class="no-text-wrap flex items-center justify-center flex-1 px-1">
        <div>
          <span
            class="far text-gray-500 fa-star text-sm"
          />
          <span
            class="far text-gray-500 fa-star text-sm"
          />
          <span
            class="far text-gray-500 fa-star text-sm"
          />
          <span
            class="far text-gray-500 fa-star text-sm"
          />
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
      <div class="no-text-wrap flex items-center justify-center flex-1 pl-1">
        <div>
          <span
            class="far text-gray-500 fa-star text-sm"
          />
          <span
            class="far text-gray-500 fa-star text-sm"
          />
          <span
            class="far text-gray-500 fa-star text-sm"
          />
          <span
            class="far text-gray-500 fa-star text-sm"
          />
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
    </div>
  </section>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'DataLoader',
  components: { ContentLoader },
//   data() {
//     return {
//         upData:false,
//     };
// },
};
</script>

