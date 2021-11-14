<template>
  <div id="end">
    <h3>{{ message }}</h3>
    <p>Do you want to start a new game?</p>
    <button v-on:click="startNew">Hell yeah!</button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { postStartGame } from "@/modules/Api";

export default defineComponent({
  name: "End",
  props: ["message"],
  methods: {
    startNew: async function () {
      const config = await postStartGame();
      this.$emit("start", config);
    },
  },
});
</script>
<style>
#end {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
}
</style>
