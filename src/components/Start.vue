<template>
  <div>
    <button v-on:click="startGame">Start game</button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { setStateToStorage } from "@/modules/Storage";
export default defineComponent({
  name: "Start",
  methods: {
    startGame: function () {
      console.log("startingGame");
      this.$emit("start", { config: true });
      // TODO: Remove Temporary object
      setStateToStorage({
        gameId: "x",
        lives: 1,
        gold: 2,
        level: 2,
        score: 3,
        highScore: 3,
        turn: 4,
      });
    },
  },
});
</script>
