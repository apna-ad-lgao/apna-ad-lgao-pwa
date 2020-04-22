<template>
  <section class="dashboard-task-feedback-page bg-white h-min-screen">
    <!-- <button class="fixed z-50 top-0 right-0 fas fa-history h-12 px-4 text-lg text-gray-600" /> -->
    <!-- <div v-if="$route.params.companyVerticalId === 'undefined'" class="text-center m-10">
      <p class="mx-auto leading-normal text-lg">
        No feedbacks provided for the account today.
      </p>
    </div> -->
    <div v-if="$apollo.queries.queryResult.loading" class="text-center m-10">
      <img class="mb-5 block mx-auto" src="/img/loader.gif" width="40" alt="Loader Gif">
      <p class="mx-auto leading-normal text-lg">
        Fetching company data information...
      </p>
    </div>
    <div v-else>
      <h4 class="capitalize fixed letter-spacing-05 my-3 text-gray-800 top-0 z-50 pin-x-center">
        {{ company.name }}
      </h4>
      <h1 class="letter-spacing-05 text-xl mb-4 mx-5">
        Trendline for last 7 inputs
      </h1>
      <bar-chart
        ref="chartComp"
        class="pl-1"
        :height="200"
        :chart-data="JSON.parse(JSON.stringify(chartData))"
        :options="chartOptions"
      />

      <!-- <div class="article-card relative max-w-sm rounded overflow-hidden bg-white border m-5 px-3 py-2">
        test
      </div> -->

      <section class="salutation-cont my-6 mx-6">
        <!-- {{ user.isVOC ? 'VOS' : 'VOD' }} -->
        <!-- <h1 class="letter-spacing-05 text-xl mt-10 flex justify-between mb-1 items-center border-b pb-3"> -->
        <h1 class="letter-spacing-05 text-xl mt-10 flex justify-between items-center">
          <span>
            Historical data
            <p v-if="noFeedbacksForToday" class="text-base text-yellow-600">
              No feedbacks provided for today
            </p>
          </span>
          <!-- <label v-if="$route.name === 'Dashboard.Review.Company.Detail'" class="pull-right text-base">
            <input v-model="filterVod" type="checkbox">
            Show VOD data
          </label> -->
        </h1>
        <section class="text-sm pb-1 mt-2">
          <div
            class="
            border-b
            border-gray-200
            py-2
            px-1
            block
            flex
            items-center
            leading-normal
            text-center
            text-gray-600
            justify-between"
          >
            <p class="flex-1 mr-2 text-left">
              Date
            </p>
            <p class="flex-1 px-2 text-left">
              Rating
            </p>
            <div class="flex-2 text-left">
              Category
            </div>
            <p>&nbsp;</p>
          </div>
          <div
            v-for="(feedback, index) in company.feedbacks"
            :key="feedback.created + index"
            :class="{ 'voc-row' : feedback.isVOC, 'vod-row' : feedback.isVOD, }"
            class="
              border-b
              border-gray-200
              py-3
              w-full
              px-1
              block
              flex
              items-center
              leading-normal
              justify-between
              pointer
              feedback-row
            "
            @click.prevent="openFeedbackModal(feedback)"
          >
            <p class="flex-1 text-left no-text-wrap">
              {{ feedback.created | dateFormat }}
            </p>
            <p class="flex-1 px-3 text-left no-text-wrap">
              <span
                v-for="rating in feedback.rating"
                :key="rating"
                :class="[feedback.rating <= 3 ? 'fas text-genpact-pink' : 'fas text-green-500' ]"
                class="far text-gray-500 fa-star text-sm"
              />
              <span
                v-for="rating in (5 - feedback.rating)"
                :key="rating + 5"
                class="far text-gray-500 fa-star text-sm"
              />
            </p>
            <div class="flex-2 text-left">
              <p v-for="(keyword, i) in feedback.keywords" :key="keyword" class="inline-block text-sm rounded-lg text-gray-600">
                {{ keyword }}<span v-if="i + 1 < feedback.keywords.length">,&nbsp;</span>
              </p>
            </div>
            <i class="fa-chevron-right fas relative text-gray-500" style="top: -1px;" />
          </div>
        </section>
      </section>
      <modal ref="feedback-modal-comp" :show-close-btn="true" modal-content-cont-height="" name="comments-modal">
        <section class="modal-body flex flex-col align-center justify-center py-4 px-8">
          <div class="form-body">
            <ul class="list-reset">
              <li v-if="$route.name == 'Dashboard.Review.Company.Detail'" class="border-b py-2 relative">
                <h4 class="mt-1 text-xs text-grey-darker">
                  {{ selectedFeedbackObj.isVOC ? 'GRM Name' : 'GOL Name' }}
                </h4>
                <p class="pt-1 text-grey-darkest">
                  {{ selectedFeedbackObj.firstName }} {{ selectedFeedbackObj.lastName }}
                </p>
              </li>
              <li v-if="$route.name == 'Dashboard.Review.Company.Detail'" class="border-b py-2 relative">
                <h4 class="mt-1 text-xs text-grey-darker">
                  Email Address
                </h4>
                <p class="pt-1 text-grey-darkest">
                  {{ selectedFeedbackObj.ohrid }}@genpact.com
                </p>
                <!-- :href="`ms-outlook://compose?to=${selectedFeedbackObj.ohrid}@genpact.com`" -->
                <button
                  v-if="isApp"
                  class="absolute fa-paper-plane fas p-2 pl-8 right-0 inset-y-0 text-gray-600 block"
                  @click.prevent.stop="openOutlook"
                />
              </li>
              <li class="border-b py-2 relative">
                <h4 class="mt-1 text-xs text-grey-darker">
                  Dated
                </h4>
                <p class="pt-1 text-grey-darkest">
                  {{ selectedFeedbackObj.created | dateFormat }}
                  <!-- {{ selectedFeedbackObj.created | dateFormat({ timestampMini: true }) }} -->
                </p>
              </li>
              <li v-if="selectedFeedbackObj.rating" class="border-b py-2 relative">
                <h4 class="mt-1 text-xs text-grey-darker">
                  Rating
                </h4>
                <p class="pt-1 text-grey-darkest">
                  <span
                    v-for="rating in selectedFeedbackObj.rating"
                    :key="rating"
                    :class="[selectedFeedbackObj.rating <= 3 ? 'fas text-genpact-pink' : 'fas text-green-500' ]"
                    class="far text-gray-500 fa-star text-lg"
                  />
                  <span
                    v-for="rating in (5 - selectedFeedbackObj.rating)"
                    :key="rating + 5"
                    class="far text-gray-500 fa-star text-lg"
                  />
                </p>
              </li>
              <li class="border-b py-2 relative">
                <h4 class="mt-1 text-xs text-grey-darker">
                  Issues
                </h4>
                <p class="pt-1 text-grey-darkest">
                  <span v-for="(keyword, i) in selectedFeedbackObj.keywords" :key="keyword" class="inline-block">
                    {{ keyword }}<span v-if="i + 1 < selectedFeedbackObj.keywords.length">,&nbsp;</span>
                  </span>
                </p>
              </li>
              <li class="py-2 relative">
                <h4 class="mt-1 text-xs text-grey-darker">
                  Action Plan
                </h4>
                <p class="pt-1 text-grey-darkest">
                  {{ selectedFeedbackObj.actionPlan }}
                </p>
              </li>
            </ul>
          </div>
        </section>
      </modal>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import gql from 'graphql-tag';
