<template>
  <div class="">
    GAME IS ON
    <button v-on:click="endGame">End Game</button>
  </div>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "GameBoard",
  methods: {
    endGame: function () {
      this.$emit('end', undefined);
    }
  }
})
</script>