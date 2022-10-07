<template>
  <div class="col-md-3 d-none d-md-block">
    <div class="border bg-white shadow-sm rounded py-3 px-3">
      <h2 class="fs-5">Most read</h2>

      <div
        class=""
        v-for="(article, i) in [...articles].sort((a, b) =>
          a.views > b.views ? -1 : 1
        )"
        :key="i"
      >
        <news-item :article="article" :class="i !== 0 ? 'border-top' : false" />
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
