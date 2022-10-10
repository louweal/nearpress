<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-10 offset-md-1">
          <form>
            <div class="form-group d-grid">
              <div
                class="ratio ratio-16x9 field--upload rounded image cursor-pointer"
                @click="toggleModal"
                :style="{
                  backgroundImage:
                    image !== -1
                      ? `url(${require('@/images/new/' + image + '.jpg')})`
                      : false,
                }"
              >
                <p v-if="image === -1">Click to select an image</p>
              </div>
            </div>
          </form>
        </div>
        <div class="col-12 col-md-8 offset-md-2">
          <ul class="bullet-list-inline mt-2">
            <li v-if="$store.state.user">{{ $store.state.user.name }}</li>
            <li>{{ date }}</li>
            <li v-if="channel">{{ channel }}</li>
          </ul>
          <form class="gy-3">
            <div class="vstack gap-2">
              <div class="form-group">
                <textarea
                  class="form-control fs-2 fw-bold"
                  id="title"
                  rows="2"
                  @input="(e) => setTitle(e.target.value)"
                  placeholder="Title"
                ></textarea>
              </div>

              <div class="form-group">
                <p>
                  <b>Tip:</b> To create a sub-heading, add two asterisks before
                  and after a word or phrase: e.g. <b>**I'm a heading**</b>.
                </p>
                <textarea
                  class="form-control"
                  id="content"
                  rows="16"
                  @input="(e) => setText(e.target.value)"
                  placeholder="Text"
                ></textarea>

                <span id="characters" v-if="article.content">{{
                  article.content.length
                }}</span>
                characters

                <!-- 
                <p>
                  <span>{{ text.length }}</span> characters <br />You receive
                  {{ text.length * 10 }} microNEAR when someone reads the whole
                  article.
                </p> -->
              </div>
            </div>
          </form>
        </div>

        <div class="mt-4"></div>

        <div class="col-12 col-md-5 offset-md-2">
          <h2 class="fs-5">Metadata</h2>

          <form>
            <div class="form-group">
              <!-- <label for="channel">Channel</label> -->

              <select
                class="form-select"
                aria-label="channel select"
                id="channel"
                @change="setChannel($event)"
              >
                <option selected>Select channel</option>
                <option
                  :value="c.slug"
                  v-for="(c, i) in [...$options.channels].sort((a, b) =>
                    a.title > b.title ? 1 : -1
                  )"
                  :key="i"
                >
                  {{ c.title }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="intro">Introduction (shown on overview pages)</label>

              <textarea
                class="form-control"
                id="intro"
                rows="3"
                @input="(e) => setIntro(e.target.value)"
              ></textarea>

              <p>
                <span id="characters">{{ intro.length }}</span> characters
                <br />
                <span class="text-danger" v-if="intro.length < 100">
                  Introduction length should be >= 100 characters.
                </span>
                <span class="text-danger" v-if="intro.length > 200">
                  Introduction length should be less than or equal to 200
                  characters.
                </span>
              </p>
            </div>

            <div
              v-if="validFields"
              class="btn btn-secondary"
              @click="publishArtice()"
            >
              Publish
            </div>
          </form>
        </div>

        <div
          class="col-12 col-md-3"
          v-if="article.title && article.visual && article.intro"
        >
          <h2 class="fs-5">Preview:</h2>
          <template>
            <card :article="article" />
          </template>
        </div>
      </div>
    </div>

    <div class="modal" :class="showModal ? 'modal--active' : 'modal--inactive'">
      <div class="modal__bg" @click="toggleModal"></div>
      <div class="modal__inner">
        <div class="modal__content p-2 rounded border">
          <div class="d-flex justify-content-between">
            <h2 class="fs-5">Select image (demo)</h2>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="toggleModal"
            ></button>
          </div>
          <div class="row g-1">
            <div class="col-4" v-for="i in 9" :key="i" :set="(j = i + 1)">
              <div class="ratio ratio-16x9 cursor-pointer">
                <div
                  class="position-absolute rounded bg-light image"
                  @click="selectImage(i)"
                  :style="{
                    backgroundImage: `url(${require('@/images/new/' +
                      i +
                      '.jpg')})`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from "vue";

import channels from "@/data/channels.json";

export default {
  channels,

  data() {
    return {
      showModal: false,
      image: -1,
      intro: "",
      text: "",
      channel: undefined,

      article: {},
    };
  },

  computed: {
    date() {
      return new Date(Date.now()).toLocaleDateString("us-EN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },

    validFields() {
      return (
        this.article.intro &&
        this.article.intro.length >= 100 &&
        this.article.intro.length <= 200 &&
        this.article.title &&
        this.article.title.length > 0 &&
        this.article.visual &&
        this.article.channel &&
        this.article.content
      );
    },
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },

    selectImage(i) {
      this.image = i;
      // this.article["visual"] = i;
      Vue.set(this.article, "visual", { name: i, path: "new" });

      this.showModal = !this.showModal;
    },

    setTitle(e) {
      Vue.set(this.article, "title", e);
      let slug = e.toLowerCase.replace(" ", "-");
      Vue.set(this.article, "slug", slug);
    },

    setIntro(e) {
      // console.log(e);
      this.intro = e;
      // this.article["intro"] = e;
      Vue.set(this.article, "intro", e);
    },

    setText(e) {
      let p = e.split(/(?:\r?\n)+/);
      console.log(p);
      Vue.set(this.article, "content", e);
    },

    setChannel(e) {
      // console.log(e.target.value);
      Vue.set(this.article, "channel", e.target.value);
    },

    publishArtice() {
      let id = this.$store.state.articles.length + 1;
      console.log(id);

      Vue.set(this.article, "id", id);
      Vue.set(this.article, "author", this.$store.state.user.name);

      Vue.set(this.article, "date", this.date);
      this.$store.commit("addArticle", this.article);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.field--upload {
  background-color: #f4f4f4;
  border: 1px solid var(--bs-gray-400);
  overflow: hidden;

  p {
    display: block;
    width: 100%;
    // height: 50%;
    text-align: center;
    transform: translateY(calc(50% - 1rem));
  }
}

.image {
  background-size: 120%;
  background-position: center center;
}
</style>
