<template>
  <section class="dashboard-user-edit-page h-min-screen bg-white p-5 mt-12">
    <h1
      class="text-xl font-bold text-gray-700 mb-4"
    >
      Add user
    </h1>
    <form>
      <label
        class="block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-xs uppercase"
        for="ohrid"
      >OHR Id</label>
      <input
        id="ohrid"
        v-model="userOhrid"
        class="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none"
        type="number"
        placeholder="Ex: 30000000"
        minlength="7"
        maxlength="9"
        :readonly="isReadOnly"
      >

      <label
        class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase"
        for="ohrid"
      >First Name</label>
      <input
        id="ohrid"
        v-model="userFirstName"
        class="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none"
        type="text"
        placeholder="Ex: Rahul"
        :readonly="isReadOnly"
      >

      <label
        class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase"
        for="ohrid"
      >Last Name</label>
      <input
        id="ohrid"
        v-model="userLastName"
        class="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none"
        type="text"
        placeholder="Ex: Jain"
        :readonly="isReadOnly"
      >
      <div class="relative">
        <label
          class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
          for="user-role-select"
        >Admin Role</label>
        <div class="relative">
          <select
            id="user-role-select"
            ref="user-role-select"
            v-model="adminRole"
            class="block appearance-none w-full bg-gray-100 border border-gray-400
            hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
            :disabled="isAdminReadOnly"
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

      <div class="relative">
        <label
          class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
          for="user-role-select"
        >User role</label>
        <div class="relative">
          <select
            id="user-role-select"
            ref="user-role-select"
            v-model="userRole"
            class="block appearance-none w-full bg-gray-100 border border-gray-400
            hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
            :disabled="isReadOnly"
          >
            <!--  @change="onUserRoleChanged" -->
            <option value>
              ---
            </option>
            <option value="voc">
              VOS
            </option>
            <option value="vod">
              VOD
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

      <!-- <div v-if="!isEditMode && userRole && userRole !== 'admin'">
        <div v-if="!isReadOnly" class="relative">
          <label
            class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
            for="user-account-select"
          >Account to be aligned</label>
          <div class="relative">
            <select
              id="user-account-select"
              ref="user-account-select"
              v-model="selectedAccount"
              class="block appearance-none w-full bg-gray-100
              border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
              @change="onAccountSelect"
            >
              <option value>
                ---
              </option>
              <option
                v-for="(item, index) in accountData"
                :key="index"
                :value="item"
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
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div v-if="!isReadOnly" class="relative">
          <label
            class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
            for="user-vertical-select"
          >Vertical to be aligned</label>
          <div class="relative">
            <select
              id="user-vertical-select"
              ref="user-vertical-select"
              v-model="selectedVertical"
              class="block appearance-none w-full bg-gray-100 border
              border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
            >
              <option value>
                ---
              </option>
              <option
                v-for="item in verticalData"
                :key="item.verticalId"
                :value="item"
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
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div> -->
      <!-- save and cancel button -->
      <div v-if="userRole && (userRole === 'voc' || userRole === 'vod') || adminRole==1" class="cta-cont text-right mt-8">
        <button
          class="border-2 border-gray-300 rounded px-4 py-1 text-gray-700 w-24 mr-3"
          @click.prevent="$router.back()"
        >
          Cancel
        </button>
        <button
          v-if="!isReadOnly"
          class="border-2 rounded px-4 py-1 w-24"
          :class="saveButtonDisable ? 'border-gray-400 text-gray-500 w-24' : 'border-green-400 text-green-500'"
          :disabled="saveButtonDisable"
          @click.prevent="saveUser"
        >
          Save
        </button>
      </div>

      <!-- Dynamic company vertical section -->
      <!-- <h1  v-if="editableCompanyVerticals" class="text-xl font-bold text-gray-700 mb-4 mt-4">
        {{ 'Assigned Accounts' }}
      </h1>
      <section v-if="editableCompanyVerticals">
        <div v-for="(companyVerticalRow, index) in editableCompanyVerticals" :key="index">

          <div v-if="userRole && (userRole === 'voc' || userRole === 'vod')">
            <div class="relative">
              <label
                class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
                for="user-account-select"
              >Account to be aligned</label>
              <div class="relative">
                <select
                  id="user-account-select"
                  ref="user-account-select"
                  v-model="companyVerticalRow.selectedAccount"
                  class="block appearance-none w-full bg-gray-100
                  border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
                  :disabled="companyVerticalRow.isEditingCompanyVertical"
                  @change="onAccountSelect(companyVerticalRow, $event)"
                >
                  <option value>
                    ---
                  </option>
                  <option
                    v-for="(item) in accountData"
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
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
              <div class="relative">
              <label
                class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
                for="user-vertical-select"
              >Vertical to be aligned</label>
              <div class="relative">
                <select
                  id="user-vertical-select"
                  ref="user-vertical-select"
                  v-model="companyVerticalRow.selectedVertical"
                  class="block appearance-none w-full bg-gray-100 border
                  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
                  :disabled="!companyVerticalRow.isEditingCompanyVertical"
                >
                  <option value>
                    ---
                  </option>
                  <option
                    v-for="item in verticalData"
                    :key="item.id"
                    :value="item.name"
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
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div> -->
      <!-- <div class="relative">
              <label
                class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
                for="user-vertical-select"
              >
                Vertical
              </label>
              <div class="relative">
                <input
                  id=""
                  v-model="companyVerticalRow.selectedVertical"
                  class="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2
                  rounded leading-tight focus:outline-none"
                  type="text"
                  placeholder="Ex: Jain"
                  :readonly="true"
                >

              </div>
            </div>
            <div class="cta-cont text-right mt-8">
              <button
                class="border-2 rounded px-4 py-1 w-24"
                :class="!companyVerticalRow.isEditingCompanyVertical ? 'border-green-400 text-green-500' : 'border-gray-400 text-gray-500 w-24'"
               @click="makeCompanyVerticalEditable(companyVerticalRow)"
              >

                <span v-if="!companyVerticalRow.isEditingCompanyVertical">Save</span>
                <span v-else>Edit</span>
              </button>
              <button
                class="border-2 rounded px-4 py-1 w-24"
                :class="!companyVerticalRow.isEditingCompanyVertical ? 'border-red-400 text-red-500' : 'border-gray-400 text-gray-500'"
                :disabled="companyVerticalRow.isEditingCompanyVertical"
                @click="softDeleteUserCompany(index)"
              >
                Delete
              </button>
            </div>
          </div>

        </div>

         <div v-if="userRole && (userRole === 'voc' || userRole === 'vod')" class="cta-cont text-right mt-12 mb-12">
          <button
            class="border-2 border-gray-300 rounded px-4 py-1 text-gray-700 w-full m-auto border-green-400 text-green-500"
            @click.prevent="addNewRowForCompanyVertical()"
          >
            Assign To Company Vertical
          </button>
        </div>
      </section> -->
    </form>
  </section>
