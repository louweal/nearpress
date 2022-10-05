<template>
  <nuxt-link
    :to="'/a/' + article.slug"
    event=""
    @click.native="
      $store.state.user ? $router.push('/a/' + article.slug) : paywall(article)
    "
    class="d-block w-100 m-1 border-bottom"
  >
    <small class="text-muted fw-bold">
      {{ formatDate(article.date) }}
    </small>
    <h3 class="fs-6 fw-light">
      {{ article.title }}
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
    article: {
      type: [Array, Object],
      default: () => [],
    },
  },

  mounted() {
    if (this.$store.state.user && this.article) {
      let history = this.$store.state.user.history.find(
        (a) => a.id === this.article.id
      );
      if (history) {
        this.progress = parseInt((100 * history.progress) / this.article.total);
      }
    }
  },

  methods: {
    formatDate(date) {
      return (
        date.toLocaleDateString("us-EN", {
          day: "numeric",
          month: "long",
        }) +
        ", " +
        date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    },
    paywall() {
      this.$store.commit("toggleModal");
      this.$store.commit("setClickedArticle", "/a/" + this.article.slug);
      document.getElementById("page").classList.toggle("is-blurred");
    },
  },
};
</script>

<style></style>
