<template>
  <div class="container-lg">
    <div class="d-flex justify-content-between">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ channel.title }}
          </li>
        </ol>
      </nav>

      <i
        class="bi bi-bookmark-heart-fill fs-4 color-secondary cursor-pointer bi--active"
      ></i>
    </div>

    <hero :articles="channelArticles.slice(0, 3)" />

    <div class="row g-0 gx-lg-4 gy-lg-2">
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

    <div class="row gy-0 gx-3 pt-1">
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

    <div class="row gy-0 gx-3 pt-1">
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
