<template>
  <div class="pre-loader">
    <div class="pre-loader__inner p-5">
      <div class="d-flex logo">
        <div class="wobbler w-100 h-100">
          <img src="@/images/logo.svg" alt="logo" class="w-100 h-100" />
        </div>
      </div>

      <p class="display-6 fs-1 text-center mt-2">
        <span class="text-primary delay-800">stories.</span>
        <span class="text-primary delay-1400">reimagined.</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.pre-loader {
  background-color: #fff;
  display: block;
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: 3000;
  overflow: hidden;
  animation: disappear 0.3s 2.2s ease-in forwards;

  &__inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo {
      opacity: 0;
      animation: fade-in-up 1.8s cubic-bezier(0.2, 0, 0.1, 1) forwards;
    }

    img {
      // width: 200%;
    }

    p {
      display: block;
      span {
        display: inline-block;

        opacity: 0;
        animation: fade-in-up 0.9s 500ms cubic-bezier(0.2, 0, 0.1, 1) forwards;
      }
    }
  }
}

.delay-800 {
  animation-delay: 800ms !important;
}

.delay-1400 {
  animation-delay: 1400ms !important;
}

@keyframes disappear {
  to {
    transform: translateY(-100%);
  }
}
</style>
