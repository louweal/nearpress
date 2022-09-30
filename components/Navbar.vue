<template>
  <nav
    class="shadow-sm navbar border-bottom navbar-expand-lg bg-white fixed-top p-md-3 px-lg-5"
    ref="header"
    id="header"
  >
    <div class="container">
      <nuxt-link to="/" class="me-4 navbar-logo">
        <img src="@/images/logo.svg" alt="" width="203" height="45" />
      </nuxt-link>

      <div class="dropdown d-none d-sm-inline">
        <div class="dropdown-toggle" @click="toggleDropdown">Channel</div>
        <div class="dropdown-menu" ref="dropdown-menu">
          <a class="dropdown-item" href="/dogs">Dogs</a>
          <a class="dropdown-item" href="/politics">Politics</a>
          <a class="dropdown-item" href="/crypto">Crypto currencies</a>
          <a class="dropdown-item" href="/webdev">Web development</a>
        </div>
      </div>
      <!--

      <div>
        @click="$route.path === '/nav' ? $router.back() : $router.push('/nav')"
        class="navbar-toggler"
        aria-label="toggle pushmenu"
      >
        <span
          class="navbar-toggler-icon"
          :class="$route.path === '/nav' ? 'navbar-toggler-icon-close' : false"
        ></span>
      </div>
      -->

      <div class="xxxnavbar-nav ms-auto">
        <div class="btn btn-primary" @click="toggleModal">
          Connect <span class="d-none d-md-inline">wallet</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownActive: false,
      prevPosY: 0,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.aosHeader);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.aosHeader);
  },

  methods: {
    aosHeader() {
      let header = this.$refs["header"];

      if (header) {
        let scrollY = window.pageYOffset;
        let direction = scrollY > this.prevPosY ? "down" : "up";

        if (
          direction === "down" &&
          scrollY > 0 &&
          !header.classList.contains("move-up")
        ) {
          header.classList.remove("move-down");
          header.classList.add("move-up");
        }

        if (direction === "up" && !header.classList.contains("move-down")) {
          header.classList.remove("move-up");
          header.classList.add("move-down");
        }

        // update previous scroll positon
        this.prevPosY = window.scrollY;
      } else {
        console.log("header missing?");
      }
    },

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

    toggleModal() {
      this.$store.commit("toggleModal");

      // console.log(this.$store.state.showModal);

      if (this.$store.state.showModal === true) {
        document.getElementById("page").classList.add("is-blurred");
      } else {
        document.getElementById("page").classList.remove("is-blurred");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.move-up {
  transform: translateY(-100%);
}

.move-down {
  transform: translateY(0);
}

.navbar {
  transition: transform 0.4s ease-in-out;
  will-change: transform;

  &-logo img {
    max-width: 36vw !important;
  }
}
</style>
