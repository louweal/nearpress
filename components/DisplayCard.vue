<template>
  <nuxt-link :to="'/a/' + data.slug" class="card position-relative">
    <div class="ratio ratio-4x3">
      <div
        class="card-img position-absolute rounded bg-light"
        :style="{
          backgroundImage: visual,
        }"
      ></div>

      <div class="card-img-overlay rounded pb-1 px-3 px-lg-4 pb-lg-2">
        <h2 class="text-white fs-3">{{ data.title }}</h2>
      </div>
    </div>
    <span
      class="badge bg-secondary position-absolute m-1 top-0 end-0 lh-1"
      v-if="data.progress"
    >
      {{ data.progress }} %
      <!-- <i class="bi bi-eyeglasses fs-4 lh-1"></i> -->
    </span>
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
  position: relative;

  &:hover .card-img {
    background-size: 120%;
  }
}

.card-img {
  height: 100%;
  overflow: hidden;
  background-position: center;
  transition: background-size 0.4s 0.15s cubic-bezier(0.2, 0, 0.1, 1);
  background-size: 115%;
}

.card-img-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  // padding: 1.3rem 2rem;
  display: flex;
  align-items: flex-end;
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 59%);
  z-index: 3;
}
</style>
