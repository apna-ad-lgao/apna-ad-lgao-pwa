<template>
  <transition name="bounce">
    <div v-show="value" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-20">
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

      <div class="bg-white flex flex-col h-64 modal-container mx-4 overflow-y-auto relative rounded shadow-lg lg:w-1/3 z-10">
        <div class="bg-red-500 font-bold px-5 py-1 rounded text-white text-2xl text-center">
          <p class="title">
            Attention!
          </p>
        </div>
        <h2 class="font-bold mx-auto mt-4 text-black px-2 text-center text-xl">
          User can not be disable,
        </h2>

        <h3 class="font-bold mx-auto mt-2 px-2 text-black text-xl">
          Company should have atleast One VOC/VOD active User.
        </h3>
        <div class="flex justify-around my-6">
          <button class="border-2 border-green-500 font-bold px-3 rounded text-green-500 text-lg" @click.prevent="goToAddUser">
            <router-link to="/dashboard/admin/user/addNewUser">
              Add User
            </router-link>
          </button>
          <button class="border-2 border-gray-600 font-bold px-3 rounded text-gray-600 text-lg" @click.prevent="leave">
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
