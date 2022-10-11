<template>
  <main>
    <div class="container-xl">
      <div class="hstack gap-3 mt-2">
        <h1>{{ writer.name }}</h1>
        <div
          class="btn btn-sm btn-secondary d-md-none"
          @click="updateWriters()"
        >
          {{ following ? "Unfollow" : "Follow" }}
        </div>
      </div>
      <span class="d-md-none">{{ posts.length }} articles</span>

      <div class="row gx-3 gx-lg-5 mt-2 mt-lg-4">
        <div class="col-12 col-md-9">
          <news-grid :posts="posts" />
        </div>

        <div class="col-md-3 d-none d-md-block">
          <img
            :src="`${require('@/images/authors/' +
              writer.gender +
              '/' +
              writer.avatar +
              '.jpg')}`"
            :alt="writer.name"
            class="rounded-circle"
            width="100"
          />
          <h2>{{ writer.name }}</h2>
          <p>{{ posts.length }} articles</p>

          <div class="btn btn-sm btn-secondary" @click="updateWriters()">
            {{ following ? "Unfollow" : "Follow" }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    writer() {
      return this.$store.state.writers.find(
        (a) => a.slug === this.$route.params.slug
      );
    },

    posts() {
      return this.$store.state.posts.filter((a) => a.author === this.writer.id);
    },

    following() {
      return this.$store.state.user.writers.includes(this.writer.id);
    },
  },

  methods: {
    updateWriters() {
      if (this.following) {
        this.$store.commit("removeWriter", this.writer.id);
      } else {
        this.$store.commit("addWriter", this.writer.id);
      }
    },
  },
};
</script>

<style></style>
