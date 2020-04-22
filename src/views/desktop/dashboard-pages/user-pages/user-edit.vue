<template>
  <section class="dashboard-user-edit-page h-min-screen bg-white p-5 mt-12">
    <h1
      class="text-xl font-bold text-gray-700 mb-4"
    >
      {{ $route.params.userId ? 'Edit user' : 'Add user' }}
    </h1>
    <!-- @submit.prevent="saveUser" -->
    <form>
      <div class="md:flex flex-wrap lg:justify-between  justify-around relative">
        <div class="xl:w-1/6 mx-3 w-1/3 lg:w-1/4">
          <label
            class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase"
            for="ohrid"
          >OHR Id</label>
          <input
            id="ohrid"
            v-model="userOhrid"
            class="block appearance-none w-full bg-gray-100 border border-gray-400 text-lg
            hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none"
            type="number"
            placeholder="Ex: 30000000"
            minlength="7"
            maxlength="9"
            :readonly="!isReadOnly"
          >
        </div>
        <div class="xl:w-1/6 mx-3 w-1/3 lg:w-1/4">
          <label
            class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase"
            for="ohrid"
          >First Name</label>
          <input
            id="ohrid"
            v-model="userFirstName"
            class="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500
            px-4 py-2 rounded leading-tight focus:outline-none text-lg"
            type="text"
            placeholder="Ex: Rahul"
            :readonly="!isReadOnly"
          >
        </div>
        <div class="xl:w-1/6 mx-3 w-1/3 lg:w-1/4">
          <label
            class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase"
            for="ohrid"
          >Last Name</label>
          <input
            id="ohrid"
            v-model="userLastName"
            class="block appearance-none w-full bg-gray-100 border border-gray-400
            hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none text-lg"
            type="text"
            placeholder="Ex: Jain"
            :readonly="!isReadOnly"
          >
        </div>
        <div class="xl:w-1/6 mx-3 w-1/3 lg:w-1/3">
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
            hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none text-lg"
              :disabled="isReadOnlyFeild"
              @change="checkOnchangeVocVod"
            >
              <!--   @change="onUserRoleChanged" -->
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
        <!-- <div class="xl:w-1/6 mx-3 w-1/3 lg:w-1/3">
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
            hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none text-lg"
              :disabled="isReadOnlyFeild"
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
        </div> -->
      </div>
      <div v-if="enableActivateButton" class="cta-cont text-left my-6">
        <button class="bg-green-500 border-2 border-green-500 mx-1 px-4 py-1 rounded text-white w-24 w-50" @click="modalActivateUser = true">
          <span>Activate</span>
        </button>
      </div>
      <div v-if="!enableActivateButton" class="cta-cont text-left my-6">
        <button class="bg-red-500 border-2 border-red-500 mx-1 px-4 py-1 rounded text-white w-24 w-50" @click="modalDisableUserFunc">
          <span>Delete</span>
        </button>
        <button
          v-if="enableSaveButton"
          class="border-2 rounded px-4 py-1 w-24 mx-1"
          :class="!saveButtonDisable ? 'border-green-400 text-green-500 w-24' : 'border-gray-400 text-gray-500'"
          :disabled="saveButtonDisable"
          @click="updateUser"
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
      <!-- Dynamic company vertical section -->
      <h1 v-if="userRole && (userRole === 'voc' || userRole === 'vod' ) " class="text-xl font-bold text-gray-700 mb-4 mt-4">
        {{ 'Assigned Accounts' }}
      </h1>
      <div class="bg-gray-200 flex items-center justify-center rounded my-3 py-2">
        <p class="text-gray-700">
          Showing accounts <span class="font-bold">{{ filteredResults.length > 1 ? '' : '' }}: {{ filteredResults.length }}</span>
        </p>
        <button
          v-if=" statusFilter"
          class="bg-red-500 mx-5 px-3 py-2 rounded text-bold text-white"
          @click.prevent.stop="resetFilters"
        >
          Reset Filter
        </button>
        <div class="mx-5 flex text-gray-600 justify-center">
          <div class="w-auto relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 pr-4 text-gray-600">
              <i class="fas fa-filter text-sm" />
            </div>
            <select
              v-model="statusFilter"
              class="
                block
                appearance-none
                w-full
                bg-gray-100
                border
                border-gray-400
                hover:border-gray-500
                px-6
                py-2
                rounded
                leading-tight
                focus:outline-none
              "
            >
              <option value="">
                Filter by  Status
              </option>
              <option value="0">
                Active
              </option>
              <option value="1">
                In-Active
              </option>
            <!-- <option v-for="status in companyStatus" :key="status" :value="status">
                {{ status }}
              </option> -->
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>

        <div
          v-if="statusFilter "
          class="mx-5 text-gray-600"
        >
          <div class="flex items-center">
            <p class="font-bold">
              Filtered by :
            </p>
            <span v-if="statusFilter" class="text-gray-600">
              <label class="border border-gray-400 bg-gray-300 inline-block px-3 py-2 mx-5 pointer rounded">
                Status: <b>{{ parseInt(this.statusFilter) === 1 ?'In-Active':'Active' }}</b>
              </label>
            </span>
          </div>
        </div>
      </div>

      <section v-if="filteredResults" class="flex flex-wrap justify-between items-center">
        <div v-for="(companyVerticalRow, index) in filteredResults" :key="index" class="userCard w-2/35 border border-gray-400 my-6 p-1 p-2 rounded-lg">
          <!-- User comapnies list -->
          <div v-if="userRole && (userRole === 'voc' || userRole === 'vod')">
            <div v-if="publicUserCompanyList" class="relative">
              <div v-if="companyVerticalRow.userCompanyStatus" class="text-red-500 font-bold letter-spacing-1 underline rounded text-center text-xs">
                NOTE : Company access revoked !!
              </div>
              <div v-if="companyVerticalRow.isHidden" class="text-red-500 font-bold letter-spacing-1 underline rounded text-center text-xs">
                NOTE : company is already disabled !!
              </div>
              <label
                class="block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"
                for="user-account-select"
              >Account to be aligned</label>
              <div class="relative">
                <select
                  v-if="publicUserCompanyList"
                  id="user-account-select"
                  ref="user-account-select"
                  v-model="companyVerticalRow.selectedAccount"
                  class="block appearance-none w-full bg-gray-100
                  border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
                  :disabled="!companyVerticalRow.isEditingCompanyVertical"
                  @change="onAccountSelect(companyVerticalRow, $event)"
                >
                  <option
                    v-for="(item) in accountData"
                    :key="item.id"
                    :data-id="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                    <br>
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
              >
                Vertical
              </label>
              <div class="relative">
                <input
                  id=""
                  v-model="companyVerticalRow.selectedVertical"
                  class="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4
                   py-2 rounded leading-tight focus:outline-none"
                  type="text"
                  placeholder="Ex: Jain"
                  :readonly="true"
                >
                <!-- {{ companyVerticalRow.selectedVertical }} -->
              </div>
            </div>
            <div class="cta-cont text-right my-4">
              <button
                v-if="companyVerticalRow.isEditingCompanyVertical && !enableActivateButton"
                class="border-2 rounded px-4 py-1 w-24 mx-1"
                :class="enableAddCompanyButton ? 'border-green-400 text-green-500' : 'border-gray-400 text-gray-500 w-24'"
                :disabled="!enableAddCompanyButton"
                @click="makeCompanyVerticalEditable(companyVerticalRow)"
              >
                <span v-if="companyVerticalRow.isEditingCompanyVertical">Save</span>
                <span v-else>Edit</span>
              </button>
              <button
                v-if="!enableActivateButton && !companyVerticalRow.userCompanyStatus && !companyVerticalRow.isHidden"
                class="border-2 rounded px-4 py-1 w-24 mx-1"
                :class="!companyVerticalRow.isEditingCompanyVertical ? 'border-red-400 text-red-500' : 'border-gray-400 text-gray-500'"

                @click="softDeleteUserCompany(index)"
              >
                Delete
              </button>
              <button
                v-if="!enableActivateButton && companyVerticalRow.userCompanyStatus"
                class="border-2 rounded px-4 py-1 w-24 mx-1"
                :class="!companyVerticalRow.isEditingCompanyVertical ? 'border-green-400 text-green-500' : 'border-gray-400 text-gray-500'"

                @click="ActivateUserCompany(index)"
              >
                Activate
              </button>
            </div>
          </div>
          <!-- add user company -->
        </div>
        <!-- add company vertical row -->
        <div v-if="userRole && (userRole === 'voc' || userRole === 'vod') && !enableActivateButton" class="cta-cont w-full mx-auto mb-5">
          <button
            class="border-2 border-gray-300 rounded px-4 py-1 text-gray-700 w-64 mx-auto border-green-400 text-green-500 block"
            @click.prevent="addNewRowForCompanyVertical()"
          >
            Assign To Company Vertical
          </button>
        </div>
      </section>
    </form>

    <template>
      <transition name="bounce">
        <div v-if="modalDisableUser" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
          <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

          <div class="bg-white flex flex-col modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 h-64 lg:w-1/3 overflow-y-auto">
            <div class="bg-red-500 font-bold px-5 py-1 rounded text-2xl text-center text-white">
              <p class="title">
                Choose an Option!
              </p>
            </div>
            <h3 class="font-bold mx-auto my-6 px-2 py-6 text-black text-xl">
              Are you sure that you want to "DELETE" this User.
            </h3>
            <div class="flex justify-around">
              <button class="border-2 border-red-500 font-bold px-3 rounded text-red-500 text-lg" @click="DeleteUser">
                Delete
              </button>
              <button class="border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-lg" @click="leaveConfirmBox">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </transition>
    </template>

    <template>
      <transition name="bounce">
        <div v-if="modalActivateUser" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
          <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

          <div class="bg-white flex flex-col modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 h-64 lg:w-1/3 overflow-y-auto">
            <div class="bg-red-500 font-bold px-5 py-1 rounded text-2xl text-center text-white">
              <p class="title">
                Choose an Option!
              </p>
            </div>
            <h3 class="font-bold mx-auto my-6 px-2 py-6 text-black text-xl">
              Are you sure that you want to "ACTIVATE" this User.
            </h3>
            <div class="flex justify-around">
              <button class="border-2 border-green-500 font-bold px-3 rounded text-green-500 text-lg" @click="ActivateUser">
                Enable
              </button>
              <button class="border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-lg" @click="leaveConfirmBox">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </transition>
    </template>

    <template>
      <transition name="bounce">
        <div v-if="popupUserActionDisable" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
          <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
          <div class="bg-white flex flex-col justify-between modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 h-64 lg:w-1/3 overflow-y-auto">
            <div class="bg-red-500 font-bold px-5 py-1 rounded text-2xl text-center text-white">
              <p class="title">
                Attention!
              </p>
            </div>
            <h2 class="font-bold mx-auto px-2 text-black text-xl">
              {{ popupRole }},
            </h2>
            <h3 class="font-bold text-black px-2 text-center text-lg">
              {{ popupText }}
            </h3>
            <div class="flex justify-center pb-5">
              <button class="border-2 border-gray-600 font-bold px-3 rounded text-gray-600 text-lg" @click="leave">
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

          <div class="bg-white flex flex-col modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto">
            <div class="bg-red-500 font-bold px-5 py-1 rounded text-2xl text-center text-white">
              <p class="title">
                Choose an Option!
              </p>
            </div>
            <h3 class="font-bold mx-auto my-6 px-2 py-6 text-black text-xl">
              You can not Delete this Company, Because this User is last VOC/VOD in this Company.
            </h3>
            <div class="flex justify-center">
              <button class="border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-lg" @click="leaveConfirmBox">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </section>
