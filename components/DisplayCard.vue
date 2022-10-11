<template>
  <nuxt-link
    :to="{
      path: '/a/' + post.slug,
      hash: historicProgress !== 0 ? '#' + historicProgress : false,
    }"
    event=""
    @click.native="
      $store.state.user
        ? $router.push({
            path: '/a/' + post.slug,
            hash: historicProgress !== 0 ? '#' + historicProgress : false,
          })
        : paywall()
    "
    class="card position-relative"
  >
    <div class="ratio ratio-4x3">
      <div
        class="card-img position-absolute rounded bg-light"
        :style="{
          backgroundImage: visual,
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
      {{ progress }} %
    </span>
  </nuxt-link>
</template>

<script>
import getImage from "@/utils/getImage.js";

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
      if (history) {
        this.progress = parseInt((100 * history.progress) / this.post.total);
      }
    }
  },

  computed: {
    visual() {
      return getImage(this.post.visual);
    },
    historicProgress() {
      if (this.$store.state.user) {
        let history = this.$store.state.user.history.find(
          (a) => a.id === this.post.id
        );
        if (history) {
          return history.progress;
        }
      }
      return 0;
    },
  },

  methods: {
    paywall() {
      this.$store.commit("toggleModal");
      this.$store.commit("setClickedPost", "/a/" + this.post.slug);
      document.getElementById("page").classList.toggle("is-blurred");
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
  // padding: 1.3rem 2rem;
  display: flex;
  align-items: flex-end;
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 59%);
  z-index: 3;
}
</style>
