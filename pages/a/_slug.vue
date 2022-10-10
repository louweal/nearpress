<template>
  <main>
    <div class="container-lg">
      <div class="row">
        <div class="col-12 col-md-10 offset-md-1">
          <div
            class="article-img ratio ratio-16x9 rounded mb-2 bg-light"
            :style="{
              backgroundImage: visual,
            }"
          >
            <!-- {{ visual === "none" ? article.visual.name : "" }} -->
          </div>
        </div>

        <div class="col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2">
          <ul class="bullet-list-inline mt-2">
            <li>{{ article.author }}</li>
            <li>
              {{ formatDate(article.date) }}
            </li>
            <li>
              <nuxt-link :to="'/c/' + article.channel">
                {{ article.channel }}
              </nuxt-link>
            </li>
          </ul>

          <h1>{{ article.title }}</h1>

          <template v-for="(p, i) in article.content">
            <h2
              :key="'title' + i"
              v-if="p.title"
              class="fs-2"
              :class="historicProgress < p.titleEnd ? 'fade-in-up' : false"
              :data-aos="historicProgress < p.titleEnd ? 70 : undefined"
              :data-end="p.titleEnd"
            >
              {{ p.title }}
            </h2>

            <p
              :key="i"
              :class="historicProgress < p.end ? 'fade-in-up' : false"
              :data-aos="historicProgress < p.end ? 70 : undefined"
              :data-end="p.end"
            >
              {{ p.content }}
            </p>
          </template>

          <p class="text-secondary fade-in" data-aos="68">
            Thank you for reading this article and supporting
            <b>{{ article.author }}</b
            >!
          </p>

          <social-share :title="article.title" />
        </div>
      </div>

      <h2 class="fs-5">Related</h2>

      <div class="row gy-0 g-md-3 pt-1">
        <div
          class="col-12 col-md"
          v-for="(a, i) in articles
            .filter((a) => a.channel === article.channel && a.id !== article.id)
            .slice(0, 5)"
          :key="i"
        >
          <card :article="a" :showIntro="false" :borderTop="i !== 0" />
        </div>
      </div>
      <div class="progress">
        <div class="bar bg-secondary" ref="bar">
          <div class="progress-label">{{ progress }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import getImage from "@/utils/getImage.js";

export default {
  transition: "page",

  data() {
    return {
      scrollHeight: 0,
      scrollY: 0,
      prevPosY: 0,
      progress: 0,
      historicProgress: 0,
      articles: () => {},
      article: () => {},
    };
  },

  created() {
    this.articles = this.$store.state.articles;
    this.article = this.articles.find(
      (a) => a.slug === this.$route.params.slug
    );
  },

  async mounted() {
    await this.validatePage();
    this.scrollHeight = document.body.scrollHeight;
    window.addEventListener("scroll", this.aos);

    let history = this.$store.state.user.history.find(
      (a) => a.id === this.article.id
    );

    if (history) {
      this.historicProgress = history.progress;
      this.progress = history.progress;
    }

    this.updateBar();
  },

  beforeDestroy() {
    if (this.article) {
      this.$store.commit("setProgress", {
        id: +this.article.id,
        progress: this.progress,
      });
    }

    window.removeEventListener("scroll", this.aos);
  },

  watch: {
    progress: function (val) {
      let p = parseInt((val * 100) / this.article.total);
      if (p === 100) {
        this.$store.commit("updateViews", this.article.id);
      }
    },
  },

  computed: {
    visual() {
      if (this.article.visual) {
        return getImage(this.article.visual);
      }
      return "none";
    },
  },

  methods: {
    validatePage() {
      if (!this.article) {
        this.$nuxt.error({
          statusCode: 404,
          message: "Article not found",
        });
      }
    },

    formatDate(date) {
      return date.toLocaleDateString("us-EN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },

    updateBar() {
      if (this.article) {
        let p = (100 * this.progress) / this.article.total;
        let bar = this.$refs["bar"];

        if (bar) {
          bar.style.width = p + "%";
        }
      }
    },

    aos() {
      let animTargets = document.querySelectorAll("[data-aos]");
      [].forEach.call(animTargets, (target) => {
        let startAt = parseInt(target.dataset.aos);
        let rect = target.getBoundingClientRect();
        let elemTop = rect.top;

        // target.style.opacity = "0"; // hide element by default

        let startTrigger =
          elemTop < window.innerHeight * (startAt / 100) && elemTop > 0;

        if (startTrigger) {
          if (!target.classList.contains("start-animation")) {
            target.classList.add("start-animation");

            if (target.dataset.end) {
              this.progress = parseInt(target.dataset.end);
              this.updateBar();
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.article-img {
  width: 100%;
  height: auto;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-size 0.3s 0.15s cubic-bezier(0.2, 0, 0.1, 1);
  background-size: 115%;
}

$fontsize: 8px;

.progress {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.4vh;
  background-color: var(--bs-gray-400);

  .bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0%;
    transition: width 0.8s ease-out;
    will-change: width;
  }

  .progress-label {
    position: absolute;
    text-align: right;
    right: 4px;
    top: calc(50% - $fontsize / 2);
    font-size: $fontsize;
    line-height: 1;
    font-weight: 700;
    z-index: 3;
  }
}
</style>
