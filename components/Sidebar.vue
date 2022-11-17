<template>
  <div class="border bg-white shadow-sm rounded py-3 px-3">
    <h2 class="fs-5">{{ title }}</h2>

    <div class="" v-for="(post, i) in posts" :key="i">
      <post-item
        :post="post"
        :class="i !== 0 ? 'border-top' : false"
        :meta="meta"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: [Object, Array],
      default: () => {},
    },
    title: {
      type: String,
      default: "Most read",
    },
    meta: {
      type: String,
      default: "date",
    },
  },
};
</script>

<style></style>
