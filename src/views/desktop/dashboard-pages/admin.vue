<template>
  <section class="bg-white p-4 dashboard-admin-page h-min-screen mt-12">
    <button
      :class=" loading ? 'icon-loading' : '' "
      class="z-10 fas fa-sync-alt text-gray-700 fixed right-0 top-0 z-20 px-4 py-3 leading-none mt-px focus:outline-none"
      @click.prevent.stop="assignUserData"
    />
    <button
      class="goTop transition-slow block fixed h-10 opacity-0 outline-none rounded-full w-10 focus:outline-none
                   border border-solid border-gray-700 bg-white right-0 bottom-0 mr-3 mb-3"
      :class="showBtn ? 'opacity-100 ':'opacity-0'"
      @click="topFunction()"
    >
      <i aria-hidden="true" class="fa fa-angle-up text-gray-700 text-2xl" />
    </button>
    <section class="flex flex-wrap justify-around xl:justify-between bg-white py-3">
      <div
        class="appearance-none bg-gray-100 block border border-gray-400 focus:bg-white focus:border-gray-500
      focus:outline-none leading-tight p-2 my-2 rounded text-gray-600 w-full md:mx-0 mx-3 xl:w-1/2"
      >
        <button class="focus:outline-none outline-none text-gray-600">
          <i class="fas fa-search" />
        </button>
        <input
          id="article-search-input"
          v-model="searchInput"
          :autofocus="false"
          :autofocus-time="500"
          placeholder="Search User by Name"
          class="bg-gray-100 pl-3 text-gray-700 w-5/6"
        >
      </div>

      <div class="w-auto my-2 relative text-gray-600">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-600">
          <i class="fas fa-filter text-sm" />
        </div>
        <select
          v-model="typeFilter"
          class="block
            appearance-none
            w-full
            bg-gray-100
            border
            border-gray-400
            hover:border-gray-500
            px-8
            py-2
            rounded
            leading-tight
            focus:outline-none"
        >
          <option value="">
            Filter by Type - ALL
          </option>
          <option value="voc">
            Type VOS
          </option>
          <option value="vod">
            Type VOD
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      <div class="w-auto my-2 relative text-gray-600">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-600">
          <i class="fas fa-filter text-sm" />
        </div>
        <select
          v-model="statusFilter"
          class="block
            appearance-none
            w-full
            bg-gray-100
            border
            border-gray-400
            hover:border-gray-500
            px-8
            py-2
            rounded
            leading-tight
            focus:outline-none"
        >
          <option value="">
            Filter by Status
          </option>
          <option value="0">
            Active User
          </option>
          <option value="1">
            In-Active User
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      <div
        v-if="searchInput || typeFilter || statusFilter "
        class="mx-5 my-3 text-gray-600 items-center justify-between lg:flex w-full"
      >
        <div class="lg:flex items-center">
          <p class="font-bold">
            Filtered by:
          </p>
          <div class="flex my-2">
            <span v-if="searchInput" class="text-gray-600 mx-1">
              <label class="border border-gray-400 bg-gray-300 inline-block px-2 pointer rounded w-full break-words">
                Filter query: <strong>{{ searchInput }}</strong>
              </label>
            </span>
            <span v-if="typeFilter" class="text-gray-600 mx-1">
              <label class="border border-gray-400 bg-gray-300 inline-block px-2 pointer rounded w-full break-words">
                Account Type: <strong>{{ typeFilter }}</strong>
              </label>
            </span>
            <span v-if="statusFilter" class="text-gray-600 mx-1">
              <label class="border border-gray-400 bg-gray-300 inline-block px-2 pointer rounded w-full break-words">
                Status: <strong>{{ statusFilter?'In-Active':'Active' }}</strong>
              </label>
            </span>
          </div>
        </div>
      </div>
    </section>
    <div class="bg-gray-100 border border-gray-400 flex justify-between items-center px-3 py-1 mb-5 md:mx-0 mx-3 rounded text-gray-700">
      <div class="flex items-center">
        <p class="">
          Showing accounts: <b>{{ filterUser ? filterUser.length : 0 }}</b>
        </p>
        <button
          v-if=" searchInput || statusFilter || typeFilter"
          class="bg-red-500 text-white h-8 mx-2 px-2 rounded"
          @click.prevent.stop="resetFilters"
        >
          Reset filters
        </button>
      </div>
      <router-link to="/dashboard/admin/user/addNewUser" class="text-sm border p-1 border-gray-500 rounded text-gray-600">
        <i class="fas fa-user-plus text-xs px-1" />
        Add User
      </router-link>
    </div>

    <section class="bg-white">
      <div
        class="
        border-b
        border-t
        border-dark-gray-500
        py-2
        px-1
        block
        flex
        leading-normal
        text-gray-600
        text-sm
        font-black
        uppercase
        justify-between
         sticky
         table-head
         bg-white
         text-lg"
      >
        <p class="flex-2">
          User
        </p>
        <!-- <p class="flex-1 text-center">
          VOS
        </p> -->
        <p class="flex-1 text-center">
          Admin
        </p>
        <p class="flex-1 text-center">
          Status
        </p>
        <p class="flex-1 text-right">
          Company
        </p>
      </div>
      <div v-if="loader">
        <UserLoader />
      </div>
      <div v-else>
        <router-link
          v-for="user in filterUser"
          :key="user.id"
          :to="`/dashboard/admin/user/edit/${user.id}?isEditMode=true`"

          class="
          border-b
          border-gray-200
          py-1
          w-full
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
          <div class="flex-2 leading-snug font-bold">
            <p>{{ user.firstName }} {{ user.lastName }}</p>
            <ul class="flex py-1">
              <li v-if="user.isVOC" class="border border-b-2 border-red-500 font-bold px-2 shadow-md rounded text-black text-red-600 text-xs">
                VOS
              </li>
              <li v-if="user.isVOD" class="border border-b-2 border-blue-500 font-bold px-2 shadow-md rounded text-black text-blue-600 text-xs">
                VOD
              </li>
            </ul>
          <!-- <ul class="tags">
  <li><a href="#" class="tag">VOC</a></li>
