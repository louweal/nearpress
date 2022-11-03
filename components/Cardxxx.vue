<template>
  <nuxt-link
    :to="{
      path: '/a/' + post.slug,
      hash: progress !== 0 && progress !== 100 ? '#c' + progress : false,
    }"
    class="position-relative"
    :class="!blurb ? 'zoom-in' : false"
  >
    <div v-if="borderTop && !hero" class="w-100 border-top d-md-none"></div>

    <div class="row gx-3 my-3 my-md-0">
      <div :class="hero ? 'col-12' : 'col-3 col-md-12'">
        <div class="position-relative">
          <div class="ratio ratio-3x4">
            <div
              class="card-img position-absolute rounded bg-light"
              :style="{
                backgroundImage: bg,
              }"
            >
              {{ post.visual === "none" ? post.visual : "" }}
            </div>

            <div
              class="card-img-overlay rounded pb-3 px-3 px-lg-3 pb-lg-3"
              :class="hero ? 'd-flex' : 'd-none d-md-flex'"
            >
              <component
                :is="hero ? 'h1' : 'h2'"
                class="text-white"
                :class="hero ? '' : 'fs-4'"
              >
                {{ post.title }}
              </component>
              <span class="fw-bold text-white">{{ author.name }}</span>
            </div>

            <div
              class="blurb p-4 text-white rounded d-none"
              :class="blurb ? 'd-md-block' : ''"
            >
              <p>
                {{ post.intro.slice(0, maxBlurbLength) }}
                {{ post.intro.length > maxBlurbLength ? "..." : "" }}
              </p>
            </div>
          </div>
          <span
            class="badge bg-light position-absolute m-1 top-0 end-0 lh-1"
            v-if="progress && !mine"
          >
            <i v-if="progress === 100" class="bi bi-check-lg"></i>
            <span v-else>{{ progress }}%</span>
          </span>

          <span
            class="badge text-white position-absolute m-1 top-0 start-0 lh-1"
            style="background-color: var(--bs-secondary)"
            v-if="post.price === 0"
          >
            FREE
          </span>
        </div>
      </div>
      <div
        class="col-9 d-md-none align-self-center"
        :class="hero ? 'd-none' : false"
      >
        <h2 class="fs-5">{{ post.title }}</h2>
        <span class="fw-bold">{{ author.name }}</span>
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
    borderTop: {
      type: Boolean,
      default: true,
    },

    hero: {
      type: Boolean,
      default: false,
    },

    blurb: {
      type: Boolean,
      default: true, // show blurb on hover
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
      if (!this.$store.state.user) return false;
      // post is written by the user himself
      return (
        this.$store.state.user.id === this.author.id ||
        this.$store.state.user.id === this.author.address
      );
    },

    author() {
      let author = this.$store.state.writers.find(
        (w) => w.id === this.post.author
      );
      return author ? author : { name: "Unknown author" };
    },

    maxBlurbLength() {
      return this.hero ? 800 : 420;
    },

    bg() {
      return `url(${require("@/images/" + this.post.visual)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.zoom-in {
  overflow: hidden;

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
  flex-direction: column;
  justify-content: flex-end;
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 59%);
  z-index: 3;
}

.blurb {
  width: 100%;
  height: 100%;
  z-index: 4;
  opacity: 0;
  background-color: var(--bs-primary);
  transition: opacity 0.35s 0.15s ease-out;
  overflow: hidden;

  p {
    opacity: 0;
    transition: opacity 0.65s 0.35s ease-in;
  }

  &:hover {
    opacity: 1;
    p {
      opacity: 1;
    }
  }
}
</style>
