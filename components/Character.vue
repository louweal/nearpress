<template>
  <div
    class="sparkle"
    :style="{
      color:
        randomXPos < 55 ? 'rgba(117,93,241,0.11)' : 'rgba(149,94,174,0.11)',
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
  name: "sparkle",

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
        "eeeeeeeeeeettttttttttoooooooooaaaaaaaaiiiiiiiinnnnnnnsssssshhhhhhrrrrrrllllluuuuddddyyymmmwwwgggffccbbppkkvjxzq".toUpperCase();
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
.sparkle {
  position: absolute;
  width: 6px;
  height: 6px;
  opacity: 0;
  animation: float 6s ease-in-out infinite;
  // font-size: 1.7rem;
  font-weight: 700;
  font-family: "Lobster Two", cursive;
}

@keyframes float {
  0% {
    transform: scale(10%);
    opacity: 0.3;
  }
  66% {
    transform: scale(100%) translate(0px, -50px);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px);
    opacity: 0;
  }
}
</style>
