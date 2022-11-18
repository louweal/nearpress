<template>
  <div>
    <pre-loader />
    <div id="page">
      <Header />
      <div class="min-vh-100 d-flex flex-column justify-content-between">
        <div id="pushdown" class="mb-2 mb-md-3 mb-lg-4 w-100"></div>
        <Nuxt />
        <Footer />
      </div>
    </div>
    <modal />
    <overlay />
  </div>
</template>

<script>
import categories from "@/data/channels.json";
import posts from "@/data/posts.json";
import writers from "@/data/writers.json";
// import { fakeNews } from "@/utils/fakeNewsGenerator.js";
import { disconnectSender } from "@/utils/sender.js";

export default {
  categories,
  writers,
  posts,

  async created() {
    this.$store.commit("SET_CATEGORIES", this.$options.categories);

    this.$store.commit(
      "SET_WRITERS",
      this.combinedData(this.$options.writers, "browserWriters")
    );

    // let posts = await fakeNews(10);
    // console.log(posts);

    this.$store.commit(
      "SET_POSTS",
      this.combinedData(this.$options.posts, "browserPosts")
      // this.combinedData(posts, "browserPosts")
    );
  },

  async mounted() {
    let headerHeight = document.querySelector("#header").offsetHeight; //refs ?
    let pushdown = document.querySelector("#pushdown"); // refs?
    pushdown.style.height = headerHeight + "px";
  },

  async beforeDestroy() {
    await disconnectSender();
  },

  watch: {
    "$store.state.showModal": function (show) {
      if (show) {
        this.posY = window.scrollY;
        document.body.style.top = `-${window.scrollY}px`;
      }
      document.body.classList.toggle("disable-scroll");

      if (this.$route.path.startsWith("/a/")) {
        // stay at same scroll position on post detail pages
        window.scrollTo(0, this.posY);
      }
    },
  },

  methods: {
    combinedData(staticData, lsKey) {
      let data = localStorage.getItem(lsKey);
      let browserData = data !== null ? JSON.parse(data) : [];
      return [...staticData, ...browserData];
    },
  },
};
</script>
