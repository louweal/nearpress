<template>
  <main>
    <div class="container-lg">
      <div class="text-center">
        <h1 class="text-secondary fs-2 pb-3">
          {{ error ? error.message : "Something went wrong" }} :(
        </h1>

        <nuxt-link to="/" class="btn btn-secondary"> Return home </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  transition: "page",

  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
