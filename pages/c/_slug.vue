<template>
  <div class="container-lg">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ channel.title }}
        </li>
      </ol>
    </nav>

    <hero :articles="channelArticles.slice(0, 3)" />

    <div class="row gx-5 gy-3 mt-3">
      <news-grid :articles="channelArticles.slice(2, 14)" />

      <sidebar
        :articles="
          channelArticles
            .sort((a, b) => (a.date > b.date ? -1 : 1))
            .slice(2, 12)
        "
      />
    </div>

    <h2 class="fs-5">Recently published</h2>

    <div class="row g-3">
      <div
        class="col-12 col-md"
        v-for="(article, i) in [...articles]
          .sort((a, b) => (a.date > b.date ? -1 : 1))
          .slice(0, 5)"
        :key="i"
      >
        <card :data="article" :showIntro="false" />
      </div>
    </div>

    <h2 class="fs-5">Most read</h2>

    <div class="row g-3">
      <div
        class="col-12 col-md"
        v-for="(article, i) in articles.slice(0, 5)"
        :key="i"
      >
        <card :data="article" :showIntro="false" />
      </div>
    </div>
  </div>
</template>

<script>
import channels from "@/data/channels.json";

export default {
  transition: "page",
  channels,

  async mounted() {
    await this.validatePage();
  },

  computed: {
    articles() {
      return this.$store.state.articles;
    },

    channelArticles() {
      return this.$store.state.articles.filter(
        (a) => a.channel === this.$route.params.slug
      );
    },

    channel() {
      return this.$options.channels.find(
        (c) => c.slug === this.$route.params.slug
      );
    },
  },

  methods: {
    validatePage() {
      if (!this.channel) {
        this.$nuxt.error({
          statusCode: 404,
          message: "Channel not found",
        });
      }
    },
  },
};
</script>

<style></style>
