<template>
  <transition name="bounce">
    <div v-show="value" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
      <div class="modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto">
        <div class="bg-red-500 font-bold px-5 py-1 rounded text-white text-center">
          <p class="title">
            Attention!
          </p>
        </div>
        <h2 class="font-bold text-black px-2 pt-6 pb-0 text-center text-lg" />

        <h3 class="font-bold text-black px-2 pb-6 pt-0 text-center text-sm">
          Company should have atleast One VOC/VOD active User.
        </h3>
        <div class="flex justify-around py-2 rounded-lg">
          <button class="border-2 border-green-500 font-bold px-3 rounded text-green-500 text-sm" @click.prevent="goToAddUser">
            <router-link to="/dashboard/admin/user/addNewUser">
              Add User
            </router-link>
          </button>
          <button class="border-2 border-gray-600 font-bold px-3 rounded text-gray-600 text-sm" @click.prevent="leave">
            Leave
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopupElse',
  props: {
    value: {
      required: true,
    },
  },
  methods: {
    leave() {
      this.$emit('input', !this.value);
    },
    goToAddUser() {
      this.$emit('input', !this.value);
    },
  },
};
</script>
