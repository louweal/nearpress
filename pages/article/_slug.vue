<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-10 offset-md-1">
          <div
            class="article-img ratio ratio-16x9 rounded mb-2"
            :style="{
              backgroundImage: visual,
            }"
          ></div>
        </div>

        <div class="col-12 col-md-8 offset-md-2">
          <ul class="list-inline">
            <li>{{ article.author }}</li>
            <li>
              {{
                formatDate(
                  `${article.date.Y}-${article.date.M}-${article.date.D}`
                )
              }}
            </li>
            <li>{{ article.count }} t<del>n</del></li>
          </ul>

          <h1>{{ article.title }}</h1>

          <template v-for="(p, i) in article.content">
            <h2
              :key="'title' + i"
              v-if="p.title"
              class="fs-2 fade-in-up"
              data-aos="70"
            >
              {{ p.title }}
            </h2>

            <p :key="i" data-aos="70" class="fade-in-up" :data-chars="p.count">
              {{ p.content }}
            </p>
          </template>

          <social-share :title="article.title" />
        </div>
      </div>

      <div class="progress">
        <div class="bar" ref="bar"></div>
        <div class="progress-label" ref="label">{{ charactersVisible }}</div>

        <!-- <div class="end-label">$ {{ article.count }}</div> -->
      </div>
    </div>
  </main>
</template>

<script>
export default {
  transition: "page",

  data() {
    return {
      scrollHeight: 0,
      scrollY: 0,
      prevPosY: 0,
      charactersVisible: 0,
    };
  },

  mounted() {
    this.scrollHeight = document.body.scrollHeight;
    this.getScrollPos();
    window.addEventListener("scroll", this.getScrollPos);

    // this.aos();
    window.addEventListener("scroll", this.aos);
  },

  beforeDestroy() {
    // console.log("beforeDestroy");
    window.removeEventListener("scroll", this.getScrollPos);
    window.removeEventListener("scroll", this.aos);
  },

  computed: {
    articles() {
      return this.$store.state.articles;
    },
    article() {
      return this.articles.find((a) => a.slug === this.$route.params.slug);
    },

    visual() {
      let img = require("@/images/" +
        this.article.channel +
        "/" +
        this.article.visual +
        ".jpg");

      return `url(${img})`;
    },
  },

  methods: {
    formatDate(date) {
      let splitDate = date.split(" ");
      return new Date(splitDate[0]).toLocaleDateString("us-EN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },

    getScrollPos() {
      let clientCenter = document.documentElement.clientHeight / 2;
      let centerY = window.scrollY + clientCenter;
      let direction = centerY > this.prevPosY ? "down" : "up";

      if (direction === "down") {
        // total = this.article.count
        // this.charactersVis

        // let p = (100 * centerY) / (this.scrollHeight - clientCenter);
        // let label = this.$refs["label"];

        // if (label) {
        //   label.style.left = p + "%";
        //   // label.innerHTML = "$ " + (p / 100).toFixed(2);
        // }

        this.prevPosY = centerY;
      }
    },

    aos() {
      // console.log("aos");

      let animTargets = document.querySelectorAll("[data-aos]");
      [].forEach.call(animTargets, (target) => {
        let startAt = parseInt(target.dataset.aos);
        let rect = target.getBoundingClientRect();
        let elemTop = rect.top;
        // let elemBottom = rect.bottom;

        target.style.opacity = "0"; // hide element by default

        let startTrigger =
          elemTop < window.innerHeight * (startAt / 100) && elemTop > 0;

        // console.log(target.classList + " " + elemTop);

        if (startTrigger) {
          if (!target.classList.contains("start-animation")) {
            target.classList.add("start-animation");
            if (target.dataset.chars) {
              this.charactersVisible += parseInt(target.dataset.chars);

              let p = (100 * this.charactersVisible) / this.article.count;
              console.log(p);
              let bar = this.$refs["bar"];
              let label = this.$refs["label"];

              if (bar && label) {
                bar.style.width = p + "%";
                label.style.left = p + "%";
              }
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
    width: 0;
    background: rgb(117, 93, 241);
    background: linear-gradient(
      141deg,
      rgba(117, 93, 241, 1) 0%,
      rgba(149, 94, 174, 1) 81%
    );

    transition: width 0.3s ease-out;
  }

  .progress-label {
    position: absolute;

    top: calc(50% - $fontsize / 2);
    padding-left: 3px;
    // color: #fff;
    font-size: $fontsize;
    line-height: 1;
    font-weight: 700;
    z-index: 3;
    transition: left 0.3s ease-out;
  }

  // .end-label {
  //   position: absolute;
  //   bottom: 0;
  //   right: 0;
  //   // width: 30px;
  //   // height: 30px;
  //   // border-radius: 50%;
  //   // background-color: var(--bs-secondary);
  //   // color: #fff;
  //   font-size: 0.65rem;
  //   font-weight: 500;
  // }
}
</style>
