<template>
  <div class="store__item">
    <p>{{ item.name }}</p>
    <div class="store__item__price gold__display">
      {{ item.cost }} <span class="gold">Gold</span>
    </div>
    <button
      v-if="item.cost <= gold"
      class="store__item__purchase btn--100"
      v-on:click="purchase(item.id, item)"
    >
      Buy
    </button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { getShopListing, postPurchaseItem } from "@/modules/Api";

export default defineComponent({
  name: "StoreItem",
  props: ["gameId", "item", "gold"],
  emits:["purchase"],
  data: function () {
    return {
      items: null,
    };
  },
  mounted() {
    this.items = getShopListing(this.gameId);
  },
  methods: {
    purchase: async function (itemId, item) {
      this.$emit("purchase", await postPurchaseItem(this.gameId, itemId), item);
    },
  },
});
</script>
<style lang="scss">
.store__item {
  width: calc((100% - (4 * 15px)) / 5);
  min-width: 320px;
  padding: 50px 50px;
  text-align: center;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 3px 5px black, 0 0 60px orange inset;
  background: white;
  gap: 15px;
}
</style>
