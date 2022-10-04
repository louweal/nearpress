<template>
  <div class="col-12 col-md-9">
    <div class="row g-0 gx-md-2 gx-lg-4 gy-lg-2">
      <div class="col-12 col-md-4" v-for="(article, i) in articles" :key="i">
        <card
          :data="article"
          :borderTop="i === 1 ? false : true"
          :class="i === 0 ? 'd-none d-sm-block' : false"
        />
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
