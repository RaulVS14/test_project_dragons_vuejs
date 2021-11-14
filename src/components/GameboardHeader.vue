<template>
  <div class="header_panel">
    <div class="header_panel__lives">
      <span v-for="index in lives" :key="index">&hearts;</span>
    </div>
    <div
      class="header_panel__notification"
      v-bind:class="[ success ? 'success' : 'fail']"
    >
      {{ message }}
    </div>
    <div class="header_panel__score">SCORE: {{ score }}</div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameboardHeader",
  props: ["message", "success", "lives", "score"],
});
</script>
<style lang="scss">
.header_panel {
  height: calc(100% - 85% - 75px);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  &__lives,
  .header_panel__notification,
  .header_panel__score {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
  &__lives {
    color: indianred;
    font-size: 2.5em;
    span{
      margin: 0 2px;
    }
  }
  &__score{
    font-size: 1.75em;
  }

  &__notification {
    font-size: 1.5em;
    width: 30%;
    &.success {
      color: green;
    }

    &.fail {
      color: red;
    }
  }
}
</style>
