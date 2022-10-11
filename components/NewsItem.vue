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
        : paywall(post)
    "
    class="d-block w-100 m-1 pt-1"
  >
    <small class="text-muted fw-bold">
      <ul class="bullet-list-inline mb-0">
        <li>{{ post.category }}</li>
        <li>{{ author.name }}</li>
      </ul>
    </small>
    <h3 class="fs-6 fw-light">
      {{ post.title }}
      <span class="badge bg-secondary" v-if="progress"> {{ progress }} %</span>
    </h3>
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

  computed: {
    author() {
      return this.$store.state.writers.find((a) => a.id === this.post.author);
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

  methods: {
    paywall() {
      this.$store.commit("toggleModal");
      this.$store.commit("setClickedPost", "/a/" + this.post.slug);
      document.getElementById("page").classList.toggle("is-blurred");
    },
  },
};
</script>

<style></style>
