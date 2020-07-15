<template>
<div>
<header class="bg-transparent fixed top-0 left-0 w-full sm:flex sm:items-center sm:justify-between px-4 py-2" v-bind:class="{fixedHeader: scrollPosition > 100, sideBar: open }">

  <!-- Logo text or image -->
  <div class="flex items-center justify-between sm:mb-0">
    <div class="logo">
      <img class="w-50 h-10" src="https://whiteandblack.in/wp-content/uploads/2018/10/Branding-Blog-Image-Blog.jpg"/>
    </div>

    <div class="action-buttons">
      <button class="border border-gray-100 px-3 py-1 rounded text-white hover:text-orange sm:hidden ml-2" @click="toggleSearch">
        <i class="fa fa-search"></i>
      </button>
      <button class="border bg-dark-gray-200 border-gray-100 px-3 py-1 rounded text-dark-gray-700 hover:text-orange sm:hidden ml-2" @click="addClass">
        <i class="fa fa-bars"></i>
      </button>
    </div>
  </div>
  <!-- END Logo text or image -->

  <!-- Search field -->
  <form class="search-header mb-3 w-full sm:mb-0 sm:w-1/4 hidden sm:block mt-4 sm:mt-0" v-bind:class="{searchBar : searchBar}">
    <div class="relative">
      <input class="bg-transparent border border-gray-100 text-sm px-2 py-1 w-full placeholder-white text-white pr-10" placeholder="Search.." type="text">
      <button type="button" class="absolute right-0 top-0 px-3 p-1 mt-px text-white"><i class="fa fa-search" aria-hidden="true"></i></button>
    </div>
  </form>
  <!-- END Search field -->

  <!-- Global navigation -->
  <nav class="fixed top-0 right-0 pt-10 shadow sm:shadow-none sm:pt-0 h-full sm:h-auto w-56 sm:w-auto sm:static">
    <span class="rounded-full w-8 h-8 flex items-center justify-center border border-gray-600 text-dark-gray-700 absolute sm:hidden" style="right: 10px; top: 10px;" @click="removeClass">X</span>
    <ul class="menu list-reset sm:flex sm:items-center">
      <li class="sm:ml-8" v-for="nav in navigation" :key="nav">
        <a class="border-t block no-underline hover:underline py-2 text-dark-gray-800 sm:text-white sm:border-none px-4 sm:p-0" href="#">
          {{nav}}
        </a>
      </li>
    </ul>
  </nav>
  <!-- END Global navigation -->

</header>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dashboardHeader',
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
      scrollPosition: null,
      open: false,
      searchBar: false,
      navigation: ['Home', 'About', 'Service', 'Gallery', 'Contact'],
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    addClass() {
    	this.open = true;
    },
    removeClass() {
      this.open = false;
    },
    toggleSearch() {
      this.searchBar = !this.searchBar;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
};
</script>

<style scoped>
header.fixedHeader{background: #fff; z-index: 99; box-shadow: 0 0 10px 1px rgba(0,0,0,0.1); animation: headerScroll 1s ease;}
header.fixedHeader .menu li a{color: #444;}
header.fixedHeader .search-header input{border: 1px solid #ccc; color: #444;}
header.fixedHeader .search-header button{color: #444;}
header.fixedHeader .search-header ::-webkit-input-placeholder {color: #777;}
header.fixedHeader .search-header ::-moz-placeholder {color: #777;}
header.fixedHeader .search-header :-ms-input-placeholder {color: #777;}
header.fixedHeader .action-buttons button:first-child{color: #444; background-color: #ececec; border: 1px solid #f7fafc;}
.search-header{visibility: visible !important;}
@-webkit-keyframes headerScroll {
    0% {-webkit-transform: translateY(-50px); transform: translateY(-50px);}
    100% {-webkit-transform: translateY(0px); transform: translateY(0px);}
}
@keyframes headerScroll {
    0% {-webkit-transform: translateY(-50px); transform: translateY(-50px);}
    100% {-webkit-transform: translateY(0px); transform: translateY(0px);}
}

@media only screen and (max-width: 640px) {
  header nav{background: #fff; transition: 0.5s all ease; visibility: visible; -webkit-transform: translate3d(-100%, 0, 0); transform: translate3d(100%, 0, 0);}
  header.sideBar nav{visibility: visible; -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0);}
  header .menu li:first-child a{border: 0;}
  .search-header.searchBar{display: block;}
}
</style>
