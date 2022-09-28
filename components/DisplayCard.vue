<template>
  <nuxt-link
    :to="'/' + data.slug"
    class="card ratio ratio-16x9 position-relative"
  >
    <div
      class="card-img position-absolute rounded"
      :style="{
        backgroundImage: visual,
      }"
    ></div>
    <div class="card-img-overlay rounded">
      <h2 class="card-title text-white h2">{{ data.title }}</h2>
    </div>
    <!-- <div class="card-overlay" /> -->
  </nuxt-link>
</template>

<script>
export default {
  props: {
    data: {
      type: [Array, Object],
      default: () => [],
    },
  },

  computed: {
    visual() {
      let img = null;
      try {
        img = require("@/images/" + this.data.visual + ".webp");
      } catch {
        img = require("@/images/" + this.data.visual + ".jpg");
      }
      return `url(${img})`;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  // overflow: hidden !important;
  position: relative;

  &:hover .card-img {
    background-size: 104%;
  }
}

.card-img {
  // width: 100%;
  height: 100%;
  overflow: hidden;
  // transform-origin: bottom right;
  background-position: center;
  transition: background-size 0.4s 0.15s cubic-bezier(0.2, 0, 0.1, 1);

  background-size: 100%;
}

.card-img-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 2rem !important;
  display: flex;
  // justify-content: flex-end;
  align-items: flex-end;

  // border: 3px solid red !important;
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 49%);
  z-index: 3;
}
</style>
