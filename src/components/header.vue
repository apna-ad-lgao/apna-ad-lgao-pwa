<template>
  <header class="light" :data-open-state="openState">
    <input id="menu-open-toggle" ref="menu-open-toggle" v-model="menuOpened" class="menu-open-toggle" type="checkbox">

    <Slide :no-overlay="false" :burger-icon="false" :is-open="menuOpened" class="burger-menu-cont" @closeMenu="menuOpened = false">
      <span :class="{ 'active' : menuOpened}" class="burger-menu-overlay" />
      <div class="flex flex-col py-8 mt-8 ml-5 mb-10 pb-10">
        <h1 class="bg-gray-600 flex h-12 items-center justify-center leading-normal rounded-full text-xl text-white w-12">
          {{ userInitials }}
        </h1>
        <p class="text uppercase letter-spacing-05 mt-3 text-white font-extrabold text-lg">
          {{ user.name | lowercase }}
        </p>
      </div>
      <router-link
        to="/dashboard/tasks"
        class="text-lg letter-spacing-05 uppercase font-normal mt-2 ml-2"
      >
        <span>Dashboard</span>
      </router-link>
      <router-link v-if="user.isAdmin" to="/dashboard/review" class="text-lg letter-spacing-05 uppercase font-normal mt-2 ml-2">
        <span>Partners</span>
      </router-link>
      <!-- adding another tab -->
      <router-link
        v-if="user.isAdmin"
        to="/dashboard/admin"
        class="text-lg letter-spacing-05 uppercase font-normal mt-2 ml-2"
      >
        <span>Admin View</span>
      </router-link>
      <!-- adding companies tab -->
      <router-link
        v-if="user.isAdmin"
        to="/dashboard/companies"
        class="text-lg letter-spacing-05 uppercase font-normal mt-2 ml-2"
      >
        <span>Companies</span>
      </router-link>
      <!-- adding booking tab -->
      <router-link
        v-if="user.isPartner || user.isAdmin"
        to="/dashboard/address"
        class="text-lg letter-spacing-05 uppercase font-normal mt-2 ml-2"
      >
        <span>Bookings</span>
      </router-link>
      <!-- adding company address tab -->
      <router-link
        v-if="user.isPartner || user.isAdmin"
        to="/dashboard/address"
        class="text-lg letter-spacing-05 uppercase font-normal mt-2 ml-2"
      >
        <span>Company Address</span>
      </router-link>
      <!-- adding company detail tab -->
      <router-link
        v-if="user.isPartner || user.isAdmin"
        to="/dashboard/company"
        class="text-lg letter-spacing-05 uppercase font-normal mt-2 ml-2"
      >
        <span>Company Detail</span>
      </router-link>
      <!-- adding analytics tab -->
      <router-link
        v-if="user.isPartner || user.isAdmin"
        to="/dashboard/analytic-dashboard"
        class="text-lg letter-spacing-05 uppercase font-normal mt-2 ml-2"
      >
        <span>Analytic Dashboard</span>
      </router-link>
      <!--- Download Report Tab ---->
      <router-link
        v-if="user.isAdmin"
        to="/dashboard/download-report"
        class="text-lg letter-spacing-05 uppercase font-normal mt-2 ml-2"
      >
        <span>Show Report</span>
      </router-link>
      <button class="absolute bottom-0 letter-spacing-05 mb-6 ml-4 text-red-500 uppercase w-full font-extrabold" @click.prevent="logout">
        Logout
      </button>
      <p class="absolute bottom-0 right-0 ml-6 text-xs uppercase m-2 text-gray-700 letter-spacing-05 font-extrabold">
        <span v-if="!isApp">Version: {{ version }}</span>
      </p>
    </Slide>

    <nav
      class="header-navigation-cont z-10 headroom flex items-center justify-center"
      role="navigation"
      aria-label="Global Navigation"
      :class="{ 'headroom--unpinned' : scrolled && !showBack && !menuOpened, 'menu-opened' : menuOpened, 'nav-scroll-hide' : !hideNavScroll }"
      @scroll="handleScroll"
    >
      <div v-if="showBack" class="back-cont absolute inset-0 inset-y-0 z-10">
        <button
          class="back-btn px-3 py-3 text-gray-600 flex items-center leading-normal"
          @click.prevent="$router.back()"
        >
          <i class="fa-chevron-left fas text-xl mr-1" />
          <span>Back</span>
        </button>
      </div>

      <h4 v-if="showBack" class="text-gray-800 letter-spacing-05 capitalize">
        {{ $route.meta.title || '' }}
      </h4>

      <ul
        v-if="!showBack"
        :class="{ 'filters-opened' : filtersOpend, 'menu-opened' : menuOpened, 'non-search-page-active' : nonSearchPageActive }"
        class="nav-bar-cont"
      >
        <li v-if="Object.keys(user).length" class="nav-menu-icon ml-1">
          <label class="nav-menu-icon-label main-menu-toggle" for="menu-open-toggle" aria-hidden="true">
            <span class="nav-menu-icon-bread nav-menu-icon-bread-top">
              <span class="nav-menu-icon-bread-crust nav-menu-icon-bread-crust-top" />
            </span>
            <span class="nav-menu-icon-bread nav-menu-icon-bread-bottom">
              <span class="nav-menu-icon-bread-crust nav-menu-icon-bread-crust-bottom" />
            </span>
          </label>
        </li>
        <li class="nav-logo-item main-logo-cont">
          <router-link :to="{ name: 'Dashboard.Tasks' }" class="menu-logo-link">
            Apna Ad Lgao
          </router-link>
        </li>
        <!-- <li class="nav-menu-icon nav-menu-search p-3 right-0">
          <i
            class="fas fa-sync-alt mr-1 text-lg w-full"
            @click.prevent="reloadPage"
          />
        </li> -->
      </ul>

      <div v-if="!showBack" class="nav-list-cont footer">
        <transition name="search-close-fade">
          <div v-if="searchOpened" class="relative footer-nav-item-cont menu-list-item search-cont no-submenu">
            <search-input
              id="article-search-input"
              :text="$store.state.search.query"
              :autofocus="true"
              :autofocus-time="500"
              :with-search-button="true"
              :loading="request.key === 'fetchSearchResults' && request.inProgress"
              placeholder="Search articles"
              class="mt-4 mb-5"
              @inputChange="searchQueryChange"
              @inputUpdate="searchQueryUpdated"
            />

            <div
              v-for="article in $store.state.search.results"
              :key="article.ID"
              class="bg-white border mt-2 overflow-hidden pb-2 pointer px-4 py-1 relative rounded-lg mb-3"
            >
              <router-link
                :to="`/dashboard/article/${article.Id}`"
                class="no-underline block leading-normal py-2 pb-0 text-left"
                @click.native="menuOpened = false"
              >
                <p class="text-gray-800 mb-2 serif">
                  {{ article.Title }}
                </p>
                <p class="text-sm text-gray-600 mb-1">
                  {{ article.Modified | dateFormat }} : <span class="text-gray-800">{{ article.SortStory | trim(130) }}</span>
                </p>
              </router-link>
            </div>
          </div>
        </transition>

        <!-- MENU OPENED ITEMS -->
        <!-- <div
          v-for="(category, index) in categories"
          v-show="!searchOpened"
          :key="category.slug"
          class="relative footer-nav-item-cont menu-list-item no-submenu"
        >
          <span class="absolute flex full-height items-center justify-start w-12">
            <img :src="category.image" :alt="category.name" class="category-img">
          </span>
          <router-link
            :to="{ name: 'Dashboard.Articles', query: { category: category.slug }}"
            :class="{ 'border-b' : index !== categories.length - 1}"
            class="no-underline ml-12 block flex items-center leading-normal pt-3 py-2 text-lg border-gray-100 text-gray-800 justify-between"
            @click.native="menuOpened = false"
          >
            {{ category.name }}
            <button
              class="border px-2 py-1 relative rounded text-sm flex justify-center items-center"
              :class="[category.selected ? 'bg-brand-color text-white border-red-600' : 'text-gray-600' ]"
              @click.prevent.stop="followCategory(category)"
            >
              {{ category.selected ? 'Unfollow' : 'Follow' }}
              <i class="fas text-xs ml-1" :class="[category.selected ? 'fa-minus' : 'fa-plus' ]" />
            </button>
          </router-link>
        </div> -->
      </div>

      <!-- <transition v-if="!showBack" name="nav-scroll-anim">
        <div v-show="hideNavScroll" class="absolute pin-b pin-x mt-1 sliding-links-cont text-center flex">
          <router-link
            ref="editor-pick-link"
            :to="{ name: 'Dashboard.Articles', query: {}}"
            replace
            class="font-semibold pb-3 text-sm flex-1 px-2 mx-1 whitespace-no-wrap no-underline text-gray-600"
          >
            Editor's pick
          </router-link>
          <router-link
            ref="feed-link"
            :to="{ name: 'Dashboard.Articles', query: { nav: 'feed' }}"
            replace
            class="font-semibold pb-3 text-sm flex-1 px-2 mx-1 whitespace-no-wrap no-underline text-gray-600"
          >
            My Feed
          </router-link>
          <span id="slide-line" ref="sliderUnderline" class="absolute pin-b" />
        </div>
      </transition> -->
    </nav>
  </header>
