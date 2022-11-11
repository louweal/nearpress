<template>
  <div>
    <div class="row gx-3 gx-lg-5">
      <div class="col-12 col-md-6">
        <display-card :post="posts[0]" />
      </div>
      <div class="col-12 col-md-6">
        <display-card :post="posts[1]" class="d-none d-md-block" />
      </div>
    </div>

    <div class="row gy-0 gx-3 d-md-none mt-2">
      <div class="col-6" v-for="(post, i) in posts.slice(1, 3)" :key="i">
        <card :post="post" :flex="false" :borderTop="false" />
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
