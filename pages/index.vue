<template>
  <main>
    <div class="container-xl">
      <category-list :categories="categories" />

      <hero :posts="feed.slice(0, 3)" v-if="feed.length > 3" />

      <div class="row gx-3 gx-lg-5 mt-sm-3 mt-lg-5">
        <div class="col-12 col-md-9">
          <div v-if="feed.length === 0 && signedIn" class="text-center">
            <h1 class="fs-3">
              Welcome,
              <nuxt-link to="/account" class="text-secondary">{{
                $store.state.user.name
              }}</nuxt-link
              >!
            </h1>
            <p>
              This is your feed. Please start following your favorite writers.
            </p>

            <nuxt-link to="/search" class="btn btn-secondary">
              Discover writers <i class="bi bi-arrow-right"></i>
            </nuxt-link>
          </div>

          <post-grid
            :posts="feed.length > 3 ? feed.slice(2, 11) : feed.slice(0, 10)"
            :hide-first-post="feed.length > 3 ? 'mobile' : false"
          />
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
              <card
                :post="post"
                :showIntro="false"
                :borderTop="i !== 0"
                :blurb="false"
              />
            </div>
          </div>
        </div>
      </template>

      <div v-if="userCategories.length === 0" class="mb-2 mt-3 mt-lg-5">
        <p v-if="signedIn">You can also subscribe to your favorite channels.</p>

        <div class="row g-0 g-lg-5 xxxgy-lg-0 pt-1">
          <hr class="mb-0 d-md-none" />

          <div
            class="col-12 col-md-4 col-lg-3 xxxcol-lg"
            v-for="(c, i) in categories"
            :key="i"
          >
            <category-card :category="c" :borderTop="i !== 0" />
          </div>
          <hr class="mb-0 d-md-none" />
        </div>
      </div>

      <div class="row gx-3 gx-lg-5 mt-sm-3 mt-lg-5" v-if="feed.length >= 11">
        <div class="col-12 col-md-9">
          <post-grid
            :posts="feed.slice(11, 11 + feedMax)"
            hide-first-post="mobile"
          />

          <div class="text-center mt-4" v-if="feed.length > feedMax">
            <div class="btn btn-secondary" @click="feedMax += 9">Load more</div>
          </div>
        </div>
        <div
          class="col-md-3 d-none d-md-block"
          v-if="feed.slice(11).length > 6"
        >
          <sidebar
            :posts="
              [...posts]
                .sort((a, b) => (a.views > b.views ? -1 : 1))
                .slice(0, 10)
            "
          />
        </div>
      </div>

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
        </div>
      </template>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      feedMax: 12,
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

    categories() {
      return this.$store.state.categories;
    },

    feed() {
      if (this.$store.state.user && this.userWriters.length === 0) {
        return [];
      }
      if (this.$store.state.user && this.userWriters.length > 0) {
        return [...this.posts]
          .filter((a) => this.$store.state.user.writers.includes(a.author))
          .sort((a, b) => (a.date > b.date ? -1 : 1));
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

    signedIn() {
      return this.$store.state.user ? true : false;
    },
  },

  methods: {
    loadMore() {
      this.feedMax += 9;
    },
  },
};
</script>
