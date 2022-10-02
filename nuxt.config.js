export default {
  ssr: false,

  modern: "client",
  target: "static",
  router: {
    base: "/",
  },
  head: {
    title: "NearPress",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Decentralized news platform on NEAR",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
  },

  css: ["@/assets/css/main.scss"],

  messages: {
    error_404: "Page not found",
  },

  router: {
    scrollBehavior(to) {
      if (to.hash) {
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop + window.innerHeight,
          behavior: "smooth",
        });
      }
      return window.scrollTo({ top: 0, behavior: "auto" }); // to disable smooth scrolling on route change!!
    },
  },

  // styleResources: {},
  // styleResources: {
  //   scss: ["@/node_modules/bootstrap/scss/mixins.scss"],
  // },
  components: true,
  buildModules: [],
  // modules: ["@nuxtjs/style-resources"],
  build: {},
};
