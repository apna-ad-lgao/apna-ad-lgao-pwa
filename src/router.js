import Vue from 'vue';
import Router from 'vue-router';

import { isMobile } from 'mobile-device-detect';
// import analytics from '@/analytics/new-relic';

// const isMobile = true;

Vue.use(Router);

/* Auth Pages */
const LoginPage = () => {
  if (isMobile) {
    return import('@/views/mobile/auth-pages/login.vue');
  }
  return import('@/views/mobile/auth-pages/login.vue');
};

const RegisterPage = () => {
  if (isMobile) {
    return import('@/views/mobile/auth-pages/register.vue');
  }
  return import('@/views/mobile/auth-pages/register.vue');
};

const DashboardAddUserPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/add-user.vue');
  }
  // return import('@/views/desktop/dashboard-pages/add-user.vue');
  return import('@/views/mobile/dashboard-pages/add-user.vue');
};

/* Dashboard task feedback entry Page */
const DashboardAddNewUserPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/user-pages/add-new-user.vue');
  }
  // return import('@/views/desktop/dashboard-pages/user-pages/add-new-user.vue');
  return import('@/views/mobile/dashboard-pages/user-pages/add-new-user.vue');
};

const DashboardAddNewCompanyPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/company-pages/add-new-company.vue');
  }
  return import('@/views/mobile/dashboard-pages/company-pages/add-new-company.vue');
};

/* Dashboard Pages */
const DashboardRootPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/dashboard.vue');
  }
  return import('@/views/mobile/dashboard-pages/dashboard.vue');
};

/* Dashboard All Tasks Page */
const DashboardTasksPage = () => {
  console.log(`in mobile: ${isMobile}`);
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/task-pages/tasks.vue');
  }
  return import('@/views/mobile/dashboard-pages/task-pages/tasks.vue');
};

/* Dashboard task feedback entry Page */
const DashboardCompanyDetailPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/task-pages/task-detail.vue');
  }
  return import('@/views/mobile/dashboard-pages/task-pages/task-detail.vue');
};

/* Dashboard task feedback entry Page */
const DashboardReviewPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/reviewer.vue');
  }
  return import('@/views/mobile/dashboard-pages/reviewer.vue');
};

const DashboardAdminPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/admin.vue');
  }
  return import('@/views/mobile/dashboard-pages/admin.vue');
};
const DashboardCompanies = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/companies.vue');
  }
  return import('@/views/desktop/dashboard-pages/companies.vue');
};

const AnalyticDashboardPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/analytics-dashboard.vue');
  }
  return import('@/views/mobile/dashboard-pages/analytics-dashboard.vue');
};
/* Dashboard task feedback entry Page */
const DashboardUserEditPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/user-pages/user-edit.vue');
  }
  return import('@/views/desktop/dashboard-pages/user-pages/user-edit.vue');
};

const DashboardCompanyEditPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/company-pages/company-edit.vue');
  }
  return import('@/views/desktop/dashboard-pages/company-pages/company-edit.vue');
};

/** Download Report Page */
const DashboardReportPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/download-report.vue');
  }
  return import('@/views/desktop/dashboard-pages/download-report.vue');
};

const DashboardAddressPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/address.vue');
  }
  return import('@/views/mobile/dashboard-pages/address.vue');
};

const DashboardCompanyPage = () => {
  if (isMobile) {
    return import('@/views/mobile/dashboard-pages/company-pages/company-detail.vue');
  }
  return import('@/views/mobile/dashboard-pages/company-pages/company-detail.vue');
};

