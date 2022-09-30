<template>
  <main>
    <div class="container">
      <hero :articles="articles.slice(0, 3)" />

      <div class="row gx-5 gy-3 mt-3">
        <news-grid :articles="articles.slice(2, 14)" />

        <sidebar :articles="articles.slice(2, 12)" />
      </div>

      <h2 class="fs-5">Most read</h2>

      <div class="row g-3 d-block d-sm-flex">
        <div class="col" v-for="(article, i) in articles.slice(0, 5)" :key="i">
          <card :data="article" :showIntro="false" />
        </div>
      </div>

      <h2 class="fs-5">Crypto currency</h2>

      <div class="row g-3 d-block d-sm-flex">
        <div class="col" v-for="(article, i) in articles.slice(5, 10)" :key="i">
          <card :data="article" :showIntro="false" />
        </div>
      </div>

      <h2 class="fs-5">Design</h2>

      <div class="row d-block d-sm-flex">
        <div
          class="col"
          v-for="(article, i) in articles.slice(10, 15)"
          :key="i"
        >
          <card :data="article" :showIntro="false" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  transition: "page",

  computed: {
    articles() {
      return this.$store.state.articles;
    },
  },
};
</script>

<style lang="scss" scoped></style>
