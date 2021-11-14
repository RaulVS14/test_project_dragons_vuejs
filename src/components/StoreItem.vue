<template>
  <div class="store__item">
    <p>{{ item.name }}</p>
    <div class="store__item__price gold__display">
      {{ item.cost }} <span class="gold">Gold</span>
    </div>
    <button
      v-if="item.cost <= gold"
      class="store__item__purchase"
      v-on:click="purchase(item.id)"
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
  data: function () {
    return {
      items: null,
    };
  },
  mounted() {
    this.items = getShopListing(this.gameId);
  },
  methods: {
    purchase: async function (itemId) {
      this.$emit("purchase", await postPurchaseItem(this.gameId, itemId));
    },
  },
});
</script>
<style lang="scss">
.store__item {
  width: calc((100% - (4 * 20px)) / 5);
  padding: 10px;
  text-align: center;
  height: 200px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 2px 3px 5px black, 0 0 15px lightblue inset;
  background: white;
  gap: 15px;
}
</style>
