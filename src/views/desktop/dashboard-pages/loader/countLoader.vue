<template>
  <div>
    <div class="flex h-24 justify-between leading-tight lg:h-32 m-5 text-center xl:h-40">
      <!-- <button class="p-8 rounded bg-gray-100 border border-gray-300"> -->
      <div
        class="rounded bg-gray-100 border border-gray-400 flex flex-col align-center justify-center xl:w-48 lg:w-40 w-32 pointer"
      >
        <content-loader
          :height="3"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect
            x="35%"
            rx=".5"
            ry=".5"
            y="20%"
            width="30%"
            height="80%"
          />
        </content-loader>
        <content-loader
          :height="3"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect x="15%" y="40%" width="70%" height="25%" />
        </content-loader>
      </div>
      <div
        class="rounded bg-gray-100 border border-gray-400 flex flex-col align-center justify-center xl:w-48 lg:w-40 w-32 pointer"
      >
        <!-- @click.prevent="applyBtnFilters('accountsInred')" -->
        <content-loader
          :height="3"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect
            x="35%"
            rx=".5"
            ry=".5"
            y="20%"
            width="30%"
            height="80%"
          />
        </content-loader>
        <content-loader
          :height="3"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect x="15%" y="40%" width="70%" height="25%" />
        </content-loader>
      </div>
      <div
        class="rounded bg-gray-100 border border-gray-400 flex flex-col align-center justify-center xl:w-48 lg:w-40 w-32 pointer"
      >
        <!-- @click.prevent="applyBtnFilters('accountsInRedVoc')" -->
        <content-loader
          :height="3"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect
            x="35%"
            rx=".5"
            ry=".5"
            y="20%"
            width="30%"
            height="80%"
          />
        </content-loader>
        <content-loader
          :height="3"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect x="15%" y="40%" width="70%" height="25%" />
        </content-loader>
      </div>
      <div
        class="rounded bg-gray-100 border border-gray-400 flex flex-col align-center justify-center xl:w-48 lg:w-40 w-32 pointer"
      >
        <!-- @click.prevent="applyBtnFilters('accountsInRedVod')" -->
        <content-loader
          :height="3"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect
            x="35%"
            rx=".5"
            ry=".5"
            y="20%"
            width="30%"
            height="80%"
          />
        </content-loader>
        <content-loader
          :height="3"
          :width="10"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect x="15%" y="40%" width="70%" height="25%" />
        </content-loader>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'CountLoader',
  components: { ContentLoader },
//   data() {
//     return {
//         upData:false,
//     };
// },
};
</script>

<style lang="scss" scoped>

  .stats-grid {
    display: grid;
    grid-gap: 10px;
    grid-auto-rows: minmax(110px, auto);
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  .stats-cont {
    &.active:after {
        position: absolute;
        content: '';
        height: 8px;
        width: 8px;
        background: #35c135;
        border-radius: 50px;
        top: 5px;
        right: 5px;
        border: 1px solid #2ab52a;
    }
  }
    .goTop {
        box-shadow: 0px 0px 10px 0px #00000069;
    }
</style>