</template>

<script>
import ADD_USER from '@/graphql/addUser.gql';
import FETCH_ALL_COMPANIES from '@/graphql/fetchAllCompanies.gql';
import FETCH_USER_DETAIL from '@/graphql/fetchUser.gql';
// import GETALL_VERTICALS from '@/graphql/fetchAllVerticals.gql';
import GETALL_VERTICALS_FROM_COMPANY from '@/graphql/getVerticalByCompany.gql';
// import UPDATE_USER from '@/graphql/updateUser.gql';
import UPDATE_USER_STATE from '@/graphql/updateUserState.gql';
// import UPDATE_USERS_FLAG from '@/graphql/updateUsersFlag.gql';
import UPDATE_USERS_COMPANY_FLAG from '@/graphql/updateUserCompanyByVerticalFlag.gql';
import ADD_USER_TO_COMPANY_VERTICAL from '@/graphql/addUserToCompanyVertical.gql';
import ADD_USER_TO_COMPANY_VERTICALS from '@/graphql/addUserToCompanyVerticalS.gql';
import UPDATE_COMPANY_VERICAL from '@/graphql/updateCompanyVertical.gql';
import ADD_USER_COMPANY from '@/graphql/addUserCompany.gql';
import UPDATE_USER_COMPANY from '@/graphql/updateUserCompany.gql';
import GET_VERTICALS_FOR_COMPANY from '@/graphql/getAllVerticalsForCompany.gql';
import GET_VOC_VOD_LIST from '@/graphql/fetchCompanyVocAndVod.gql';
import GET_VOC_VOD_COMPANY from '@/graphql/fetchCompanyVocAndVodFromCompVertical.gql';
// this can be use to update and data
import GET_USER_COMAPNY_VERTICALS from '@/graphql/publicUserCompanyList.gql';
import GET_ALL_COMPANY_VERTICALS from '@/graphql/publicUserCompanyVerticalList.gql';

