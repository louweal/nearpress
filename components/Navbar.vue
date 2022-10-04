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

      <div
        class="dropdown d-none d-sm-inline cursor-pointer"
        v-if="$store.state.user"
      >
        <div class="dropdown-toggle pe-3" @click="toggleDropdown">
          Your channels
          <!-- {{ $store.state.user.name }} -->
        </div>
        <div class="dropdown-menu" ref="dropdown-menu">
          <!-- {{ $store.state.user.channels }} -->
          <nuxt-link
            :to="'/c/' + c.slug"
            event=""
            @click.native="
              toggleDropdown();
              $router.push('/c/' + c.slug);
            "
            v-for="(c, i) in $options.channels.filter((c) =>
              $store.state.user.channels.includes(c.slug)
            )"
            :key="i"
            class="dropdown-item"
          >
            {{ c.title }}
          </nuxt-link>
        </div>
      </div>

      <div class="ms-auto d-flex align-items-center gap-2 gap-md-4">
        <div v-if="$store.state.user" @click="signOut" class="cursor-pointer">
          Disconnect<span class="d-none d-md-inline"> wallet</span>
        </div>

        <div
          class="btn btn-secondary"
          @click="toggleModal"
          v-if="!$store.state.user"
        >
          Connect<span class="d-none d-md-inline"> wallet</span>
        </div>
        <nuxt-link v-else to="/write" class="btn btn-secondary">
          <span class="d-none d-md-inline">Start writing</span>
          <span class="d-md-none">Write</span>
        </nuxt-link>
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
    signOut() {
      this.$store.commit("setUser", undefined);
      this.$router.push("/");
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
      document.getElementById("page").classList.toggle("is-blurred");
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
