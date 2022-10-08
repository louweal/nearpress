<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-10 offset-md-1">
          <form>
            <div class="form-group d-grid">
              <!-- <label for="image">Image</label> -->

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
          <!-- <h1>Write article</h1> -->
          <form class="gy-3">
            <div class="vstack gap-2">
              <div class="form-group">
                <!-- <label for="title ">Title</label> -->
                <!-- <input
                  type="text"
                  class="form-control fs-2 fw-bold"
                  id="title"
                /> -->

                <textarea
                  class="form-control fs-2 fw-bold"
                  id="title"
                  rows="2"
                  @input="(e) => setTitle(e.target.value)"
                  placeholder="Title"
                ></textarea>
              </div>

              <div class="form-group">
                <!-- <label for="content">Text</label> -->

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

                <p>
                  <span>{{ text.length }}</span> characters <br />You receive
                  {{ text.length * 10 }} microNEAR when someone reads the whole
                  article.
                </p>
              </div>
            </div>
          </form>
        </div>

        <div class="col-12 col-md-5 offset-md-2">
          <h2 class="fs-5">Metadata</h2>

          <div class="form-group">
            <!-- <label for="channel">Channel</label> -->

            <select
              class="form-select"
              aria-label="channel select"
              id="channel"
            >
              <option selected>Select channel</option>
              <option
                value="c.slug"
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

            <p>
              Your article introduction has to be between 100 and 200
              characters.
            </p>

            <textarea
              class="form-control"
              id="intro"
              rows="3"
              @input="(e) => setIntro(e.target.value)"
            ></textarea>

            <p>
              <span id="characters">{{ intro.length }}</span> characters
            </p>
          </div>

          <button class="btn btn-secondary" type="submit">Publish</button>
        </div>

        <div class="col-12 col-md-3">
          <h2 class="fs-4">Preview</h2>
          <template v-if="article.title && article.visual && article.intro">
            <card :article="article" />
          </template>
        </div>
        <!-- </form> -->
        <!-- </div> -->
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

      article: {
        channel: "new",
      },
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
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },

    selectImage(i) {
      this.image = i;
      // this.article["visual"] = i;
      Vue.set(this.article, "visual", i);

      this.showModal = !this.showModal;
    },

    setTitle(e) {
      Vue.set(this.article, "title", e);
    },

    setIntro(e) {
      // console.log(e);
      this.intro = e;
      // this.article["intro"] = e;
      Vue.set(this.article, "intro", e);
    },

    setText(e) {
      this.text = e;
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