</template>

<script>
import ADD_USER from '@/graphql/addUser.gql';
import FETCH_ALL_COMPANIES from '@/graphql/fetchAllCompanies.gql';
// import GETALL_VERTICALS from '@/graphql/fetchAllVerticals.gql';
// import UPDATE_USER from '@/graphql/updateUser.gql';
import ADD_USER_TO_COMPANY_VERTICAL from '@/graphql/addUserToCompanyVertical.gql';
import UPDATE_COMPANY_VERICAL from '@/graphql/updateCompanyVertical.gql';
import ADD_USER_COMPANY from '@/graphql/addUserCompany.gql';
import UPDATE_USER_COMPANY from '@/graphql/updateUserCompany.gql';
import GET_VERTICALS_FOR_COMPANY from '@/graphql/getAllVerticalsForCompany.gql';
// import GETALL_VERTICALS_FROM_COMPANY from '@/graphql/getVerticalByCompany.gql';
// import GET_USER_COMAPNY_VERTICALS from '@/graphql/userCompanyList.gql';
// this can be use to update and data
import GET_USER_COMAPNY_VERTICALS from '@/graphql/publicUserCompanyList.gql';
// import GET_ALL_COMPANY_VERTICALS from '@/graphql/publicUserCompanyList.gql';

export default {
  name: 'UserEdit',
  data() {
    return {
      userId: '',
      userOhrid: '',
      userFirstName: '',
      userLastName: '',
      userRole: '',
      adminRole: 0,
      isEditMode: false,
      selectedAccount: '',
      languages: [1],
      accountData: [],
      verticalData: [],
      selectedVertical: '',
      validationErrors: [],
      isReadOnly: false,
      isAdminReadOnly: true,
      editSaveToggle: [],
      isEditingCompanyVertical: false,
      editableCompanyVerticals: [
        {
          id: '',
          companyId: '',
          verticalId: '',
          isEditingCompanyVertical: false,
          selectedAccount: '',
          selectedVertical: '',
          softDeleteRequired: false,
        },
      ],
    };
  },
  computed: {
    saveButtonDisable() {
      // TODO: Review this one! using same function to disable button and change its color

      if (this.adminRole === 1) {
        return false;
      } if (this.userRole === '') {
        return true;
      // } if (this.selectedAccount === '') {
      //   return true;
      // } if (this.selectedVertical === '') {
      //   return true;
      } // if (this.userRole === 'admin') {
      //   return false;
      // }
      return false;
    },
  },
  watch: {
    $route(currentVal, oldVal) {
      if (oldVal.name === 'Dashboard.Admin' && currentVal.name === 'Dashboard.User.Edit') {
        this.renderReady = false;
        this.getUserDetails();
        // this.onUserRoleChanged();
        // this.getUserCompanyVerticals();
        // this.onAccountSelect();
      }
    },
  },
  deactivated() {
    this.userOhrid = '';
    this.userFirstName = '';
    this.userLastName = '';
    this.userRole = '';
    this.adminRole = 0;
    this.selectedAccount = '';
    this.selectedVertical = '';
    this.accountData = [];
    this.verticalData = [];
    this.validationErrors = [];
  },
  mounted() {
    this.getUserDetails();
    // this.onUserRoleChanged();
    // this.getUserCompanyVerticals();
    // this.onAccountSelect();
    // this.getAllCompanyVerticals();
  },
  methods: {
    async addUser(firstName, lastName, ohrid, isVOC, isVOD, isReviewer, isAdmin, companyId, verticalId) {
      try {
        const result = await this.$apollo.mutate({
          mutation: ADD_USER,
          variables: {
            firstName,
            lastName,
            ohrid,
            isVOC,
            isVOD,
            isReviewer,
            isAdmin,
            companyId,
            verticalId,
          },
        });
        console.log('addUser', result);
      } catch (error) {
        console.log(error.message);
      }
    },
    async updateUser(userId, isVoc, isVod, isAdmin) {
      // try {
      //   const { data } = await this.$apollo.mutate({
      //     mutation: UPDATE_USER,
      //     variables: {
      //       userId,
      //       isVoc,
      //       isVod,
      //       isAdmin,
      //     },
      //   });
      //   console.log('updateUser', data);
      // } catch (error) {
      //   console.log(error.message);
      // }
    },
    async addUserToCompanyVertical(userId, companyId, verticalId) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: ADD_USER_TO_COMPANY_VERTICAL,
          variables: {
            userId,
            companyId,
            verticalId,
          },
        });
        console.log('addUserToCompanyVertical', data);
      } catch (error) {
        console.log(error.message);
      }
    },
    async updateCompanyVertical(companyVerticalId, companyId, verticalId, userCompanyId, userId) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: UPDATE_COMPANY_VERICAL,
          variables: {
            companyVerticalId,
            companyId,
            verticalId,
            userCompanyId,
            userId,
          },
        });
        console.log('updateCompanyVertical', data);
      } catch (error) {
        console.log(error.message);
      }
    },
    async addUserCompany(companyVerticalId, userId) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: ADD_USER_COMPANY,
          variables: {
            companyVerticalId,
            userId,
          },
        });
        console.log('addUserCompany', data);
      } catch (error) {
        console.log(error.message);
      }
    },
    async updateUserCompany(userCompanyId, companyVerticalId, userId, isDeleted) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: UPDATE_USER_COMPANY,
          variables: {
            userCompanyId,
            companyVerticalId,
            userId,
            isDeleted,
          },
        });
        console.log('updateUserCompany', data);
      } catch (error) {
        console.log(error.message);
      }
    },
    // async onAccountSelect(companyVerticalRow, event) {
    // try {
    // console.log(event.target.dataset);
    // console.log('ID:', event.target.dataset.id);
    // const companyID = parseInt(event.target.value);
    // console.log(`company id :${companyID}`);
    // console.log(companyVerticalRow);
    // let { data } = await this.$apollo.query({
    //   query: GETALL_VERTICALS_FROM_COMPANY,
    //   variables: {
    //     // id: companyID,
    //   },
    // });
    // console.log(`darta : is : ${JSON.stringify(data)}`);
    // data = data.getVerticalByCompany;
    // [data] = data;
    // console.log(`data is: ${JSON.stringify(data)}`);
    // console.log(data.getVerticalByCompany);
    // companyVerticalRow.selectedVertical = data.name;
    // companyVerticalRow.companyId = companyID;
    // companyVerticalRow.selectedVertical = data.getVerticalByCompany.name;

    // console.log('TCL: onAccountSelect -> this.verticalData', this.verticalData);
    //   } catch (error) {
    //     console.log('vertical error -> ', error);
    //   }
    //   // this.verticalData = this.accountData.filter(ad  => ad.companyId === this.selectedAccount.companyId);
    // },
    async onUserRoleChanged() {
      try {
        console.log('onchange role called !!');
        const { data } = await this.$apollo.query({ query: FETCH_ALL_COMPANIES });
        this.accountData = data.fetchAllCompanies;
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });
      }
      return this.accountData;
    },
    async getAllVerticalByCompany(companyId) {
      try {
        const { data } = await this.$apollo.query({
          query: GET_VERTICALS_FOR_COMPANY,
          variables: {
            companyId,
          },
        });
        console.log(`data is: ${data}`);
        // this.accountData = data.fetchAllCompanies;
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });
      }
    },
    checkUserInput(fn, ln, ohrid) {
      console.log(fn, ln, ohrid);
      // const hasNumber = /\d/;
      const hasNumber = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
      if (ohrid.length < 7 || ohrid.length > 9) {
        this.validationErrors.push('OHRID length should be between 7 - 9!');
      }
      if (fn === '') {
        this.validationErrors.push('First Name is Required!');
      }
      if (ln === '') {
        this.validationErrors.push('Last Name is Required!');
      }
      if (hasNumber.test(fn)) {
        this.validationErrors.push('Enter valid characters in first name!');
      }
      if (hasNumber.test(ln)) {
        this.validationErrors.push('Enter valid characters in last name!');
      }
    },
    async saveUser() {
      const { userFirstName, userLastName, userOhrid } = this;
      this.checkUserInput(userFirstName, userLastName, userOhrid);
      if (this.validationErrors.length > 0) {
        this.validationErrors.forEach((err) => {
          this.$store.dispatch('addToastNotifications', {
            text: err,
            timer: 4000,
            type: 'error',
          });
        });
        this.validationErrors = [];
        return;
      }
      // const companyId = this.selectedAccount.id;
      // const verticalId = this.selectedVertical.id;
      const variable = {
        firstName: userFirstName,
        lastName: userLastName,
        ohrid: parseInt(userOhrid, 10),
        isVOC: 0,
        isVOD: 0,
        isReviewer: 1,
        isAdmin: 0,
        companyId: 0,
        verticalId: 0,
      };
      if (this.userRole === 'voc') {
        variable.isVOC = 1;
      } else if (this.userRole === 'vod') {
        variable.isVOD = 1;
      } else {
        variable.companyId = 0;
        variable.verticalId = 0;
      }
      // console.log(`Admin Role : ${parseInt(this.adminRole)}`);
      if (this.adminRole === 1) {
        variable.isAdmin = 1;
      }

      try {
        // console.log(variable);
        const result = await this.$apollo.mutate({
          mutation: ADD_USER,
          variables: variable,
        });
        // console.log(result.data.addUser);
        // console.log(result.data.addUser.id);
        const newuserId = result.data.addUser.id;
        if (!result.data.addUser) {
          throw new Error(`User with OHRID ${userOhrid} already exists`);
        }
        this.$store.dispatch('addToastNotifications', {
          text: 'User added succesfully!',
          timer: 4000,
          type: 'success',
        });
        this.$router.push({ path: `/dashboard/admin/user/edit/${newuserId}?isEditMode=true` });
        // this.$router.go(-1);
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: `${error.message}`,
          timer: 4000,
          type: 'error',
        });
      }
    },
    getUserDetails() {
      const {
        firstName, lastName, ohrid, isVOC, isVOD, isAdmin, isEditMode, userId,
      } = this.$route.query;
      if (isEditMode) {
        this.isEditMode = isEditMode;
        if (firstName) {
          this.userFirstName = firstName;
        }
        if (lastName) {
          this.userLastName = lastName;
        }
        if (ohrid) {
          this.userOhrid = ohrid;
        }
        if (userId) {
          this.userId = parseInt(userId, 10);
          // console.log(`userId: ${this.userId}`);
        }
        // if (isVOC == 1) {
        //   console.log(`isVOC: ${isVOC}`);
        //   this.userRole = 'voc';
        // } else if (isVOD == 1) {
        //   console.log(`isVOD: ${isVOD}`);
        //   this.userRole = 'vod';
        // } else if (isAdmin === 1) {
        //   console.log(`isAdmin: ${isAdmin}`);
        //   this.userRole = 'admin';
        // }
        if (isVOC === 1) {
          console.log(`isVOC: ${isVOC}`);
          this.userRole = 'voc';
        }
        if (isVOD === 1) {
          console.log(`isVOD: ${isVOD}`);
          this.userRole = 'vod';
        }
        if (isAdmin) {
          // console.log(`isAdmin: ${isAdmin}`);
          this.adminRole = 1;
        }
        this.isReadOnly = true;
      } else {
        this.isReadOnly = false;
      }
      console.log(`is read only is: ${this.isReadOnly}`);
    },
    makeCompanyVerticalEditable(companyVerticalRow) {
      // companyVerticalRow.isEditingCompanyVertical = !companyVerticalRow.isEditingCompanyVertical;
      if (!companyVerticalRow.isEditingCompanyVertical) {
        // vert.forEach((element) => {

        // });
        console.log(`save details to server: ${companyVerticalRow.companyId}`);
        console.log(`vertical to server: ${companyVerticalRow.verticalId}`);
        if (companyVerticalRow.selectedAccount && companyVerticalRow.selectedAccount.id && companyVerticalRow.selectedAccount.name) {
          console.log(`selectedAccount: ${companyVerticalRow.selectedAccount.id},  name:  ${companyVerticalRow.selectedAccount.name}`);
        }
        if (companyVerticalRow.selectedVertical && companyVerticalRow.selectedVertical.id && companyVerticalRow.selectedVertical.name) {
          console.log(`selected vertical: ${companyVerticalRow.selectedVertical.id},   name:  ${companyVerticalRow.selectedVertical.name}`);
        }
        if (companyVerticalRow.selectedVertical.id && companyVerticalRow.selectedAccount.id) {
          console.log(`user is: ${this.userId} type: ${typeof (this.userId)}`);
          this.addUserToCompanyVertical(this.userId, companyVerticalRow.selectedAccount.id, companyVerticalRow.selectedVertical.id);
        }
      }
    },
    softDeleteUserCompany(index) {
      if (this.editableCompanyVerticals) {
        if (this.editableCompanyVerticals[index] && this.editableCompanyVerticals[index].softDeleteRequired) {
          // delete entry from server
          console.log(`id to be deleted from server ${this.editableCompanyVerticals[index].id}`);
        }
        // delete entry from ui
        this.editableCompanyVerticals.splice(index, 1);
      }
    },
    // addNewRowForCompanyVertical() {
    //   const newRow = {
    //     id: '',
    //     companyId: '',
    //     verticalId: '',
    //     isEditingCompanyVertical: false,
    //     selectedAccount: '',
    //     selectedVertical: '',
    //     softDeleteRequired: false,
    //   };
    //   this.editableCompanyVerticals.push(newRow);
    // },
    addNewRowForCompanyVertical() {
      const newRow = {
        id: '',
        companyId: '',
        verticalId: '',
        isEditingCompanyVertical: false,
        selectedAccount: '',
        selectedVertical: '',
        softDeleteRequired: false,
      };
      this.editableCompanyVerticals.push(newRow);
    },
    addNewRowForCompanyVerticalValues(id, companyId, verticalId, selectedAccount, selectedVertical) {
      const newRow = {
        id,
        companyId,
        verticalId,
        isEditingCompanyVertical: false,
        selectedAccount,
        selectedVertical,
        softDeleteRequired: true,
      };
      this.editableCompanyVerticals.push(newRow);
    },
    async getUserCompanyVerticals() {
      try {
        const { data } = await this.$apollo.query({
          query: GET_USER_COMAPNY_VERTICALS,
          variables: {
            id: parseInt(this.userId, 10),
          },
        });
        console.log(`publish Data :${data}`);
        if (data.publicUserCompanyList && data.publicUserCompanyList.length > 0) {
          // delete first empty row of companyVertical
          this.editableCompanyVerticals.splice(0, 1);
          data.publicUserCompanyList.forEach((element) => {
            const compID = element.companyId;
            const vertID = element.verticalId;
            const compVertID = element.companyVerticalId;
            const selectedAccount = element.company;
            console.log(`selected Row :${element.company}`);
            const selectedVertical = element.vertical;
            this.addNewRowForCompanyVerticalValues(compVertID, compID, vertID, selectedAccount, selectedVertical);
          });
        }
      } catch (error) {
        console.log(`getUserCompanyVerticals => error is: ${error}`);
      }
    },
    async deleteUserRecord(companyVerticalId, userId) {
      console.log(`companyvertical id is: ${companyVerticalId} with type ${typeof (companyVerticalId)} and ${userId} with type ${typeof (userId)}`);
      try {
        const { data } = await this.$apollo.query({
          query: GET_USER_COMAPNY_VERTICALS,
          variables: {
            companyVerticalId: parseInt(this.companyVerticalId, 10),
            userId: parseInt(this.userId, 10),
          },
        });
        if (data.publicUserCompanyList && data.publicUserCompanyList.length > 0) {
          // delete first empty row of companyVertical
          this.editableCompanyVerticals.splice(0, 1);
          data.publicUserCompanyList.forEach((element) => {
            const compID = element.companyId;
            const vertID = element.verticalId;
            const compVertID = element.companyVerticalId;
            const selectedAccount = element.company;
            const selectedVertical = element.vertical;
            this.addNewRowForCompanyVerticalValues(compVertID, compID, vertID, selectedAccount, selectedVertical);
          });
        }
      } catch (error) {
        console.log(`getUserCompanyVerticals => error is: ${error}`);
      }
    },
    async getAllCompanyVerticals() {
      try {
        console.log('getAllCompanyVerticals:');
        const { data } = await this.$apollo.query({
          query: GET_USER_COMAPNY_VERTICALS,
        });
        if (data.getAllCompanyVerticals && data.getAllCompanyVerticals.length > 0) {
          // delete first empty row of companyVertical
          console.log(`length:  ${data.getAllCompanyVerticals.length}`);
        }
      } catch (error) {
        console.log(`getAllCompanyVerticals => error is: ${error}`);
      }
    },
  },
};
</script>
