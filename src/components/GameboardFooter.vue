<template>
  <div class="footer_panel">
    <div class="footer_panel__gold gold__display">
      {{ gold }} <span class="gold">Gold</span>
    </div>
    <div class="footer_panel__merchant">
      <button v-if="!storeOpen" v-on:click="openMerchant">Merchant</button>
      <button v-if="storeOpen" v-on:click="openMerchant">Messages</button>
    </div>
  </div>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "GameboardFooter",
  props: ["gold", "storeOpen"],
  methods:{
    openMerchant: function () {
      this.$emit('merchant');
    }
  }
});
</script>
<style lang="scss">
.footer_panel {
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:20px;
}
</style>
