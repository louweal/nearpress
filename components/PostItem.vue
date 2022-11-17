<template>
  <div class="w-100 m-1 py-2" v-if="post">
    <small v-if="meta === 'date'" class="fw-bold text-secondary">
      {{ date }}
    </small>
    <nuxt-link :to="'/w/' + author.slug" rel="author" v-else>
      <small class="text-secondary fw-bold">
        {{ author.name }}
      </small>
    </nuxt-link>

    <nuxt-link
      :to="{
        path: '/a/' + post.slug,
        hash: progress !== 0 && progress !== 100 ? '#c' + progress : false,
      }"
    >
      <h3 class="fs-6 fw-light mb-0">
        <span class="badge bg-secondary" v-if="progress">
          <i v-if="progress === 100 && !mine" class="bi bi-check-lg"></i>
          <span v-else>{{ progress }}%</span>
        </span>
        {{ post.title }}
      </h3>
    </nuxt-link>
  </div>
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
    meta: {
      type: String,
      default: "date",
    },
  },

  computed: {
    author() {
      return this.$store.state.writers.find((a) => a.id === this.post.author);
    },
    mine() {
      // post is written by the user himself
      return (
        this.$store.state.user.id === this.author.id ||
        this.$store.state.user.id === this.author.address
      );
    },
    date() {
      return new Date(this.post.date * 1000).toLocaleDateString("us-EN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
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
};
</script>

<style lang="scss" scoped>
a {
  transition: color 0.2s ease-in;
  &:hover {
    color: var(--bs-secondary);
  }
}
</style>
