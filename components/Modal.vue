<template>
  <div
    class="modal"
    :class="$store.state.showModal ? 'modal--active' : 'modal--inactive'"
  >
    <div class="modal__bg cursor-pointer" @click="toggleModal"></div>
    <div class="modal__inner">
      <div class="modal__content p-2 rounded border">
        <slot>
          <div class="d-flex justify-content-between mb-3">
            <div class="p-3"></div>
            <h5 class="modal-title fs-5 align-self-center">Connect wallet</h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="toggleModal"
            ></button>
          </div>
          <div class="modal-body px-1">
            <p class="text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
              facere exercitationem provident sint facilis numquam nihil! Saepe
              omnis est fugiat aspernatur accusamus.
            </p>
            <div class="d-grid gap-2 mb-1">
              <div
                class="btn btn-secondary cursor-pointer d-none d-md-block"
                @click="signIn"
              >
                Sender
              </div>
              <div
                class="btn btn-secondary cursor-pointer d-md-none opacity-50"
              >
                Sender
              </div>
            </div>

            <div class="text-center mt-2" v-if="error">
              <p class="text-danger">
                Sender is not installed. Install the
                <a href="https://sender.org" target="_blank"
                  >Sender
                  <i class="bi bi-box-arrow-up-right"></i>
                </a>
                browser extension, connect your wallet and click the button
                above again.
              </p>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { connectSender } from "@/utils/sender.js";

export default {
  data() {
    return {
      error: false,
    };
  },

  methods: {
    toggleModal() {
      this.$store.commit("toggleModal");
      document.getElementById("page").classList.toggle("is-blurred");
      this.error = false;
    },

    setUser(id, address, name, slug) {
      this.$store.commit("setUser", {
        id,
        address,
        name,
        slug,
        categories: [],
        writers: [],
        history: [],
      });
    },

    async signIn() {
      if (typeof window.near !== "undefined" && window.near.isSender) {
        console.log("Sender is installed!");
        window.near.signOut(); // force sign out ...

        let connected = connectSender();
        if (!connected) {
          return;
        }
      } else {
        this.error = true;
        return;
      }

      let accountAddress = window.near.getAccountId();

      let users = JSON.parse(localStorage.getItem("users"));
      let user = users
        ? users.find((u) => u.address === accountAddress)
        : undefined;

      if (user) {
        this.$store.commit("setUser", user);
      } else {
        let numUsers = users ? users.length : 0;
        let id = 42 + numUsers;
        let address = accountAddress;
        let name = accountAddress;
        let slug = accountAddress;
        this.setUser(id, address, name, slug);
        this.$store.commit("addWriter", { id, address, name, slug });
      }
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss">
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
      transition: all 0.3s 0.15s linear;
    }

    .modal__content {
      visibility: hidden;
      opacity: 0;
      transform: translateY(100px);
      transition: all 0.3s cubic-bezier(0.2, 0, 0.1, 1);
    }
  }
}
</style>
