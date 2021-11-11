<template>
  <div>
    <button v-on:click="startGame">Start game</button>
  </div>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Start",
  methods: {
    startGame: function () {
      console.log("startingGame");
      this.$emit("start", {config: true});
    }
  }
})
</script>