<template>
  <main>
    <div class="container-xl">
      <div class="row">
        <!-- <div class="col-12 col-md-10 offset-md-1">
          <div
            class="post-img ratio ratio-16x9 rounded mb-2 bg-light"
            :style="{
              backgroundImage: visual,
            }"
          ></div>
        </div> -->

        <div class="col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2">
          <ul class="bullet-list-inline mt-2">
            <li>
              <nuxt-link :to="'/w/' + author.slug">{{ author.name }}</nuxt-link>
            </li>
            <!-- <li>
              {{ formatDate(post.date) }}
            </li> -->
            <li>
              <nuxt-link :to="'/c/' + post.category">
                {{ post.category }}
              </nuxt-link>
            </li>
            <li>{{ post.views }}x read</li>
          </ul>

          <h1>{{ post.title }}</h1>

          <template v-for="(p, i) in post.content">
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
              :id="p.end"
            >
              {{ p.content }}
            </p>
          </template>

          <p class="text-secondary">
            Thank you for reading this post and supporting
            <b>
              <nuxt-link :to="'/w/' + author.slug" class="text-secondary">
                {{ author.name }}
              </nuxt-link> </b
            >!
          </p>

          <social-share :title="post.title" />
        </div>
      </div>

      <h2 class="fs-5">Related</h2>

      <div class="row gy-0 g-md-3 pt-1">
        <div
          class="col-12 col-md"
          v-for="(a, i) in posts
            .filter((a) => a.category === post.category && a.id !== post.id)
            .slice(0, 5)"
          :key="i"
        >
          <card :post="a" :showIntro="false" :borderTop="i !== 0" />
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
      posts: () => {},
      post: () => {},
    };
  },

  created() {
    this.posts = this.$store.state.posts;
    this.post = this.posts.find((a) => a.slug === this.$route.params.slug);
  },

  async mounted() {
    await this.validatePage();
    this.scrollHeight = document.body.scrollHeight;
    window.addEventListener("scroll", this.aos);

    let history = this.$store.state.user.history.find(
      (a) => a.id === this.post.id
    );

    if (history) {
      this.historicProgress = history.progress;
      this.progress = history.progress;
    }

    this.updateBar();
  },

  beforeDestroy() {
    if (this.post) {
      this.$store.commit("setProgress", {
        id: +this.post.id,
        progress: this.progress,
      });
    }

    window.removeEventListener("scroll", this.aos);
  },

  watch: {
    progress: function (val) {
      let p = parseInt((val * 100) / this.post.total);
      if (p === 100) {
        this.$store.commit("updateViews", this.post.id);
      }
    },
  },

  computed: {
    visual() {
      if (this.post.visual) {
        return getImage(this.post.visual);
      }
      return "none";
    },

    author() {
      return this.$store.state.writers.find((a) => a.id === this.post.author);
    },
  },

  methods: {
    validatePage() {
      if (!this.post) {
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
      if (this.post) {
        let p = (100 * this.progress) / this.post.total;
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
.post-img {
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
