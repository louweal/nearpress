<template>
  <main>
    <div class="container">
      <div class="row g-3 g-md-5">
        <div
          class="col-12 col-md-6"
          v-for="(article, i) in articles.slice(0, 2)"
          :key="i"
        >
          <display-card :data="article" />
        </div>
      </div>

      <div class="row gx-5 mt-4">
        <div class="col-12 col-md-9">
          <div class="row">
            <div
              class="col-12 col-md-4"
              v-for="(article, i) in articles.slice(2, 11)"
              :key="i"
            >
              <card :data="article" />
            </div>
          </div>
        </div>

        <div class="col-12 col-md-3">
          <div class="bg-white rounded py-3 px-2">
            <h2 class="fs-5">Recently published</h2>
          </div>
        </div>
      </div>

      <h2 class="fs-5">Most read</h2>

      <div class="row">
        <div
          class="col-12 col-md-2"
          v-for="(article, i) in articles.slice(0, 6)"
          :key="i"
        >
          <card :data="article" :showIntro="false" />
        </div>
      </div>

      <div class="row gx-5">
        <h2 class="fs-5">Crypto currency</h2>
      </div>

      <div class="row gx-5">
        <h2 class="fs-5">Design</h2>
      </div>
    </div>
  </main>
</template>

<script>
import { randomArticles } from "@/utils/randomArticles.js";

export default {
  name: "Main",

  data() {
    return {
      articles: () => [],
    };
  },

  transition: "page",

  async created() {
    this.articles = randomArticles(13);
  },
};
</script>

<style lang="scss" scoped></style>
