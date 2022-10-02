<template>
  <div class="col-md-3 d-none d-md-block">
    <div class="border bg-white shadow-sm rounded py-3 px-3">
      <h2 class="fs-4">Recently published</h2>

      <div
        class=""
        v-for="(article, i) in articles.sort((a, b) =>
          a.date > b.date ? -1 : 1
        )"
        :key="i"
      >
        <nuxt-link
          :to="'/a/' + article.slug"
          class="d-block w-100"
          :class="i !== 9 ? 'border-bottom' : false"
        >
          <small class="text-muted fw-bold">
            {{ formatDate(article.date) }}
          </small>
          <h3 class="fs-6 fw-light">
            {{ article.title }}
            <span class="badge bg-secondary" v-if="article.progress">
              {{ article.progress }} %
            </span>
          </h3>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: [Object, Array],
      default: () => {},
    },
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
  },
};
</script>

<style></style>
