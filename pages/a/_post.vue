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
          </template>
          <p v-else>
            <span class="badge bg-secondary text-white"> FREE </span>
          </p>
        </div>

        <div class="col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2 mt-3">
          <div class="accordion mb-4">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <div class="accordion-button cursor-pointer">Introduction</div>
              </h2>
              <div class="accordion-collapse">
                <div class="accordion-body">
                  <p>{{ post.intro }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row no-select">
        <div class="col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2">
          <div v-if="!mine" data-action="connect" data-aos="70">
            <!-- triggers connect wallet modal -->
          </div>
          <template v-for="(p, i) in content">
            <h2 :key="'title' + i" v-if="p.title" class="fs-5">
              {{ p.title }}
            </h2>

            <p :key="i">
              {{ p.content }}
            </p>
          </template>

          <div v-if="!mine" data-action="pay" data-aos="90">
            <!-- triggers payment prompt -->
          </div>

          <p
            class="text-secondary fade-in-up"
            v-if="!mine && post.price > 0"
            data-aos="90"
          >
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
    </div>
  </main>
</template>

<script>
import getUSD from "@/utils/getUSD.js";
import { payAuthor } from "@/utils/sender.js";

export default {
  type: "article",
  data() {
    return {
      scrollHeight: 0,
      scrollY: 0,
      prevPosY: 0,
      progress: 0,
      posts: () => {},
      post: () => {},
      nearusd: 1,
      freeze: false, // freeze scroll whilst waiting for transaction
      error: undefined, // error message after unsuccesful payment
      message: undefined, // message after succesfull payment
      debt: 0,
    };
  },

  async created() {
    this.posts = this.$store.state.posts;
    this.post = this.posts.find((a) => a.slug === this.$route.params.post);
    this.nearusd = await getUSD();
  },

  async fetch() {
    await this.validatePage();
    await this.checkDebt();
  },

  async mounted() {
    this.scrollHeight = document.body.scrollHeight;
    window.addEventListener("scroll", this.aos);

    if (!this.$store.state.user) return;

    let history = this.$store.state.user.history.find(
      (a) => a.id === this.post.id
    );

    if (history) {
      this.progress = history.progress;
    }
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.aos);
  },

  watch: {
    progress: function (val) {
      if (val === 100 && !this.mine) {
        this.$store.commit("updateViews", this.post.id);
      }
    },
    "$store.state.user": function () {
      if (this.$store.state.user.debt) {
        return this.$nuxt.error({
          statusCode: 402,
          from: this.$route.path,
          message: `Payment required: ${this.$store.state.user.debt.amount} NEAR`,
        });
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
          this.numChapters += 1;
          if (parts[i + 1]) {
            end += parts[i + 1].length;
            p["content"] = parts[i + 1];
            i = i + 1; // skip next part
          }
        } else {
          end += parts[i].length;
          p["content"] = parts[i];
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

    validatePage() {
      if (!this.post) {
        return this.$nuxt.error({
          statusCode: 404,
          message: "Article not found",
        });
      }
    },
    checkDebt() {
      if (!this.$store.state.user) return;
      if (this.$store.state.user.debt) {
        return this.$nuxt.error({
          statusCode: 402,
          from: this.$route.path,
          message: `Debt payment required: ${this.$store.state.user.debt.amount} NEAR`,
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

    async aos() {
      // actions on scroll
      let scrollY = window.pageYOffset;
      let direction = scrollY > this.prevPosY ? "down" : "up";
      if (direction === "up") return;

      this.scrollY = window.scrollY; // for freeze method
      let actionTargets = document.querySelectorAll("[data-aos]");
      for (let i = 0; i < actionTargets.length; i++) {
        let target = actionTargets[i];
        let top = target.getBoundingClientRect().top;

        if (top < window.innerHeight * (+target.dataset.aos / 100) && top > 0) {
          if (!target.classList.contains("start-animation")) {
            if (target.dataset.action === "connect") {
              // trigger wallet connector
              if (!window.near || !this.$store.state.user) {
                this.$store.commit("toggleModal");
                document.getElementById("page").classList.toggle("is-blurred");
                this.prevPosY = window.scrollY;
                return;
              }
            }

            if (target.dataset.action === "pay" && this.progress !== 100) {
              this.freezeWindow();

              const result = await payAuthor(
                this.post.price,
                this.author.address,
                this.post.title
              );

              // console.log(result);

              if (result.error && result.error === "User reject") {
                this.unfreezeWindow();

                this.$store.commit("updateUserDebt", {
                  id: this.post.id,
                  title: this.post.title,
                  author: this.author.address,
                  amount: this.post.price,
                });

                return this.$nuxt.error({
                  statusCode: 402,
                  from: this.$route.path,
                  message: `Payment required: ${this.$store.state.user.debt.amount} NEAR`,
                });
              } else {
                this.progress = 100;

                this.$store.commit("setProgress", {
                  id: +this.post.id,
                  progress: +this.progress,
                });
              }

              this.unfreezeWindow();
              return;
            }

            target.classList.add("start-animation");
            delete target.dataset.aos;
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
  background-size: 115%;
}

.accordion-button {
  &::after {
    display: none;
  }
}
</style>
