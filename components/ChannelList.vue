<template>
  <div class="hstack mx-2 mb-2 d-sm-none" v-if="$store.state.user">
    <nuxt-link :to="'/'" class="btn btn-secondary"> All </nuxt-link>
    <nuxt-link
      :to="'/c/' + c.slug"
      v-for="(c, i) in channels.filter((c) =>
        $store.state.user.channels.includes(c.slug)
      )"
      :key="i"
      class="btn"
    >
      {{ c.title }}
    </nuxt-link>
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

<style></style>
