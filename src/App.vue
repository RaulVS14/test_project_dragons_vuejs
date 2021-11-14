<template>
  <Start v-if="!gameConfig" v-on:start="setConfig" />
  <GameBoard v-if="gameConfig" :game-id="gameConfig.gameId" v-on:end="setConfig"/>
</template>
<script>
import { defineComponent } from "vue";
import Start from "@/components/Start";
import GameBoard from "@/components/GameBoard";
import { getStateFromStorage } from "@/modules/Storage";

export default defineComponent({
  name: "App",
  components: { Start, GameBoard },
  data: function () {
    return {
      gameConfig: null,
    };
  },
  methods: {
    setConfig: function (config) {
      this.gameConfig = config;
    },
  },
  mounted() {
    document.title = "Dragons of Mugloar";
    const gameState = getStateFromStorage();
    if (gameState) {
      this.setConfig(gameState);
    }
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0;
}
</style>
