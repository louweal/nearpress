<template>
  <div>
    <div id="page">
      <characters />

      <navbar ref="header" />
      <div class="min-vh-100 d-flex flex-column justify-content-between">
        <div id="pushdown" class="mb-3 mb-lg-4"></div>

        <Nuxt />

        <Footer />
      </div>
    </div>

    <modal />
  </div>
</template>

<script>
import { randomArticles } from "@/utils/randomArticles.js";
import channels from "@/data/channels.json";

export default {
  // scrollToTop: true,
  transition: "page",

  channels,

  created() {
    this.$store.commit("SET_ARTICLES", randomArticles(300));
    this.$store.commit("SET_CHANNELS", this.$options.channels);

    this.$store.commit("setSelectedChannels"); //
  },

  mounted() {
    let headerHeight = document.querySelector("#header").offsetHeight;
    let pushdown = document.querySelector("#pushdown");
    pushdown.style.height = headerHeight + "px";

    this.$store.commit("setUser", {
      id: 1,
      name: "Anneloes",
      channels: ["dogs", "hiking", "chess"],
      history: [],
    });
  },

  watch: {
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
}
</style>
