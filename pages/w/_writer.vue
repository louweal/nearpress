<template>
  <main>
    <div class="container-xl">
      <div class="row gx-3 gx-lg-5 mt-2 mt-lg-4">
        <div class="col-12 col-md-9">
          <div class="hstack gap-3 mt-2 mb-4">
            <h1>{{ writer.name }}</h1>
            <div
              class="btn btn-sm btn-secondary"
              v-if="$store.state.user"
              @click="updateWriters()"
            >
              {{ following ? "Unfollow" : "Follow" }}
            </div>
          </div>

          <template v-for="(c, i) in writerCategories">
            <h2 class="fs-3 mb-3" :key="'title' + i">
              Publications in
              <nuxt-link :to="'/c/' + c" class="text-secondary">
                {{ categories.find((cat) => cat.slug === c).title }}
              </nuxt-link>
            </h2>

            <post-grid
              class="mb-4"
              :posts="writerPosts.filter((p) => p.category === c)"
              :key="i"
            />
          </template>
        </div>

        <div class="col-md-3 d-none d-md-block" v-if="similarPosts.length > 0">
          <sidebar
            title="Discover also"
            meta="author"
            :posts="
              [...similarPosts]
                .sort((a, b) => (a.views > b.views ? -1 : 1))
                .slice(0, 7)
            "
          />
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
        (a) => a.slug === this.$route.params.writer
      );
    },

    posts() {
      return this.$store.state.posts;
    },

    writerPosts() {
      return this.$store.state.posts.filter((a) => a.author === this.writer.id);
    },

    similarPosts() {
      // same category but not same writer
      return this.posts
        .filter((p) => p.author !== this.writer.id)
        .filter((p) => this.writerCategories.includes(p.category));
    },

    writerCategories() {
      return [...new Set(this.writerPosts.map((p) => p.category))];
    },

    categories() {
      return this.$store.state.categories;
    },

    following() {
      if (this.$store.state.user) {
        return this.$store.state.user.writers.includes(this.writer.id);
      }
      return false;
    },
  },

  methods: {
    updateWriters() {
      if (this.following) {
        this.$store.commit("removeUserWriter", this.writer.id);
      } else {
        this.$store.commit("addUserWriter", this.writer.id);
      }
    },
  },
};
</script>

<style></style>