</ul> -->
          <!-- <p class="text-gray-700 text-sm">
            Vertical: Insurance
          </p>
          <p class="text-gray-700 text-sm">
            Type: Champion
          </p> -->
          </div>
          <!-- <div class="no-text-wrap flex items-center justify-center flex-1">
          <i v-if="user.isVOC" class="far fa-check-circle text-green-500 text-lg" />
          <i v-else class="far fa-times-circle text-red-500 text-lg" />
        </div> -->
          <!-- <div class="no-text-wrap flex items-center justify-center flex-1">
          <i v-if="user.isVOD" class="far fa-check-circle text-green-500 text-lg" />
          <i v-else class="far fa-times-circle text-red-500 text-lg" />
        </div> -->
          <div class="no-text-wrap flex items-center justify-center flex-1">
            <i v-if="user.isAdmin" class="far fa-check-circle text-green-500 text-lg" />
            <i v-else class="far fa-times-circle text-red-500 text-lg" />
          </div>
          <div class="no-text-wrap flex items-center justify-center flex-1">
            <i v-if="!user.isHidden" class="far fa-check-circle text-green-500 text-lg mx-4" />
            <i v-else class="far fa-times-circle text-red-500 text-lg mx-4" />
          </div>
          <div class="no-text-wrap flex items-center justify-end flex-1">
            <span class="bg-gray-600 leading-normal rounded-full text-center text-white text-xl mr-6 w-8"> {{ user.companiesCount }} </span>
          </div>
        </router-link>
      </div>
    </section>
  </section>
</template>

<script>
import UserLoader from './loader/userLoader.vue';

export default {
  name: 'Admin',
  components: {
    UserLoader,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      query: '',
      typeFilter: '',
      statusFilter: '',
      usersData: [],
      allUsers: [],
      loading: false,
      showBtn: false,
      loader: true,
      searchInput: '',
      falseVar: false,
    };
  },
  computed: {
    filterUser() {
      const person = this.user;
      let user = this.allUsers;
      // const v = this.falseVar;
      if (this.searchInput) {
        user = user.filter(({ userName }) => userName.toLowerCase().includes(this.searchInput.toLowerCase()));
      }
      if (this.typeFilter) {
        if (this.typeFilter === 'voc') {
          user = user.filter(({ isVOC }) => isVOC === 1);
        } else {
          user = user.filter(({ isVOD }) => isVOD === 1);
        }
      }
      if (this.statusFilter) {
        if (parseInt(this.statusFilter, 10) === 0) {
          user = user.filter(({ isHidden }) => isHidden === 0);
        } else {
          user = user.filter(({ isHidden }) => isHidden === 1);
        }
      }
      user = user.filter(({ ohrid }) => ohrid !== person.ohrid);
      // console.log('localstorage', person);
      return user;
    },
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(currentVal, oldVal) {
      if (currentVal.name === 'Dashboard.Admin') {
        // this.falseVar = !this.falseVar;
        // this.$apollo.queries.allUsers.refetch();
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
  beforeMount() {
    window.addEventListener('scroll', this.scrollFunction);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollFunction);
  },

  methods: {
    searchQueryUpdated(val) {
      this.query = val;
    },

    resetFilters() {
      this.searchInput = '';
      this.query = '';
      this.typeFilter = '';
      this.statusFilter = '';
    },

    scrollFunction() {
      this.showBtn = window.scrollY > 200;
    },

    topFunction() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>
<style>

.goTop {
    box-shadow: 0px 0px 10px 0px #00000069;
}
.table-head
{
  top:48px;
}
</style>
