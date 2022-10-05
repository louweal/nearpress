<template>
  <div class="container-lg">
    <div class="d-flex justify-content-between">
      <!-- <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
          <li class="breadcrumb-item active" aria-current="page">
            <b>{{ channel.title }}</b>
          </li>
        </ol>
      </nav> -->

      <div>
        <h1>{{ channel.title }}</h1>
      </div>

      <i
        class="bi bi-bookmark-heart-fill fs-4 color-secondary cursor-pointer bi--active"
      ></i>
    </div>

    <div class="row gx-3 gx-lg-5 mt-3 mt-lg-5">
      <news-grid :articles="channelArticles.slice(0, 30)" />

      <div class="col-md-3">
        Articles
        <span class="fs-1">
          {{ channelArticles.length }}
        </span>

        Authors

        <span class="fs-1">
          {{ [...new Set(channelArticles.map((a) => a.author))].length }}
        </span>

        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>

        <h2>Top writers</h2>

        <ul>
          <li>todo</li>
        </ul>
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
