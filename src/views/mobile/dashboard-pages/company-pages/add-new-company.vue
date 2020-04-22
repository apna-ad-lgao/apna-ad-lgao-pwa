<template>
  <section class="dashboard-user-edit-page h-min-screen bg-white p-5 mt-12">
    <h1
      class="text-xl font-bold text-gray-700 mb-4"
    >
      Add Company
    </h1>
    <form>
      <label
        class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase"
        for="companyName"
      >Company Name</label>
      <input
        id="company"
        v-model="companyName"
        class="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none"
        type="text"
        placeholder="Ex: x pvt. ltd."
      >

      <div class="relative">
        <label
          class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
          for="user-role-select"
        > Type </label>
        <div class="relative">
          <select
            id="user-role-select"
            ref="user-role-select"
            v-model="type"
            class="block appearance-none w-full bg-gray-100 border border-gray-400
            hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
          >
            <option value>
              ---
            </option>
            <option value="Champion">
              Champion
            </option>
            <option value="Accelerator">
              Accelerator
            </option>
            <option value="Trailblazer">
              Trailblazer
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
      <div class="relative">
        <label
          class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
          for="user-role-select"
        > Company Vertical </label>
        <div class="relative">
          <select
            id="user-role-select"
            ref="user-role-select"
            v-model="vertical"
            class="block appearance-none w-full bg-gray-100 border border-gray-400
            hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
          >
            <option value>
              ---
            </option>
            <option
              v-for="item in verticalData"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
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

      <div class="cta-cont text-right mt-8">
        <button
          class="border-2 rounded px-4 py-1 w-24"
          :class="'border-green-400 text-gray-500 w-24'"
          @click="saveCompany"
        >
          <span>Save</span>
        </button>
        <button
          class="border-2 rounded px-4 py-1 w-24"
          :class="'border-red-400 text-red-500'"
          @click="back"
        >
          Cancel
        </button>
      </div>
    </form>
  </section>
</template>

<script>
// import ADD_USER from '@/graphql/addUser.gql';
// import FETCH_ALL_COMPANIES from '@/graphql/fetchAllCompanies.gql';
import GETALL_VERTICALS from '@/graphql/fetchAllVerticals.gql';
// import UPDATE_USER from '@/graphql/updateUser.gql';
import ADD_COMPANY from '@/graphql/addCompany.gql';
// import ADD_USER_TO_COMPANY_VERTICAL from '@/graphql/addUserToCompanyVertical.gql';
// import UPDATE_COMPANY_VERICAL from '@/graphql/updateCompanyVertical.gql';
// import ADD_USER_COMPANY from '@/graphql/addUserCompany.gql';
// import UPDATE_USER_COMPANY from '@/graphql/updateUserCompany.gql';
// import GET_VERTICALS_FOR_COMPANY from '@/graphql/getAllVerticalsForCompany.gql';
// // import GET_USER_COMAPNY_VERTICALS from '@/graphql/userCompanyList.gql';
// this can be use to update and data
// import GET_USER_COMAPNY_VERTICALS from '@/graphql/publicUserCompanyList.gql';
// import GET_ALL_COMPANY_VERTICALS from '@/graphql/publicUserCompanyList.gql';

export default {
  name: 'AddnewCompany',
  data() {
    return {

      companyName: '',
      type: '',
      vertical: '',
      verticalData: [],
      isEditMode: false,
      validationErrors: [],
    };
  },
  computed: {
    saveButtonDisable() {
      // TODO: Review this one! using same function to disable button and change its color
      if (this.userRole === 'admin') {
        return false;
      } if (this.userRole === '') {
        return true;
      } if (this.selectedAccount === '') {
        return true;
      } if (this.selectedVertical === '') {
        return true;
      } if (this.userRole === 'admin') {
        return false;
      }
      return false;
    },
  },
  watch: {
    $route(currentVal, oldVal) {
      if (oldVal.name === 'Dashboard.Admin' && currentVal.name === 'Dashboard.User.Edit') {
        this.renderReady = false;
        this.onAccountSelect();
      }
    },
  },
  deactivated() {
    this.userOhrid = '';
    this.userFirstName = '';
  },
  mounted() {
    this.onAccountSelect();
  },
  methods: {

    async saveCompany() {
      try {
        // console.log("company : "+ this.companyName);

        if (!this.companyName) {
          this.$store.dispatch('addToastNotifications', {
            text: 'Please Fill Company Name ! ',
            timer: 4000,
            type: 'error',
          });
        }

        if (!this.type) {
          this.$store.dispatch('addToastNotifications', {
            text: 'Please Select Type Of Company ! ',
            timer: 4000,
            type: 'error',
          });
        }

        if (this.companyName && this.type) {
          const name = this.companyName;
          const type = this.type;
          const vertical = this.vertical;
          console.log(this.vertical);
          const { data } = await this.$apollo.mutate({
            mutation: ADD_COMPANY,
            variables: {
              name,
              type,
              vertical,
            },
          });
          const companyId = data.addCompany.id;
          const companyVerticalId = data.addCompany.companyVerticalId;
          await this.$store.dispatch('addToastNotifications', {
            text: 'Company added succesfully!',
            timer: 4000,
            type: 'success',
          });
          this.companyName = '';
          this.type = '';
          this.vertical = '';
          // this.$router.go(-1);
          this.$router.push({ path: `/dashboard/admin/company/edit/${companyId}/${companyVerticalId}` });
          // this.$router.back({reload: true});
        }
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: `${error.message}`,
          timer: 4000,
          type: 'error',
        });
      }
    },

    async onAccountSelect() {
      try {
        const { data } = await this.$apollo.query({
          query: GETALL_VERTICALS,
          variables: {

          },
        });
        this.verticalData = data.fetchAllVerticals;

        console.log('TCL: onAccountSelect -> this.verticalData', this.verticalData);
      } catch (error) {
        console.log('vertical error -> ', error);
      }
      // this.verticalData = this.accountData.filter(ad  => ad.companyId === this.selectedAccount.companyId);
    },
    async back() {
      this.$router.go(-1);
    },
    // checkUserInput(name, type) {
    //   const hasNumber = /\d/;
    //   if (name === '') {
    //     this.validationErrors.push('Company Name is Required!');
    //   }
    //   if (type === '') {
    //     this.validationErrors.push('Type is Required!');
    //   }
    //   if (hasNumber.test(fn)) {
    //     this.validationErrors.push('Enter valid characters in Company Name!');
    //   }
    //   if (hasNumber.test(ln)) {
    //     this.validationErrors.push('Enter valid characters in last name!');
    //   }
    // },

  },
};
</script>
