<template>
  <div class="col-12 col-md-3 d-none d-sm-block">
    <div class="border bg-white shadow-sm rounded py-3 xxxpe-0 px-3">
      <h2 class="fs-3">Recently published</h2>

      <div class="" v-for="(article, i) in articles" :key="i">
        <nuxt-link
          :to="'/article/' + article.slug"
          class="d-block w-100"
          :class="i !== 9 ? 'border-bottom' : false"
        >
          <small class="text-muted fw-bold"
            >{{ article.date.H }}:{{ article.date.m }}
          </small>
          <h3 class="fs-6 fw-light">{{ article.title }}</h3>
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
};
</script>

<style></style>
