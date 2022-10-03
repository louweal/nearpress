<template>
  <main>
    <div class="container-xl">
      <hero :articles="articles.slice(0, 3)" />

      <div class="row gx-3 gx-lg-5 mt-3 mt-lg-5">
        <news-grid :articles="articles.slice(2, 14)" />

        <sidebar
          :articles="
            [...articles]
              .sort((a, b) => (a.date > b.date ? -1 : 1))
              .slice(0, 10)
          "
        />
      </div>

      <!-- <div class="d-flex"> -->

      <h2 class="fs-5">Most read</h2>

      <!-- </div> -->

      <div class="row gy-0 gx-3 pt-1">
        <div
          class="col-12 col-md"
          v-for="(article, i) in articles.slice(14, 19)"
          :key="i"
        >
          <card :data="article" :showIntro="false" />
        </div>
      </div>

      <template v-for="(c, i) in $options.channels.filter((c) => c.selected)">
        <h2 class="fs-5" :key="'title ' + i">
          <nuxt-link :to="'/c/' + c.slug">
            {{ c.title }} <i class="bi bi-arrow-right"></i>
          </nuxt-link>
        </h2>

        <div class="row g-3 pt-1" :key="i">
          <div
            class="col-12 col-md"
            v-for="(article, i) in articles
              .filter((a) => a.channel === c.slug)
              .slice(0, 5)"
            :key="i"
          >
            <card :data="article" :showIntro="false" />
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import channels from "@/data/channels.json";

export default {
  transition: "page",

  channels,

  computed: {
    articles() {
      if (this.$store.state.user) {
        return this.$store.state.articles.filter((a) =>
          this.$store.state.user.channels.includes(a.channel)
        );
      }
      return this.$store.state.articles; // all articles
    },
  },
};
</script>

<style lang="scss" scoped></style>
