<template>
  <section class="dashboard-reviewer-page h-min-screen mt-12" @scroll="handleScroll">
    <button
      :class=" loading ? 'icon-loading' : '' "
      class="z-10 fas fa-sync-alt text-gray-700 fixed right-0 top-0 z-20 px-4 py-3 leading-none mt-px focus:outline-none"
      @click.prevent.stop="fetchData"
    />
    <div v-if="loading && !companies.length" class="text-center m-10 pt-10">
      <img class="mb-5 block mx-auto" src="/img/loader.gif" width="40" alt="Loader Gif">
      <p class="mx-auto leading-normal text-lg">
        Fetching data...
      </p>
    </div>
    <div v-else>
      <img src="/img/backgrounds/pulse_dashboard.png">
      <!-- Accounts Vertical Avg Rating Chart -->
      <bar-chart
        ref="chartComp"
        class="pl-1"
        :height="200"
        :chart-data="JSON.parse(JSON.stringify(verticalRatingChartData))"
        :options="verticalRatingChartOptions"
      />
      <!-- Horizontal Account Avg Rating Chart -->
      <horizontal-bar-chart
        ref="chartComp"
        class="pl-1"
        :height="600"
        :chart-data="JSON.parse(JSON.stringify(accountRatingChartData))"
        :options="accountRatingChartOptions"
      />
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import dayJs from 'dayjs';

export default {
  name: 'AnalyticDashboard',
  components: {
    BarChart: () => import('@/components/charts/bar.vue'),
    HorizontalBarChart: () => import('@/components/charts/horizontal-bar.vue'),
  },
  data() {
    return {
      companies: [],
      query: '',
      accountRatingChartData: {
        responsive: true,
        labels: ['AS', 'DS', 'CS', 'ES', 'FS', 'LS', 'SS', 'AS', 'DS', 'CS', 'ES', 'FS', 'LS', 'SS'],
        datasets: [{
          backgroundColor: '#DF6263',
          data: [1.0, 2.0, 3.0, 4.0, 5.0],
          label: 'Accounts Rating',
          borderColor: '#4AABCA',
          fill: false,
          type: 'horizontalBar',
        }],
      },
      accountRatingChartOptions: {
        title: {
          display: true,
          text: 'Account\'s Monthly Average Rating',
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            barPercentage: 0.4,
            gridLines: {
              color: '#1E345C',
              drawTicks: true,
            },
            ticks: {
              padding: 12,
              margin: 4,
              autoSkip: true,
              beginAtZero: true,
              source: 'data',
              fontFamily: "'Calibri', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontColor: '#718096',
              fontSize: 12,
              fontWeight: 900,
            },
          }],
          yAxes: [{
            gridLines: {
              color: '#edf2f7',
              zeroLineWidth: 0,
              drawBorder: true,
              drawOnChartArea: true,
              drawTicks: false,
            },
            stacked: true,
            ticks: {
              fontFamily: "'Calibri', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              padding: 12,
              beginAtZero: true,
              stepSize: 1,
              fontColor: '#718096',
              fontSize: 12,
              fontWeight: 900,
            },
          }],
        },
      },
      verticalRatingChartData: {
        type: 'bar',
        responsive: true,
        labels: ['VOS Red', 'VOD Red', 'VOS Green', 'VOD Green'],
        datasets: [{
          data: [5, 15, 25, 35],
          label: 'VOS Red',
          backgroundColor: '#DB4437',
          fill: true,
          type: 'bar',
        }, {
          data: [10, 20, 30, 40],
          label: 'VOD Red',
          backgroundColor: '#F4B400',
          fill: true,
          type: 'bar',
        }, {
          data: [15, 25, 35, 45],
          label: 'VOS Green',
          backgroundColor: '#4285F4',
          fill: true,
          type: 'bar',
        }, {
          data: [20, 30, 40, 50],
          label: 'VOD Green',
          backgroundColor: '#0F9D58',
          fill: true,
          type: 'bar',
        },
        ],
      },
      verticalRatingChartOptions: {
        chartOptions: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              barPercentage: 0.4,
              gridLines: {
              // color: '#edf2f7',
                color: '#f7fafc',
              // zeroLineWidth: 0,
              // display: false,
              // drawTicks: false,
              },
              // stacked: true,
              // type: 'time',
              // distribution: 'series',
              // distribution: 'linear',
              // bounds: 'ticks',
              // time: {
              //   unit: 'month',
              //   minUnit: 'month',
              //   tooltipFormat: 'DD/MM/YYYY',
              // },
              ticks: {
                autoSkip: true,
                source: 'data',
                // display: false,
                fontFamily: "'Calibri', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                // padding: -12,
                padding: 0,
                fontColor: '#718096',
                fontSize: 12,
                fontWeight: 900,
              },
            }],
            yAxes: [{
              gridLines: {
                color: '#edf2f7',
                zeroLineWidth: 0,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: false,
              },
              ticks: {
                fontFamily: "'Calibri', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                // padding: -12,
                padding: 12,
                beginAtZero: true,
                stepSize: 1,
                fontColor: '#718096',
                fontSize: 12,
                fontWeight: 900,
              },
            }],
          },
        },
      },
    };
  },
  apollo: {
    addTypename: false,
  },
  computed: {

  },
  watch: {
    $route(currentVal, oldVal) {
      if (oldVal.name === 'Dashboard.AnalyticDashboard') {
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
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
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
    async fetchData() {
      this.$Progress.start();
      this.loading = true;
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'network-only',
          addTypename: false,
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
</style>
