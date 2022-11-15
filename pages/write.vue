<template>
  <main>
    <div class="container-xl">
      <div class="row">
        <div
          :class="
            $options.type === 'article'
              ? 'col-12 col-md-10 offset-md-1'
              : 'col-4 col-md-2 offset-sm-1 offset-lg-2'
          "
        >
          <div class="form-group d-grid">
            <div
              class="ratio field--upload rounded image cursor-pointer bg-light"
              :class="$options.type === 'article' ? 'ratio-3x1' : 'ratio-3x4'"
              @click="toggleModal"
              :style="{
                backgroundImage:
                  image !== -1
                    ? `url(${require('@/images/' +
                        path +
                        '/' +
                        image +
                        '.jpg')})`
                    : false,
              }"
            >
              <p v-if="image === -1">Click to select an image</p>
            </div>
          </div>
        </div>

        <div
          class=""
          :class="
            $options.type === 'article'
              ? 'col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2 mt-2'
              : 'col-12 col-md-8 col-lg-6 mb-2 align-self-center'
          "
        >
          <div class="row gy-2 my-2">
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <select
                  class="form-select"
                  aria-label="category select"
                  id="category"
                  @change="setCategory($event)"
                >
                  <option selected value="select">
                    Select
                    {{ $options.type === "article" ? "channel" : "genre" }}
                  </option>
                  <option
                    :value="c.slug"
                    v-for="(c, i) in [...categories].sort((a, b) =>
                      a.title > b.title ? 1 : -1
                    )"
                    :key="i"
                  >
                    {{ c.title }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <select
                  class="form-select"
                  aria-label="category select"
                  id="price"
                  @change="setPrice($event)"
                >
                  <option selected value="select">Select price</option>
                  <option
                    :value="p"
                    v-for="(p, i) in [
                      0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9, 1,
                    ]"
                    :key="i"
                  >
                    {{ p }} NEAR / {{ (p * nearusd).toFixed(2) }} USD
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <textarea
              class="form-control fs-2 fw-bold"
              id="title"
              rows="2"
              @input="(e) => setTitle(e.target.value)"
              placeholder="Title"
            ></textarea>
          </div>
        </div>
        <div class="col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2">
          <div class="form-group mt-3">
            <textarea
              class="form-control"
              id="intro"
              :rows="$options.type === 'article' ? 5 : 8"
              :placeholder="
                $options.type === 'article' ? 'Introduction' : 'Blurb'
              "
              @input="(e) => setIntro(e.target.value)"
            ></textarea>

            <ul class="bullet-list-inline">
              <li>
                <span id="characters">{{ post.intro.length }}</span
                >/{{ introMax }} characters
              </li>

              <li v-if="post.intro.length < introMin">
                <span class="text-danger">
                  The minimum length is {{ introMin }} characters.
                </span>
              </li>

              <li v-if="post.intro.length > introMax">
                <span class="text-danger">
                  The maximum length is {{ introMax }} characters.
                </span>
              </li>
            </ul>
          </div>
          <div class="form-group">
            <p class="mb-0">
              <template v-if="$options.type === 'article'">
                <b>Important:</b> Paragraphs shorter than 50 characters will be
                automatically converted to headings after publication.
              </template>
              <template v-else>
                <b>Important:</b> Each chapter title has to start with 'Chapter
                ' or 'CHAPTER ' and has to be shorter than 80 characters.
              </template>
            </p>

            <textarea
              class="form-control"
              id="content"
              rows="20"
              @input="(e) => setText(e.target.value)"
              placeholder="Content"
            ></textarea>

            <ul class="bullet-list-inline">
              <li v-if="numHeadings > 0 && $options.type === 'article'">
                {{ numHeadings }} heading<span v-if="numHeadings > 1">s</span>
              </li>
              <li>{{ post.content ? post.content.length : 0 }} characters</li>

              <li v-if="post.content.length < contentMin">
                <span class="text-danger">
                  The minimum length is {{ contentMin }} characters.
                </span>
              </li>
            </ul>
          </div>

          <div
            class="btn btn-secondary mt-1"
            @click="validFields ? publishPost() : false"
            :class="validFields ? 'opacity-100' : 'opacity-50'"
          >
            Publish
          </div>
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
            <div
              :class="$options.type === 'article' ? 'col-4' : 'col-3'"
              v-for="i in 12"
              :key="i"
            >
              <div
                class="ratio cursor-pointer"
                :class="$options.type === 'article' ? 'ratio-4x3' : 'ratio-3x4'"
              >
                <div
                  class="position-absolute rounded bg-light image"
                  @click="selectImage(i)"
                  :style="{
                    backgroundImage: `url(${require('@/images/' +
                      path +
                      '/' +
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
import getUSD from "@/utils/getUSD.js";

export default {
  type: "article",

  data() {
    return {
      showModal: false,
      image: -1,
      category: undefined,
      post: { intro: "", content: "" },
      nearusd: 1,
      contentMin: 6000,
    };
  },

  async created() {
    if (!this.$store.state.user) return;

    Vue.set(this.post, "author", this.$store.state.user.id);
    Vue.set(this.post, "type", "article"); // ??
    this.nearusd = await getUSD();
  },

  async fetch() {
    await this.validateAccess();
  },

  computed: {
    introMin() {
      return this.$options.type === "article" ? 150 : 250;
    },

    introMax() {
      return this.$options.type === "article" ? 250 : 500;
    },

    path() {
      return this.$options.type === "article" ? "landscape" : "portrait";
    },

    price() {
      return this.post.content
        ? ((this.post.content.length / 1000) * this.nearusd).toFixed(2)
        : -1;
    },

    numHeadings() {
      return this.post.content
        ? this.post.content
            .split(/(?:\r?\n)+/)
            .filter((p) => p.length < 50 && p.length > 0).length
        : "0";
    },

    numChapters() {
      return this.post.content
        ? this.post.content
            .toLowerCase()
            .split(/(?:\r?\n)+/)
            .filter((p) => p.startsWith("chapter ")).length
        : "0";
    },

    me() {
      if (this.$store.state.user) {
        return this.$store.state.user.name; // todo
      }
      return undefined;
    },

    categories() {
      return this.$store.state.categories;
    },

    validFields() {
      return (
        this.post.intro &&
        this.post.intro.length >= this.introMin &&
        this.post.intro.length <= this.introMax &&
        this.post.title &&
        this.post.title.length > 0 &&
        this.post.visual &&
        this.post.category &&
        this.post.content &&
        this.post.price
      );
    },
  },

  watch: {
    "$store.state.user": function () {
      if (this.$store.state.user == undefined) {
        this.$router.push("/");
      }
    },
  },

  methods: {
    validateAccess() {
      if (this.$store.state.user == undefined) {
        return this.$nuxt.error({
          statusCode: 403,
          message: "Access denied",
        });
      }
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },

    selectImage(i) {
      this.image = i;
      Vue.set(this.post, "visual", `${this.path}/${i}.jpg`);

      this.showModal = !this.showModal;
    },

    setTitle(e) {
      Vue.set(this.post, "title", e);
      let slug = e
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replaceAll(" ", "-");
      Vue.set(this.post, "slug", slug);
    },

    setIntro(e) {
      Vue.set(this.post, "intro", e);
    },

    setText(e) {
      Vue.set(this.post, "content", e);
    },

    setCategory(e) {
      if (e.target.value !== "select") {
        Vue.set(this.post, "category", e.target.value);
      } else {
        Vue.set(this.post, "category", undefined);
      }
    },

    setPrice(e) {
      if (e.target.value !== "select") {
        Vue.set(this.post, "price", e.target.value);
      }
    },

    publishPost() {
      Vue.set(this.post, "id", this.$store.state.posts.length + 1);
      Vue.set(this.post, "date", new Date().getTime() / 1000);
      Vue.set(this.post, "views", 0);

      this.$store.commit("addPost", this.post);
      this.$router.push("/a/" + this.post.slug);
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
    text-align: center;
    transform: translateY(calc(50% - 1rem));
  }
}

.image {
  background-size: 120%;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
