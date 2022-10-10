<template>
  <nuxt-link
    :to="'/a/' + article.slug"
    event=""
    @click.native="
      $store.state.user ? $router.push('/a/' + article.slug) : paywall(article)
    "
    class="d-block w-100 m-1 pt-1"
  >
    <small class="text-muted fw-bold">
      <ul class="bullet-list-inline mb-0">
        <li>{{ article.channel }}</li>
        <li>{{ author.name }}</li>
      </ul>
      <!-- {{ formatDate(article.date) }} -->
    </small>
    <h3 class="fs-6 fw-light">
      {{ article.title }}
      <span class="badge bg-secondary" v-if="progress"> {{ progress }} %</span>
    </h3>
  </nuxt-link>
</template>

<script>
// import authors from "@/data/authors.json";

export default {
  // authors,

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

  computed: {
    author() {
      return this.$store.state.authors.find(
        (a) => a.id === this.article.author
      );
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
    // formatDate(date) {
    //   return (
    //     date.toLocaleDateString("us-EN", {
    //       day: "numeric",
    //       month: "long",
    //     }) +
    //     ", " +
    //     date.toLocaleTimeString("en-GB", {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     })
    //   );
    // },
    paywall() {
      this.$store.commit("toggleModal");
      this.$store.commit("setClickedArticle", "/a/" + this.article.slug);
      document.getElementById("page").classList.toggle("is-blurred");
    },
  },
};
</script>

<style></style>