export default {
  name: 'UserEdit',
  data() {
    return {
      userId: '',
      userOhrid: '',
      saveButtonStatus: true,
      enableSaveButton: false,
      userFirstName: '',
      isHidden: '',
      userLastName: '',
      userRole: '',
      adminRole: '',
      enableActivateButton: false,
      enableAddCompanyButton: true,
      isEditMode: false,
      selectedAccount: '',
      languages: [1],
      statusFilter: '',
      accountData: [],
      verticalData: [],
      modalDisableUser: false,
      modalActivateUser: false,
      selectedVertical: '',
      validationErrors: [],
      isReadOnly: true,
      isReadOnlyFeild: true,
      editSaveToggle: [],
      isEditingCompanyVertical: false,
      popupUserActionDisable: false,
      currentRoleUser: false,
      modalDisableCompany: false,
      popupText: '',
      popupRole: '',
      editableCompanyVerticals: [
        // {
        //   id: '',
        //   companyId: '',
        //   verticalId: '',
        //   isEditingCompanyVertical: false,
        //   selectedAccount: '',
        //   selectedVertical: '',
        //   softDeleteRequired: false,
        // },
      ],
      publicUserCompanyList: [],
    };
  },
  computed: {
    saveButtonDisable() {
      // TODO: Review this one! using same function to disable button and change its color

      if (this.adminRole === 1) {
        return false;
      } if (this.userRole === '') {
        return true;
      }
      return false;
    },

    filteredResults() {
      const statusFilter = parseInt(this.statusFilter, 10);
      try {
        let companies = this.editableCompanyVerticals ? [...this.editableCompanyVerticals] : [];
        if (this.statusFilter) {
          if (statusFilter === 0) {
            companies = companies.filter((company) => company.isHidden === statusFilter && company.userCompanyStatus === statusFilter);
          } else {
            companies = companies.filter((company) => company.isHidden === statusFilter || company.userCompanyStatus === statusFilter);
          }

          // companies = companies.filter(({ isHidden }) => isHidden == this.statusFilter  );
          // companies = companies.filter(({ userCompanyStatus }) => userCompanyStatus == this.statusFilter);
        }

        return companies;
      } catch (err) {
        console.warn(err.message, err); // eslint-disable-line
        return [];
      }
    },
  },
  watch: {
    $route(currentVal, oldVal) {
      if (oldVal.name === 'Dashboard.Admin' && currentVal.name === 'Dashboard.User.Edit') {
        this.renderReady = false;
        this.getUserDetails();
        this.onUserRoleChanged();
        this.getUserCompanyVerticals();
        // this.onAccountSelect();
        this.getAllCompanyVerticals();
      }
    },
  },
  deactivated() {
    this.userOhrid = '';
    this.userFirstName = '';
    this.userLastName = '';
    this.userRole = '';
    this.adminRole = '';
    this.selectedAccount = '';
    this.selectedVertical = '';
    this.accountData = [];
    this.verticalData = [];
    this.validationErrors = [];
  },
  async  mounted() {
    await this.getUserDetails();
    await this.onUserRoleChanged();
    await this.getUserCompanyVerticals();
    // this.onAccountSelect();
    await this.getAllCompanyVerticals();
  },
  methods: {
    leaveConfirmBox() {
      this.modalDisableUser = false;
      this.modalActivateUser = false;
    },
    resetFilters() {
      this.statusFilter = '';
    },
    async addUser(firstName, lastName, ohrid, isVOC, isVOD, isReviewer, isAdmin, companyId, verticalId) {
      try {
        await this.$apollo.mutate({
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
        // console.log('addUser', result);
      } catch (error) {
        // console.log(error.message);
      }
    },
    async checkOnchangeVocVod() {
      // console.log(this.currentRoleUser);
      const id = parseInt(this.$route.params.userId, 10);
      const { data } = await this.$apollo.query({
        query: GET_VOC_VOD_LIST,
        variables: {
          id,
        },
      });

      // console.log(data);
      for (let i = 0; i < data.fetchCompanyVocAndVod.length; i += 1) {
        if (this.currentRoleUser === 'voc') {
        //  console.log("call voc");
        //  console.log(parseInt( data.fetchCompanyVocAndVod[i].voc , 10 ));
          if (parseInt(data.fetchCompanyVocAndVod[i].voc, 10) <= 1) {
            this.popupUserActionDisable = true;
            this.popupRole = `You are not allowed to change user role to ${this.userRole}`;
            this.userRole = this.currentRoleUser;
            this.popupText = `As you were last aligned As ${this.currentRoleUser} with company  ' ${data.fetchCompanyVocAndVod[i].name} '`;

            return;
          }
        } else {
          // console.log("call vod");
          // console.log(parseInt( data.fetchCompanyVocAndVod[i].vod , 10 ));
          this.popupRole = `You are not allowed to change user role to ${this.userRole}`;
          this.userRole = this.currentRoleUser;
          this.popupText = `As you were last aligned As ${this.currentRoleUser} with company ' ${data.fetchCompanyVocAndVod[i].name} '`;

          if (parseInt(data.fetchCompanyVocAndVod[i].vod, 10) <= 1) {
            this.popupUserActionDisable = true;
            return;
          }
        }
      }
    },
    async modalDisableUserFunc() {
      const id = parseInt(this.$route.params.userId, 10);
      const { data } = await this.$apollo.query({
        query: GET_VOC_VOD_LIST,
        variables: {
          id,
        },
      });

      // console.log(data);
      let errorCheck = false;
      for (let i = 0; i < data.fetchCompanyVocAndVod.length; i += 1) {
        if (this.currentRoleUser === 'voc') {
        //  console.log("call voc");
        //  console.log(parseInt( data.fetchCompanyVocAndVod[i].voc , 10 ));
          if (parseInt(data.fetchCompanyVocAndVod[i].voc, 10) <= 1) {
            this.popupUserActionDisable = true;
            this.popupRole = 'You are not allowed to delete this User';
            this.popupText = `As you were last aligned As ${this.currentRoleUser} with company  ' ${data.fetchCompanyVocAndVod[i].name} '`;

            // this.popupText = "user  is aligned as  last VOC in company '"+data.fetchCompanyVocAndVod[i].name+"'";
            errorCheck = true;
            break;
          }
        } else if (parseInt(data.fetchCompanyVocAndVod[i].vod, 10) <= 1) {
          // console.log("call vod");
          // // console.log(parseInt( data.fetchCompanyVocAndVod[i].vod , 10 ));
          // if (parseInt(data.fetchCompanyVocAndVod[i].vod, 10) <= 1) {
          this.popupRole = 'You are not allowed to delete this User';
          this.popupText = `As you were last aligned As ${this.currentRoleUser} with company  ' ${data.fetchCompanyVocAndVod[i].name} '`;

          // this.popupText = "user  is aligned as last VOD in company '"+data.fetchCompanyVocAndVod[i].name+"'";
          this.popupUserActionDisable = true;
          errorCheck = true;
        }
      }
      if (errorCheck === false) {
        this.modalDisableUser = true;
      }
    },
    leave() {
      this.popupUserActionDisable = false;
      this.enableSaveButton = false;
      this.isReadOnlyFeild = true;
    },
    async updateUser() {
      try {
        // console.log(this.userId);
        // console.log(this.userRole);
        this.enableSaveButton = false;
        this.isReadOnlyFeild = true;
        // console.log("save button status : "+this.saveButtonDisable);

        // / break();

        const variable = {
          userId: 0,
          isVoc: 0,
          isVod: 0,
          isAdmin: 0,
          isHidden: 0,
        };

        if (this.userRole === 'voc') {
          variable.isVoc = 1;
        } else if (this.userRole === 'vod') {
          variable.isVod = 1;
        }
        // if (this.adminRole === 1) {
        //   variable.isAdmin = 1;
        // }
        variable.isHidden = this.isHidden;
        variable.userId = this.userId;
        // console.log(variable);
        // await this.$apollo.mutate({
        //   mutation: UPDATE_USER,
        //   variables: variable,
        // });
        // console.log('updateUser', data);
        this.$store.dispatch('addToastNotifications', {
          text: 'User Updated Successfully !',
          timer: 4000,
          type: 'success',
        });
      } catch (error) {
        // console.log(error.message);
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });
      }
    },
    updateEditMode() {
      this.enableSaveButton = true;
      this.isReadOnlyFeild = false;
    },
    async addUserToCompanyVertical(userId, companyId, verticalId) {
      try {
        await this.$apollo.mutate({
          mutation: ADD_USER_TO_COMPANY_VERTICAL,
          variables: {
            userId,
            companyId,
            verticalId,
          },
        });
        // console.log('addUserToCompanyVertical', data);
      } catch (error) {
        // console.log(error.message);
      }
    },
    async addUserToCompanyVerticalS(userId, companyvId) {
      try {
        await this.$apollo.mutate({
          mutation: ADD_USER_TO_COMPANY_VERTICALS,
          variables: {
            companyvId,
            userId,
          },
        });
        this.$store.dispatch('addToastNotifications', {
          text: 'Company aligned to User   Successfully !',
          timer: 4000,
          type: 'success',
        });
        // await this.getUserCompanyVerticals();
        // console.log('addUserToCompanyVertical', data);
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });
        this.enableAddCompanyButton = !this.enableAddCompanyButton;

        // console.log(error.message);
      }
    },

    async hiddenUserCompany(id, userId, isHidden) {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_USERS_COMPANY_FLAG,
          variables: {
            id,
            userId,
            isHidden,
          },
        });
        // console.log('addUserToCompanyVertical', data);

        this.$store.dispatch('addToastNotifications', {
          text: 'Company Deleted Successfully !',
          timer: 4000,
          type: 'success',
        });
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });

        // console.log(error.message);
      }
    },

    async enableUserCompany(id, userId, isHidden) {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_USERS_COMPANY_FLAG,
          variables: {
            id,
            userId,
            isHidden,
          },
        });
        // console.log('addUserToCompanyVertical', data);

        this.$store.dispatch('addToastNotifications', {
          text: 'Company Activated Successfully !',
          timer: 4000,
          type: 'success',
        });
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });

        // console.log(error.message);
      }
    },

    async updateCompanyVertical(companyVerticalId, companyId, verticalId, userCompanyId, userId) {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_COMPANY_VERICAL,
          variables: {
            companyVerticalId,
            companyId,
            verticalId,
            userCompanyId,
            userId,
          },
        });
        // console.log('updateCompanyVertical', data);
      } catch (error) {
        // console.log(error.message);
      }
    },
    async addUserCompany(companyVerticalId, userId) {
      try {
        await this.$apollo.mutate({
          mutation: ADD_USER_COMPANY,
          variables: {
            companyVerticalId,
            userId,
          },
        });
        // console.log('addUserCompany', data);
      } catch (error) {
        // console.log(error.message);
      }
    },
    async updateUserCompany(userCompanyId, companyVerticalId, userId, isDeleted) {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_USER_COMPANY,
          variables: {
            userCompanyId,
            companyVerticalId,
            userId,
            isDeleted,
          },
        });
        // console.log('updateUserCompany', data);
      } catch (error) {
        // console.log(error.message);
      }
    },
    async onAccountSelect(companyVerticalRow, event) {
      try {
        // console.log(event.target.dataset);
        // console.log('ID:', event.target.dataset.id);
        const companyID = parseInt(event.target.value, 10);
        let { data } = await this.$apollo.query({
          query: GETALL_VERTICALS_FROM_COMPANY,
          variables: {
            id: companyID,
          },
        });
        // console.log(`darta : is : ${JSON.stringify(data)}`);
        data = data.getVerticalByCompany;
        [data] = data;
        // console.log(`data is: ${JSON.stringify(data)}`);
        // console.log(data.getVerticalByCompany);
        companyVerticalRow.selectedVertical = data.name;
        companyVerticalRow.companyId = companyID;
        // companyVerticalRow.selectedVertical = data.getVerticalByCompany.name;

        // console.log('TCL: onAccountSelect -> this.verticalData', this.verticalData);
      } catch (error) {
        // console.log('vertical error -> ', error);
      }
      // this.verticalData = this.accountData.filter(ad  => ad.companyId === this.selectedAccount.companyId);
    },
    async onUserRoleChanged() {
      try {
        const { data } = await this.$apollo.query({ query: FETCH_ALL_COMPANIES });
        this.accountData = data.fetchAllCompanies;
        // console.log("Fetch ALL Companies : "+ JSON.stringify(data.fetchAllCompanies));
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
        await this.$apollo.query({
          query: GET_VERTICALS_FOR_COMPANY,
          variables: {
            companyId,
          },
        });
        // console.log(`data is: ${data}`);
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
      const hasNumber = /\d/;
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
      const companyId = this.selectedAccount.id;
      const verticalId = this.selectedVertical.id;
      const variable = {
        firstName: userFirstName,
        lastName: userLastName,
        ohrid: parseInt(userOhrid, 10),
        isVOC: 0,
        isVOD: 0,
        isReviewer: 0,
        isAdmin: 0,
        companyId,
        verticalId,
      };
      if (this.adminRole) {
        variable.isAdmin = 1;
      }
      if (this.userRole === 'voc') {
        variable.isVOC = 1;
      } else if (this.userRole === 'vod') {
        variable.isVOD = 1;
      } else {
        // variable.isAdmin = 1;
        variable.companyId = 0;
        variable.verticalId = 0;
      }

      try {
        const result = await this.$apollo.mutate({
          mutation: ADD_USER,
          variables: variable,
        });
        if (!result.data.addUser) {
          throw new Error(`User with OHRID ${userOhrid} already exists`);
        }
        this.$store.dispatch('addToastNotifications', {
          text: 'User added succesfully!',
          timer: 4000,
          type: 'success',
        });

        this.$router.go(-1);
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: `${error.message}`,
          timer: 4000,
          type: 'error',
        });
      }
    },
    async DeleteUser() {
      // console.log(this.companyId);
      // console.log('function called !! ');

      try {
        const variable = {
          userId: 0,
          isHidden: 1,
        };

        // variable.isHidden = this.isHidden;
        const usernewId = this.$route.params.userId;
        variable.userId = parseInt(usernewId, 10);

        await this.$apollo.mutate({
          mutation: UPDATE_USER_STATE,
          variables: variable,
        });
        // console.log('updateUser', data);
        this.$store.dispatch('addToastNotifications', {
          text: 'User Updated Successfully !',
          timer: 4000,
          type: 'success',
        });

        this.enableActivateButton = true;
        this.modalDisableUser = false;
      } catch (error) {
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });
      }
    },
    async ActivateUser() {
      try {
        const variable = {
          userId: 0,
          isHidden: 0,
        };

        // variable.isHidden = this.isHidden;
        const usernewId = this.$route.params.userId;
        variable.userId = parseInt(usernewId, 10);

        await this.$apollo.mutate({
          mutation: UPDATE_USER_STATE,
          variables: variable,
        });
        // console.log('updateUser', data);
        this.$store.dispatch('addToastNotifications', {
          text: 'User Activated Successfully !',
          timer: 4000,
          type: 'success',
        });

        this.enableActivateButton = false;
        this.modalActivateUser = false;
      } catch (error) {
        // console.log(error.message);
        this.$store.dispatch('addToastNotifications', {
          text: error.message,
          timer: 4000,
          type: 'error',
        });
      }
    },

    async getUserDetails() {
      const {
        isEditMode,
      } = this.$route.query;
      const usernewId = this.$route.params.userId;
      // console.log("User Added Id "+ usernewId);

      const { data } = await this.$apollo.query({
        query: FETCH_USER_DETAIL,
        variables: {
          id: parseInt(usernewId, 10),
        },
      });

      const {
        firstName, lastName, ohrid, isVOC, isVOD, isAdmin, isHidden,
      } = data.getUser[0];
      // console.log(`isVOC value :${isVOC}`);
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
        if (usernewId) {
          this.userId = parseInt(usernewId, 10);
          // console.log(`userId: ${usernewId}`);
        }
        if (isVOC === 1) {
          // console.log(`isVOC: ${isVOC}`);
          this.userRole = 'voc';
          this.currentRoleUser = 'voc';
        }
        if (isVOD === 1) {
          // console.log(`isVOD: ${isVOD}`);
          this.userRole = 'vod';
          this.currentRoleUser = 'vod';
        }
        // else if (isAdmin) {
        //    console.log(`isAdmin: ${isAdmin}`);
        //   this.userRole = 'admin';
        // }

        if (isAdmin) {
          // console.log(`isAdmin: ${isAdmin}`);
          this.adminRole = 1;
        }

        if (isHidden === 1) {
          this.enableActivateButton = true;
        }
        this.isHidden = isHidden;
        this.isReadOnly = false;
      } else {
        this.isReadOnly = true;
      }
      console.log(`is read only is: ${this.isReadOnly}`);
    },
    makeCompanyVerticalEditable(companyVerticalRow) {
      // companyVerticalRow.isEditingCompanyVertical = !companyVerticalRow.isEditingCompanyVertical;
      if (!companyVerticalRow.isEditingCompanyVertical) {
        // vert.forEach((element) => {

        // });
        // console.log(companyVerticalRow);
        // console.log(`save details to server: ${companyVerticalRow.companyId}`);
        // console.log(`vertical to server: ${companyVerticalRow.verticalId}`);
        // this.addUserToCompanyVerticalS(this.userId,companyVerticalRow.companyId);
        if (companyVerticalRow.selectedAccount && companyVerticalRow.selectedAccount.id && companyVerticalRow.selectedAccount.name) {
          console.log(`selectedAccount: ${companyVerticalRow.selectedAccount.id},  name:  ${companyVerticalRow.selectedAccount.name}`);
        }
        if (companyVerticalRow.selectedVertical && companyVerticalRow.selectedVertical.id && companyVerticalRow.selectedVertical.name) {
          console.log(`selected vertical: ${companyVerticalRow.selectedVertical.id},   name:  ${companyVerticalRow.selectedVertical.name}`);
        }
        if (companyVerticalRow.selectedVertical.id && companyVerticalRow.selectedAccount.id) {
          console.log(`user is: ${this.userId} type: ${typeof (this.userId)}`);
          this.addUserToCompanyVertical(this.userId, companyVerticalRow.selectedAccount.id, companyVerticalRow.selectedVertical.id);
          // console.log("first function !! ");
        }
      } else {
        // console.log("second function !! ");
        this.enableAddCompanyButton = !this.enableAddCompanyButton;
        // console.log("Status : "+ this.enableAddCompanyButton);
        this.addUserToCompanyVerticalS(this.userId, companyVerticalRow.companyId);
      }
    },
    async softDeleteUserCompany(index) {
      const id = parseInt(this.$route.params.userId, 10);
      const companyVertical = this.editableCompanyVerticals[index].id;
      console.log(this.editableCompanyVerticals[index].id);
      const { data } = await this.$apollo.query({
        query: GET_VOC_VOD_COMPANY,
        variables: {
          id, companyVertical,
        },
      });

      console.log(data.fetchCompanyVocAndVodFromCompVertical);

      let errorCheck = false;

      if (this.currentRoleUser === 'voc') {
        //  console.log("call voc");
        //  console.log(parseInt( data.fetchCompanyVocAndVod[i].voc , 10 ));
        if (parseInt(data.fetchCompanyVocAndVodFromCompVertical[0].voc, 10) <= 1) {
          this.popupRole = 'You are not allowed to disable this Company ';
          this.popupText = `As you were last aligned As ${this.currentRoleUser} with company  ' ${data.fetchCompanyVocAndVodFromCompVertical[0].name} '`;
          this.popupUserActionDisable = true;
          errorCheck = true;
          return;
        }
      } else if (parseInt(data.fetchCompanyVocAndVodFromCompVertical[0].vod, 10) <= 1) {
        this.popupRole = 'You are not allowed to disable this Company ';
        this.popupText = `As you were last aligned As ${this.currentRoleUser} with company  ' ${data.fetchCompanyVocAndVodFromCompVertical[0].name} '`;

        this.popupUserActionDisable = true;
        errorCheck = true;
        return;
      }

      if (errorCheck === false) {
        // this.modalDisableUser = true;
        // return;
      }
      if (this.editableCompanyVerticals) {
        if (this.editableCompanyVerticals[index] && this.editableCompanyVerticals[index].softDeleteRequired) {
          // delete entry from server
          this.hiddenUserCompany(this.editableCompanyVerticals[index].id, this.userId, 1);
          console.log('TCL: softDeleteUserCompany -> index', index);
          // console.log(`id to be deleted from server ${this.editableCompanyVerticals[index].id}`);
        }
        this.editableCompanyVerticals[index].userCompanyStatus = 1;
        console.log('TCL: softDeleteUserCompany -> this.editableCompanyVerticals[index]', this.editableCompanyVerticals[index]);
        // delete entry from ui
        // this.editableCompanyVerticals.splice(index, 1);
      }
    },
    ActivateUserCompany(index) {
      if (this.editableCompanyVerticals) {
        if (this.editableCompanyVerticals[index] && this.editableCompanyVerticals[index].softDeleteRequired) {
          // delete entry from server
          this.enableUserCompany(this.editableCompanyVerticals[index].id, this.userId, 0);
          console.log('TCL: softDeleteUserCompany -> index', index);
          // console.log(`id to be deleted from server ${this.editableCompanyVerticals[index].id}`);
        }
        this.editableCompanyVerticals[index].userCompanyStatus = 0;
        console.log('TCL: softDeleteUserCompany -> this.editableCompanyVerticals[index]', this.editableCompanyVerticals[index]);
        // delete entry from ui
        // this.editableCompanyVerticals.splice(index, 1);
      }
    },
    addNewRowForCompanyVertical() {
      const newRow = {
        id: '',
        companyId: '',
        verticalId: '',
        isEditingCompanyVertical: true,
        selectedAccount: '',
        selectedVertical: '',
        softDeleteRequired: false,
        userCompanyStatus: '',
      };
      this.editableCompanyVerticals.push(newRow);
    },
    addNewRowForCompanyVerticalValues(id, companyId, verticalId, selectedAccount, selectedVertical, isHidden, userCompanyStatus) {
      const newRow = {
        id,
        companyId,
        verticalId,
        isEditingCompanyVertical: false,
        selectedAccount,
        selectedVertical,
        softDeleteRequired: true,
        isHidden,
        userCompanyStatus,
      };
      // console.log(newRow);
      this.editableCompanyVerticals.push(newRow);
    },
    async getUserCompanyVerticals() {
      this.editableCompanyVerticals = [];
      // console.log('getUserCompanyVerticals =>');
      // console.log(`Vertical User ${this.$route.params.userId}`);
      try {
        const { data } = await this.$apollo.query({
          query: GET_USER_COMAPNY_VERTICALS,
          variables: {
            id: parseInt(this.$route.params.userId, 10),
          },
        });
        // console.log(`inside user company: ${data.publicUserCompanyList.length}`);
        if (data.publicUserCompanyList && data.publicUserCompanyList.length > 0) {
          // delete first empty row of companyVertical
          this.publicUserCompanyList = data.publicUserCompanyList;
          this.editableCompanyVerticals.splice(0, 1);
          data.publicUserCompanyList.forEach((element) => {
            // console.log(element);
            const compID = element.companyId;
            const vertID = element.verticalId;
            const compVertID = element.companyVerticalId;
            const isHidden = element.isHidden;
            const selectedAccount = element.companyId;
            const userCompanyStatus = element.isUserCompany;
            // .log("selected Row :"+ JSON.stringify(element) );
            const selectedVertical = element.vertical;
            this.addNewRowForCompanyVerticalValues(compVertID, compID, vertID, selectedAccount, selectedVertical, isHidden, userCompanyStatus);
          });
        }
      } catch (error) {
        // console.log(`getUserCompanyVerticals => error is: ${error}`);
      }
    },
    // async deleteUserRecord(companyVerticalId, userId) {
    //   // console.log(`companyvertical id is: ${companyVerticalId} with type ${typeof (companyVerticalId)} and ${userId} with type ${typeof (userId)}`);
    //   try {
    //     const { data } = await this.$apollo.query({
    //       query: GET_USER_COMAPNY_VERTICALS,
    //       variables: {
    //         companyVerticalId: parseInt(this.companyVerticalId, 10),
    //         userId: parseInt(this.userId, 10),
    //       },
    //     });
    //     if (data.publicUserCompanyList && data.publicUserCompanyList.length > 0) {
    //       // delete first empty row of companyVertical
    //       this.editableCompanyVerticals.splice(0, 1);
    //       data.publicUserCompanyList.forEach((element) => {
    //         const compID = element.companyId;
    //         const vertID = element.verticalId;
    //         const compVertID = element.companyVerticalId;
    //         const selectedAccount = element.company;
    //         const selectedVertical = element.vertical;
    //         this.addNewRowForCompanyVerticalValues(compVertID, compID, vertID, selectedAccount, selectedVertical);
    //       });
    //     }
    //   } catch (error) {
    //     // console.log(`getUserCompanyVerticals => error is: ${error}`);
    //   }
    // },

    async getAllCompanyVerticals() {
      try {
        // console.log('getAllCompanyVerticals =>:');
        const { data } = await this.$apollo.query({
          query: GET_ALL_COMPANY_VERTICALS,
        });
        // console.log(`getAllCompanyVerticals => all user company: ${data.length}`);
        if (data.publicUserCompanyVerticalList && data.publicUserCompanyVerticalList.length > 0) {
          // delete first empty row of companyVertical
          // console.log(`getAllCompanyVerticals => length:  ${data.publicUserCompanyVerticalList.length}`);
        }
      } catch (error) {
        // console.log(`getAllCompanyVerticals => error is: ${error}`);
      }
    },
    async getCompanyVerticalByCompanyName(companyName) {
      if (this.publicUserCompanyList && this.publicUserCompanyList.length > 0 && companyName) {
        // const result = this.publicUserCompanyList.find((o) => { o.name === companyName; });
        // return result;
      }
      return null;
    },
  },
};
</script>
<style scoped>
.userCard{
box-shadow: 0px 4px 7px 0px grey;
}
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
</style>
