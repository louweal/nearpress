<template>
  <main>
    <div class="container-xl">
      <category-list
        :categories="
          userCategories.length > 0 ? userCategories : $options.categories
        "
      />

      <!-- {{ userWriters }} -->

      <hero :posts="feed.slice(0, 3)" />

      <div class="row gx-3 gx-lg-5 mt-sm-3 mt-lg-5">
        <div class="col-12 col-md-9">
          <news-grid :posts="feed.slice(2, 11)" hide-first-post="mobile" />
        </div>

        <div class="col-md-3 d-none d-md-block">
          <sidebar
            :posts="
              [...posts]
                .sort((a, b) => (a.views > b.views ? -1 : 1))
                .slice(0, 10)
            "
          />
        </div>
      </div>

      <div class="d-md-none">
        <h2 class="fs-5">Most read</h2>

        <div class="row gy-0 gx-3 pt-1">
          <div
            class="col-12 col-md"
            v-for="(post, i) in [...posts]
              .sort((a, b) => (a.views > b.views ? -1 : 1))
              .slice(0, 10)"
            :key="i"
          >
            <card :post="post" :showIntro="false" :borderTop="i !== 0" />
          </div>
        </div>
      </div>

      <template v-for="(c, i) in userCategories">
        <div
          class="mt-3"
          v-if="posts.filter((a) => a.category === c.slug).length > 0"
          :key="i"
        >
          <h2 class="fs-5">
            <nuxt-link :to="'/c/' + c.slug">
              {{ c.title }}
              <i class="bi bi-arrow-right"></i>
            </nuxt-link>
          </h2>

          <div class="row gy-0 gx-3 pt-1">
            <div
              class="col-12 col-md"
              v-for="(post, i) in [...posts]
                .filter((a) => a.category === c.slug)
                .sort((a, b) => (a.date > b.date ? -1 : 1))
                .slice(0, 5)"
              :key="i"
            >
              <card :post="post" :showIntro="false" :borderTop="i !== 0" />
            </div>
          </div>
        </div>
      </template>

      <div class="row gx-3 gx-lg-5 mt-sm-3 mt-lg-5">
        <div class="col-12 col-md-9">
          <news-grid :posts="feed.slice(11)" />
        </div>

        <div
          class="col-md-3 d-none d-md-block"
          v-if="feed.slice(11).length > 6"
        >
          <sidebar
            title="Recent articles"
            :posts="
              [...posts].sort((a, b) => (a.date > b.date ? -1 : 1)).slice(0, 10)
            "
          />
          <!-- <sidebar :posts="posts.slice(0, 10)" /> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  transition: "page",

  computed: {
    posts() {
      return this.$store.state.posts; // all posts
    },

    feed() {
      if (this.$store.state.user && this.userWriters.length > 0) {
        return [...this.posts]
          .filter((a) => this.$store.state.user.writers.includes(a.author))
          .sort((a, b) => (a.date > b.date ? -1 : 1)); // move somewhere else!
      }
      return [...this.posts].sort((a, b) => (a.date > b.date ? -1 : 1));
    },

    userWriters() {
      if (this.$store.state.user) {
        return this.$store.state.writers.filter((w) =>
          this.$store.state.user.writers.includes(w.id)
        );
      }
      return [];
    },

    userCategories() {
      if (this.$store.state.user) {
        return this.$store.state.categories.filter((c) =>
          this.$store.state.user.categories.includes(c.slug)
        );
      }
      return [];
    },
  },
};
</script>

<style lang="scss" scoped></style>
