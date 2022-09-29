<template>
  <div>
    <div id="page">
      <characters />

      <navbar ref="header" />
      <div id="pushdown"></div>

      <Nuxt />

      <Footer />
    </div>

    <modal />
  </div>
</template>

<script>
import { randomArticles } from "@/utils/randomArticles.js";

export default {
  created() {
    this.$store.commit("SET_ARTICLES", randomArticles(30));
  },

  mounted() {
    let headerHeight = document.querySelector("#header").offsetHeight;
    let pushdown = document.querySelector("#pushdown");
    pushdown.style.height = headerHeight + 24 + "px";
    // console.log(document.querySelector("#header").offsetHeight);
  },

  watch: {
    "$store.state.showModal": function (show) {
      if (show === true) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
    "$store.state.showModal": function (show) {
      if (show === true) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
  },
  methods: {
    disableScroll() {
      // console.log("lock page");
      this.posY = window.scrollY;
      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add("modal-open");
    },
    enableScroll() {
      // console.log("unlock page");
      document.body.classList.remove("modal-open");
      window.scrollTo(0, this.posY);
    },
  },
};
</script>

<style lang="scss" scoped>
#pushdown {
  width: 100%;
  // height: calc(70px + 3rem);
}
</style>
