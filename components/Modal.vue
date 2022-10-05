<template>
  <!-- Modal -->
  <div
    class="modal"
    :class="$store.state.showModal ? 'modal--active' : 'modal--inactive'"
  >
    <div class="modal__bg" @click="toggleModal"></div>
    <div class="modal__inner">
      <div class="modal__content modal-content rounded">
        <div class="modal-header d-flex">
          <h5 class="modal-title fs-5 align-self-center">Connect wallet</h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="toggleModal"
          ></button>
        </div>
        <div class="modal-body px-4">
          <div class="d-grid gap-2 mb-3">
            <div class="btn btn-secondary cursor-pointer" @click="signIn">
              MetaMask
            </div>
          </div>

          <p class="text-center">
            Ad eveniet enim doloribus at inventore explicabo distinctio unde
            rerum.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleModal() {
      this.$store.commit("toggleModal");
      document.getElementById("page").classList.toggle("is-blurred");
    },

    closeAndClick() {
      this.toggleModal();
      this.$router.push(path);
    },
    signIn() {
      this.toggleModal();

      // setUser was here

      let goto = this.$store.state.clickedArticle
        ? this.$store.state.clickedArticle
        : "/";
      this.$router.push(goto);
      this.$store.commit("setClickedArticle", undefined);

      console.log("signed in!");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100vh;
  z-index: 1055;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  visibility: hidden;

  // &-body {
  //   width: 100%;
  //   border: 2px solid red;
  // }

  &__bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(222, 222, 222, 0.6);
    opacity: 0;
    visibility: hidden;
  }

  &__inner {
    width: 500px;
    margin: 1rem auto;
    min-height: calc(100% - 2rem);
    padding: 6px 0;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  &__content {
    background-color: #fff;
    width: 100%;

    transform: translateY(100px);
    // opacity: 0;
    visibility: hidden;
  }

  &--active {
    visibility: visible;

    .modal__bg {
      opacity: 1;
      visibility: visible;
      transition: all 0.5s linear;
    }

    .modal__content {
      visibility: visible;
      transform: translateY(0);
      transition: all 0.4s 0.4s cubic-bezier(0.2, 0, 0.1, 1);
    }
  }

  &--inactive {
    visibility: hidden;

    .modal__bg {
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s 0.3s linear;
    }

    .modal__content {
      visibility: hidden;
      opacity: 0;
      transform: translateY(100px);
      transition: all 0.4s cubic-bezier(0.2, 0, 0.1, 1);
    }
  }
}
</style>
