<template>
  <div class="message">
    <h3 class="message__text">
      {{
        !message?.encrypted
          ? message?.message
          : decrypt(message.message, message.encrypted)
      }}
    </h3>
    <div class="message__info">
      <div class="message__stats">
        <span class="message__expire"
        >Expires in: {{ message?.expiresIn }}</span
        >
        <span class="message__reward gold__display">
          {{ message?.reward }} <span class="gold">Gold</span>
        </span>
      </div>
      <span class="message__threat">{{
        !message?.encrypted
          ? message?.probability
          : decrypt(message?.probability, message.encrypted)
      }}</span>
    </div>
    <div class="message__controls">
      <button
        class="btn__accept btn--100"
        v-on:click="solveMessage(message.adId)"
      >
        ACCEPT
      </button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { postSolveMessage } from "@/modules/Api";
import caesarCypher from "@/modules/CaesarCypherModule";

export default defineComponent({
  name: "Message",
  props: {
    message: {
      default: null,
    },
    gameId: { default: null },
  },
  emits: ["solve"],
  methods: {
    solveMessage: async function (messageId) {
      const result = await postSolveMessage(this.gameId, messageId);
      if (result) {
        this.$emit("solve", result);
      }
    },
    decrypt: function (text, encryption) {
      let result = "";
      switch (encryption) {
        case 1:
          result = window.atob(text);
          break;
        case 2:
          result = caesarCypher(text, 13);
          break;
        default:
          console.log(`Unknown Encryption: ${text}`);
          result = text;
      }
      return result;
    },
  },
});
</script>
<style lang="scss">
.message {
  box-shadow: 2px 3px 10px black, 0 0 60px #8a4d0f inset;
  background: lightgoldenrodyellow;
  padding: 50px 50px;
  width: calc((100% - (3 * 15px)) / 4);
  min-width: 320px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  &__threat {
    font-style: italic;
    margin-bottom: 10px;
    text-align: right;
  }
  &__stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  &__text {
    word-break: break-word;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .btn__accept {
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>
