<template>
  <div class="category-list d-sm-none" v-if="categories.length > 0">
    <div class="category-list__inner hstack gap-2 mb-2 text-nowrap">
      <nuxt-link to="/search" class="btn btn-secondary text-white">
        <i class="bi bi-search"></i>
      </nuxt-link>
      <nuxt-link
        :to="'/c/' + c.slug"
        v-for="(c, i) in categories"
        :key="i"
        class="btn"
      >
        {{ c.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: [Object, Array],
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.category-list {
  max-width: 100%;
  position: relative;

  &__inner {
    overflow-x: scroll;
    position: relative;
  }
}
</style>
