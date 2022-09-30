<template>
  <div>
    <div class="row gx-3 gx-md-5">
      <div
        class="col-12 col-md-6"
        v-for="(article, i) in articles.slice(0, 2)"
        :key="i"
      >
        <display-card
          :data="article"
          :class="i > 0 ? 'd-none d-sm-block' : false"
        />
      </div>
    </div>

    <!-- shown on mobile only: -->

    <div class="row g-3 d-sm-none mt-2">
      <div class="col-6" v-for="(article, i) in articles.slice(1, 3)" :key="i">
        <card :data="article" :flex="false" :borderTop="false" />
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
