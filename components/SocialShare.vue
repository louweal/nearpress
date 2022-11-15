<template>
  <div class="my-3 my-xl-4">
    <div class="hstack gap-3">
      <span class="align-middle me-1">Share:</span>
      <div @click="showCid = !showCid" class="cursor-pointer">
        <i class="bi bi-box-fill fs-5 color-secondary"></i>
      </div>

      <a
        :href="`https://www.linkedin.com/sharing/share-offsite/?url=${domain}${$route.path}`"
        target="_blank"
        class="align-middle"
      >
        <i class="bi bi-linkedin fs-5 color-secondary"></i>
      </a>
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
        :href="`https://ipfs.io/ipfs/${cid}`"
        target="_blank"
        class="align-middle"
        >{{ cid }}</a
      >&nbsp;

      <span class="btn btn-sm btn-secondary" @click="copyCid()" ref="copyBtn">
        Copy &nbsp;<i class="bi bi-clipboard"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCid: false,
    };
  },

  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
    cid: {
      type: String,
      default: "",
    },
  },

  computed: {
    domain() {
      return "https://nearpress.codesparks.nl";
    },
  },

  methods: {
    copyCid() {
      navigator.clipboard.writeText(this.cid);
      this.$refs["copyBtn"].innerText = "Copied!";
    },
  },
};
</script>

<style lang="scss" scoped>
.ipfs {
  word-break: break-all;
}
</style>
