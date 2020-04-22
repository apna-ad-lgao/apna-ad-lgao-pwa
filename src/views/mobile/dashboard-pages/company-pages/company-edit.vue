<template>
  <section class="dashboard-user-edit-page h-min-screen bg-white p-5 mt-12">
    <h1 class="text-xl font-bold text-gray-700 mb-4">
      Edit Company
    </h1>
    <form>
      <div class="relative">
        <label class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase">Company Name</label>
        <input
          id="company"
          v-model="companyName"
          class="block appearance-none w-full bg-gray-100 border border-gray-400
        hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none"
          type="text"
          :disabled="isEditMode"
        >
        <label class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"> Type </label>
        <div class="relative">
          <select
            v-model="type"
            class="block appearance-none w-full bg-gray-100 border border-gray-400
                    hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
            :disabled="isEditMode"
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
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div class="relative">
          <label
            class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs
          uppercase"
            for="user-role-select"
          > Company Vertical </label>
          <div class="relative">
            <select
              id="user-role-select"
              ref="user-role-select"
              v-model="vertical"
              class="block appearance-none w-full bg-gray-100 border border-gray-400
                    hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
              :disabled="isEditMode"
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
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div v-if="enableActivateButton" class="cta-cont text-right mt-8">
        <button class="bg-green-500 border-2 border-green-500 mx-1 px-4 py-1 rounded text-white w-24 w-50" @click="modalActivateCompany = true">
          <span>Activate</span>
        </button>
      </div>
      <div v-if="!enableActivateButton" class="cta-cont text-right mt-8">
        <button class="bg-red-500 border-2 border-red-500 mx-1 px-4 py-1 rounded text-white w-24 w-50" @click="modalDisableCompany = true">
          <span>Delete</span>
        </button>
        <button
          v-if="enableSaveButton"
          class="border-2 rounded px-4 py-1 w-24 mx-1"
          :class="!saveButtonDisable ? 'border-green-400 text-green-500 w-24' : 'border-gray-400 text-gray-500'"
          :disabled="saveButtonDisable"
          @click="updateCompany"
        >
          <span>Save</span>
        </button>
        <button
          class="border-2 rounded px-4 py-1 w-24 mx-1"
          :class="!enableSaveButton ? 'border-red-400 text-red-500 w-24' : 'border-gray-400 text-gray-500'"
          :disabled="enableSaveButton"
          @click="updateEditMode"
        >
          <span>Edit</span>
        </button>

        <!-- <button
                  class="border-2 rounded px-4 py-1 w-24"
                  :class=" 'border-red-400 text-red-500'"
                  @click="softDeleteUser(index)"
                >
                  <span>Delete</span>
                </button> -->
      </div>
    </form>
    <p class="bg-gray-200 flex items-center justify-center my-3 px-5 py-3 text-gray-700 text-sm">
      Showing accounts: <span class="font-bold">{{ allUsers ? allUsers.length : 0 }}</span>
      <!-- Added Edit Button -->
      <!-- <router-link :to=`/dashboard/admin/user/edit/${user.id}` class="border-2 border-gray-500 rounded px-2 text-gray-600">
                Edit user
              </router-link> -->
    </p>
    <div>
      <!-- popup for enabled user -->
      <template>
        <transition name="bounce">
          <div v-if="modalIf" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

            <div class="modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto">
              <div class="bg-red-500 font-bold px-5 py-1 rounded text-white text-center">
                <p class="title">
                  Choose an Option!
                </p>
              </div>
              <h3 class="font-bold text-black px-2 py-6 text-center">
                Are you sure that you want to "DISABLE" this User.
              </h3>
              <div class="flex justify-around py-2 rounded-lg">
                <button class="border-2 border-red-500 font-bold px-3 rounded text-red-500 text-sm" @click="changeUserCompanyS">
                  Disable
                </button>
                <button class="border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-sm" @click="leave();">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>
      </template>

      <template>
        <transition name="bounce">
          <div v-if="modalDisableCompany" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

            <div class="modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto">
              <div class="bg-red-500 font-bold px-5 py-1 rounded text-white text-center">
                <p class="title">
                  Choose an Option!
                </p>
              </div>
              <h3 class="font-bold text-black px-2 py-6 text-center">
                Are you sure that you want to "DELETE" this Company.
              </h3>
              <div class="flex justify-around py-2 rounded-lg">
                <button class="border-2 border-red-500 font-bold px-3 rounded text-red-500 text-sm" @click="DeleteCompany">
                  Delete
                </button>
                <button class="border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-sm" @click="leaveConfirmBox">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>
      </template>

      <template>
        <transition name="bounce">
          <div v-if="modalActivateCompany" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

            <div class="modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto">
              <div class="bg-green-500 font-bold px-5 py-1 rounded text-white text-center">
                <p class="title">
                  Choose an Option!
                </p>
              </div>
              <h3 class="font-bold text-black px-2 py-6 text-center">
                Are you sure that you want to "ACTIVATE" this Company.
              </h3>
              <div class="flex justify-around py-2 rounded-lg">
                <button class="border-2 border-green-500 font-bold px-3 rounded text-green-500 text-sm" @click="ActivateCompany">
                  Enable
                </button>
                <button class="border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-sm" @click="leaveConfirmBox">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>
      </template>
      <!-- popup for disabled user -->
      <template>
        <transition name="bounce">
          <div v-if="modalIfUserDisable" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

            <div class="modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto">
              <div class="bg-green-500 font-bold px-5 py-1 rounded text-white text-center">
                <p class="title">
                  Choose an Option!
                </p>
              </div>
              <h3 class="font-bold text-black px-2 py-6 text-center">
                Are you sure that you want to "ENABLE" this User.
              </h3>
              <div class="flex justify-around py-2 rounded-lg">
                <button class="border-2 border-green-500 font-bold px-3 rounded text-green-500 text-sm" @click="changeUserCompanyS">
                  Enable
                </button>
                <button class="border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-sm" @click="leave();">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>
      </template>
      <!-- <PopupIf v-model="modalIf"></PopupIf> -->
      <PopupElse v-model="modalElse" />
    </div>
    <section class="bg-white">
      <div
        class="
        border-b
        border-t
        border-gray-200
        py-2
        block
        flex
        leading-normal
        text-gray-600
        text-sm
        font-black
        uppercase
        justify-between"
      >
        <p class="flex-2">
          User
        </p>
        <p class="flex-1 text-center">
          VOS
        </p>
        <p class="flex-1 text-center">
          VOD
        </p>
        <p class="flex-1 text-center">
          Admin
        </p>
        <p class="flex-1 text-right">
          Status
        </p>
      </div>
      <div
        v-for="user in allUsers"
        :key="user.id"

        class="
          border-b
          border-gray-200
          py-3
          w-full

          block
          flex
          text-left
          justify-between
          pointer
        "
      >
        <div class="flex-2 leading-snug">
          <p>{{ user.firstName }} {{ user.lastName }}</p>
          <p v-if="user.userHidden" class="text-red-700 text-xs">
            User Disabled
          </p>
          <!--
          <p class="text-gray-700 text-sm">
            Type: Champion
          </p> -->
        </div>
        <div class="no-text-wrap flex items-center justify-center flex-1">
          <i v-if="user.isVOC" class="far fa-check-circle text-green-500 text-lg" />
          <i v-else class="far fa-times-circle text-red-500 text-lg" />
        </div>
        <div class="no-text-wrap flex items-center justify-center flex-1">
          <i v-if="user.isVOD" class="far fa-check-circle text-green-500 text-lg" />
          <i v-else class="far fa-times-circle text-red-500 text-lg" />
        </div>
        <div class="no-text-wrap flex items-center justify-center flex-1">
          <i v-if="user.isAdmin" class="far fa-check-circle text-green-500 text-lg" />
          <i v-else class="far fa-times-circle text-red-500 text-lg" />
        </div>
        <div class="no-text-wrap flex items-center justify-end flex-1">
          <!-- <i v-if="user.isAdmin" class="far fa-check-circle text-green-500 text-lg" />
          <i v-else class="far fa-times-circle text-red-500 text-lg" /> -->
          <!-- :value="user.isHidden ? false : true" -->
          <!-- <toggle-button
            :id="user.id"
            :ref="'key' + user.id"
            :toggled="false"
            :value="user.isHidden === 0 ? false : true"
            :width="45"
            :color="{checked: '#48bb78', unchecked: '#f56565'}"
            :labels="{checked: '|', unchecked: 'O'}"
            @change="changeUsercompanyStatusN(user , $event )"
          /> -->

          <label v-if="!user.userHidden && !enableActivateButton" class="switch">
            <input
              id="checkbox"
              type="checkbox"
              :value="user.isHidden"
              :checked="user.isHidden ? false : true"
              @change="changeUsercompanyStatusN(user , $event )"
            >
            <span class="slider round" />
          </label>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// import { ToggleButton } from 'vue-js-toggle-button';
