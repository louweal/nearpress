<template>
  <nuxt-link :to="'/article/' + data.slug" class="card">
    <div v-if="borderTop" class="w-100 border-top d-sm-none pt-2"></div>
    <div class="row g-2 w-100">
      <div class="col-sm-12" :class="flex ? 'col-4' : 'col-12'">
        <div
          class="card-img ratio ratio-4x3 rounded mb-2"
          :style="{
            backgroundImage: visual,
          }"
        ></div>
      </div>
      <div class="col-8 col-sm-12 d-none d-sm-block">
        <h2 class="card-title fs-4">{{ data.title }}</h2>

        <p v-if="showIntro" class="d-none d-sm-block">{{ data.intro }}</p>
      </div>

      <div
        class="d-sm-none align-self-center"
        :class="flex ? 'col-8' : 'col-12'"
      >
        <h2 class="card-title fs-4" :class="flex ? 'fw-light' : false">
          {{ data.title }}
        </h2>
      </div>
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
    flex: {
      type: Boolean,
      default: true, // shows content in flex 'row' like manner on mobile
    },
    borderTop: {
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
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // border: 1px solid gold;
  // border-bottom: 1px solid orange;

  // &:not(:last-of-type) {
  //   border-bottom: 1px solid orange;
  // }

  &:hover {
    .card-img {
      background-size: 120%;
    }

    .card-title {
      color: var(--bs-secondary);
    }
  }
}

.card-title {
  transition: color 0.5s linear;
}

.card-img {
  width: 100%;
  height: auto;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-size 0.3s 0.15s cubic-bezier(0.2, 0, 0.1, 1);
  background-size: 115%;
}
</style>
