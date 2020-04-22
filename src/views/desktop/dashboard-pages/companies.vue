<template>
  <section class="dashboard-admin-page h-min-screen mt-12">
    <button
      :class=" loading ? 'icon-loading' : '' "
      class="z-10 fas fa-sync-alt text-gray-700 fixed right-0 top-0 z-20 px-4 py-3 leading-none mt-px focus:outline-none"
      @click.prevent.stop="fetchCompanyDetail"
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
          <i class="fas fa-search text-gray-600" />
        </button>
        <input
          id="article-search-input"
          v-model="searchInput"
          :autofocus="false"
          :autofocus-time="500"
          placeholder="Search Company by Name"
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
            Filter by Account Type
          </option>
          <option v-for="type in companyTypes" :key="type" :value="type">
            {{ type }}
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
          v-model="verticalFilter"
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
            Filter by Vertical
          </option>
          <option v-for="vertical in verticals" :key="vertical" :value="vertical">
            {{ vertical }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>

      <div
        v-if="searchInput || typeFilter || statusFilter || verticalFilter "
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
            <span v-if="verticalFilter" class="text-gray-600 mx-1">
              <label class="border border-gray-400 bg-gray-300 inline-block px-2 pointer rounded w-full break-words">
                Vertical: <strong>{{ verticalFilter }}</strong>
              </label>
            </span>
            <span v-if="statusFilter" class="text-gray-600 mx-1">
              <label class="border border-gray-400 bg-gray-300 inline-block px-2 pointer rounded w-full break-words">
                Status: <strong>{{ statusFilter?'In-active':'Active' }}</strong>
              </label>
            </span>
          </div>
        </div>
        <!-- <label class="block flex items-center"><input v-model="filterAccountsInRed" class="mr-2" type="checkbox">Show all accounts in red</label>
          <label class="block flex items-center"><input class="mr-2" type="checkbox">Show red accounts in VOD only</label>
          <label class="block flex items-center"><input class="mr-2" type="checkbox">Show red accounts in VOD only</label> -->
      </div>
    </section>
    <div class="bg-gray-100 border border-gray-400 flex justify-between items-center px-3 py-1 mb-5 md:mx-0 mx-3 rounded text-gray-700">
      <div class="flex items-center">
        <p class="">
          Showing Companies: <b>{{ filterResult ? filterResult.length : 0 }}</b>
        </p>  <button
          v-if=" searchInput || statusFilter || typeFilter || verticalFilter"
          class="bg-red-500 text-white h-8 mx-5 px-2 rounded"
          @click.prevent.stop="resetFilters"
        >
          Reset filters
        </button>
      </div>
      <router-link to="/dashboard/admin/company/addNewCompany" class="border p-1 text-sm border-gray-500 rounded text-gray-600">
        <i class="fas fa-user-plus text-xs px-1" />
        Add Company
      </router-link>
      <!-- Added Edit Button -->
      <!-- <router-link :to=`/dashboard/admin/company/edit/${user.id}` class="border-2 border-gray-500 rounded px-2 text-gray-600">
        Edit user
      </router-link> -->
    </div>
    <section class="bg-white px-4">
      <div
        class="
        bg-white block border-b border-t border-dark-gray-500 flex justify-between leading-normal py-2 sticky table-head font-black text-lg uppercase"
      >
        <p class="w-2/3">
          Company
        </p>
        <p class="w-1/3 text-center">
          Vertical
        </p>
        <p class="w-1/3 text-right">
          Active
        </p>
      </div>
      <div v-if="loader">
        <CompanyLoader />
      </div>
      <div v-else>
        <router-link
          v-for="company in filterResult"
          :key="company.id"
          :to="`/dashboard/admin/company/edit/${company.companyId}/${company.id}`"
          class="
          border-b
          border-gray-200
          py-3
          w-full
          block
          flex
          text-left
          justify-between
          items-center
          pointer
        "
        >
          <div class="text-left w-2/3 text-xl">
            <p class="capitalize ">
              {{ company.company | lowercase }}
            </p>
            <ul class="flex">
              <li class="flex border border-b-4 border-blue-600 font-bold px-2 shadow-lg rounded text-black text-blue-600 text-sm">
                {{ company.type }}
              </li>
            </ul>
          </div>
          <div class="text-center w-1/3 text-lg">
            <p class="">
              {{ company.vertical }}
            </p>
          </div>
          <div class="text-right w-1/3">
            <div class="no-text-wrap flex items-center justify-end flex-1 px-1">
              <i v-if="!company.isHidden" class="far fa-check-circle text-green-500 text-lg pr-2" />
              <i v-else class="far fa-times-circle text-red-500 text-lg pr-2" />
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import CompanyLoader from './loader/companyLoader.vue';

export default {
  name: 'Company',
  components: { CompanyLoader },
  apollo: {
    allCompanies: {
      query: gql`query {
        allCompanies: getAllCompanyVerticals {
              id
              companyId
              type
              verticalId
              company
              vertical
              isHidden
          }
      }`,
    },
  },
  data() {
    return {
      query: '',
      searchInput: '',
      typeFilter: '',
      verticalFilter: '',
      statusFilter: '',
      allCompanies: [],
      loading: false,
      allCompaniesFilter: [],
      showBtn: false,
      loader: true,
    };
  },
  computed: {
    verticals() {
      return [...new Set((this.allCompanies || []).map(({ vertical }) => vertical))];
    },
    companyTypes() {
      return [...new Set((this.allCompanies || []).map(({ type }) => type))];
    },

    filterResult() {
      let companies = this.allCompanies ? [...this.allCompanies] : [];
      //   console.log(companies);
      if (this.searchInput) {
        // console.log(this.query);
        companies = companies.filter(({ company }) => company.toLowerCase().includes(this.searchInput.toLowerCase()));
      }

      if (this.typeFilter) {
        companies = companies.filter(({ type }) => type === this.typeFilter);
      }

      if (this.verticalFilter) {
        companies = companies.filter(({ vertical }) => vertical === this.verticalFilter);
      }
      return companies;
    },

  },
  watch: {
    $route(currentVal) {
      console.log(currentVal.name);
      if (currentVal.name === 'Dashboard.Companies') {
        console.log('check');
        this.$apollo.queries.allCompanies.refetch();
        // this.fetchCompanyDetail();
        // this.$apollo.queries.allCompanies.refetch();
      }
    },
  },
  mounted() {
    this.fetchCompanyDetail();
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
    scrollFunction() {
      this.showBtn = window.scrollY > 200;
    },

    topFunction() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    resetFilters() {
      this.searchInput = '';
      this.typeFilter = '';
      this.verticalFilter = '';
      this.statusFilter = '';
    },

    async fetchCompanyDetail() {
      this.loading = true;
      // this.$apollo.queries.allUsers.refetch();
      const { data } = await this.$apollo.query({
        fetchPolicy: 'network-only',
        query: gql`query {
            allCompanies: getAllCompanyVerticals {
              id
              companyId
              type
              verticalId
              company
              vertical
              isHidden
          }
        }`,
      });
      this.allCompanies = data.allCompanies;
      this.loader = false;
      this.loading = false;
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
