<template>
  <Start v-if="!gameConfig && !ended" v-on:start="startGame" />
  <GameBoard
    v-if="gameConfig"
    :game-id="gameConfig.gameId"
    :message="message"
    :success="success"
    :gold="gameConfig.gold"
    :lives="gameConfig.lives"
    :score="gameConfig.score"
    v-on:purchase="purchase"
    v-on:update="updateGameState"
  />
  <End
    v-if="!gameConfig?.lives && ended"
    :message="message"
    v-on:start="startGame"
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
import End from "@/components/End";

export default defineComponent({
  name: "App",
  components: { Start, GameBoard, End },
  data: function () {
    return {
      gameConfig: null,
      message: null,
      success: null,
      inventory: [],
      ended: false,
    };
  },
  methods: {
    setConfig: function (config) {
      if (config) {
        setStateToStorage(config);
        this.gameConfig = config;
      }
    },
    startGame: function (configuration) {
      this.gameConfig = null;
      this.message = null;
      this.success = null;
      this.ended = false;
      this.setConfig(configuration);
    },
    purchase: function (buyEvent, item) {
      if (buyEvent?.shoppingSuccess) {
        buyEvent.message = `Bought an item "${item.name}"`;
        this.updateGameState(buyEvent);
        this.inventory.push(item);
      } else {
        this.message = "Failed to purchase the item";
      }
    },
    updateGameState: function (result) {
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
        if (lives !== 0) {
          setTimeout(
              function () {
                this.message = null;
              }.bind(this),
              1000
          );
        }
      }
      if (score) {
        this.gameConfig.score = score;
      }
      if (turn) {
        this.gameConfig.turn = turn;
      }
      if (lives === 0) {
        this.gameConfig = null;
        this.ended = true;
        unsetStateInStorage();
      } else {
        setStateToStorage(this.gameConfig);
      }
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
