<template>
  <nuxt-link :to="'/c/' + category.slug" class="position-relative zoom-in">
    <div v-if="borderTop" class="w-100 border-top d-md-none"></div>

    <div class="row gx-3 my-3 my-md-0">
      <div class="col-3 col-md-12">
        <div class="position-relative">
          <div class="ratio ratio-1x1">
            <div
              class="card-img position-absolute rounded bg-light"
              :style="{
                backgroundImage: `url(${require('@/images/' +
                  category.slug +
                  '/' +
                  category.visual +
                  '.jpg')}`,
              }"
            >
              {{ category.visual === "none" ? category.visual : "" }}
            </div>

            <div
              class="card-img-overlay rounded pb-3 px-3 px-lg-3 pb-lg-2 d-none d-md-flex"
            >
              <h2 class="text-white fs-2">
                {{ category.title }}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9 d-md-none align-self-center">
        <h2 class="fs-5">{{ category.title }}</h2>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
    };
  },

  props: {
    category: {
      type: [Array, Object],
      default: () => [],
    },
    borderTop: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    visual() {
      return (
        "@/images/" +
        this.category.slug +
        "/" +
        this.category.visual +
        ".jpg"
      ).toString();
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.zoom-in {
  overflow: hidden;

  &:hover .card-img {
    background-size: 160%;
  }
}

.card-img {
  height: 100%;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-size 0.4s 0.15s cubic-bezier(0.2, 0, 0.1, 1);
  background-size: 150%;
}

.card-img-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 59%);
  z-index: 3;
}
</style>
