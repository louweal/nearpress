<template>
  <div class="my-3 my-xl-4">
    <div class="hstack gap-3">
      <span class="align-middle me-1">Share:</span>
      <a
        :href="`https://twitter.com/intent/tweet?url=${domain}${$route.path}&text=${title}`"
        target="_blank"
      >
        <i class="bi bi-twitter fs-5 color-secondary"></i>
      </a>
      <a
        :href="`https://www.facebook.com/sharer/sharer.php?u=${domain}${$route.path}&quote=${title}`"
        target="_blank"
      >
        <i class="bi bi-facebook fs-5 color-secondary"></i>
      </a>
    </div>

    <div class="ipfs bg-white px-4 py-3 rounded mt-2" v-if="showCid">
      <span class="fw-bold"><a>IPFS</a> CID:</span>
      <a
        :href="`https://ipfs.io/ipfs/${cid}/post.json`"
        target="_blank"
        class="align-middle"
        >{{ cid }}</a
      >
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
