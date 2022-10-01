<template>
  <div>
    <div id="page">
      <characters />

      <navbar ref="header" />
      <div id="pushdown" class="mb-3 mb-lg-4"></div>

      <Nuxt />

      <Footer />
    </div>

    <modal />
  </div>
</template>

<script>
import { randomArticles } from "@/utils/randomArticles.js";

export default {
  // scrollToTop: true,
  transition: "page",

  created() {
    this.$store.commit("SET_ARTICLES", randomArticles(60));
  },

  mounted() {
    let headerHeight = document.querySelector("#header").offsetHeight;
    let pushdown = document.querySelector("#pushdown");
    pushdown.style.height = headerHeight + "px";
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
    // $route: function (to, from) {
    //   console.log("route changed!");
    //   // console.log(to);
    //   // this.aos();
    // },
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
    // beforeEnter: function (el) {
    //   if (this.$route.hash[0] !== "#") {
    //     // window.scrollTo(0, 0);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
#pushdown {
  width: 100%;
  // height: calc(70px + 3rem);
}
</style>