import FETCH_COMPANY_DETAIL from '@/graphql/fetchCompany.gql';
import FETCH_ALL_COMPANIES_USERS from '@/graphql/getAllUsersByCompanyVertical.gql';
import GETALL_VERTICALS from '@/graphql/fetchAllVerticals.gql';
import UPDATE_COMPANY_DETAIL from '@/graphql/updateCompanyDetails.gql';
import UPDATE_USERS_COMPANY_FLAG from '@/graphql/updateUserCompanyByVerticalFlag.gql';
// this can be use to update and data
import UPDATE_COMPANY_STATUS from '@/graphql/updateCompanyFlag.gql';
// toggle
import PopupElse from './popupElse.vue';
import { showErrorMessage, showSuccessMessage } from '../../../../utils/notification';

export default {
  allUsers: [],
  name: 'CompanyEdit',
  components: {
    PopupElse,
  },
  data() {
    return {
      query: '',
      typeFilter: '',
      type: '',
      verticalFilter: '',
      isFilled: false,
      checkUser: [],
      check: '',
      companyVerticalId: 0,
      enableSaveButton: false,
      enableActivateButton: false,
      companyName: '',
      companyType: '',
      companyId: 0,
      allUsers: [],
      isEditMode: true,
      validationErrors: [],
      verticalData: [],
      vertical: '',
      modalIf: false,
      modalElse: false,
      modalIfUserDisable: false,
      activateMode: false,
      modalDisableCompany: false,
      modalActivateCompany: false,
      compUserCheck: [],
    };
  },
  computed: {

    saveButtonDisable() {
      // TODO: Review this one! using same function to disable button and change its color

      if (this.companyName === '') {
        return true;
      }
      if (this.type === '') {
        return true;
      }
      if (this.vertical === '') {
        return true;
      }
      return false;
    },

  },

  watch: {
    $route(currentVal, oldVal) {
    //  console.log(currentVal.name);
    //  console.log(oldVal.name);
      if (oldVal.name === 'Dashboard.Companies' && currentVal.name === 'Dashboard.Company.Edit') {
        this.renderReady = false;
        this.getCompanyDetails();
        this.enableSaveButton = false;
        this.isEditMode = true;
      }
    },
  },

  mounted() {
    this.onAccountSelect();
    this.getCompanyDetails();

    // console.log(JSON.stringify(this.$refs));
    // const va = this.$refs;
    // console.log(this.$refs.key7);
    // console.log('va is: ', va);
    // console.log(this.$refs['user-role-select']);
  },

  methods: {
    leave() {
      this.modalIf = false;
      this.modalIfUserDisable = false;
      this.check.checked = !this.check.checked;
    },

    leaveConfirmBox() {
      this.modalDisableCompany = false;
      this.modalActivateCompany = false;
    },
    searchQueryUpdated(val) {
      this.query = val;
    },
    updateEditMode() {
      this.enableSaveButton = true;
      this.isEditMode = false;
    },
    async DeleteCompany() {
      try {
        const variable = {
          id: 0,
          isHidden: 1,
        };

        // variable.isHidden = this.isHidden;
        variable.id = parseInt(this.companyId, 10);

        const { data } = await this.$apollo.mutate({
          mutation: UPDATE_COMPANY_STATUS,
          variables: variable,
        });
        console.log('updateUser', data);
        this.$store.dispatch('addToastNotifications', {
          text: 'Company Updated Successfully !',
          timer: 4000,
          type: 'success',
        });

        this.enableActivateButton = true;
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });
      }

      this.modalDisableCompany = false;
    },

    async ActivateCompany() {
      try {
        const variable = {
          id: 0,
          isHidden: 0,
        };

        // variable.isHidden = this.isHidden;
        variable.id = parseInt(this.companyId, 10);

        await this.$apollo.mutate({
          mutation: UPDATE_COMPANY_STATUS,
          variables: variable,
        });
        this.$store.dispatch('addToastNotifications', {
          text: 'Company Activated Successfully !',
          timer: 4000,
          type: 'success',
        });

        this.enableActivateButton = false;
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });
      }
      this.modalActivateCompany = false;
    },

    async changeUsercompanyStatusN(user, event) {
      this.check = event.target;
      // if (event.target.checked === false) {
      //   this.compUserCheck = user;
      //   this.check = event.target;
      //   this.modalIf = true;
      // } else {
      //   this.compUserCheck = user;
      //   this.modalIfUserDisable = true;
      // }
      if (event.target.checked === false) {
        // console.log(user.isVOC);
        const checkN = user.isVOC ? 'isVOC' : 'isVOD';
        // this.checkUser = this.allUsers.filter(({ check }) => isVOC.includes(1));
        if (checkN === 'isVOC') {
          this.checkUser = this.allUsers.filter((allUsers) => allUsers.isHidden === 0 && allUsers.isVOC === 1);
        } else {
          this.checkUser = this.allUsers.filter((allUsers) => allUsers.isHidden === 0 && allUsers.isVOD === 1);
        }
        console.log(this.checkUser);
        console.log(this.checkUser.length);

        if (this.checkUser.length > 1) {
          this.compUserCheck = user;
          this.check = event.target;
          this.modalIf = true;
        } else {
          console.log('else');
          this.modalElse = true;
          this.check = event.target;
          // eslint-disable-next-line no-param-reassign
          event.target.checked = !event.target.checked;
        }
      } else {
        console.log('else');
        this.compUserCheck = user;
        this.modalIfUserDisable = true;
      }
    },
    async changeUserCompanyS() {
      const variable = {
        id: 0,
        userId: 0,
        isHidden: 0,
      };

      try {
        variable.id = parseInt(this.companyVerticalId, 10);
        variable.userId = parseInt(this.compUserCheck.id, 10);
        variable.isHidden = parseInt(this.compUserCheck.isHidden ? 0 : 1, 10);

        // check updated reslt isvalue updated or not ask pankaj
        await this.$apollo.mutate({
          mutation: UPDATE_USERS_COMPANY_FLAG,
          variables: variable,
        });

        const index = this.allUsers.findIndex((e) => e.id === this.compUserCheck.id);
        this.allUsers[index].isHidden = variable.isHidden;
        showSuccessMessage(this.$store, 'User Status change Successfully !');
      } catch (error) {
        showErrorMessage(this.$store, error.message);
        // console.log(error.message);
      }
      this.modalIf = false;
      this.modalIfUserDisable = false;
    },

    async updateCompany() {
      try {
        this.enableSaveButton = false;
        this.isReadOnlyFeild = true;

        const variable = {
          id: 0,
          name: '',
          type: '',
          verticalId: 0,
        };
        if (this.companyName) {
          variable.name = this.companyName;
        }

        if (this.type) {
          variable.type = this.type;
        }

        if (this.vertical) {
          variable.verticalId = this.vertical;
        }
        // variable.isHidden = this.isHidden;
        variable.id = parseInt(this.companyId, 10);

        await this.$apollo.mutate({
          mutation: UPDATE_COMPANY_DETAIL,
          variables: variable,
        });

        this.$store.dispatch('addToastNotifications', {
          text: 'Company Updated Successfully !',
          timer: 4000,
          type: 'success',
        });
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
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

    async getCompanyDetails() {
      const currentCompanyId = this.$route.params.companyId;
      this.companyId = this.$route.params.companyId;
      const { data } = await this.$apollo.query({
        fetchPolicy: 'network-only',
        query: FETCH_COMPANY_DETAIL,
        variables: {
          id: parseInt(currentCompanyId, 10),
        },
      });

      // console.log(data);
      const {
        name,
        type,
        verticalId,
        isHidden,
      } = data.fetchCompany[0];

      if (name) {
        this.companyName = name;
      }

      if (type) {
        this.type = type;
      }

      if (verticalId) {
        this.vertical = verticalId;
      }

      if (isHidden) {
        this.enableActivateButton = true;
      } else {
        this.enableActivateButton = false;
      }

      // const  usernewId  = this.$route.params.userId;
      // console.log(`Company Details are: ${JSON.stringify(this.$route.params)}`);
    },
  },
};
</script>
    <style scoped>
      /* About Styles */
      .bounce-enter-active {
        animation: bounce-in .7s;
      }
      .bounce-leave-active {
        animation: bounce-in .6s reverse;
      }
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f56565;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 3px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #4ebb7d;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
    </style>
