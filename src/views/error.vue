<template>
  <section class="dashboard-error-page h-screen text-center flex flex-col justify-center items-center">
    <h1 class="text-xl font-bold mt-3 leading-loose">
      Genpact Pulse is only available for mobile devices.
    </h1>
    <p class="mb-32">
      Please download and install the app from Apple App Store.
    </p>
  </section>
</template>

<script>
export default {
  name: 'Error',
};
</script>

<style lang="scss" scoped>
.instructions-section {
  max-width: 700px;
}
</style>
