<template>
  <nuxt-link
    :to="'/a/' + data.slug"
    event=""
    @click.native="
      $store.state.user ? $router.push('/a/' + data.slug) : paywall()
    "
    class="card"
  >
    <div v-if="borderTop" class="w-100 border-top d-md-none"></div>
    <div
      class="row g-0 w-100 my-3 my-md-0"
      :class="flex ? 'gx-2 gx-sm-0' : 'gx-0'"
    >
      <div
        class="col-md-12"
        :class="flex ? 'col-4 col-sm-3 col-md-2' : 'col-12'"
      >
        <div class="position-relative xxmt-2 mt-md-0">
          <div
            class="card-img ratio ratio-4x3 rounded mb-md-1 mb-xl-2 w-100 bg-light"
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
      </div>
      <div class="col-8 col-md-12 d-none d-md-block">
        <h2 class="card-title">{{ data.title }}</h2>

        <p v-if="showIntro" class="d-none d-md-block">{{ data.intro }}</p>
      </div>

      <div
        class="d-md-none align-self-center"
        :class="flex ? 'col-8 col-sm-9' : 'col-12'"
      >
        <h2 class="card-title" :class="flex ? 'fw-light' : false">
          {{ data.title }}
        </h2>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import getImage from "@/utils/getImage.js";

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
      return getImage(this.data.channel, this.data.visual);
    },
  },

  methods: {
    paywall() {
      this.$store.commit("toggleModal");
      this.$store.commit("setClickedArticle", "/a/" + this.data.slug);
      document.getElementById("page").classList.toggle("is-blurred");
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
