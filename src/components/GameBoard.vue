<template>
  <div id="gameboard">
    <div class="header_panel" v-bind:class="[success ? 'success' : 'failed']">
      <div class="header_panel__lives">{{ lives }}</div>
      <div class="header_panel__notification"></div>
      <div class="header_panel__score">{{ score }}</div>
    </div>
    <Messages :game-id="gameId" v-on:update="updateState" />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Messages from "@/components/Messages";

export default defineComponent({
  name: "GameBoard",
  components: { Messages },
  props: ["gameId", "message", "success", "lives", "score"],
  emits: ["update"],
  methods: {
    updateState: function (solve) {
      this.$emit("update", solve);
    },
  },
});
</script>
<style lang="scss">
.header_panel {
  height: calc(100% - 85% - 100px);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
