<template>
  <div class="messages">
    <Message
      v-for="message in messages"
      :key="message?.adId"
      :game-id="gameId"
      :message="message"
      v-on:solve="solvedMessage"
    />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Message from "@/components/Message";
import { getAllMessages } from "@/modules/Api";

export default defineComponent({
  name: "Messages",
  components: { Message },
  emits: ["update"],
  data: function () {
    return {
      messages: null,
    };
  },
  props: ["gameId"],
  async mounted() {
    await this.updateMessages();
  },
  methods: {
    updateMessages: async function () {
      if (this.gameId) {
        this.messages = await getAllMessages(this.gameId);
      }
    },
    solvedMessage: async function (solve) {
      if (solve?.lives > 0) {
        await this.updateMessages();
        this.$emit("update", solve);
      } else {
        this.$emit("update", solve);
      }
    },
  },
});
</script>
<style lang="scss">
.messages {
  height: 85%;
  overflow-y: auto;
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 15px;
  border-radius: 10px;
  padding: 20px;
  margin:0 auto;
}
</style>
