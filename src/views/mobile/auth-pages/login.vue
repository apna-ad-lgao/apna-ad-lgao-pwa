<template>
  <section class="auth-page bg-white h-screen">
    <div class="flex flex-wrap h-screen items-center">
      <form class="max-w-xs mt-auto mx-auto p-6 w-full" method="post" name="validation" role="form" @submit.prevent="login(user)">
        <div class="mb-8 text-center">
          <img src="../../../assets/logo.png" class="mx-auto" width="125" alt="Genpact Logo">
        </div>

        <div class="my-5 relative">
          <label class="block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-xs uppercase" for="ohrid">
            Email
          </label>
          <input
            id="ohrid"
            v-model="user.email"
            class="
              appearance-none
              bg-gray-100
              block
              border
              focus:bg-white
              focus:border-gray-400
              focus:outline-none
              leading-tight
              px-4
              py-2
              rounded
              text-gray-600
              w-full
            "
            type="tel"
            placeholder="Ex: user@email.com"
          >
          <button
            v-if="$store.state.device.biometricAvailable"
            class="absolute fa-fingerprint fas p-2 bottom-0 right-0 px-3 text text-gray-600 text-xl"
            @click.prevent="biometricLogin"
          />
        </div>

        <div class="my-5">
          <label class="block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase" for="password">
            Password
          </label>
          <input
            id="password"
            v-model="user.password"
            class="
              appearance-none
              bg-gray-100
              block
              border
              focus:bg-white
              focus:border-gray-400
              focus:outline-none
              leading-tight
              px-4
              py-2
              rounded
              text-gray-600
              w-full
            "
            type="password"
            placeholder="********"
          >
          <!-- <p class="text-red text-xs italic">Please choose a password.</p> -->
        </div>

        <button
          :class="{ 'loading': request.key === 'login' && request.inProgress }"
          :disabled="request.key === 'login' && request.inProgress"
          class="bg-brand-color button font-bold hover:bg-red-600 leading-normal letter-spacing-1 mb-12 mt-2 py-3 rounded text-white uppercase w-full"
        >
          Sign In
          <ring-loader />
        </button>
      </form>
      <div class="mb-3 mt-auto mx-auto w-full">
        <p class="py-3 w-4/5 text-center rounded text-gray-500 text-sm flex justify-center align-center mx-auto">
          <span v-if="!isApp">  Version: {{ version }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  // components: {
  //   NumericInput: () => import('@/components/numeric-input.vue'),
  // },
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      user: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters(['request', 'version']),
  },
  methods: {
    ...mapActions(['login', 'biometricLogin']),
  },
};
</script>

<style lang="scss" src="@/styles/mobile/auth.scss" />
