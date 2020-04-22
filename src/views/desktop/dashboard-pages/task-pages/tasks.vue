<template>
  <section class="dashboard-tasks-page bg-white h-min-screen mt-12 p-5 px-6 pt-2" @scroll="handleScroll">
    <section class="salutation-cont my-6">
      <h1 class="font-bold letter-spacing-05 text-3xl">
        Hello, {{ user ? user.firstName : '' }}
      </h1>
      <p v-show="companies && companies.length" class="mt-2">
        Here are the companies for which you need to provide {{ user.isVOC ? 'Voice Of Sales (VOS)' : 'Voice of Delivery (VOD)' }} inputs
      </p>
      <p v-show="companies && !companies.length" class="mt-2">
        You are not aligned with any account to provide its {{ user.isVOC ? 'Voice Of Sales (VOS)' : 'Voice of Delivery (VOD)' }} inputs.
      </p>
    </section>

    <section v-show="companies && companies.length" class="pending-cont flex justify-between items-center border-t pt-6">
      <h1 class="font-bold letter-spacing-05 text-xl pt-1">
        {{ user.isVOC ? 'VOS' : 'VOD' }} inputs for Today
        <p class="text-gray-600 font-normal text-sm">
          {{ new Date() | dateFormat }}
        </p>
      </h1>
      <radial-progress-bar
        :diameter="52"
        :completed-steps="completedSteps"
        :total-steps="100"
        :stroke-width="3"
        :animate-speed="1200"
        inner-stroke-color="#ededed"
        start-color="#007AFF"
        stop-color="#00ADCF"
        :timing="`cubic-bezier(.2, .3, .25, .9)`"
        class="relative"
      >
        <p class="text-blue-500 text-sm font-bold absolute pin-abs-center">
          <ICountUp
            :end-val="completedSteps"
            :options="{
              useEasing: true,
              useGrouping: true,
              separator: ',',
              decimal: '.',
              prefix: '',
              suffix: ''
            }"
          />%
        </p>
      </radial-progress-bar>
    </section>

    <section v-show="companies && companies.length" class="content-cont my-6 pb-1">
      <div
        v-for="company in companies"
        :key="company.companyVerticalId"
        :class="[ company.feedback ? 'border border-blue-400 bg-blue-100' : 'shadow' ]"
        class="
          task-item
          w-full
          focus:outline-none
          py-3
          px-2
          no-underline
          block
          flex
          items-center
          leading-normal
          justify-between
          relative
          my-2
          rounded
          px-4
          pointer
          border
          border-gray-400
          bg-gray-100
        "
        @click.prevent="openFeedbackModal(company)"
      >
        <div class="text-left leading-snug">
          <h1>{{ company.name }}</h1>
          <h2 class="text-sm text-gray-600 text-left">
            {{ company.type }}
          </h2>
        </div>
        <div>
          <button v-if="company.feedback" class="border rounded font-bold border-b-4 border-blue-500 px-2 py-1 text-blue-400 relative text-md">
            <i class="fa-check fas relative text-md pr-1" />Completed
          </button>
          <button v-else class="border rounded font-bold border-b-4 border-gray-500 px-2 py-1 text-gray-400 relative text-md">
            <i class="fa-comments fas relative text-md pr-1" />Feedback
          </button>
          <!-- <i class="fa-chart-line fas relative text-xl text-gray-500" style="top: -1px;" /> -->
        </div>
      </div>
    </section>

    <modal ref="feedback-modal-comp" modal-content-cont-height="h-full" :show-close-btn="true" name="comments-modal" @modalOpenEvent="formSubmitted = false">
      <div v-if="request.key === 'fetchArticleComments' && request.inProgress" class="text-center m-10">
        <img class="mb-5 block mx-auto" src="/img/loader.gif" width="30" alt="Loader Gif">
        <p class="mx-auto leading-normal text-lg w-1/2">
          Fetching comments for article...
        </p>
      </div>

      <section :class="{ 'h-full' : formSubmitted }" class="modal-body flex flex-col align-center justify-center py-4 px-8">
        <div v-if="formSubmitted" class="success-cont">
          <success class="h-24 w-full" />
          <h1 class="text-2xl my-2 text-center">
            Successfully submitted the review for&nbsp;<span class="font-bold">{{ selectedCompanyObj.name }}</span>
          </h1>
          <router-link
            :to="`/dashboard/company/${selectedCompanyObj.companyVerticalId}`"
            class="block w-full py-1 mt-6 text-center text-lg mb-16 flex items-center justify-center"
          >
            Click here to view historical {{ user.isVOC ? 'VOS' : 'VOD' }} data&nbsp;<span class="fas fa-arrow-right ml-1 text-base" />
          </router-link>
        </div>

        <div v-else class="form-body">
          <h4 class="mt-1 text-gray-600 text-sm">
            {{ selectedCompanyObj.type }}
            <!-- 23 Nov 2019 -->
          </h4>
          <h1 class="font-bold letter-spacing-05 text-2xl">
            {{ selectedCompanyObj.name }}
          </h1>
          <p class="mt-2">
            Please rate Genpact’s Operations health for {{ selectedCompanyObj.name }} based on your judgement today
          </p>
          <p class="my-3 border-b pb-5 mb-4">
            <button
              v-for="x in 5"
              :key="x"
              :class="[ x <= rating ? 'fas' : 'far' ]"
              class="fa-star mr-3 text-2xl text-genpact-pink focus:outline-none"
              :data-rating="x"
              @click="updateRating"
            />
          </p>

          <p class="mt-5">
            Please select the action items based on which above rating was given:
          </p>
          <div class="my-3 border-b pb-4 mb-3">
            <span v-for="keyword in keywords" :key="keyword.id" class="font-semibold leading-loose letter-spacing-05 text-sm text-gray-600 label-pill">
              <input :id="`input-${keyword.name}-${keyword.id}`" class="absolute invisible" type="checkbox" @change="updateIssueKeywords(keyword.id)">
              <label :for="`input-${keyword.name}-${keyword.id}`" class="border inline-block border-gray-400 mb-2 mr-2 px-4 py-1 rounded-lg pointer">
                {{ keyword.name }}
              </label>
            </span>
          </div>

          <p class="mt-5">
            Please provide an action plan to be followed going forward:
          </p>
          <div
            v-if="!(request.key === 'fetchArticleComments' && request.inProgress) || request.key === 'commentOnArticle' && request.inProgress"
            class="comments-cta-cont my-3 mt-1 pb-5 mb-4"
          >
            <div class="text-sm text-red-600 leading-tight mt-1 mb-2">
              {{ errors.first('actionPlan') }}
            </div>
            <textarea
              id="actionPlan"
              v-validate="{required: true, max:200, regex:/^[\w\-.,\s]+$/ }"
              name="actionPlan"
              required
              data-vv-as="action plan"
              :class="{
                'opacity-75 shadow-none' : request.key === 'commentOnArticle' && request.inProgress,
                'border-red-500 focus:border-red-500' : errors.first('actionPlan')
              }"
              :disabled="request.key === 'commentOnArticle' && request.inProgress"
              class="
                appearance-none
                bg-gray-100
                block
                border-2
                focus:bg-white
                focus:border-gray-400
                focus:outline-none
                leading-normal
                mb-3
                px-4
                py-3
                rounded
                text-gray-800 w-full
                transition-smooth
                transition-instant
                overflow-hidden
              "
              @keydown="resizeTextArea"
            />
            <button
              :class="{ 'loading opacity-50': feedbackSavingInProgress }"
              :disabled="feedbackSavingInProgress || (!rating || !keywordsArr.length || !actionPlan) || errors.first('actionPlan')"
              class="bg-green-500
                button
                border-2
                border-green-500
                block
                w-full
                font-semibold
                leading-normal
                px-4
                py-1
                mt-6
                rounded
                text-lg
                letter-spacing-05
                leading-loose
                text-white
              "
              @click.prevent="submitFeedback"
            >
              Submit
              <ring-loader />
            </button>
          </div>
        </div>
      </section>
    </modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import gql from 'graphql-tag';
