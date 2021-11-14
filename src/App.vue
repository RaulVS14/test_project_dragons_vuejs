<template>
  <Start v-if="!gameConfig" v-on:start="startGame" />
  <GameBoard
    v-if="gameConfig"
    :game-id="gameConfig.gameId"
    :message="message"
    :success="success"
    v-on:update="updateGameState"
  />
</template>
<script>
import { defineComponent } from "vue";
import Start from "@/components/Start";
import GameBoard from "@/components/GameBoard";
import {
  getStateFromStorage,
  setStateToStorage,
  unsetStateInStorage,
} from "@/modules/Storage";

export default defineComponent({
  name: "App",
  components: { Start, GameBoard },
  data: function () {
    return {
      gameConfig: null,
      message: null,
      success: null,
    };
  },
  methods: {
    setConfig: function (config) {
      if (config) {
        setStateToStorage(config);
      }
      this.gameConfig = config;
    },
    startGame: function (configuration) {
      this.gameConfig = null;
      this.message = null;
      this.success = null;
      this.setConfig(configuration);
    },
    updateGameState: function (result) {
      console.log(result, this.gameConfig);
      const { gold, highScore, lives, message, score, success, turn } = result;
      if (gold) {
        this.gameConfig.gold = gold;
      }
      if (highScore) {
        this.gameConfig.highScore = highScore;
      }
      if (lives) {
        this.gameConfig.lives = lives;
      }
      if (message) {
        this.message = message;
        this.success = success;
      }
      if (score) {
        this.gameConfig.score = score;
      }
      if (turn) {
        this.gameConfig.turn = turn;
      }
      if (!lives) {
        this.gameConfig = null;
        unsetStateInStorage();
      }
      setStateToStorage(this.gameConfig);
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