</template>

<script>
// import debounce from 'lodash.debounce';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  components: {
    Slide: require('vue-burger-menu').Slide, //eslint-disable-line
  },
  props: {
    showBack: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      searchQuery: '',
      menuOpened: false,
      searchOpened: false,
      nonSearchPageActive: true,
      filtersOpend: false,
      limitPosition: 350,
      scrolled: false,
      lastPosition: 0,
    };
  },
  computed: {
    ...mapGetters(['categories', 'request', 'version']),
    hideNavScroll() {
      if (this.$route.name === 'Dashboard.Articles') {
        this.$emit('hideNavScroll', !this.$route.query.category);
        return !this.$route.query.category;
      }
      return false;
    },
    openState() {
      this.$nextTick(() => {
        if (this.menuOpened) {
          document.body.style.overflow = 'hidden';
          document.body.style.height = `${window.innerHeight}px`;
        } else {
          document.body.style.overflow = '';
          document.body.style.height = '';
          // TODO: REMOVE THIS LINE
          // eslint-disable-next-line
          this.searchOpened = false;
        }
      });
      return this.menuOpened;
    },
    fullName() {
      const fullName = `${this.user.firstName ? `${this.user.firstName}` : ''}${this.user.middleName
        ? ` ${this.user.middleName}`
        : ''} ${this.user.lastName ? `${this.user.lastName}` : ''}`;
      return fullName;
    },
    userInitials() {
      const getInitials = (name) => {
        const parts = name.split(' ');
        let initials = '';
        for (let i = 0; i < parts.length; i += 1) {
          if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0];
          }
        }
        return initials || '';
      };

      return getInitials(this.user.name).slice(0, 2);
    },
  },
  // watch: {
  //   $route() {
  //     this.moveNav();
  //   },
  // },
  // mounted() {
  //   this.moveNav();
  // },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions(['logout']),
    handleScroll() {
      if (!this.menuOpened && this.hideNavScroll) {
        if (this.lastPosition < window.scrollY && this.limitPosition < window.scrollY) {
          this.scrolled = true;
        }
        if (this.lastPosition > window.scrollY) {
          this.scrolled = false;
        }
        this.lastPosition = window.scrollY;
      }
    },
    // moveNav() {
    //   if (this.$route.name === 'Dashboard.Articles') {
    //     this.$nextTick(() => {
    //       const target = this.$refs[!this.$route.query.nav ? 'editor-pick-link' : 'feed-link'].$el;
    //       const width = target.scrollWidth;
    //       const posLeft = target.offsetLeft;
    //       const slider = this.$refs.sliderUnderline;
    //       slider.style.width = `${width}px`;
    //       slider.style.left = `${posLeft}px`;
    //     });
    //   }
    // },
    // followCategory(cat) {
    //   const category = { ...cat };
    //   // category.selected = true;
    //   if (category.selected) this.deleteCategoryPreferences(category);
    //   else this.addCategoryPreferences(category);
    //   this.$root.$emit('categoryFollowEvent');
    // },
    // openSearch() {
    //   this.searchOpened = true;
    // },
    // eslint-disable-next-line
    // searchQueryUpdated: debounce(function (val) {
    //   this.fetchSearchResults(val);
    // }, 300),
    // searchQueryChange() {
    //   // console.log(val);
    // },
    // reloadPage() {
    //   if (window.location) window.location.reload();
    // },
  },
};
</script>

<style lang="scss" scoped>
.search-close-fade-enter-active {
  animation: fade 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
// .search-close-fade-leave-active {
//   animation: fade 0.1s ease-out reverse;
// }
</style>
