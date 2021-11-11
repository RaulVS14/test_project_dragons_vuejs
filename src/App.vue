<template>
  <Start v-if="!gameConfig" v-on:start="setConfig"/>
  <GameBoard v-if="gameConfig" v-on:end="setConfig"/>
</template>
<script>
import {defineComponent} from "vue";
import Start from "@/components/Start";
import GameBoard from "@/components/GameBoard";

export default defineComponent({
  name: "App",
  components: {Start, GameBoard},
  data: function () {
    return {
      gameConfig: undefined
    }
  },
  methods: {
    setConfig: function (config) {
      console.log(config);
      this.gameConfig = config;
    }
  },
  mounted() {
    document.title = 'Dragons of Mugloar'
  }
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
}
</style>
