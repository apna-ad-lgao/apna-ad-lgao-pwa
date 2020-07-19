<template>
    <div class="bg-dark-gray-800 text-white p-3 text-sm">
        <div class="container mx-auto">
            <div class="sm:grid sm:grid-cols-2 sm:gap-1">
                <div>© Copyright 2020 C1 India - All Rights Reserved</div>
                <ul class="flex sm:justify-end mt-1 sm:mt-0">
                    <li class="px-2 pl-0"><a href="javascript:void(0);">Terms</a></li>
                    <li>|</li>
                    <li class="px-2 pr-0"><a href="javascript:void(0);">Privacy</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'dashboardBanner',
  data() {
    return {
      isApp: process.env.VUE_APP_RUN_ENV === 'app',
    };
  },
};
</script>
