<template>
  <section class="dashboard-reviewer-page h-min-screen mt-12" @scroll="handleScroll">
    <button
      :class=" loading ? 'icon-loading' : '' "
      class="z-10 fas fa-sync-alt text-gray-700 fixed right-0 top-0 z-20 px-4 py-3 leading-none mt-px focus:outline-none"
      @click.prevent.stop="fetchData"
    />
    <button
      class="goTop transition-slow block fixed h-10 opacity-0 outline-none rounded-full w-10 focus:outline-none
    border border-solid border-gray-700 bg-white right-0 bottom-0 mr-3 mb-3 z-10"
      :class="showBtn ? 'opacity-100 ':'opacity-0'"
      @click="topFunction()"
    >
      <i aria-hidden="true" class="fa fa-angle-up text-gray-700 text-2xl" />
    </button>
    <!--------------------  Old loading Text ----------------------------->
    <!-- <div v-if="loading && !companies.length" class="text-center m-10 pt-10">
      <img class="mb-5 block mx-auto" src="/img/loader.gif" width="40" alt="Loader Gif">
      <p class="mx-auto leading-normal text-lg">
        Fetching data...
      </p>
    </div> -->
    <div v-if="loading && !companies.length">
      <CountLoader />
    </div>
    <div v-else>
      <section
        :class="[query || typeFilter || verticalFilter || filterAccountsInRed ||
          filterAccountsInRedVoc || filterAccountsInRedVod ? 'pb-2' : 'pb-8' ]"
        class="bg-white pt-1 border-b border-gray-200"
      >
        <div class="stats-grid leading-tight m-5 text-center">
          <!-- <button class="p-8 rounded bg-gray-100 border border-gray-300"> -->
          <div
            class="rounded bg-gray-100 border border-gray-400 flex flex-col align-center justify-center flex-1 pointer"
            @click.prevent="applyBtnFilters('total')"
          >
            <!-- <h4 class="text-3xl font-bold">
              {{ companies ? companies.length : 0 }}
            </h4> -->
            <h4 class="text-3xl font-bold">
              {{ totalAccounts }}
            </h4>
            <p class="text-xs mt-2 mx-2 text-gray-700 font-bold letter-spacing-05 uppercase">
              Total Accounts
            </p>
          </div>
          <div
            :class="{ 'bg-gray-300 border-gray-500 active shadow-inset' : filterAccountsInRed }"
            class="relative stats-cont rounded bg-gray-100 border border-gray-400 flex flex-col align-center justify-center flex-1 pointer transition-normal"
            @click.prevent="applyBtnFilters('accountsInred')"
          >
            <!-- @click.prevent="applyBtnFilters('accountsInred')" -->
            <h4 class="text-3xl text-red-600 font-bold">
              {{ totalAccountsInRed }}
            </h4>
            <p class="text-xs mt-2 mx-2 text-gray-700 font-bold letter-spacing-05 uppercase">
              Accounts In Red
            </p>
          </div>
          <div
            :class="{ 'bg-gray-300 border-gray-500 active shadow-inset' : filterAccountsInRedVoc }"
            class="relative stats-cont rounded bg-gray-100 border border-gray-400 flex flex-col align-center justify-center flex-1 pointer transition-normal"
            @click.prevent="applyBtnFilters('accountsInRedVoc')"
          >
            <!-- @click.prevent="applyBtnFilters('accountsInRedVoc')" -->
            <h4 class="text-3xl text-red-600 font-bold">
              {{ totalAccountsInRedVoc }}
            </h4>
            <p class="text-xs mt-2 mx-2 text-gray-700 font-bold letter-spacing-05 uppercase">
              Red Accounts in VOS
            </p>
          </div>
          <div
            :class="{ 'bg-gray-300 border-gray-500 active shadow-inset' : filterAccountsInRedVod }"
            class="relative stats-cont rounded bg-gray-100 border border-gray-400 flex flex-col align-center justify-center flex-1 pointer transition-normal"
            @click.prevent="applyBtnFilters('accountsInRedVod')"
          >
            <!-- @click.prevent="applyBtnFilters('accountsInRedVod')" -->
            <h4 class="text-3xl text-red-600 font-bold">
              {{ totalAccountsInRedVod }}
            </h4>
            <p class="text-xs mt-2 mx-2 text-gray-700 font-bold letter-spacing-05 uppercase">
              Red Accounts in VOD
            </p>
          </div>
        </div>
        <!-- <div class="flex flex-wrap leading-tight m-5 text-center">
        </div> -->
        <search-input
          id="article-search-input"
          :autofocus="false"
          :autofocus-time="500"
          placeholder="Search accounts by name"
          class="mb-3 mx-5"
          :value="query"
          @inputUpdate="searchQueryUpdated"
        />

        <div class="mx-5 flex text-gray-600 justify-center text-sm">
          <div class="flex-1 relative mr-1">
            <select
              v-model="typeFilter"
              class="
                block
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
                focus:outline-none
              "
              @keydown="resizeTextArea"
            >
              <option value="">
                Filter by Type
              </option>
              <option v-for="type in companyTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
          <div class="flex-1 relative ml-1">
            <select
              v-model="verticalFilter"
              class="
                block
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
                focus:outline-none
              "
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
        </div>
        <!-- <div class="mx-5 flex text-gray-600 justify-center text-sm m-3">
          <div class="flex-1 relative">
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
                px-4
                py-2
                pr-8
                rounded
                leading-tight
                focus:outline-none
              "
            >
              <option value="">
                Filter by  Status
              </option>
              <option key="0" value="0">
                Active
              </option>
              <option key="1" value="1">
                In-Active
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div> -->

        <div
          v-if="query || typeFilter || verticalFilter || filterAccountsInRed || filterAccountsInRedVoc || filterAccountsInRedVod"
          class="mx-5 mt-3 text-gray-600"
        >
          <p class="mb-1">
            Filtering by:
          </p>
          <span v-if="query" class="text-gray-600">
            <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded">
              Filter query: {{ query }}
            </label>
          </span>
          <span v-if="typeFilter" class="text-gray-600">
            <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded">
              Account Type: {{ typeFilter }}
            </label>
          </span>
          <span v-if="verticalFilter" class="text-gray-600">
            <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded">
              Vertical: {{ verticalFilter }}
            </label>
          </span>
          <!-- <span v-if="statusFilter" class="text-gray-600">
            <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded">
              Status: {{ statusFilter ?'In-active':'Active' }}
            </label>
          </span> -->
          <span v-if="filterAccountsInRed" class="text-gray-600">
            <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded">
              {{ totalAccountsInRed }} account{{ totalAccountsInRed > 1 ? 's' : '' }} in Red
            </label>
          </span>
          <span v-if="filterAccountsInRedVoc" class="text-gray-600">
            <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded">
              VOS {{ totalAccountsInRedVoc }} account{{ totalAccountsInRedVoc > 1 ? 's' : '' }} in Red
            </label>
          </span>
          <span v-if="filterAccountsInRedVod" class="text-gray-600">
            <label class="border border-gray-400 mb-2 bg-gray-300 inline-block px-2 mr-2 pointer rounded">
              VOD {{ totalAccountsInRedVod }} account{{ totalAccountsInRedVod > 1 ? 's' : '' }} in Red
            </label>
          </span>
          <!-- <label class="block flex items-center"><input v-model="filterAccountsInRed" class="mr-2" type="checkbox">Show all accounts in red</label>
          <label class="block flex items-center"><input class="mr-2" type="checkbox">Show red accounts in VOD only</label>
          <label class="block flex items-center"><input class="mr-2" type="checkbox">Show red accounts in VOD only</label> -->
        </div>
      </section>

      <p class="mx-5 my-3 text-sm text-gray-700 flex justify-between">
        Showing account{{ filteredResults.length > 1 ? 's' : '' }}: {{ filteredResults.length }}
        <button
          v-if="filterAccountsInRed || filterAccountsInRedVoc || filterAccountsInRedVod || query || typeFilter || verticalFilter"
          class="bg-red-500 text-white px-2 rounded"
          @click.prevent.stop="resetFilters"
        >
          Reset all filters
        </button>
      </p>

      <section class="bg-white relative pt-10">
        <div
          :class="[ scrolled ? 'headroom--unpinned fixed mt-12' : 'absolute']"
          class="
            bg-white
            w-full
            top-0
            border-b
            border-t
            border-gray-300
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
            px-4
          "
        >
          <p class="flex-2">
            Account
          </p>
          <p class="w-1/4 text-center">
            VOS
          </p>
          <p class="w-1/4 text-center">
            VOD
          </p>
          <i style="top: -1px;">&nbsp;</i>
        </div>
        <div v-if="loading && !companies.length">
          <DataLoader />
        </div>
        <section class="px-4">
          <router-link
            v-for="company in filteredResults"
            :key="company.id"
            :to="`/dashboard/review/company/${company.companyVertical || company.companyVerticalId}`"
            class="
              border-b
              border-gray-200
              py-3
              w-full
              px-1
              block
              flex
              text-left
              justify-between
              pointer
            "
          >
            <div class="flex-2 leading-snug">
              <p>{{ company.name }}</p>
              <p class="text-gray-700 text-sm">
                Vertical: {{ company.vertical }}
                <!-- <span v-for="(department, index) in company.departments" :key="department" class="inline-block text-sm rounded-lg text-gray-600">
                  {{ department }}<span v-if="index + 1 < company.departments.length">,&nbsp;</span>
                </span> -->
              </p>
              <p class="text-gray-700 text-sm">
                Type: {{ company.type }}
              </p>
            </div>
            <div class="no-text-wrap flex items-center justify-center flex-1 px-1">
              <div v-if="company.lastVOCRating">
                <span
                  v-for="rating in (company.lastVOCRating)"
                  :key="rating"
                  :class="[(company.lastVOCRating) <= 3 ? 'fas text-genpact-pink' : 'fas text-green-500' ]"
                  class="far text-gray-500 fa-star text-sm"
                />
                <span
                  v-for="rating in (5 - (company.lastVOCRating))"
                  :key="rating + 5"
                  class="far text-gray-500 fa-star text-sm"
                />
                <p class="font-bold mt-1 text-center text-gray-600 text-xs">
                  {{ company.vocUpdatedDate | dateFormat }}
                </p>
              </div>
              <span v-else>---</span>
            </div>
            <div class="no-text-wrap flex items-center justify-center flex-1 pl-1">
              <div v-if="company.lastVODRating">
                <span
                  v-for="rating in (company.lastVODRating)"
                  :key="rating"
                  :class="[(company.lastVODRating) <= 3 ? 'fas text-genpact-pink' : 'fas text-green-500' ]"
                  class="far text-gray-500 fa-star text-sm"
                />
                <span
                  v-for="rating in (5 - (company.lastVODRating))"
                  :key="rating + 5"
                  class="far text-gray-500 fa-star text-sm"
                />
                <p class="font-bold mt-1 text-center text-gray-600 text-xs">
                  {{ company.vodUpdatedDate | dateFormat }}
                </p>
              </div>
              <span v-else>---</span>
            </div>
          </router-link>
        </section>
      </section>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import dayJs from 'dayjs';
