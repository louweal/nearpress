<template>
  <div class="channel-list d-sm-none" v-if="$store.state.user">
    <div class="channel-list__inner hstack gap-2 mb-2 text-nowrap">
      <nuxt-link
        :to="'/c/' + c.slug"
        v-for="(c, i) in channels"
        :key="i"
        class="btn btn-warning"
      >
        {{ c.title }}
      </nuxt-link>
    </div>

    <!-- <div class="channel-list__overlay channel-list__overlay--left">
      <i class="bi bi-chevron-left"></i>
    </div>
    <div class="channel-list__overlay channel-list__overlay--right">
      <i class="bi bi-chevron-right"></i>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    channels: {
      type: [Object, Array],
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.channel-list {
  max-width: 100%;
  position: relative;

  &__inner {
    overflow-x: scroll;
    position: relative;
  }

  &__overlay {
    position: absolute;
    height: 100%;
    width: 12%;
    top: 0;
    bottom: 0;
    color: #000;

    &--left {
      left: 0;
      background: #f4f4f4;
      background: linear-gradient(
        90deg,
        rgba(#f4f4f4, 1) 0%,
        rgba(#f4f4f4, 0) 70%
      );
    }

    &--right {
      right: 0;
      text-align: right;

      background: #f4f4f4;
      background: linear-gradient(
        90deg,
        rgba(#f4f4f4, 0) 0%,
        rgba(#f4f4f4, 1) 70%
      );
    }
  }
}
</style>