import dayJs from 'dayjs';
// import { type } from 'os';
// import Departments from '@/graphql/Departments.gql';

export default {
  name: 'Tasks',
  components: {
    Modal: () => import('@/components/modal.vue'),
    Success: () => import('@/components/animations/success.vue'),
    RadialProgressBar: () => import('vue-radial-progress'),
    ICountUp: () => import('vue-countup-v2'),
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  apollo: {
    // Query with parameters
    companies: {
      // gql query
      query: gql`query Company($created: String) {
        userCompanyList {
          name: company
          vertical
          companyVerticalId
          type
        }
        feedbacks: feedback(created: $created) {
          companyVertical
        }
      }`,
      fetchPolicy: 'network-only',
      // Static parameters
      variables() {
        return {
          created: `%${dayJs(new Date()).format('YYYY-MM-DD')}%`,
        };
      },
      update(data) {
        const { feedbacks, userCompanyList } = data;
        feedbacks.forEach(({ companyVertical }) => {
          const updatedCompanyFeedbackObj = userCompanyList.find(({ companyVerticalId }) => companyVertical === companyVerticalId);
          if (updatedCompanyFeedbackObj) updatedCompanyFeedbackObj.feedback = true;
        });
        const percentage = (feedbacks.length / userCompanyList.length) * 100;
        this.completedSteps = percentage > 100 ? 100 : percentage;
        return userCompanyList;
      },
    },
    keywords: gql`query {
      keywords: keyword {
        id
        name
      }
    }`,
  },
  data() {
    return {
      completedSteps: 0,
      limitPosition: 20,
      scrolled: false,
      lastPosition: 0,
      formSubmitted: false,
      rating: 0,
      keywordsArr: [],
      actionPlan: '',
      selectedCompanyObj: {},
      feedbackSavingInProgress: false,
    };
  },
  computed: {
    ...mapGetters(['request']),
  },
  watch: {
    $route() {
      const feedbacks = this.companies.filter((company) => !!company.feedback);
      const percentage = (feedbacks.length / this.companies.length) * 100;
      this.completedSteps = percentage > 100 ? 100 : percentage;
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    const elem = this.$root.$el;
    elem.className += ' tasks-loaded';
    setTimeout(() => {
      // this.completedSteps = 63;
      elem.classList.remove('tasks-loaded');
    }, 1600);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  beforeRouteLeave(to, from, next) {
    if (this.$refs['feedback-modal-comp']) this.$refs['feedback-modal-comp'].$data.isOpen = false;
    next();
  },
  methods: {
    ...mapActions(['addToastNotifications']),
    resizeTextArea(e) {
      const target = e.target;
      this.actionPlan = target.value;
      // var el = this;
      setTimeout(() => {
        target.style.cssText = 'height:auto; padding:0';
        target.style.cssText = `height: ${target.scrollHeight}px`;
      }, 0);
    },
    handleScroll() {
      if (this.lastPosition < window.scrollY && this.limitPosition < window.scrollY) {
        this.scrolled = true;
      }
      if (window.scrollY <= this.limitPosition) {
        this.scrolled = false;
      }
      this.lastPosition = window.scrollY;
      this.$emit('showHeaderShadowEvent', this.scrolled);
    },
    openFeedbackModal(company) {
      if (company.feedback) {
        // this.$route.meta.title = company.name;
        this.$router.push(`/dashboard/company/${company.companyVerticalId}`);
        return;
      }

      // clear all states
      this.rating = 0;
      this.keywordsArr = [];
      this.actionPlan = '';
      this.selectedCompanyObj = {};

      this.$refs['feedback-modal-comp'].$data.isOpen = true;
      this.selectedCompanyObj = { ...company };
    },
    updateRating(e) {
      const target = e.target;
      const { rating } = target.dataset;
      this.rating = rating ? parseInt(rating, 10) : 0;
    },
    updateIssueKeywords(id) {
      if (this.keywordsArr.includes(id)) this.keywordsArr = this.keywordsArr.filter((x) => x !== id);
      else this.keywordsArr.push(id);
    },
    async submitFeedback() {
      const formVlidationStatus = await this.$validator.validateAll();
      if (!formVlidationStatus) {
        this.addToastNotifications({
          text: 'Please fill all fields in the form',
          timer: 4000,
          type: 'error',
        });
        return;
      }

      try {
        this.feedbackSavingInProgress = true;
        await this.$apollo.mutate({
          mutation: gql`
            mutation ($actionPlan: String!, $rating: Int!, $companyVerticalId: Int!, $keywords: String!) {
              addFeedback(
                actionPlan: $actionPlan
                rating: $rating
                keywordIds: $keywords
                companyVertical: $companyVerticalId
                # created: $created
              ) {
                userId
                actionPlan
              }
            }
          `,
          // Parameters
          variables: {
            actionPlan: this.actionPlan,
            rating: this.rating,
            keywords: JSON.stringify(this.keywordsArr).split('[')[1].split(']')[0],
            companyVerticalId: this.selectedCompanyObj.companyVerticalId,
            // created: dayJs(new Date()).format('YYYY-MM-DD'),
          },
        });
        this.formSubmitted = true;
        const updatedCompany = this.companies.find((company) => company.companyVerticalId === this.selectedCompanyObj.companyVerticalId);
        updatedCompany.feedback = {
          actionPlan: this.actionPlan,
          rating: this.rating,
          keywords: this.keywordsArr,
        };

        const feedbacks = this.companies.filter((company) => !!company.feedback);
        const percentage = (feedbacks.length / this.companies.length) * 100;
        this.completedSteps = percentage > 100 ? 100 : percentage;
      } catch (err) {
        console.warn(err.message); // eslint-disable-line
        const error = { ...err };
        if (error.networkError && (error.networkError.statusCode === 401 || error.networkError.statusCode === 403)) {
          this.$store.dispatch('addToastNotifications', {
            text: 'Oops! You got logged out. Login again.',
            timer: 4000,
            type: 'error',
          });
          // Logout the user
          this.$store.dispatch('logout', this.$store.state.route.fullPath);
        } else {
          this.$store.dispatch('addToastNotifications', {
            text: err.message || 'Some error occured in saving the feedback. Please try again.',
            timer: 4000,
            type: 'error',
          });
        }
      } finally {
        this.feedbackSavingInProgress = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tasks-loaded {
  .salutation-cont {
    transform: translate3d(0,calc(100vh - 50vh - 140%),0) scale(1.05);
    opacity: 0;
    /* transform: none; */
    /* transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transition: all 1s cubic-bezier(0.7, 0, 0.3, 1); */
    /* transition-duration: 1s; */
    animation: 0.5s fade 0.3s cubic-bezier(0.7, 0, 0.3, 1) forwards, 1s slideUp 0.5s cubic-bezier(0.7, 0, 0.3, 1) forwards;
  }

  .content-cont {
    transform: translate3d(0,30px,0);
    opacity: 0;
    animation: 1s fade 1s cubic-bezier(0.7, 0, 0.3, 1) forwards, 0.75s slideUp 0.9s cubic-bezier(0.7, 0, 0.3, 1) forwards;
  }

  .pending-cont {
    opacity: 0;
    animation: 1s fade 1.1s cubic-bezier(0.7, 0, 0.3, 1) forwards;
  }

  .task-item {
    opacity: 0;
    transform: scale(1.1) translateY(-24px);
    // transition: opacity 0.35s ease-out, transform 0.35s ease-out;
    animation: 1s fade cubic-bezier(0.7, 0, 0.3, 1) forwards, 0.75s slideUp cubic-bezier(0.7, 0, 0.3, 1) forwards;

    &:nth-child(2) {
      animation-delay: 1300ms, 1300ms;
    }
    &:nth-child(3) {
      animation-delay: 1350ms, 1350ms;
    }
    &:nth-child(4) {
      animation-delay: 1400ms, 1400ms;
    }
    &:nth-child(5) {
      animation-delay: 1450ms, 1450ms;
    }
    &:nth-child(6) {
      animation-delay: 1500ms, 1500ms;
    }
    &:nth-child(7) {
      animation-delay: 1550ms, 1550ms;
    }
    &:nth-child(8) {
      animation-delay: 1600ms, 1600ms;
    }
    &:nth-child(9) {
      animation-delay: 1650ms, 1650ms;
    }
    &:nth-child(10) {
      animation-delay: 1700ms, 1700ms;
    }
    &:nth-child(11) {
      animation-delay: 1750ms, 1750ms;
    }
    &:nth-child(12) {
      animation-delay: 1800ms, 1800ms;
    }
  }
}

// .task-item:before {
//   content: '';
//   background: #68d391;
//   position: absolute;
//   width: 4px;
//   height: 95%;
//   top: 0;
//   left: 0;
// }

@keyframes slideUp {
  100% {
    transform: none;
  }
}
</style>