import dayJs from 'dayjs';
import {
  isAndroid,
} from 'mobile-device-detect';

const isApp = process.env.VUE_APP_RUN_ENV === 'app';

export default {
  name: 'TaskDetail',
  components: {
    BarChart: () => import('@/components/charts/bar.vue'),
    Modal: () => import('@/components/modal.vue'),
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  apollo: {
    // Query with parameters
    queryResult: {
      // gql query
      query() {
        if (this.$route.name === 'Dashboard.Review.Company.Detail') {
          return gql`query Company($companyVerticalId: Int) {
            company(companyVerticalId: $companyVerticalId) {
              id
              name
              type
              companyVerticalId
            }
            feedbacks: companyFeedbacksAdmin(companyVertical: $companyVerticalId) {
              actionPlan
              firstName
              lastName
              keywords
              company
              isVOC
              rating
              isVOD
              vertical
              created
              companyVertical
              ohrid
            }
          }`;
        }
        return gql`query Company($companyVerticalId: Int) {
          company(companyVerticalId: $companyVerticalId) {
            id
            name
            type
            companyVerticalId
          }
          feedbacks: companyFeedback(companyVertical: $companyVerticalId) {
            id
            actionPlan
            rating
            keywords
            created
          }
        }`;
      },
      // Static parameters
      variables() {
        return {
          companyVerticalId: parseInt(this.$route.params.companyVerticalId, 10),
        };
      },
      update(data) {
        if (this.$route.params.companyVerticalId === 'undefined') return [];

        const { company, feedbacks: feedbacksArr } = data;

        const feedbacks = feedbacksArr.map((feedback) => ({
          ...feedback,
          keywords: feedback.keywords ? feedback.keywords.split(',') : ['---'],
          created: new Date(parseInt(feedback.created, 10)),
          displayDate: dayJs(new Date(parseInt(feedback.created, 10))).format('MMM, D'),
          chartingDate: new Date(parseInt(feedback.created, 10)).toISOString(),
        }));

        const vocFeedbacks = feedbacks.filter((feedback) => feedback.isVOC);
        const vodFeedbacks = feedbacks.filter((feedback) => feedback.isVOD);
        let labels = [];

        // const vocTimeStamps = vocFeedbacks.map(feedback => dayJs(feedback.created).format('MMM, D'));
        // const vodTimeStamps = vodFeedbacks.map(feedback => dayJs(feedback.created).format('MMM, D'));

        if (this.$route.name === 'Dashboard.Review.Company.Detail') {
          const dateMap = {};
          vocFeedbacks.forEach((feedback) => {
            if (!dateMap[feedback.displayDate]) dateMap[feedback.displayDate] = { voc: feedback.rating, vocIndex: 1 };
            else {
              dateMap[feedback.displayDate].vocIndex += 1;
              dateMap[feedback.displayDate].voc += feedback.rating;
            }
            dateMap[feedback.displayDate].chartingDate = feedback.chartingDate;
          });
          vodFeedbacks.forEach((feedback) => {
            if (!dateMap[feedback.displayDate]) dateMap[feedback.displayDate] = { vod: feedback.rating, vodIndex: 1 };
            else {
              dateMap[feedback.displayDate].vodIndex = dateMap[feedback.displayDate].vodIndex ? dateMap[feedback.displayDate].vodIndex + 1 : 1;
              dateMap[feedback.displayDate].vod = dateMap[feedback.displayDate].vod ? dateMap[feedback.displayDate].vod + feedback.rating : feedback.rating;
            }
            dateMap[feedback.displayDate].chartingDate = feedback.chartingDate;
          });

          const vocRatings = [];
          const vodRatings = [];

          labels = [...Object.keys(dateMap)].sort((a, b) => {
            try {
              if (dateMap[a].chartingDate < dateMap[b].chartingDate) {
                return -1;
              }
              if (dateMap[a].chartingDate > dateMap[b].chartingDate) {
                return 1;
              }
              return 0;
            } catch (e) {
              console.warn('error caught: ', e); //eslint-disable-line
              return 0;
            }
          });

          labels.forEach((date) => {
            if (dateMap[date].voc) vocRatings.push(dateMap[date].voc / dateMap[date].vocIndex);
            else vocRatings.push(0);
            if (dateMap[date].vod) vodRatings.push(dateMap[date].vod / dateMap[date].vodIndex);
            else vodRatings.push(0);
          });

          const vocRatingsArrLen = Object.values(vocRatings).length;
          const vodRatingsArrLen = Object.values(vodRatings).length;
          console.log(`chart data before: ${JSON.stringify(this.chartData)}`);
          this.chartData.datasets[0].data = vocRatingsArrLen > 7
            ? Object.values(vocRatings).slice(vocRatingsArrLen - 7, vocRatingsArrLen) : Object.values(vocRatings);
          this.chartData.datasets[1].data = vodRatingsArrLen > 7
            ? Object.values(vodRatings).slice(vodRatingsArrLen - 7, vodRatingsArrLen) : Object.values(vodRatings);
          console.log(`chart data after: ${JSON.stringify(this.chartData)}`);
          // console.warn(dateMap, labels, vocRatings, vodRatings, vocRatingsArrLen, vodRatingsArrLen,  Object.values(vocRatings).slice(vocRatingsArrLen - 7, vocRatingsArrLen), Object.values(vodRatings).slice(vodRatingsArrLen - 7, vodRatingsArrLen));

          try {
            this.chartOptions.legend.display = true;
          } catch (e) {
            console.warn(e.message); // eslint-disable-line
          }
        } else {
          const ratings = feedbacks.map((feedback) => feedback.rating);
          labels = feedbacks.map((feedback) => dayJs(feedback.created).format('MMM, D'));
          this.chartData.datasets[0].data = labels.length > 7 ? ratings.slice(0, 7) : ratings;
          if (this.chartData.datasets[1]) {
            this.chartData.datasets[1].hidden = true;
          }
          // this.chartData.datasets.pop();
        }

        const feedbackForToday = feedbacks.filter((feedback) => dayJs(feedback.created).format('MMM, D') === dayJs(new Date()).format('MMM, D'));
        if (!feedbackForToday.length) this.noFeedbacksForToday = true;

        const labelsArrLen = labels.length;
        this.chartData.labels = labelsArrLen > 7 ? labels.slice(labelsArrLen - 7, labelsArrLen) : labels;
        return {
          ...company[0],
          feedbacks,
        };
      },
    },
  //   selectedFeedbackUser: {
  //     // gql query
  //     query: gql`query User($userId: Int) {
  //     publicUserProfile(userId: $userId) {
  //         firstName
  //         lastName
  //         isVOC
  //         isVOD
  //         isReviewer
  //         isAdmin
  //         ohrid
  //       }
  //     }`,
  //     // Static parameters
  //     variables() {
  //       return {
  //         userId: this.selectedFeedbackUserId,
  //       };
  //     },
  //   },
  },
  data() {
    return {
      // selectedFeedbackUserId: 1,
      noFeedbacksForToday: false,
      filterVod: false,
      isApp,
      selectedFeedbackObj: {},
      limitPosition: 20,
      scrolled: false,
      lastPosition: 0,
      chartData: {
        responsive: true,
        labels: [],
        datasets: [{
          data: [],
          label: 'VOS',
          borderColor: '#FF545E',
          fill: false,
          type: 'line',
        }, {
          data: [1, 2, 3, 4, 5, 3, 1],
          label: 'VOD',
          borderColor: '#00ADCF',
          fill: false,
          type: 'line',
        }],
      },
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
    };
  },
  computed: {
    ...mapGetters(['request']),
    company() {
      // if (this.$route.name !== 'Dashboard.Review.Company.Detail') return this.queryResult || {};
      if (this.queryResult) {
        // const feedbacks = this.queryResult.feedbacks.filter(feedback => (!this.filterVod ? feedback.isVOC : feedback.isVOD)).sort((a, b) => {
        const feedbacks = this.queryResult.feedbacks;
        return {
          ...this.queryResult,
          feedbacks: feedbacks.sort((a, b) => {
            if (a.created > b.created) {
              return -1;
            }
            if (b.created < a.created) {
              return 1;
            }
            return 0;
          }),
        };
      }
      return {};
      // return this.queryResult || {};
    },
  },
  methods: {
    openFeedbackModal(feedback) {
      // clear all states
      this.selectedFeedbackObj = {};
      this.$refs['feedback-modal-comp'].$data.isOpen = true;
      this.selectedFeedbackObj = { ...feedback };
      // console.log(this.selectedFeedbackObj);
      // this.selectedFeedbackUserId = this.selectedFeedbackObj.userId;
    },
    openOutlook() {
      if (window.cordova && window.cordova.plugins.email) {
        cordova.plugins.email.open({
          to: `${this.selectedFeedbackObj.ohrid}@genpact.com`,
          app: isAndroid ? 'com.microsoft.office.outlook' : 'outlook',
        });
      }
    },
  },
  // mounted() {
  //   this.$emit('showHeaderShadowEvent', true);
  // },
};
</script>

<style lang="scss" scoped>
.feedback-row {
  position: relative;
  &:before {
    position: absolute;
    height: 97%;
    content: '';
    left: -10px;
    width: 3px;
    border-radius: 4px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.8;
  }

  &.voc-row:before {
    background: #FF545E;
  }

  &.vod-row:before {
    background: #00ADCF;
  }
}
</style>
