<template>
  <div class="container-lg">
    <div class="hstack gap-3 mt-2">
      <h1>{{ channel.title }}</h1>
      <div class="btn btn-sm btn-secondary" @click="updateUserChannels()">
        {{ following ? "Unfollow" : "Follow" }}
      </div>
    </div>

    <div class="row gx-3 gx-lg-5 mt-2 mt-lg-4">
      <div class="col-12 col-md-9">
        <news-grid :articles="channelArticles.slice(0, 30)" />
      </div>

      <div class="col-md-3 d-none d-md-block">
        <sidebar
          :articles="
            [...articles]
              .sort((a, b) => (a.views > b.views ? -1 : 1))
              .slice(0, 7)
          "
        />

        <h2 class="fs-5 mt-4">Explore channels</h2>

        <ul class="list-inline">
          <li
            v-for="(c, i) in otherChannels"
            :key="i"
            class="mb-2 me-2 list-inline-item"
          >
            <nuxt-link :to="'/c/' + c.slug" class="btn btn-sm btn-secondary">
              {{ c.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- <div class="col-md-3 d-none d-md-block">
        Articles
        <span class="display-6 text-muted">
          {{ channelArticles.length }}
        </span>

        Authors

        <span class="display-6 text-muted">
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

        <h2 class="fs-5">Top writers</h2>

        <ul>
          <li>todo</li>
        </ul>

        <h2 class="fs-5">Other channels</h2>

        <ul class="list-inline">
          <li
            v-for="(c, i) in otherChannels"
            :key="i"
            class="mb-2 me-2 list-inline-item"
          >
            <nuxt-link :to="'/c/' + c.slug" class="btn btn-sm btn-secondary">
              {{ c.title }}
            </nuxt-link>
          </li>
        </ul>
      </div> -->
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

    userChannels() {
      if (this.$store.state.user) {
        return this.$store.state.user.channels;
      }
      return [];
    },

    otherChannels() {
      return this.$options.channels.filter((c) => c.slug !== this.channel.slug);
    },

    following() {
      return this.userChannels.includes(this.channel.slug);
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

    updateUserChannels() {
      if (this.following) {
        this.$store.commit("removeUserChannel", this.channel.slug);
      } else {
        this.$store.commit("addUserChannel", this.channel.slug);
      }
    },
  },
};
</script>
