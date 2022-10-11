<template>
  <div class="footer mt-3 mt-xl-5 border-top border-light">
    <div class="py-2">
      <div class="container-xl" style="font-size: 0.91rem">
        <div class="row g-0 g-md-3">
          <div
            class="col-12 col-lg-auto text-center text-lg-left align-self-center"
          >
            <nuxt-link
              to="/"
              class="footer-logo my-2 d-block"
              aria-label="to homepage"
            >
              <img src="@/images/logo.svg" alt="" />
            </nuxt-link>
          </div>
          <div class="col-7 col-lg-auto align-self-center">
            <a href="https://www.codesparks.nl" target="_blank">
              © 2022 Anneloes Louwe
            </a>
          </div>
          <div class="col-5 col-lg text-end text-lg-left align-self-center">
            <nuxt-link to="/privacy">Privacy policy</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;

  &__inner {
    min-height: 40vh;
  }

  &-logo {
    img {
      width: min(50vw, 150px);
      filter: grayscale(1);
    }
  }
}
</style>
