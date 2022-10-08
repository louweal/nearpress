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
          {{ hasChannels ? "Your channels" : "All channels" }}
        </div>
        <div class="dropdown-menu" ref="dropdown-menu" v-if="hasChannels">
          <nuxt-link
            :to="'/c/' + c.slug"
            event=""
            @click.native="
              toggleDropdown();
              $router.push('/c/' + c.slug);
            "
            v-for="(c, i) in userChannels"
            :key="i"
            class="dropdown-item"
          >
            {{ c.title }}
          </nuxt-link>
        </div>
        <div class="dropdown-menu" ref="dropdown-menu" v-else>
          <nuxt-link
            :to="'/c/' + c.slug"
            event=""
            @click.native="
              toggleDropdown();
              $router.push('/c/' + c.slug);
            "
            v-for="(c, i) in $options.channels"
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

  channels: [...channels].sort((a, b) => (a.title > b.title ? 1 : -1)),

  mounted() {
    window.addEventListener("scroll", this.aosHeader);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.aosHeader);
  },

  computed: {
    userChannels() {
      if (this.$store.state.user) {
        return this.$options.channels.filter((c) =>
          this.$store.state.user.channels.includes(c.slug)
        );
      }
      return [];
    },

    hasChannels() {
      return this.userChannels.length > 0;
    },
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

      // hide dropdown on scroll
      let menu = this.$refs["dropdown-menu"];

      if (menu) {
        menu.style.display = "none";
        this.dropdownActive = !this.dropdownActive;
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
