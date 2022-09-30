<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ $route.params.slug }}
        </li>
      </ol>
    </nav>

    <hero :articles="articles.slice(0, 3)" />

    <div class="row gx-5 gy-3 mt-3">
      <news-grid :articles="articles.slice(2, 14)" />

      <sidebar :articles="articles.slice(2, 12)" />
    </div>
  </div>
</template>

<script>
export default {
  transition: "page",

  computed: {
    articles() {
      return this.$store.state.articles;
    },
  },
};
</script>

<style></style>
