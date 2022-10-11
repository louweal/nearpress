<template>
  <div class="category-list d-sm-none">
    <div class="category-list__inner hstack gap-2 mb-2 text-nowrap">
      <button class="btn btn-secondary opacity-100" disabled>All</button>
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
