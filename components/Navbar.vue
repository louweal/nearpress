<template>
  <nav
    class="shadow-sm navbar border-bottom navbar-expand-lg bg-white fixed-top py-md-3"
    ref="header"
    id="header"
  >
    <div class="container-xl">
      <nuxt-link to="/" class="me-4 navbar-logo">
        <img src="@/images/logo.svg" alt="" width="203" height="45" />
      </nuxt-link>

      <div class="dropdown d-none d-sm-inline cursor-pointer">
        <div class="dropdown-toggle pe-3" @click="toggleDropdown">
          Your channels
        </div>
        <div class="dropdown-menu" ref="dropdown-menu">
          <nuxt-link
            :to="'/c/' + c.slug"
            event=""
            @click.native="closeAndClick('/c/' + c.slug)"
            v-for="(c, i) in $options.channels.filter((c) => c.selected)"
            :key="i"
            class="dropdown-item"
          >
            {{ c.title }}
          </nuxt-link>
        </div>
      </div>

      <div class="ms-auto">
        <div class="btn btn-secondary" @click="toggleModal">
          Connect <span class="d-none d-md-inline">wallet</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import channels from "@/data/channels.json";

export default {
  data() {
    return {
      dropdownActive: false,
      prevPosY: 0,
    };
  },

  channels,

  mounted() {
    window.addEventListener("scroll", this.aosHeader);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.aosHeader);
  },

  methods: {
    closeAndClick(path) {
      this.toggleDropdown();
      this.$router.push(path);
    },

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
