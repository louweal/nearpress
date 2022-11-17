<template>
  <div
    class="overlay w-100 h-100 position-absolute top-0"
    :class="$store.state.showOverlay ? 'overlay--active' : 'overlay--inactive'"
  ></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 2000;
  background-color: rgba(#eee, 0.3);

  &--active {
    visibility: visible;
  }

  &--inactive {
    visibility: hidden;
  }
}
</style>
