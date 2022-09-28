<template>
  <nav
    class="xxxshadow-sm navbar navbar-expand-lg bg-white fixed-top p-md-3 px-lg-5"
  >
    <div class="container-fluid">
      <nuxt-link to="/" class="me-4">
        <img src="@/images/logo.svg" alt="" width="203" height="45" />
      </nuxt-link>

      <div class="dropdown">
        <div class="dropdown-toggle" @click="toggleDropdown">Channel</div>
        <div class="dropdown-menu" ref="dropdown-menu">
          <a class="dropdown-item" href="#">Politics</a>
          <a class="dropdown-item" href="#">Crypto currencies</a>
          <a class="dropdown-item" href="#">Web development</a>
        </div>
      </div>
      <div
        @click="$route.path === '/nav' ? $router.back() : $router.push('/nav')"
        class="navbar-toggler"
        aria-label="toggle pushmenu"
      >
        <span
          class="navbar-toggler-icon"
          :class="$route.path === '/nav' ? 'navbar-toggler-icon-close' : false"
        ></span>
      </div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item px-lg-2" v-for="(l, i) in $options.menu" :key="i">
            <nuxt-link :to="l.url" class="nav-link">
              {{ l.title }}
            </nuxt-link>
          </li>

          <li class="ms-lg-4 mt-4 mt-lg-0">
            <div class="btn btn-secondary" xxxclick="togglePopup">
              Connect wallet
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownActive: false,
    };
  },
  methods: {
    toggleDropdown(e) {
      let menu = this.$refs["dropdown-menu"];
      // console.log(e.target);
      if (!this.dropdownActive) {
        menu.style.display = "block";
      } else {
        menu.style.display = "none";
      }
      this.dropdownActive = !this.dropdownActive;
    },
  },
};
</script>
<style lang="scss" scoped>
// .navbar-toggler {
//   border: none;
//   box-shadow: none;
//   padding: 0;
// }

// $btn-close-color: #fff;
// $btn-close-bg: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'><path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/></svg>");

// .navbar-toggler-icon-close {
//   width: 1.3rem;
//   height: 1.3rem;
//   background-image: $btn-close-bg;
// }
</style>
