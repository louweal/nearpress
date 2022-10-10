<template>
  <main>
    <div class="container-xl">
      <ChannelList
        :channels="userChannels.length > 0 ? userChannels : $options.channels"
      />

      <hero :articles="recentArticles.slice(0, 3)" />

      <div class="row gx-3 gx-lg-5 mt-sm-3 mt-lg-5">
        <div class="col-12 col-md-9">
          <news-grid :articles="recentArticles.slice(2, 35)" />
        </div>

        <div class="col-md-3 d-none d-md-block">
          <sidebar :articles="articles.slice(0, 10)" />
        </div>
      </div>

      <div class="d-md-none">
        <h2 class="fs-5">Most read</h2>

        <div class="row gy-0 gx-3 pt-1">
          <div
            class="col-12 col-md"
            v-for="(article, i) in [...articles]
              .sort((a, b) => (a.views > b.views ? -1 : 1))
              .slice(0, 10)"
            :key="i"
          >
            <card :article="article" :showIntro="false" :borderTop="i !== 0" />
          </div>
        </div>
      </div>
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
      if (this.$store.state.user && this.userChannels.length > 0) {
        return this.userArticles;
      }
      return this.$store.state.articles; // all articles
    },

    userChannels() {
      if (this.$store.state.user) {
        return this.$options.channels.filter((c) =>
          this.$store.state.user.channels.includes(c.slug)
        );
      }
      return [];
    },

    userArticles() {
      if (this.$store.state.user && this.userChannels.length > 0) {
        return this.$store.state.articles.filter((a) =>
          this.$store.state.user.channels.includes(a.channel)
        );
      }
      return "Error";
    },

    recentArticles() {
      if (this.$store.state.user && this.userChannels.length > 0) {
        return [...this.userArticles].sort((a, b) =>
          a.date > b.date ? -1 : 1
        );
      }
      return [...this.articles].sort((a, b) => (a.date > b.date ? -1 : 1));
    },
  },
};
</script>

<style lang="scss" scoped></style>
