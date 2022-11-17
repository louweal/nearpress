<template>
  <main>
    <div class="container-xl">
      <div class="text-center">
        <h1 class="text-secondary fs-2 pb-3">
          {{ error ? error.message : "Something went wrong" }}
        </h1>

        <p v-if="this.error.statusCode === 402">
          Please go the Sender wallet window to proceed.
        </p>

        <nuxt-link
          v-if="this.error.statusCode !== 402"
          to="/"
          class="btn btn-secondary"
        >
          Return home
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import { payAuthor } from "@/utils/sender.js";

export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    "$store.state.user": function () {
      if (this.$store.state.user && this.error.statusCode === 403) {
        this.$router.push({ path: this.$route.path, hash: "#auth" });
      }
    },
  },

  async mounted() {
    if (this.error.statusCode === 402) {
      // payment required
      this.$store.commit("toggleOverlay");

      let result = { error: "User reject" };
      while (result.error && result.error === "User reject") {
        result = await payAuthor(
          this.$store.state.user.debt.amount,
          this.$store.state.user.debt.author,
          this.$store.state.user.debt.title
        );
      }

      this.$store.state.user.debt.amount;
      console.log("Thank you!");
      this.$store.commit("setProgress", {
        id: this.$store.state.user.debt.id,
        progress: 100,
      });

      this.$store.commit("updateUserDebt", undefined);

      this.$store.commit("toggleOverlay");
      // console.log(this.error.from);
      this.$router.push(this.error.from);
    }
  },
};
</script>
