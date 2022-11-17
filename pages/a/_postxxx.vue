<template>
  <main>
    <div class="container-xl" v-if="post">
      <div class="row min-vh-100 pb-5">
        <div
          :class="
            $options.type === 'article'
              ? 'col-12 col-md-10 offset-md-1'
              : 'col-4 col-sm-3 col-md-2 offset-md-1 offset-lg-2 align-self-center'
          "
        >
          <div
            class="post-img ratio rounded mb-2 bg-light"
            :class="$options.type === 'article' ? 'ratio-3x1' : 'ratio-3x4'"
            :style="{
              backgroundImage: `url(${require('@/images/' + post.visual)}`,
            }"
          ></div>
        </div>

        <div
          :class="
            $options.type === 'article'
              ? 'col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2'
              : 'col-12 col-sm-8 col-lg-6 xxxmb-5 align-self-center'
          "
        >
          <nuxt-link :to="'/c/' + post.category" class="badge bg-secondary">
            {{ categoryName }}
          </nuxt-link>

          <ul class="bullet-list-inline mt-1 mb-1">
            <li>
              {{ formatDate(post.date) }}
            </li>
            <li v-if="post.views">
              <i class="bi bi-eye"></i> {{ post.views }} reads
            </li>
            <li
              class="text-danger cursor-pointer"
              v-if="mine"
              @click="removePost()"
            >
              Depublish
            </li>
          </ul>

          <h1>
            {{ post.title }}
          </h1>

          <h2 class="fs-3 author">
            By
            <nuxt-link class="text-secondary" :to="'/w/' + author.slug">
              {{ author.name }}
            </nuxt-link>
          </h2>
          <template v-if="post.price > 0">
            <p>
              Price: <b>{{ post.price.toFixed(1) }}</b> <small>NEAR</small> /
              <b>{{ price }}</b> <small>USD</small>
            </p>
            <span
              v-if="paid === 0"
              class="btn cursor-pointer bg-light"
              @click="payFullArticle"
            >
              Buy
            </span>
          </template>
          <p v-else>
            <span class="badge bg-secondary text-white"> FREE </span>
          </p>
        </div>

        <div class="col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2 mt-3">
          <div class="accordion mb-4">
            <div class="accordion-item">
              <h2 class="accordion-header" @click="toggleAccordion('blurb')">
                <div class="accordion-button cursor-pointer">
                  {{ $options.type === "article" ? "Introduction" : "Blurb" }}
                </div>
              </h2>
              <div class="accordion-collapse" v-if="showBlurb">
                <div class="accordion-body">
                  <p>{{ post.intro }}</p>
                </div>
              </div>
            </div>
            <div
              class="accordion-item"
              v-if="$options.type === 'book' && numChapters && numChapters > 0"
            >
              <h2 class="accordion-header" @click="toggleAccordion('contents')">
                <div class="accordion-button cursor-pointer">
                  Contents ({{ numChapters }} chapter<span
                    v-if="numChapters > 1"
                    >s</span
                  >)
                </div>
              </h2>
              <div class="accordion-collapse" v-if="showContents">
                <div class="accordion-body" style="min-height: 300px">
                  <ul class="m-3 list-unstyled">
                    <template v-for="(p, i) in content">
                      <li v-if="p.title" :key="i">
                        {{ p.title }}
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row no-select">
        <div class="col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2">
          <template v-for="(p, i) in content">
            <h2
              :key="'title' + i"
              v-if="p.title"
              class="fs-5"
              :class="historicProgress < p.progress ? 'fade-in-up' : false"
              :data-aos="historicProgress < p.progress ? 70 : undefined"
            >
              {{ p.title }}
            </h2>

            <p
              :key="i"
              :class="historicProgress < p.progress ? 'fade-in-up' : false"
              :data-aos="historicProgress < p.progress ? 70 : undefined"
            >
              {{ p.content }}
            </p>

            <small
              class="fw-bold text-danger"
              :key="'error' + i"
              v-if="i === nowReading && error"
            >
              [{{ error }}]
            </small>

            <div
              class="fw-bold text-warning"
              :key="'message' + i"
              v-if="i === nowReading && message"
            >
              [{{ message }}]
              <span
                class="badge cursor-pointer bg-light text-primary"
                @click="payFullArticle"
              >
                Buy full article
              </span>
            </div>
            {{ p.progress }}

            <div
              v-if="i < content.length - 1"
              :key="'payment' + i"
              :id="i"
              :data-aos="historicProgress < p.progress ? 70 : undefined"
              :data-progress="
                content[i].progress < content[i + 1].progress
                  ? p.progress
                  : false
              "
            ></div>

            <div :id="'c' + p.progress" :key="'anchor' + i"></div>
          </template>

          <p class="text-secondary" v-if="!mine && post.price > 0">
            Thank you for supporting
            <b>
              <nuxt-link :to="'/w/' + author.slug" class="text-secondary">
                {{ author.name }}
              </nuxt-link> </b
            >!
          </p>

          <social-share :title="post.title" :cid="post.cid || false" />
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
          <card
            :post="a"
            :showIntro="false"
            :blurb="false"
            :borderTop="i !== 0"
          />
        </div>
      </div>
      <div class="progress position-fixed bottom-0 start-0 end-0">
        <div class="bar bg-primary h-100 start-0 position-absolute" ref="bar">
          <div class="label text-white align-end">
            {{ progress }}<small>%</small>&nbsp;
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import getUSD from "@/utils/getUSD.js";
import { payAuthor } from "@/utils/sender.js";

