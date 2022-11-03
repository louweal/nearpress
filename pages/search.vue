<template>
  <main>
    <div class="container-xl mt-1 mt-md-3">
      <div class="row g-3 g-lg-5">
        <div class="col-12 col-md-9">
          <div class="form-inline d-flex">
            <input
              class="form-control me-2 bg-white"
              type="search"
              placeholder="Search ..."
              aria-label="Search"
              event=""
              :value="query"
              @input="(e) => (query = e.target.value)"
            />

            <div class="btn btn-primary">Search</div>
          </div>
        </div>

        <div class="col-md-3 align-self-center">
          {{ posts.length }} books found
        </div>

        <div class="col-12 col-md-9">
          <post-grid :posts="posts.slice(0, gridMax)" />

          <div class="text-center my-4" v-if="posts.length > gridMax">
            <div class="btn btn-secondary" @click="gridMax += 9">Load more</div>
          </div>
        </div>

        <div class="col-12 col-md-3 d-none d-md-block">
          <div
            class="border bg-white shadow-sm rounded py-3 px-3"
            v-if="writers.length > 0"
          >
            <h2 class="fs-5">Writers</h2>

            <div
              class="py-2"
              v-for="(w, i) in [...writers].sort((a, b) =>
                a.numPosts > b.numPosts ? -1 : 1
              )"
              :key="i"
              :class="i > 0 ? 'border-top' : false"
            >
              <nuxt-link :to="'/w/' + w.slug" class="">
                <h3 class="fw-bold fs-6 mb-0 text-secondary">{{ w.name }}</h3>
                <span
                  >{{ w.numPosts }} book<span v-if="w.numPosts > 1"
                    >s</span
                  ></span
                >
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      gridMax: 21,
    };
  },

  computed: {
    q() {
      return this.query.toLowerCase();
    },

    posts() {
      let posts = [...this.$store.state.posts].sort((a, b) =>
        a.date > b.date ? -1 : 1
      );
      posts.forEach(
        (p) =>
          (p["authorName"] = this.$store.state.writers
            .find((w) => w.id == p.author)
            .name.toLowerCase())
      );

      if (this.q.length <= 2) {
        return posts; // all posts
      } else {
        return posts.filter(
          (p) =>
            p.title.toLowerCase().includes(this.q) ||
            p.authorName.includes(this.q)
        );
      }
    },

    writers() {
      let writers = this.$store.state.writers;

      writers.forEach(
        (w) =>
          (w["numPosts"] = this.$store.state.posts.filter(
            (p) => p.author === w.id
          ).length)
      );

      writers = writers.filter((w) => w.numPosts > 0);

      if (this.q.length <= 2) {
        return writers; // all writers
      } else {
        return writers.filter((w) => w.name.toLowerCase().includes(this.q));
      }
    },

    categories() {
      return this.$store.state.categories;
    },
  },
};
</script>
