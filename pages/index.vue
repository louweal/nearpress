<template>
  <main>
    <div class="container">
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
        <div
          class="col-6"
          v-for="(article, i) in articles.slice(1, 3)"
          :key="i"
        >
          <card :data="article" :flex="false" :borderTop="false" />
        </div>
      </div>

      <div class="row gx-5 gy-3 mt-3">
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
          <!-- <sticky> -->
          <div class="border bg-white shadow-sm rounded py-3 xxxpe-0 px-3">
            <h2 class="fs-3">Recently published</h2>

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
          <!-- </sticky> -->
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
export default {
  name: "Main",

  transition: "page",

  computed: {
    articles() {
      return this.$store.state.articles;
    },
  },
};
</script>

<style lang="scss" scoped></style>
