<template>
  <section class="auth-page bg-white h-screen">
    <div class="flex flex-wrap h-screen items-center">
      <form class="max-w-xs mt-auto mx-auto p-6 w-full" method="post" name="validation" role="form" @submit.prevent="!disabled ? (partnerCompany && partnerCompany.id > 0 ? updateCompany(partnerCompany) : addCompany(partnerCompany)) : enableEditMode()">
        <!-- <div class="mb-8 text-center">
          <img src="../../../assets/logo.png" class="mx-auto" width="125" alt="Apna Ad Lgao Logo">
        </div> -->

        <div class="mt-12 my-5 relative">
          <label class="block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase" for="name">
            Name
          </label>
          <input
            id="name"
            v-model="partnerCompany.name"
            :disabled="disabled"
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
            type="name"
            placeholder="Company Name"
          >
        </div>

        <div class="my-5">
          <label class="block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase" for="description">
            Description
          </label>
          <input
            id="description"
            :disabled="disabled"
            v-model="partnerCompany.description"
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
            type="text"
            placeholder="About Company"
          >
        </div>

        <div class="my-5 relative">
          <label class="block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase" for="user-role-select">
            Address
          </label>
          <div class="relative">
            <select
              id="user-role-select"
              ref="user-role-select"
              v-model="partnerCompany.addressId"
              class="block appearance-none w-full bg-gray-100 border border-gray-400
              hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
              :disabled="disabled"
            >
              <option value="1">
                Yes
              </option>
              <option value="0">
                No
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="my-5">
          <label class="block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase" for="pincode">
            PinCode
          </label>
          <input
            id="pincode"
            :disabled="disabled"
            v-model.number="partnerCompany.pincode"
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
            type="number"
            placeholder="1100"
          >
        </div>

        <button
          v-show="!disabled"
          :class="{ 'loading': request.key === 'login' && request.inProgress }"
          :disabled="request.key === 'login' && request.inProgress"
          class="bg-green-800 button font-bold hover:bg-green-600 leading-normal letter-spacing-1 mb-12 mt-2 py-3 rounded text-white uppercase w-full"
        >
          Save Company
          <ring-loader />
        </button>

        <button
          v-show="disabled"
          :class="{ 'loading': request.key === 'login' && request.inProgress }"
          :disabled="request.key === 'login' && request.inProgress"
          class="bg-gray-800 button font-bold hover:bg-gray-600 leading-normal letter-spacing-1 mb-12 mt-2 py-3 rounded text-white uppercase w-full"
        >
          Edit Company
          <ring-loader />
        </button>
      </form>
      <div class="mb-3 mt-auto mx-auto w-full">
        <p class="py-3 w-4/5 text-center rounded text-gray-500 text-sm flex justify-center align-center mx-auto">
          <span v-if="!isApp">  (C) 2020 TechNawabs</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CompanyDetail',
  data() {
    return {
      disabled: false,
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      addresst: {
        name: '',
        building: '',
        landmark: '',
        street: '',
        pincode: 0,
        stateId: 0,
      },
    };
  },
  computed: {
    ...mapGetters(['request', 'version', 'partnerCompany']),
  },
  methods: {
    ...mapActions(['addCompany', 'updateCompany', 'getPartnerCompany']),
    enableEditMode() {
      this.disabled = !this.disabled;
    },
    scrollFunction() {
      this.showBtn = window.scrollY > 200;
    },
    topFunction() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    this.getPartnerCompany();
    if (this.partnerCompany && this.partnerCompany.name) {
      this.disabled = true;
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.scrollFunction);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollFunction);
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(currentVal, oldVal) {
      if (currentVal.name === 'Dashboard.Address') {
        this.getPartnerCompany();
        if (this.partnerCompany && this.partnerCompany.name) {
          this.disabled = true;
        } else {

        }
      }
    },
  },
};
</script>

<style lang="scss" src="@/styles/mobile/auth.scss" />
