<template>
  <nuxt-link
    :to="{
      path: '/a/' + post.slug,
      hash: progress !== 0 && progress !== 100 ? '#c' + progress : false,
    }"
    class="card position-relative"
  >
    <div class="ratio ratio-4x3">
      <div
        class="card-img position-absolute rounded bg-light"
        :style="{
          backgroundImage: `url(${require('@/images/' + post.visual)}`,
        }"
      ></div>

      <div class="card-img-overlay rounded pb-1 px-3 px-lg-4 pb-lg-2">
        <h2 class="text-white fs-3">{{ post.title }}</h2>
      </div>
    </div>
    <span
      class="badge bg-secondary position-absolute m-1 top-0 end-0 lh-1"
      v-if="progress"
    >
      <i v-if="progress === 100 && !mine" class="bi bi-check-lg"></i>
      <span v-else>{{ progress }}%</span>
    </span>
  </nuxt-link>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
    };
  },

  props: {
    post: {
      type: [Array, Object],
      default: () => [],
    },
  },

  mounted() {
    if (this.$store.state.user && this.post) {
      let history = this.$store.state.user.history.find(
        (a) => a.id === this.post.id
      );
      this.progress = history ? history.progress : 0;
    }
  },

  computed: {
    mine() {
      // post is written by the user himself
      return (
        this.$store.state.user.id === this.author.id ||
        this.$store.state.user.id === this.author.address
      );
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
  background-repeat: no-repeat;
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
  display: flex;
  align-items: flex-end;
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0) 59%);
  z-index: 3;
}
</style>
