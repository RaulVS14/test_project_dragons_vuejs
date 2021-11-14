<template>
  <div class="message">
    <p class="message__text">
      {{
        !message?.encrypted
          ? message?.message
          : decrypt(message.message, message.encrypted)
      }}
    </p>
    <div class="message__info">
      <span class="message__expire">Expires in: {{ message?.expiresIn }}</span>
      <span class="message__reward gold__display">
        {{ message?.reward }} <span class="gold">Gold</span>
      </span>
      <span class="message__threat">{{
        !message?.encrypted
          ? message?.probability
          : decrypt(message?.probability, message.encrypted)
      }}</span>
    </div>
    <div class="message__controls">
      <button class="btn__accept" v-on:click="solveMessage(message.adId)">
        I will accept
      </button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { postSolveMessage } from "@/modules/Api";

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
    caesarCypher: function (message, shift) {
      let result = "";
      for (let i = 0; i < message.length; i++) {
        let char = message[i];if (char === " ") {
          result += char;
        } else if (char.toUpperCase() === char) {
          let ch = String.fromCharCode(
              ((char.charCodeAt(0) + shift - 65) % 26) + 65
          );
          result += ch;
        } else {
          let ch = String.fromCharCode(
            ((char.charCodeAt(0) + shift - 97) % 26) + 97
          );
          result += ch;
        }
      }
      return result;
    },
    decrypt: function (text, encryption) {
      let result = "";
      switch (encryption) {
        case 1:
          result = window.atob(text);
          break;
        case 2:
          result = this.caesarCypher(text, 13);
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
  box-shadow: 2px 3px 20px black, 0 0 60px #8a4d0f inset;
  background: #fffef0;
  margin-bottom: 20px;
  padding: 10px 50px;

  &__text {
    word-break: break-word;
  }

  &__info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
