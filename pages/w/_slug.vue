<template>
  <main>
    <div class="container-lg">
      <div class="hstack gap-3 mt-2">
        <h1>{{ author.name }}</h1>
        <div
          class="btn btn-sm btn-secondary d-md-none"
          xxxclick="updateUserChannels()"
        >
          follooowww
          <!-- {{ following ? "Unfollow" : "Follow" }} -->
        </div>
      </div>
      <span class="d-md-none">xxx followers</span>

      <div class="row gx-3 gx-lg-5 mt-2 mt-lg-4">
        <div class="col-12 col-md-9">
          <news-grid :articles="articles" />
        </div>

        <div class="col-md-3 d-none d-md-block">
          <img
            :src="`${require('@/images/authors/' +
              author.gender +
              '/' +
              author.avatar +
              '.jpg')}`"
            :alt="author.name"
            class="rounded-circle"
            width="100"
          />
          <h2>{{ author.name }}</h2>
          <p>xxx followers</p>

          <div class="btn btn-sm btn-secondary" xxxclick="updateUserChannels()">
            follooowww
            <!-- {{ following ? "Unfollow" : "Follow" }} -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    author() {
      return this.$store.state.authors.find(
        (a) => a.slug === this.$route.params.slug
      );
    },

    articles() {
      return this.$store.state.articles.filter(
        (a) => a.author === this.author.id
      );
    },
  },
};
</script>

<style></style>