const routes = [
  /* Auth Pages */

  {
    path: '/login',
    name: 'Auth.LoginPage',
    component: LoginPage,
    meta: {
      redirectIfLoggedIn: true,
    },
  },

  {
    path: '/register',
    name: 'Auth.RegisterPage',
    component: RegisterPage,
  },

  /* Root Page */
  {
    path: '/dashboard',
    name: 'DashboardRootPage',
    component: DashboardRootPage,
    meta: {
      requiresAuth: true,
      showHeader: true,
    },
    children: [{
      path: 'tasks',
      name: 'Dashboard.Tasks',
      component: DashboardTasksPage,
      meta: {
        saveScrollPos: true,
        showHeader: true,
      },
    },
    {
      path: 'company/:companyVerticalId',
      name: 'Dashboard.Company.Detail',
      component: DashboardCompanyDetailPage,
      meta: {
        showHeader: true,
        showBack: true,
        title: '',
      },
    },
    {
      path: 'review',
      name: 'Dashboard.Review',
      component: DashboardReviewPage,
      meta: {
        showHeader: true,
      },
    },
    {
      path: 'review/company/:companyVerticalId',
      name: 'Dashboard.Review.Company.Detail',
      component: DashboardCompanyDetailPage,
      meta: {
        showHeader: true,
        showBack: true,
        title: '',
      },
    },
    {
      path: '/dashboard/admin/user/uploadUsers',
      name: 'Dashboard.AddUser',
      component: DashboardAddUserPage,
      meta: {
        showHeader: true,
      },
    },
    {
      path: '/dashboard/admin/user/addNewUser',
      name: 'Dashboard.AddNewUser',
      component: DashboardAddNewUserPage,
      meta: {
        showHeader: true,
      },
    },
    {
      path: '/dashboard/admin/company/addNewCompany',
      name: 'Dashboard.addNewCompany',
      component: DashboardAddNewCompanyPage,
      meta: {
        showHeader: true,
      },
    },
    {
      path: 'admin',
      name: 'Dashboard.Admin',
      component: DashboardAdminPage,
      meta: {
        showHeader: true,
      },
    },
    {
      path: 'companies',
      name: 'Dashboard.Companies',
      component: DashboardCompanies,
      meta: {
        showHeader: true,
      },
    },
    {
      path: 'admin/company/edit/:companyId/:verticalId?',
      name: 'Dashboard.Company.Edit',
      component: DashboardCompanyEditPage,
      meta: {
        showHeader: true,
      },
    },
    {
      path: 'admin/user/edit/:userId?',
      name: 'Dashboard.User.Edit',
      component: DashboardUserEditPage,
      meta: {
        showHeader: true,
      },
    },
    {
      path: 'analytic-dashboard',
      name: 'Dashboard.AnalyticDashboard',
      component: AnalyticDashboardPage,
      meta: {
        showHeader: true,
      },
    },
    {
      path: 'download-report',
      name: 'Dashboard.downloadReport',
      component: DashboardReportPage,
      meta: {
        showHeader: true,
      },
    },
    {
      path: 'address',
      name: 'Dashboard.Address',
      component: DashboardAddressPage,
      meta: {
        showHeader: true,
        showBack: false,
        title: '',
      },
    },
    {
      path: 'company',
      name: 'Dashboard.CompanyDetail',
      component: DashboardCompanyPage,
      meta: {
        showHeader: true,
        showBack: false,
        title: '',
      },
    },
    ],
  },

  /* Not Found Page */
  {
    path: '*',
    name: 'PageNotFound',
    redirect: '/dashboard',
  },
];

export default function createRouter(store) {
  const router = new Router({
    fallback: false,
    scrollBehavior(to, from, savedPosition) {
      if (from.meta.saveScrollPos) {
        store.dispatch('setViewScrollPos', {
          name: from.name,
          coordinates: {
            x: window.scrollX,
            y: window.scrollY,
          },
        });
      }
      if (savedPosition) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        next({
          name: 'Auth.LoginPage',
        });
        // next({
        //   name: 'Auth.RegisterPage',
        // });
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.redirectIfLoggedIn)) {
      if (store.getters.isLoggedIn) {
        next({
          name: 'Dashboard.Tasks',
        });
      } else {
        next();
      }
    } else {
      next();
    }

    try {
      // const pageParamsToTrack = {
      //   from: {
      //     path: from.fullPath,
      //     name: from.name,
      //     params: from.params,
      //     query: from.query,
      //     location: from.path,
      //   },
      //   to: {
      //     path: to.fullPath,
      //     location: to.path,
      //     name: to.name,
      //     params: to.params,
      //     query: to.query,
      //   },
      //   // title: document.title,
      //   // host: document.location.host,
      //   // url: document.location.href,
      //   // hash: document.location.hash || null,
      // };

      // const data = {
      //   type: 'ScreenView',
      //   properties: pageParamsToTrack,
      // };

      // analytics.track(data);
    } catch (e) {
            console.warn(`Error sending 'PageView' event at '${window.location.href}' with error: `, e); // eslint-disable-line
    }
  });

  router.afterEach(() => {
    // store.dispatch('clearViewScrollPos', to.name);
    if (store.state.router.next) store.dispatch('clearNextRoute');
  });

  return router;
}
