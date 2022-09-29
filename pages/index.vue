<template>
  <main>
    <div class="container">
      <div class="row g-3 g-md-5">
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

      <div class="row g-3 g-md-5 d-sm-none">
        <div
          class="col-6"
          v-for="(article, i) in articles.slice(1, 3)"
          :key="i"
        >
          <card :data="article" :flex="false" :borderTop="false" />
        </div>
      </div>

      <div class="row g-5 mt-1 mt-md-4">
        <div class="col-12 col-md-9">
          <div class="row">
            <div
              class="col-12 col-md-4"
              v-for="(article, i) in articles.slice(2, 14)"
              :key="i"
            >
              <card
                :data="article"
                :borderTop="i === 1 ? false : true"
                :class="i === 0 ? 'd-none d-sm-block' : false"
              />
            </div>
          </div>
        </div>

        <div class="col-12 col-md-3 d-none d-sm-block">
          <sticky>
            <div class="border xxxbg-white shadow-sm rounded py-3 pe-0 px-3">
              <h2 class="fs-5">Recently published</h2>

              <div
                class=""
                v-for="(article, i) in articles.slice(2, 12)"
                :key="i"
              >
                <nuxt-link
                  :to="article.slug"
                  class="d-block w-100"
                  :class="i !== 9 ? 'border-bottom' : false"
                >
                  <small class="text-muted fw-bold"
                    >{{ article.date.H }}:{{ article.date.m }}
                  </small>
                  <h3 class="fs-6 fw-light">{{ article.title }}</h3>
                </nuxt-link>
              </div>
            </div>
          </sticky>
        </div>
      </div>

      <h2 class="fs-5">Most read</h2>

      <div class="row g-1">
        <div
          class="col-12 col-md-2"
          v-for="(article, i) in articles.slice(0, 6)"
          :key="i"
        >
          <card :data="article" :showIntro="false" />
        </div>
      </div>

      <h2 class="fs-5">Crypto currency</h2>

      <div class="row">
        <div
          class="col-12 col-md-2"
          v-for="(article, i) in articles.slice(7, 13)"
          :key="i"
        >
          <card :data="article" :showIntro="false" />
        </div>
      </div>

      <h2 class="fs-5">Design</h2>

      <div class="row">
        <div
          class="col-12 col-md-2"
          v-for="(article, i) in articles.slice(14, 20)"
          :key="i"
        >
          <card :data="article" :showIntro="false" />
        </div>
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
    this.articles = randomArticles(30);
  },
};
</script>

<style lang="scss" scoped></style>
