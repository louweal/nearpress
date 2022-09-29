<template>
  <div class="sticky-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sticky-container {
  height: 100%;

  > :first-child {
    position: sticky;
    top: 1rem;
  }
}
</style>
