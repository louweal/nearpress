<template>
  <nuxt-link :to="'/a/' + data.slug" class="card">
    <div v-if="borderTop" class="w-100 border-top d-sm-none"></div>
    <div class="row g-md-0 w-100" :class="flex ? 'gx-2' : 'gx-0'">
      <div
        class="col-md-12"
        :class="flex ? 'col-3 col-sm-2 col-md-2' : 'col-12'"
      >
        <div
          class="card-img ratio ratio-4x3 rounded mb-xl-2 w-100 bg-light"
          :style="{
            backgroundImage: visual,
          }"
        ></div>

        <span
          class="badge bg-secondary position-absolute m-1 top-0 end-0"
          v-if="data.progress"
        >
          {{ data.progress }} %
        </span>
      </div>
      <div class="col-8 col-md-12 d-none d-md-block">
        <h2 class="card-title">{{ data.title }}</h2>

        <p v-if="showIntro" class="d-none d-md-block">{{ data.intro }}</p>
      </div>

      <div
        class="d-md-none align-self-center"
        :class="flex ? 'col-9' : 'col-12'"
      >
        <h2 class="card-title" :class="flex ? 'fw-light' : false">
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
      try {
        return `url(${require("@/images/" +
          this.data.channel +
          "/" +
          this.data.visual +
          ".jpg")})`;
      } catch {
        return "none";
      }
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
  // border: 1px solid plum;

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
  height: auto;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-size 0.3s 0.15s cubic-bezier(0.2, 0, 0.1, 1);
  background-size: 115%;
}
</style>
