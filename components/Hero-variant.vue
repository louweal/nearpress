<template>
  <div>
    <div class="row gx-3 gx-lg-5">
      <div class="col-6 col-md-4">
        <display-card :post="posts[0]" />
      </div>
      <div class="col-6 col-md-4">
        <display-card :post="posts[1]" />
      </div>
      <div class="col-6 col-md-4">
        <display-card :post="posts[2]" class="d-none d-md-block" />
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
