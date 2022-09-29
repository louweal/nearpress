<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1">
        <!-- <div
          class="article-img ratio ratio-16x9 rounded mb-2"
          :style="{
            backgroundImage: visual,
          }"
        ></div> -->

        <img :src="visual" alt="" />
      </div>

      <div class="col-12 col-md-8 offset-md-2">
        <h1>{{ article.title }}</h1>

        {{ article.intro }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: "page",

  computed: {
    articles() {
      return this.$store.state.articles;
    },
    article() {
      return this.articles.find((a) => a.slug === this.$route.params.slug);
    },

    visual() {
      let img = null;
      try {
        img = require("@/images/" + this.article.visual + ".webp");
      } catch {
        img = require("@/images/" + this.article.visual + ".jpg");
      }
      return `url(${img})`;
    },
  },
};
</script>

<style lang="scss" scoped>
.article-img {
  width: 100%;
  height: auto;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-size 0.3s 0.15s cubic-bezier(0.2, 0, 0.1, 1);
  background-size: 115%;
}
</style>
