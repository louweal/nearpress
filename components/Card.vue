<template>
  <nuxt-link :to="'/a/' + post.slug" class="card">
    <div v-if="borderTop" class="w-100 border-top d-md-none"></div>
    <div
      class="row g-0 w-100 my-md-0"
      :class="flex ? 'gx-2 gx-md-0 my-3' : 'gx-0 my-0 mt-2'"
    >
      <div
        class="col-md-12"
        :class="flex ? 'col-4 col-sm-3 col-md-2' : 'col-12'"
      >
        <div class="position-relative mt-md-0">
          <div
            class="card-img ratio ratio-4x3 rounded mb-md-1 mb-xl-2 w-100 bg-light"
            :style="{
              backgroundImage: `url(${require('@/images/' + post.visual)}`,
            }"
          ></div>

          <span
            class="badge bg-secondary position-absolute m-1 m-lg-2 top-0 end-0"
            v-if="progress && !mine"
          >
            <i v-if="progress === 100" class="bi bi-check-lg"></i>

            <span v-else>{{ progress }}%</span>
          </span>

          <span
            class="badge bg-secondary text-white position-absolute m-1 m-lg-2 top-0 start-0 lh-1"
            v-if="post.price === 0"
          >
            FREE
          </span>
        </div>
      </div>
      <div class="col-8 col-md-12 d-none d-md-block">
        <h2 class="card-title">{{ post.title }}</h2>

        <p v-if="showIntro" class="d-none d-md-block mb-0">{{ post.intro }}</p>
      </div>

      <div
        class="d-md-none align-self-center"
        :class="flex ? 'col-8 col-sm-9' : 'col-12'"
      >
        <h2 class="card-title" :class="flex ? 'fw-light' : 'mt-1'">
          {{ post.title }}
        </h2>
      </div>
    </div>
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
      return this.$store.state.user.id === this.post.author;
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

  &:hover {
    .card-img {
      background-size: 115%;
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
  transition: background-size 0.6s cubic-bezier(0.2, 0, 0.1, 1);
  background-size: 125%;
}
</style>
