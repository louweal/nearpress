<template>
  <div class="col-md-3 d-none d-md-block">
    <div class="border bg-white shadow-sm rounded py-3 px-3">
      <h2 class="fs-4">Recently published</h2>

      <div
        class=""
        v-for="(article, i) in articles.sort((a, b) =>
          a.date > b.date ? -1 : 1
        )"
        :key="i"
      >
        <news-item :article="article" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: [Object, Array],
      default: () => {},
    },
  },

  methods: {
    // formatDate(date) {
    //   return (
    //     date.toLocaleDateString("us-EN", {
    //       day: "numeric",
    //       month: "long",
    //     }) +
    //     ", " +
    //     date.toLocaleTimeString("en-GB", {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     })
    //   );
    // },
    // paywall(article) {
    //   this.$store.commit("toggleModal");
    //   this.$store.commit("setClickedArticle", "/a/" + article.slug);
    //   document.getElementById("page").classList.toggle("is-blurred");
    // },
  },
};
</script>

<style></style>
