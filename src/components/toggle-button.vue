<template>
  <div />
</template>

<script>
// import debounce from 'lodash.debounce';

export default {
  name: 'Header',
  components: {
  },
  props: {
    showBack: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
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
    hideNavScroll() {
      if (this.$route.name === 'Dashboard.Articles') {
        this.$emit('hideNavScroll', !this.$route.query.category);
        return !this.$route.query.category;
      }
      return false;
    },
  },
  watch: {
    $route() {
      this.moveNav();
    },
  },
  mounted() {
    this.moveNav();
  },
  created() {
  },
  destroyed() {
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.search-close-fade-enter-active {
  animation: fade 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
