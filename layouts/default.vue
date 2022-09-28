<template>
  <div>
    <navbar />
    <div class="pushdown"></div>

    <Nuxt />

    <Footer />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.pushdown {
  width: 100%;
  height: calc(70px + 3rem);
}
</style>
