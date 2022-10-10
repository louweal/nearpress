<template>
  <div
    class="character display-4"
    :style="{
      color: randomXPos < 55 ? 'var(--bs-secondary)' : 'var(--my-secondary2)',
      left: randomXPos + '%',
      top: randomYPos,
      fontSize: randomSize,
      animationDelay: randomDelay,
    }"
  >
    {{ randomCharacter }}
  </div>
</template>

<script>
export default {
  name: "character",

  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 110,
    },
  },

  computed: {
    randomCharacter() {
      let chars =
        "eeeeeeeeeeettttttttttoooooooooaaaaaaaaiiiiiiiinnnnnnnsssssshhhhhhrrrrrrllllluuuuddddyyymmmwwwgggffccbbppkkvjxzq";
      chars = chars + chars.toUpperCase();
      let i = Math.ceil(Math.random() * chars.length);
      return chars.charAt(i);
    },

    randomSize() {
      return 13 + Math.ceil(Math.random() * 13) + "px";
    },

    randomXPos() {
      return Math.ceil(Math.random() * 100);
    },
    randomYPos() {
      return this.min + Math.ceil(Math.random() * (this.max - this.min)) + "%";
    },
    randomDelay() {
      return Math.ceil(Math.random() * 15) + "s";
    },
  },
};
</script>

<style lang="scss" scoped>
.character {
  position: absolute;
  width: 6px;
  height: 6px;
  opacity: 0;
  animation: float 6s ease-in-out infinite;
  font-weight: 700;
}

@keyframes float {
  0% {
    transform: scale(10%);
    opacity: calc(0.3 * 0.18);
  }
  66% {
    transform: scale(100%) translate(0px, -50px);
    opacity: 0.18;
  }
  100% {
    transform: translateY(-50px);
    opacity: 0;
  }
}
</style>
