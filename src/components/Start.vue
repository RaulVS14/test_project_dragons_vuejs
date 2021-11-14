<template>
  <div id="start">
    <button v-on:click="startGame">Start game</button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { postStartGame } from "@/modules/Api";

export default defineComponent({
  name: "Start",
  methods: {
    startGame: async function () {
      const config = await postStartGame();
      this.$emit("start", config);
    },
  },
});
</script>
<style>
#start {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
