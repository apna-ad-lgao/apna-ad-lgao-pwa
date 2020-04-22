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
    <section class="bg-white px-1 pt-6 pb-8 border-b border-gray-200">
      <div
        class="appearance-none bg-gray-100 block border border-gray-400 focus:bg-white focus:border-gray-500
        focus:outline-none leading-tight mb-3 p-2 py-2 rounded text-gray-600 w-full"
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

      <div class="flex text-gray-600 justify-center text-sm">
        <div class="flex-1 relative mr-1">
          <select
            v-model="typeFilter"
            class="block
            appearance-none
            w-full
            bg-gray-100
            border
            border-gray-400
            hover:border-gray-500
            px-4
            py-2
            pr-8
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
        <div class="flex-1 relative ml-1">
          <select
            v-model="statusFilter"
            class="block
            appearance-none
            w-full
            bg-gray-100
            border
            border-gray-400
            hover:border-gray-500
            px-4
            py-2
            pr-8
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
      </div>
      <div
        v-if="searchInput || typeFilter || statusFilter "
        class="mx-5 mt-3 text-gray-600"
      >
        <p class="mb-1">
          Filtering by:
        </p>
        <span v-if="searchInput" class="text-gray-600">
          <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded w-full break-words">
            Filter query: {{ searchInput }}
          </label>
        </span>
        <span v-if="typeFilter" class="text-gray-600">
          <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded w-full break-words">
            Account Type: {{ typeFilter }}
          </label>
        </span>
        <span v-if="statusFilter" class="text-gray-600">
          <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded w-full break-words">
            Status: {{ parseInt(statusFilter, 10)?'In-Active':'Active' }}
          </label>
        </span>
        <!-- <label class="block flex items-center"><input v-model="filterAccountsInRed" class="mr-2" type="checkbox">Show all accounts in red</label>
          <label class="block flex items-center"><input class="mr-2" type="checkbox">Show red accounts in VOD only</label>
          <label class="block flex items-center"><input class="mr-2" type="checkbox">Show red accounts in VOD only</label> -->
      </div>
      <button
        v-if=" searchInput || statusFilter || typeFilter"
        class="bg-red-500 text-white px-2 rounded ml-5"
        @click.prevent.stop="resetFilters"
      >
        Reset all filters
      </button>
    </section>

    <p class="bg-gray-200 flex items-center justify-between my-3 px-5 py-3 text-gray-700 text-sm">
      Showing accounts: {{ filterUser ? filterUser.length : 0 }}
      <router-link to="/dashboard/admin/user/addNewUser" class="border-2 border-gray-500 rounded px-2 text-gray-600">
        Add user
      </router-link>
      <!-- Added Edit Button -->
      <!-- <router-link :to=`/dashboard/admin/user/edit/${user.id}` class="border-2 border-gray-500 rounded px-2 text-gray-600">
        Edit user
      </router-link> -->
    </p>

    <section class="bg-white">
      <div
        class="
        border-b
        border-t
        border-gray-200
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
          <div class="no-text-wrap flex items-center justify-center flex-1">
            <span class="bg-gray-600 leading-normal rounded-full text-center text-white text-xl w-8"> {{ user.companiesCount }} </span>
          </div>
        </router-link>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
      showBtn: false,
      loader: true,
      loading: false,
      searchInput: '',
      falseVar: false,
    };
  },
  computed: {
    ...mapGetters(['users']),
  },
  watch: {
    $route(currentVal) {
      // console.log('current value : ', currentVal);
      if (currentVal.name === 'Dashboard.Admin') {
        this.falseVar = !this.falseVar;
      }
    },
  },
  mounted() {
    this.assignUserData();
    this.getUsers();

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
    ...mapActions(['getUsers']),

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
