<template>
  <section class="bg-white h-min-screen">
    <img class="mt-12 w-full" src="/img/backgrounds/pulse_dashboard.png" alt="Pulse Dashboard">
    <h1
      class="bg-brand-color border-t-0 border border-dark-gray-700 font-bold py-1 rounded-b-lg text-center text-dark-gray-900 text-lg tracking-wide w-full"
    >
      Download Report
    </h1>
    <section class="m-4 sm:mx-0">
      <div class="border border-blue-800 p-2 flex flex-col bg-dark-gray-200 rounded-lg shadow">
        <div class="relative">
          <p class="text-center font-semibold text-blue-900">
            Company Vertical
          </p>
          <div class="mx-auto my-2 mb-5 relative w-2/3">
            <select
              id="user-role-select"
              ref="user-role-select"
              v-model="vertical"
              class="block appearance-none w-full text-blue-700 bg-gray-100 border
            border-blue-800 hover:border-blue-900 px-4 py-1 rounded leading-tight focus:outline-none text-sm font-bold"
              @change="onSelectVertical"
            >
              <option :value="0">
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
        <div v-if="companyListEnable" class="relative">
          <p class="text-center font-semibold text-blue-900">
            Company
          </p>
          <div class="mx-auto my-2 mb-5 relative w-2/3">
            <select
              id="user-role-select"
              ref="user-role-select"
              v-model="company"
              class="block appearance-none w-full text-blue-700 bg-gray-100 border
            border-blue-800 hover:border-blue-900 px-4 py-1 rounded leading-tight
            focus:outline-none text-sm font-bold "
            >
              <option :value="0">
                ---
              </option>
              <option
                v-for="item in filterCompanies"
                :key="item.companyId"
                :value="item.companyId"
              >
                {{ item.company }}
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
        <p class="text-center font-semibold text-blue-900">
          From Date
        </p>
        <div class="mx-auto my-2 mb-5 relative w-2/3">
          <input
            v-model="fromDate"
            class="block appearance-none w-full text-blue-700 bg-gray-100 border
            border-blue-800 hover:border-blue-900 px-4 py-1 rounded leading-tight focus:outline-none text-sm font-bold"
            type="date"
          >
        </div>
        <p class="text-center font-semibold text-blue-900">
          To Date
        </p>
        <div class="mx-auto my-2 mb-5 relative w-2/3">
          <input
            v-model="toDate"
            class="block appearance-none w-full text-blue-700 bg-gray-100 border border-blue-800
             hover:border-blue-900 px-4 py-1 rounded leading-tight focus:outline-none text-sm font-bold"
            type="date"
          >
        </div>
        <button
          class="bg-brand-darkest-blue-color py-2 font-bold tracking-widest rounded text-white w-full"
          @click="downloadReport"
        >
          Download Report
          <ring-loader v-show="loading" />
        </button>
      </div>
    </section>
    <template>
      <transition name="bounce">
        <div
          v-if="showPopUp"
          class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-20"
        >
          <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

          <div
            class="bg-white flex flex-col h-64 modal-container mx-4 overflow-y-auto relative rounded shadow-lg lg:w-1/3 z-10"
          >
            <h3
              class="font-bold mx-auto my-6 px-2 py-6 text-black text-xl"
            >
              Report has been sent to your mail Id.
            </h3>
            <div class="flex justify-around">
              <button
                class="border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-lg"
                @click="leave();"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </section>
</template>

<script>
import Axios from 'axios';
import dayJs from 'dayjs';
import gql from 'graphql-tag';
import GETALL_VERTICALS from '@/graphql/fetchAllVerticals.gql';

export default {
  name: 'DownloadReport',
  components: {},
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fromDate: dayJs(new Date()).format('YYYY-MM-DD'),
      toDate: dayJs(new Date()).format('YYYY-MM-DD'),
      time1: ' 00:00:00',
      time2: ' 23:59:59',
      vertical: 0,
      verticalData: [],
      company: 0,
      allCompanies: [],
      filterCompanies: [],
      showPopUp: false,
      loading: false,
      companyListEnable: false,
      userData: '',
    };
  },
  computed: {
  },
  mounted() {
    this.fetchAllVertical();
    this.fetchAllCompanies();
  },
  methods: {
    async onSelectVertical() {
      if (this.vertical > 0) {
        this.filterCompanies = this.allCompanies.filter((company) => company.verticalId === this.vertical);
        this.companyListEnable = true;
      } else {
        this.filterCompanies = [];
        this.companyListEnable = false;
        this.company = 0;
      }
    },
    leave() {
      this.showPopUp = false;
    },
    async fetchAllVertical() {
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
    async fetchAllCompanies() {
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
    },
    downloadReport() {
      if (this.fromDate === '') {
        this.$store.dispatch('addToastNotifications', {
          text: 'Select from Date !',
          timer: 4000,
          type: 'error',
        });
      } else if (this.toDate === '') {
        this.$store.dispatch('addToastNotifications', {
          text: 'Select to Date !',
          timer: 4000,
          type: 'error',
        });
      } else if (this.toDate < this.fromDate) {
        this.$store.dispatch('addToastNotifications', {
          text: 'Select From date greater than To date !',
          timer: 4000,
          type: 'error',
        });
      } else {
        this.loading = true;
        // delete Axios.defaults.headers.common.Authorization;
        Axios({
          method: 'POST',
          url:
              'https://prod-29.southindia.logic.azure.com:443/workflows/22138438481341d5aa17411b44e9a362/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_lZToBrpv0zu8fefEh4dLP-GjrvSCyPZDWmbewLHYHE',
          headers: {
            'Content-Type': 'application/json',
            common: {
              Authorization: '',
            },
          },
          data: {
            fromDate: this.fromDate + this.time1,
            toDate: this.toDate + this.time2,
            emailId: `${this.user.ohrid}@genpact.com`,
            vertical: this.vertical,
            company: this.company,
          },
        }).then((response) => {
          this.loading = false;
          console.log('response ========>', response);
          this.$store.dispatch('addToastNotifications', {
            text: 'Please check your mail for report.',
            timer: 4000,
            type: 'success',
          });
        }).catch((err) => {
          this.loading = false;
          this.$store.dispatch('addToastNotifications', {
            text: err.message,
            timer: 4000,
            type: 'error',
          });
        });
      }
    },
  },
};
</script>
