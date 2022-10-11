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
            <li>{{ datestring }}</li>
            <li v-if="category">{{ category }}</li>
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

                <span id="characters" v-if="post.content">
                  {{ post.content ? post.content.length : 0 }}
                </span>
                characters

                <!-- 
                <p>
                  <span>{{ text.length }}</span> characters <br />You receive
                  {{ text.length * 10 }} microNEAR when someone reads the whole
                  post.
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
              <!-- <label for="category">Category</label> -->

              <select
                class="form-select"
                aria-label="category select"
                id="category"
                @change="setCategory($event)"
              >
                <option selected>Select channel</option>
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
                  The introduction should be at least 100 characters.
                </span>
                <span class="text-danger" v-if="intro.length > 200">
                  The introduction can't have more than 200 characters.
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
          v-if="post.title && post.visual && post.intro"
        >
          <h2 class="fs-5">Preview:</h2>
          <template>
            <card :post="post" />
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

export default {
  data() {
    return {
      showModal: false,
      image: -1,
      intro: "",
      text: "",
      category: undefined,
      post: {},
    };
  },

  computed: {
    date() {
      return new Date(Date.now());
    },

    datestring() {
      return this.date.toLocaleDateString("us-EN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },

    categories() {
      return this.$store.state.categories;
    },

    validFields() {
      return (
        this.post.intro &&
        this.post.intro.length >= 100 &&
        this.post.intro.length <= 200 &&
        this.post.title &&
        this.post.title.length > 0 &&
        this.post.visual &&
        this.post.category &&
        this.post.content
      );
    },
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },

    selectImage(i) {
      this.image = i;
      // this.post["visual"] = i;
      Vue.set(this.post, "visual", { name: i, path: "new" });

      this.showModal = !this.showModal;
    },

    setTitle(e) {
      Vue.set(this.post, "title", e);
      let slug = e.toLowerCase().replace(" ", "-");
      Vue.set(this.post, "slug", slug);
    },

    setIntro(e) {
      // console.log(e);
      this.intro = e;
      // this.post["intro"] = e;
      Vue.set(this.post, "intro", e);
    },

    setText(e) {
      let parts = e.split(/(?:\r?\n)+/);

      if (parts.length > 0) {
        let a = [];
        let end = 0;
        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) {
            let p = {};

            // let p = paragraphs[i];
            if (parts[i].startsWith("**")) {
              //title
              let title = parts[i].replaceAll("**", "");
              if (title.length > 0) {
                p["title"] = title;
                end += title.length;
                p["titleEnd"] = end;

                if (parts[i + 1]) {
                  p["content"] = parts[i + 1];
                  end += p["content"].length;
                  p["end"] = end;

                  i = i + 1; // skip next part
                }
              }
            } else {
              // content
              p["content"] = parts[i];
              end += p.content.length;
              p["end"] = end;
            }
            a.push(p);
          }
        }
        Vue.set(this.post, "content", a);
        Vue.set(this.post, "total", end);
      }
    },

    setCategory(e) {
      // console.log(e.target.value);
      Vue.set(this.post, "category", e.target.value);
    },

    publishArtice() {
      let id = this.$store.state.posts.length + 1;
      console.log(id);

      Vue.set(this.post, "id", id);
      Vue.set(this.post, "author", 43); // me
      Vue.set(this.post, "date", this.date);
      Vue.set(this.post, "views", 0);

      // console.log(this.post);
      this.$store.commit("addPost", this.post);
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
