<template>
  <div class="my-5 fade-in" data-aos="68">
    <div class="hstack gap-3">
      <span class="align-middle me-1">Share:</span>
      <a
        :href="`https://www.linkedin.com/sharing/share-offsite/?url=${domain}${$route.path}`"
        target="_blank"
        class="align-middle"
      >
        <i class="bi bi-linkedin fs-5"></i>
      </a>
      <a
        :href="`https://twitter.com/intent/tweet?url=${domain}${$route.path}&text=${title}`"
        target="_blank"
      >
        <i class="bi bi-twitter fs-5"></i>
      </a>
      <a
        :href="`https://www.facebook.com/sharer/sharer.php?u=${domain}${$route.path}&quote=${title}`"
        target="_blank"
      >
        <i class="bi bi-facebook fs-5"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
  },

  computed: {
    domain() {
      return "https://nearpress.codesparks.nl";
    },
  },
};
</script>

<style lang="scss" scoped>
.bi {
  //test special gradient

  background: -webkit-linear-gradient(45deg, #755df1, #955eae);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: filter 0.24s linear !important;

  &:hover,
  &:active:hover,
  &:focus {
    filter: hue-rotate(77deg);
  }
}
</style>
