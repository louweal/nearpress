<template>
  <div class="container-xl">
    <div class="hstack gap-3 mt-2">
      <h1>{{ category.title }}</h1>
      <div
        class="btn btn-sm btn-secondary"
        @click="updateUserCategories()"
        v-if="$store.state.user"
      >
        {{ following ? "Unsubsribe" : "Subscribe" }}
      </div>
    </div>

    <div class="row gx-3 gx-lg-5 mt-2 mt-lg-4">
      <div class="col-12 col-md-9">
        <post-grid
          :posts="
            categoryPosts
              .sort((a, b) => (a.views > b.views ? -1 : 1))
              .slice(0, 30)
          "
        />
      </div>

      <div class="col-md-3 d-none d-md-block" v-if="categoryPosts.length > 0">
        <sidebar
          title="Recently published"
          :posts="
            [...categoryPosts]
              .sort((a, b) => (a.date > b.date ? -1 : 1))
              .slice(0, 9)
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.validatePage();
  },

  computed: {
    posts() {
      return this.$store.state.posts;
    },

    categoryPosts() {
      return this.$store.state.posts.filter(
        (a) => a.category === this.$route.params.category
      );
    },

    categories() {
      return this.$store.state.categories;
    },

    category() {
      return this.categories.find(
        (c) => c.slug === this.$route.params.category
      );
    },

    userCategories() {
      if (this.$store.state.user) {
        return this.$store.state.user.categories;
      }
      return [];
    },

    otherCategories() {
      return this.categories.filter((c) => c.slug !== this.category.slug);
    },

    following() {
      return this.userCategories.includes(this.category.slug);
    },
  },

  methods: {
    validatePage() {
      if (!this.category) {
        return this.$nuxt.error({
          statusCode: 404,
          message: "Category not found",
        });
      }
    },

    updateUserCategories() {
      if (this.following) {
        this.$store.commit("removeUserCategory", this.category.slug);
      } else {
        this.$store.commit("addUserCategory", this.category.slug);
      }
    },
  },
};
</script>
