<template>
  <main>
    <div class="container-xl">
      <category-list :categories="categories" />

      <hero :posts="feed.slice(0, 3)" v-if="feed.length > 3" />

      <div class="row gx-3 gx-lg-5 mt-sm-3 mt-lg-5">
        <div class="col-12 col-md-9">
          <post-grid
            :posts="
              feed.length > 3
                ? feed.slice(2, feedMax + 1)
                : feed.slice(0, feedMax)
            "
            :hide-first-post="feed.length > 3 ? 'mobile' : false"
          />

          <div class="text-center mt-4" v-if="feed.length > feedMax">
            <div class="btn btn-secondary" @click="feedMax += 9">Load more</div>
          </div>
        </div>

        <div class="col-md-3 d-none d-md-block">
          <sidebar
            title="Recent articles"
            :posts="
              [...posts].sort((a, b) => (a.date > b.date ? -1 : 1)).slice(0, 10)
            "
          />
        </div>
      </div>

      <template v-if="highlightedPosts.length > 0">
        <h2 class="fs-5 mt-3 mt-4">
          <nuxt-link :to="'/c/' + highlightedCategory.slug">
            {{ highlightedCategory.title }}
            <i class="bi bi-arrow-right"></i>
          </nuxt-link>
        </h2>

        <div class="row gy-0 gx-3 pt-md-1 mb-lg-4">
          <div
            class="col-12 col-md"
            v-for="(post, i) in highlightedPosts"
            :key="i"
          >
            <card
              :post="post"
              :showIntro="false"
              :borderTop="i !== 0"
              :blurb="false"
            />
          </div>
          <template v-for="i in [1, 2, 3, 4]">
            <div
              class="col-12 col-md"
              v-if="highlightedPosts.length <= i"
              :key="i"
            ></div>
          </template>
        </div>
      </template>

      <template v-if="freePosts.length > 0">
        <h2 class="fs-5 mt-3 mt-4">Read for free</h2>

        <div class="row gy-0 gx-3 pt-md-1 mb-lg-4">
          <div class="col-12 col-md" v-for="(post, i) in freePosts" :key="i">
            <card
              :post="post"
              :showIntro="false"
              :borderTop="i !== 0"
              :blurb="false"
            />
          </div>
          <template v-for="i in [1, 2, 3, 4]">
            <div
              class="col-12 col-md"
              v-if="highlightedPosts.length <= i"
              :key="i"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      feedMax: 19,
    };
  },

  computed: {
    posts() {
      return this.$store.state.posts; // all posts
    },

    freePosts() {
      return [...this.posts]
        .filter((a) => a.price === 0)
        .sort((a, b) => (a.date > b.date ? -1 : 1))
        .slice(0, 5);
    },

    highlightedCategory() {
      return this.categories[
        Math.floor(Math.random() * this.categories.length)
      ];
    },

    highlightedPosts() {
      return [...this.posts]
        .filter((a) => a.category === this.highlightedCategory.slug)
        .sort((a, b) => (a.date > b.date ? -1 : 1))
        .slice(0, 5);
    },

    categories() {
      return this.$store.state.categories;
    },

    feed() {
      return [...this.posts].sort((a, b) => (a.views > b.views ? -1 : 1));
    },
  },

  methods: {
    loadMore() {
      this.feedMax += 9;
    },
  },
};
</script>
