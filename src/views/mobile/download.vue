<template>
  <section class="dashboard-download-page">
    <section v-show="!this.$route.query.skipToDownload || showInstructions">
      <img class="centered tophead1 fluid ui" src="/img/download-page/tophead.png">
      <div v-show="!this.$route.query.skipToDownload" id="banner">
        <a
          id="android-app-download-link"
          ref="android-app-download-link"
          href="https://ohimediaservice.blob.core.windows.net/ohi/GenpactOhi.apk"
          data-type="android-app-download"
          data-device="android"
          title="Download Android App"
          download
          @click="trackDownload"
        >
          <img class="ui fluid centered small image" src="/img/download-page/android.png">
        </a>
        <a
          id="ios-app-download-link"
          ref="ios-app-download-link"
          href="itms-services://?action=download-manifest&url=https://ohi.genpact.com/GenpactOhi.plist"
          data-type="ios-app-download"
          data-device="iOS"
          title="Download iOS App"
          @click="trackDownload"
        >
          <img class="ui fluid centered small image" src="/img/download-page/ios.png">
        </a>
      </div>
      <div class="px-8">
        <ul class="stepsui list-reset">
          <li>
            <h3 class="my-2">
              Steps for Android devices
            </h3>
            <ol class="ui ordered list pl-4">
              <li>
                <span> Click on the Android icon to download the app</span>
              </li>
              <li>
                <span> Enable 'App install' option</span>
              </li>
              <li>
                <span>Open Security in <b>Settings</b> -> <b>Security</b> </span>
              </li>
              <li>
                <span>Enable ‘App install’ from ‘Unknown sources’</span>
              </li>
              <li>
                <span>Install the Apna Ad Lgao app</span>
              </li>
            </ol>
          </li>
          <li>
            <h3 class="my-2 mt-5">
              Steps for iOS devices
            </h3>
            <ol class="ui ordered list pl-4">
              <li>
                <span> Click on the iOS icon to install the app</span>
              </li>
              <li>
                <span> Go to General in <b>Settings</b> -> <b>General</b></span>
              </li>
              <li>
                <span> Click on <b>Device Management</b></span>
              </li>
              <li>
                <span> Click on <b>'Genpact India Pvt Ltd'</b></span>
              </li>
              <li>
                <span> Click to 'Trust Genpact India Pvt Ltd'</span>
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <router-link class="bg-brand-color block font-bold mx-auto my-4 no-underline px-4 py-3 rounded router-link-active text-white w-5/6 text-center" to="/">
        You can also access Pulse on Mobile here
      </router-link>

      <p class="leading-normal mb-5 px-6 text-center text-gray-600 text-xs">
        Downloading the app on your mobile is completely optional.
        The app will give you access to important Genpact updates, news, and frequently-used tools on your mobile.
      </p>
    </section>

    <section v-if="this.$route.query.skipToDownload && !showInstructions" class="flex flex-col h-screen items-center justify-center px-4 text-center">
      <img class="mb-5 block mx-auto loading-img" src="/img/loader.gif" width="40" alt="Loader Gif">
      <h1 class="text-xl m-2 mt-3">
        Preparing download of the app
      </h1>
      <p class="mb-20 pb-16">
        Please be patient...
      </p>
    </section>
  </section>
</template>

<script>
import {
  isIOS,
  isAndroid,
  isMobile,
} from 'mobile-device-detect';
import buildAnchorData from '@/analytics/build-anchor-event-data';

export default {
  name: 'Download',
  data() {
    return {
      showInstructions: false,
    };
  },
  mounted() {
    const showInstructions = () => {
      setTimeout(() => {
        this.showInstructions = true;
      }, 5000);
    };

    if (isMobile && this.$route.query.skipToDownload && isIOS) {
      this.$refs['ios-app-download-link'].click();
      showInstructions();
    } else if (isMobile && this.$route.query.skipToDownload && isAndroid) {
      this.$refs['android-app-download-link'].click();
      showInstructions();
    }
  },
  methods: {
    trackDownload(event) {
      const target = event.currentTarget;
      const { device } = target.dataset;
      buildAnchorData({
        event,
        name: 'Download',
        action: this.$route.query.skipToDownload ? 'auto-trigger' : 'click',
        properties: { targetPlatform: device },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  /* .left {
    float: left;
  }

  .right {
    float: right;
  }

  .app-icon {
    width: 20%;
    height: 30%;
    margin: 13%;
  }

  .inline-block {
    display: inline-block;
  }

  .img-head {
    align-items: center;
    align-self: center;
    width: 40%;
    margin-left: 25%;
    margin-right: 25%;
    padding: 5%;
  }

  .screenshot-image {
    width: 200px;
  }

  .column {
    float: left;
    width: 33.33%;
    padding: 5px;
  }

  /* Clear floats after image containers */
  .row::after {
    content: "";
    clear: both;
    display: table;
  }

  .image-r {
    width: 80%;
    margin: 5%;
  }

  .pwa-img {
    align-items: center;
    align-self: center;
    width: 30%;
    margin-left: 25%;
    padding-left: 10%;
    padding-right: 10%;
  }

  #over {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  img.centered.tophead1.fluid.ui {
    width: 100%;
  }

  div#banner {
    width: 85%;
    background-color: #fff;
    box-shadow: 1px 1px 8px #888888;
    margin-top: -45px !important;
    position: relative;
    margin: 0 auto;
    height: 165px;
    margin-bottom: 30px;
    border-top: 6px solid #009fbf;
    display: flex;
    justify-content: center;
  }

  img {
    border-style: none;
    width: 100%;
  }

  div#banner img {
    padding: 20px;
  }

  ul.stepsui h3 {
    color: #042852;
  }

  ul.stepsui h3 {
    color: #042852;
  }

  ul li {
    margin: 7px 0;
  }

  .loading-img {
    width: 40px;
  }
</style>

