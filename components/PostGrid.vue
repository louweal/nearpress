<template>
  <div class="row g-0 g-md-3 g-lg-5">
    <div
      class="col-12 col-md-4"
      v-for="(post, i) in posts"
      :key="i"
      :class="[
        hideFirstPost === 'mobile' && i === 0 ? 'd-none d-md-block' : false,
        hideFirstPost === 'desktop' && i === 0 ? 'd-md-none' : false,
      ]"
    >
      <card :post="post" :borderTop="!hideBorderTop(i)" :id="i" />
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
    hideFirstPost: {
      type: [Boolean, String],
      default: false, // options:   "mobile" "desktop" (hides post before OR after MD breakpoint (because number of posts in hero is variable)
    },
  },
  methods: {
    hideBorderTop(i) {
      if (i === 0) return true;
      if (this.hideFirstPost === "mobile" && i === 1) return true;
    },
  },
};
</script>

<style></style>
