<template>
  <section />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'StoreRouter',
  props: {
    nextRoute: {
      type: String,
      default: '',
      required: true,
    },
  },
  mounted() {
    const currentUrl = this.$route.name;
    setTimeout(() => {
      if (currentUrl.includes('LoginPage') && this.$route.name.includes('LoginPage')) window.location.reload();
    }, 2000);
    this.$router.push(this.nextRoute);
    this.clearNextRoute();
    this.clearRedirectRoute();
  },
  methods: {
    ...mapActions(['clearNextRoute', 'clearRedirectRoute']),
  },
};
</script>
