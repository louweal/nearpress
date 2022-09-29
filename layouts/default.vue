<template>
  <div>
    <div id="page">
      <characters />

      <navbar />
      <div class="pushdown"></div>

      <Nuxt />

      <Footer />
    </div>

    <modal />
  </div>
</template>

<script>
export default {
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
.pushdown {
  width: 100%;
  height: calc(70px + 3rem);
}
</style>
