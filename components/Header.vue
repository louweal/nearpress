<template>
  <nav
    class="header shadow-sm border-bottom bg-white fixed-top py-2 py-md-3"
    id="header"
    ref="header"
  >
    <div class="container-xl d-flex justify-content-between align-items-center">
      <nuxt-link
        to="/"
        event=""
        @click.native="
          hideDropdown();
          scrollToTop($route.path);
        "
        class="me-4"
        aria-label="to homepage"
      >
        <img src="@/images/logo.svg" alt="to homepage" height="46" />
      </nuxt-link>

      <div class="dropdown d-none d-sm-inline cursor-pointer">
        <div class="dropdown-toggle pe-3" @click="toggleDropdown">Discover</div>
        <div class="dropdown-menu" ref="dropdown-menu" v-if="showDropdown">
          <nuxt-link
            to="/search"
            event=""
            @click.native="
              toggleDropdown();
              $router.push('/search');
            "
            class="dropdown-item fw-bold bg-secondary mb-1 py-2 text-white d-flex justify-content-between"
          >
            Search ... <i class="bi bi-search"></i>
          </nuxt-link>
          <nuxt-link
            :to="'/c/' + c.slug"
            event=""
            @click.native="
              toggleDropdown();
              $router.push('/c/' + c.slug);
            "
            v-for="(c, i) in categories"
            :key="i"
            class="dropdown-item"
          >
            {{ c.title }}
          </nuxt-link>
        </div>
      </div>

      <div class="ms-auto d-flex align-items-center gap-2 gap-md-4">
        <nuxt-link
          to="/account"
          event=""
          v-if="$store.state.user"
          @click.native="
            hideDropdown();
            $router.push('/account');
          "
          class="cursor-pointer"
        >
          Account
        </nuxt-link>

        <div
          class="btn btn-secondary"
          @click="
            hideDropdown();
            toggleModal();
          "
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
export default {
  data() {
    return {
      prevPosY: 0,
      showDropdown: false,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.aosHeader);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.aosHeader);
  },

  computed: {
    userCategories() {
      if (this.$store.state.user) {
        return this.categories.filter((c) =>
          this.$store.state.user.categories.includes(c.slug)
        );
      }
      return [];
    },

    categories() {
      return [...this.$store.state.categories].sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
    },

    hasCategories() {
      return this.userCategories.length > 0;
    },
  },

  methods: {
    scrollToTop(path) {
      if (path === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
        this.$router.push("/");
      }
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
      }

      // hide dropdown on scroll
      let menu = this.$refs["dropdown-menu"];

      if (menu && this.showDropdown) {
        menu.style.display = "none";
        this.showDropdown = false;
      }
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    hideDropdown() {
      this.showDropdown = false;
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

.dropdown-menu {
  display: block;
}

.header {
  transition: transform 0.4s ease-in-out;
  will-change: transform;

  &-logo img {
    max-width: 20vw !important;
  }
}
</style>
