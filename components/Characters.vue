<template>
  <div class="characters">
    <character v-for="i in 30" :key="i" />
    <character v-for="j in 30" :min="66" :key="'j' + j" />
    <character v-for="k in 30" :min="33" :key="'k' + k" />

    <character v-for="i in 90" :key="'l' + i" class="d-none d-lg-block" />
    <character
      v-for="j in 150"
      :min="66"
      :key="'m' + j"
      class="d-none d-lg-block"
    />
    <character
      v-for="k in 150"
      :min="33"
      :key="'n' + k"
      class="d-none d-lg-block"
    />
  </div>
</template>

<style lang="scss" scoped>
.characters {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  background: #f4f4f4; // rgb(232, 232, 232);
  background: linear-gradient(
    180deg,
    rgba(#f4f4f4, 1) 0%,
    rgba(255, 255, 255, 1) 47%
  );
}
</style>
