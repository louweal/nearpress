<template>
  <nuxt-link :to="'/' + data.slug" class="card">
    <div
      class="card-img ratio ratio-4x3 rounded mb-2"
      :style="{
        backgroundImage: visual,
      }"
    ></div>
    <div class="xxx">
      <h2 class="card-title fs-5">{{ data.title }}</h2>

      <p v-if="showIntro">{{ data.intro }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    data: {
      type: [Array, Object],
      default: () => [],
    },
    showIntro: {
      type: Boolean,
      default: true,
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
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:hover {
    .card-img {
      background-size: 120%;
    }

    .card-title {
      color: var(--bs-light);
    }
  }
}

.card-title {
  transition: color 0.5s linear;
}

.card-img {
  // border: 4px solid gold;

  width: 100%;
  height: auto;
  overflow: hidden;
  background-repeat: no-repeat;
  // transform-origin: bottom right;
  background-position: center;
  transition: background-size 0.3s 0.15s cubic-bezier(0.2, 0, 0.1, 1);

  background-size: 115%;
}
</style>
