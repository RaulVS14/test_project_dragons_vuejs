<template>
  <div id="gameboard">
    <GameboardHeader
      :lives="lives"
      :message="message"
      :score="score"
      :success="score"
    />
    <Messages v-if="!storeOpen" :game-id="gameId" v-on:update="updateState" />
    <Store
      v-if="storeOpen"
      :game-id="gameId"
      :gold="gold"
      v-on:purchase="purchase"
    />
    <GameboardFooter
      :gold="gold"
      :store-open="storeOpen"
      v-on:merchant="openMerchant"
    />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Messages from "@/components/Messages";
import GameboardHeader from "@/components/GameboardHeader";
import GameboardFooter from "@/components/GameboardFooter";
import Store from "@/components/Store";

export default defineComponent({
  name: "GameBoard",
  components: { Messages, GameboardHeader, GameboardFooter, Store },
  props: ["gameId", "message", "success", "lives", "score", "gold"],
  emits: ["update", "purchase"],
  data: function () {
    return {
      storeOpen: false,
    };
  },
  methods: {
    updateState: function (solve) {
      this.$emit("update", solve);
    },
    openMerchant: function () {
      this.storeOpen = !this.storeOpen;
    },
    purchase: function (buyEvent, item) {
      this.$emit("purchase", buyEvent, item);
    },
  },
});
</script>
