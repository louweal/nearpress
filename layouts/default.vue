<template>
  <div>
    <pre-loader />

    <div id="page">
      <characters />

      <navbar ref="header" />
      <div class="min-vh-100 d-flex flex-column justify-content-between">
        <div id="pushdown" class="mb-2 mb-md-3 mb-lg-4"></div>

        <Nuxt />

        <Footer />
      </div>
    </div>

    <modal />
  </div>
</template>

<script>
import { news } from "@/utils/newsGenerator.js";
import categories from "@/data/channels.json";
import writers from "@/data/writers.json";

export default {
  transition: "page",

  categories,
  writers,

  created() {
    this.$store.commit("SET_POSTS", news(160));
    this.$store.commit("SET_CATEGORIES", this.$options.categories);
    this.$store.commit("SET_WRITERS", this.$options.writers);
  },

  mounted() {
    let headerHeight = document.querySelector("#header").offsetHeight;
    let pushdown = document.querySelector("#pushdown");
    pushdown.style.height = headerHeight + "px";

    // this.$store.commit("setUser", {
    //   id: 1,
    //   name: "Anneloes Louwe",
    //   categories: ["dogs", "hiking", "chess", "save-ukraine"],
    //   writers: [],
    //   history: [],
    // });
  },

  watch: {
    "$store.state.showModal": function (show) {
      if (show) {
        this.posY = window.scrollY;
        document.body.style.top = `-${window.scrollY}px`;
      }
      document.body.classList.toggle("modal-open");

      if (!show) {
        window.scrollTo(0, this.posY);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#pushdown {
  width: 100%;
}
</style>