export default {
  transition: "post", // important for scroll position on page load!
  type: "article",
  data() {
    return {
      scrollHeight: 0,
      scrollY: 0,
      prevPosY: 0,
      progress: 0,
      historicProgress: 0,
      posts: () => {},
      post: () => {},
      nearusd: 1,
      showBlurb: true,
      showContents: false,
      numChapters: 0,
      nowReading: 0, // = current paragraph ID
      paid: 0,
      freeze: false, // freeze scroll whilst waiting for transaction
      error: undefined, // error message after unsuccesful payment
      message: undefined, // message after succesfull payment
    };
  },

  async created() {
    this.posts = this.$store.state.posts;
    this.post = this.posts.find((a) => a.slug === this.$route.params.post);
    this.nearusd = await getUSD();
  },

  async fetch() {
    await this.validatePage();
  },

  async mounted() {
    this.scrollHeight = document.body.scrollHeight;
    window.addEventListener("scroll", this.aos);

    if (!this.$store.state.user) return;

    let history = this.$store.state.user.history.find(
      (a) => a.id === this.post.id
    );

    if (history) {
      this.historicProgress = history.progress;
      this.progress = history.progress;
      this.paid = history.progress;
      this.par = history.par;
      this.updateBar();
    }
  },

  beforeDestroy() {
    if (this.post && !this.mine) {
      this.$store.commit("setProgress", {
        id: +this.post.id,
        progress: +this.progress,
      });
    }

    window.removeEventListener("scroll", this.aos);
  },

  watch: {
    progress: function (val) {
      if (val === 100 && !this.mine) {
        this.$store.commit("updateViews", this.post.id);
      }
    },
  },

  computed: {
    maxTitleLength() {
      return this.$options.type === "article" ? 50 : 80;
    },

    categoryName() {
      return this.$store.state.categories.find(
        (c) => c.slug === this.post.category
      ).title;
    },

    mine() {
      // post is written by the user himself
      if (!this.$store.state.user) return false;

      return (
        this.$store.state.user.id === this.author.id ||
        this.$store.state.user.id === this.author.address
      );
    },

    content() {
      let parts = this.post.content.split(/(?:\r?\n)+/) || [];
      let a = [];
      let end = 0;
      for (let i = 0; i < parts.length; i++) {
        let p = {};
        if (this.isChapterTitle(parts[i])) {
          end += parts[i].length;
          p["title"] = parts[i];
          p["progress"] = this.computeProgress(end);
          this.numChapters += 1;
          if (parts[i + 1]) {
            end += parts[i + 1].length;
            p["content"] = parts[i + 1];
            p["progress"] = this.computeProgress(end);
            i = i + 1; // skip next part
          }
        } else {
          end += parts[i].length;
          p["content"] = parts[i];
          p["progress"] = this.computeProgress(end);
        }
        a.push(p);
      }
      return a;
    },

    price() {
      return (this.post.price * this.nearusd).toFixed(2);
    },

    author() {
      return this.$store.state.writers.find((a) => a.id === this.post.author);
    },
  },

  methods: {
    isChapterTitle(p) {
      return p.length <= this.maxTitleLength;
    },

    unfreezeWindow() {
      document.body.classList.remove("disable-scroll");
      this.freeze = false;
      window.scrollTo(0, this.scrollY);
    },

    freezeWindow() {
      this.freeze = true;
      document.body.style.top = `-${this.scrollY}px`;
      document.body.classList.add("disable-scroll");
    },

    computeProgress(end) {
      // percentage of post read after reading this part [10%, 20%, ..., 100%]
      return Math.round((end * 10) / this.post.content.length) * 10;
    },

    toggleAccordion() {
      this.showContents = !this.showContents;
      this.showBlurb = !this.showBlurb;
    },
    validatePage() {
      if (!this.post) {
        return this.$nuxt.error({
          statusCode: 404,
          message: "Article not found",
        });
      }
    },

    removePost() {
      this.$store.commit("removePost", this.post.id);
      this.$router.back();
    },

    formatDate(date) {
      return new Date(date * 1000).toLocaleDateString("us-EN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },

    updateBar() {
      this.$refs["bar"].style.width = this.$refs["bar"]
        ? this.progress + "%"
        : 0;
    },

    async payFullArticle() {
      let toPay = ((this.progress - this.paid) / 100) * this.post.price;

      let remainder = this.price - toPay;
      console.log(this.price);
      console.log(toPay);
      if (remainder > 0) {
        // const result = await payAuthor(remainder, this.author.address);
        this.paid = 100;
      }
      this.nowReading = -1; // hide messages
    },

    async aos() {
      let scrollY = window.pageYOffset;
      let direction = scrollY > this.prevPosY ? "down" : "up";
      if (direction === "up") return;

      this.scrollY = window.scrollY; // for freeze method
      let animTargets = document.querySelectorAll("[data-aos]");
      for (let i = 0; i < animTargets.length; i++) {
        let target = animTargets[i];
        let top = target.getBoundingClientRect().top;

        if (top < window.innerHeight * (+target.dataset.aos / 100) && top > 0) {
          if (!target.classList.contains("start-animation")) {
            if (target.dataset.progress && !this.mine && this.post.price > 0) {
              // trigger paywall
              if (!window.near || !this.$store.state.user) {
                this.$store.commit("toggleModal");
                document.getElementById("page").classList.toggle("is-blurred");
                this.prevPosY = window.scrollY;
                return; //break;
              }

              this.nowReading = +target.id;

              let toPay =
                ((target.dataset.progress - this.paid) / 100) * this.post.price;
              toPay = toPay.toFixed(2);

              if (toPay > 0) {
                this.error = undefined;
                this.message = undefined;

                console.log("PAY NOW! " + toPay);

                this.freezeWindow();

                const result = await payAuthor(toPay, this.author.address);

                console.log(result);

                if (result.error && result.error === "User reject") {
                  this.error = "You rejected to sign the transaction";
                } else {
                  this.message = `Succesfully transferred ${toPay} NEAR to ${this.author.name} (${this.author.address})`;
                  this.progress = parseInt(target.dataset.progress);
                  this.updateBar();
                  // this.payment = toPay;
                  this.paid = this.progress;
                  target.classList.add("start-animation");
                  delete target.dataset.aos;
                }

                this.unfreezeWindow();
              } else {
                target.classList.add("start-animation");
                delete target.dataset.aos;
              }
            } else {
              //title or mine or free
              if (this.post.price === 0 && target.dataset.progress) {
                this.progress = parseInt(target.dataset.progress);
                this.updateBar();
              }
              target.classList.add("start-animation");
              delete target.dataset.aos;
            }
          }
          this.prevPosY = window.scrollY;
          break; // --> at most one animation per scroll event !
        }
      }
      this.prevPosY = window.scrollY;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  small {
    opacity: 0;
    transition: opacity 0.24s ease-out;
  }

  &:hover small {
    opacity: 0.19;
  }
}

h2.author {
  span {
    opacity: 0;
    transition: opacity 0.24s ease-out;
  }

  &:hover span {
    opacity: 1;
  }
}

.no-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.post-img {
  width: 100%;
  height: auto;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-size 0.3s 0.15s cubic-bezier(0.2, 0, 0.1, 1);
  background-size: 115%;
}

$fontsize: 14px;
.progress {
  height: 1.9vh;
  background-color: var(--bs-gray-400);
  z-index: 9;

  .bar {
    position: relative;
    width: 0;
    transition: width 0.8s ease-out;
    will-change: width;
    overflow: hidden;

    .label {
      position: absolute;
      font-size: $fontsize;
      line-height: 1;
      width: 100%;
      left: 0;
      right: 0;
      top: calc(50% - 7px);
      height: 100%;
      text-align: right;
      word-wrap: none;
    }
  }
}

@keyframes short {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.error {
  font-size: $fontsize;
  line-height: 1;
  opacity: 0.9;
  background-color: var(--bs-gray-400);
}

.accordion-button {
  &::after {
    display: none;
  }
}
</style>