import CountLoader from './loader/countLoader.vue';
import DataLoader from './loader/dataLoader.vue';

export default {
  name: 'Review',
  components: {
    CountLoader,
    DataLoader,
  },
  data() {
    return {
      companies: [],
      query: '',
      typeFilter: '',
      verticalFilter: '',
      statusFilter: '',
      loading: false,
      showBtn: false,
      scrolled: false,
      lastPosition: 0,
      limitPosition: 436,
      filterAccountsInRed: false,
      filterAccountsInRedVoc: false,
      filterAccountsInRedVod: false,
      totalAccounts: 0,
      totalAccountsInRed: 0,
      totalAccountsInRedVoc: 0,
      totalAccountsInRedVod: 0,
      intervalTimer: null,
      iconLink: '',
    };
  },
  computed: {
    verticals() {
      return [...new Set((this.companies || []).map(({ vertical }) => vertical))];
    },
    companyTypes() {
      return [...new Set((this.companies || []).map(({ type }) => type))];
    },
    accountsInRed() {
      // return (this.companies || []).filter(({
      return (this.filteredResults || []).filter(({
        vocAvg,
        vodAvg,
        lastVOCRating,
        lastVODRating,
      }) => (vocAvg || lastVOCRating) <= 3 || (vodAvg || lastVODRating) <= 3);
    },
    accountsInRedVoc() {
      return (this.filteredResults || []).filter(({ vocAvg, lastVOCRating }) => (vocAvg || lastVOCRating) <= 3);
    },
    accountsInRedVod() {
      return (this.filteredResults || []).filter(({ vodAvg, lastVODRating }) => (vodAvg || lastVODRating) <= 3);
    },
    filteredResults() {
      try {
        let companies = this.companies ? [...this.companies] : [];

        if (this.query) {
          companies = companies.filter(({ name }) => (name && name.toLowerCase().includes(this.query.toLowerCase() || '')));
        }
        if (this.typeFilter) {
          companies = companies.filter(({ type }) => type === this.typeFilter);
        }
        if (this.verticalFilter) {
          companies = companies.filter(({ vertical }) => vertical === this.verticalFilter);
        }
        // console.log('status filter ===>', this.statusFilters);
        // if (this.statusFilter) {
        //   console.log(`companies before: ${companies.length} and status: ${this.statusFilter}`);
        //   companies = companies.filter(({ isHidden }) => isHidden === this.statusFilter);
        //   console.log(`companies after: ${companies.length}`);
        // }
        /*
        const accelratorSet = new Set();
        const championSet = new Set();
        const trailblazerSet = new Set();
        let feedbackSet = new Set();
        for (let index = 0; index < companies.length; index += 1) {
          if (companies[index].type === 'Champion') {
            championSet.add(companies[index]);
          } else if (companies[index].type === 'Trailblazer') {
            trailblazerSet.add(companies[index]);
          } else if (companies[index].type === 'Accelerator') {
            accelratorSet.add(companies[index]);
          }
        }
        feedbackSet = [...championSet, ...trailblazerSet, ...accelratorSet];
        companies = feedbackSet;
        */

        // return companies.sort((a) => {
        //   if (a.vocAvg && a.vodAvg) {
        //     // console.log(a, a.vocAvg, a.vodAvg, a.vocAvg && a.vodAvg);
        //     return -1;
        //   }
        //   // if (b > a) {
        //   //   return 1;
        //   // }
        //   return 0;
        // }).sort((a, b) => {
        //   if (a.vocAvg && a.vodAvg && b.vocAvg && b.vodAvg) {
        //     // console.log('should ca: ', a.vocAvg, a.vodAvg, b.vocAvg, b.vodAvg);
        //     if ((a.vocAvg + a.vodAvg) < (b.vocAvg + b.vodAvg)) return -1;
        //     if ((a.vocAvg + a.vodAvg) > (b.vocAvg + b.vodAvg)) return 1;
        //     return 0;
        //   }
        //   // console.log('should ca: ', a.vocAvg, a.vodAvg, b.vocAvg, b.vodAvg);
        //   if (
        //     ((a.vocAvg || 0) + (a.vodAvg || 0) + (a.lastVOCRating || 0) + (a.lastVODRating || 0))
        //     < ((b.vocAvg || 0) + (b.vodAvg || 0) + (b.lastVOCRating || 0) + (b.lastVODRating || 0))) return -1;
        //   if (
        //     ((a.vocAvg || 0) + (a.vodAvg || 0) + (a.lastVOCRating || 0) + (a.lastVODRating || 0))
        //     > ((b.vocAvg || 0) + (b.vodAvg || 0) + (b.lastVOCRating || 0) + (b.lastVODRating || 0))) return 1;
        //   return 0;
        // });
        // return companies;

        companies = companies.sort((a, b) => {
          if (
            ((a.vocAvg || a.lastVOCRating || 0) + (a.vodAvg || a.lastVODRating || 0))
            < ((b.vocAvg || b.lastVOCRating || 0) + (b.vodAvg || b.lastVODRating || 0))
          ) return -1;
          if (
            ((a.vocAvg || a.lastVOCRating || 0) + (a.vodAvg || a.lastVODRating || 0))
            > ((b.vocAvg || b.lastVOCRating || 0) + (b.vodAvg || b.lastVODRating || 0))
          ) return 1;
          return 0;
        });

        const accountsInRed = [...companies].filter(({
          vocAvg,
          vodAvg,
          lastVOCRating,
          lastVODRating,
        }) => (vocAvg || lastVOCRating) <= 3 || (vodAvg || lastVODRating) <= 3);

        const accountsInRedVoc = [...companies].filter(({ vocAvg, lastVOCRating }) => (vocAvg || lastVOCRating) <= 3);

        const accountsInRedVod = [...companies].filter(({ vodAvg, lastVODRating }) => (vodAvg || lastVODRating) <= 3);

        this.totalAccounts = companies.length; // eslint-disable-line
        this.totalAccountsInRed = accountsInRed.length; // eslint-disable-line
        this.totalAccountsInRedVoc = accountsInRedVoc.length; // eslint-disable-line
        this.totalAccountsInRedVod = accountsInRedVod.length; // eslint-disable-line

        if (this.filterAccountsInRed) {
          companies = accountsInRed;
        } else if (this.filterAccountsInRedVoc) {
          companies = accountsInRedVoc;
        } else if (this.filterAccountsInRedVod) {
          companies = accountsInRedVod;
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
      if (oldVal.name === 'Dashboard.Review') {
        // clearInterval(this.intervalTimer);
      } else {
        this.fetchData();
        // this.intervalTimer = setInterval(() => {
        //   this.fetchData();
        // }, 10000);
      }
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.fetchData();
    // this.intervalTimer = setInterval(() => {
    //   this.fetchData();
    // }, 10000);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  beforeMount() {
    window.addEventListener('scroll', this.scrollFunction);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollFunction);
  },
  methods: {
    handleScroll() {
      if (this.lastPosition < window.scrollY && this.limitPosition < window.scrollY) {
        this.scrolled = true;
      }
      if (window.scrollY <= this.limitPosition) {
        this.scrolled = false;
      }
      this.lastPosition = window.scrollY;
    },
    searchQueryUpdated(val) {
      this.query = val;
    },
    scrollFunction() {
      this.showBtn = window.scrollY > 200;
    },
    topFunction() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    applyBtnFilters(filter) {
      this.filterAccountsInRed = false;
      this.filterAccountsInRedVoc = false;
      this.filterAccountsInRedVod = false;
      switch (filter) {
        case 'accountsInred':
          this.filterAccountsInRed = true;
          break;
        case 'accountsInRedVoc':
          this.filterAccountsInRedVoc = true;
          break;
        case 'accountsInRedVod':
          this.filterAccountsInRedVod = true;
          break;
        default:
          break;
      }
    },
    resizeTextArea(e) {
      const target = e.target;
      this.typeFilter = target.value;
    },
    resetFilters() {
      this.filterAccountsInRed = false;
      this.filterAccountsInRedVoc = false;
      this.filterAccountsInRedVod = false;
      this.query = '';
      this.typeFilter = '';
      this.verticalFilter = '';
      this.statusFilter = '';
    },
    async fetchData() {
      this.$Progress.start();
      this.loading = true;
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'network-only',
          // gql query
          query: gql`query Company($created: String) {
            allCompaniesFeedbacks(created: $created) {
              companyVertical
              vocFeedbacks
              vocRatings
              vodFeedbacks
              vodRatings
              name: company
              vertical
              type
              isHidden
            }
            allCompanies: analyzeCompanyList {
              name: company
              vertical
              type
              verticalId
              companyVerticalId
              vocUpdatedDate
              vodUpdatedDate
              lastVOCRating
              lastVODRating
              isHidden
            }
          }`,
          variables: {
            created: `%${dayJs(new Date()).format('YYYY-MM-DD')}%`,
          },
        });

        let { allCompaniesFeedbacks, allCompanies } = data;
        allCompaniesFeedbacks = allCompaniesFeedbacks.map((company) => {
          const vocAvg = Math.round(parseInt(company.vocRatings, 10) / parseInt(company.vocFeedbacks, 10) || 0);
          const vodAvg = Math.round(parseInt(company.vodRatings, 10) / parseInt(company.vodFeedbacks, 10) || 0);
          return {
            ...company,
            vocAvg,
            vodAvg,
          };
        });

        allCompanies = allCompanies.map((company) => {
          const matchedCompany = allCompaniesFeedbacks.find((x) => company.companyVerticalId === x.companyVertical) || {};
          return {
            ...company,
            vocUpdatedDate: company.vocUpdatedDate ? new Date(parseInt(company.vocUpdatedDate || 0, 10)) : null,
            vodUpdatedDate: company.vodUpdatedDate ? new Date(parseInt(company.vodUpdatedDate || 0, 10)) : null,
            ...matchedCompany,
          };
        });

        this.companies = allCompanies;
        this.$Progress.finish();
      } catch (e) {
        this.$Progress.fail();
        const error = { ...e };
        console.warn('Error caught: ', error, e); // eslint-disable-line
        if (error && error.networkError && (error.networkError.statusCode === 401 || error.networkError.statusCode === 403)) {
          this.$store.dispatch('addToastNotifications', {
            text: 'Oops! You got logged out. Login again.',
            timer: 4000,
            type: 'error',
          });
          this.$store.dispatch('logout', this.$route.fullPath);
        } else {
          this.$store.dispatch('addToastNotifications', {
            text: `Error fetching data:\n${e.message}`,
            timer: 4000,
            type: 'error',
          });
        }
      }
      this.loading = false;
    },
    stateChange(state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = 'fas fa-arrow-down';
      } else if (state === 'loading') {
        this.iconLink = 'fas fa-spinner icon-loading';
      } else if (state === 'loaded-done') {
        this.iconLink = 'fas fa-arrow-up';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.stats-grid {
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: minmax(110px, auto);
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}
.stats-cont {
  &.active:after {
    position: absolute;
    content: '';
    height: 8px;
    width: 8px;
    background: #35c135;
    border-radius: 50px;
    top: 5px;
    right: 5px;
    border: 1px solid #2ab52a;
  }
}
    .goTop {
        box-shadow: 0px 0px 10px 0px #00000069;
    }
</style>
