<template>
  <div class="col-12 col-md-9">
    <div class="row g-0 gx-md-2 gx-lg-4 gy-lg-2">
      <div class="col-12 col-md-4" v-for="(article, i) in articles" :key="i">
        <card :article="article" :borderTop="i !== 0" />
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
