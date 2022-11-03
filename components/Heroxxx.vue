<template>
  <div class="hero">
    <div class="row gx-3 gx-lg-5">
      <div class="col-6 col-md-4">
        <card :post="posts[0]" hero v-if="posts[0]" />
      </div>
      <div class="col-6 col-md-4" v-if="posts[1]">
        <card :post="posts[1]" hero />
      </div>
      <div class="col-6 col-md-4" v-if="posts[2]">
        <card :post="posts[2]" class="d-none d-md-block" hero />
      </div>
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
  },
};
</script>

<style></style>
