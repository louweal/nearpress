<template>
  <div>
    <div class="row gx-3 gx-lg-5">
      <div class="col-12 col-md-6">
        <display-card :article="articles[0]" />
      </div>
      <div class="col-12 col-md-6">
        <display-card :article="articles[1]" class="d-none d-md-block" />
      </div>
    </div>

    <!-- shown on mobile only: -->

    <div class="row gy-0 gx-3 d-sm-none mt-2">
      <div class="col-6" v-for="(article, i) in articles.slice(1, 3)" :key="i">
        <card :article="article" :flex="false" :borderTop="false" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: [Object, Array],
      default: () => {},
    },
  },
};
</script>

<style></style>
