<template>
  <div>
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
      <!-- :to="`/dashboard/admin/user/edit/${user.id}?firstName=${user.firstName}
        &lastName=${user.lastName}&ohrid=${user.ohrid}&isVOC=${user.isVOC}
        &isVOD=${user.isVOD}&isAdmin=${user.isAdmin}&userId=${user.id}&isEditMode=true`" -->
      <div class="flex-2 leading-snug">
        <content-loader
          :height="4"
          :width="20"
          :speed="2"
          primary-color="#cccccc"
          secondary-color="#ecebeb"
        >
          <rect x="0%" y="30%" width="100%" height="100%" />
        </content-loader>
        <!-- <p class="text-gray-700 text-sm">
            Vertical: Insurance
          </p>
          <p class="text-gray-700 text-sm">
            Type: Champion
          </p> -->
      </div>
      <div class="no-text-wrap items-center justify-center flex-1 px-1">
        <div>
          <content-loader
            :height="25"
            :width="50"
            :speed="2"
            primary-color="#cccccc"
            secondary-color="#ecebeb"
          >
            <circle cx="35" cy="16" r="7" stroke="black" />
          </content-loader>
        </div>
      </div>
      <div class="no-text-wrap items-center justify-center flex-1 px-1">
        <div>
          <content-loader
            :height="25"
            :width="50"
            :speed="2"
            primary-color="#cccccc"
            secondary-color="#ecebeb"
          >
            <circle cx="35" cy="16" r="7" stroke="black" />
          </content-loader>
        </div>
      </div>
      <div class="no-text-wrap items-center justify-center flex-1 pl-1">
        <div>
          <content-loader
            :height="25"
            :width="50"
            :speed="2"
            primary-color="#cccccc"
            secondary-color="#ecebeb"
          >
            <circle cx="35" cy="16" r="7" stroke="black" />
          </content-loader>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'UserLoader',
  components: { ContentLoader },
//   data() {
//     return {
//         upData:false,
//     };
// },
};
</script>
