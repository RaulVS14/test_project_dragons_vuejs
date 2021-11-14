<template>
  <div class="store__item">
    <h3>{{ item.name }}</h3>
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
  width: calc((100% - (3 * 20px)) / 4);
  min-width: 320px;
  padding: 50px 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
/*  box-shadow: 2px 3px 5px black, 0 0 25px orange inset;*/

  box-shadow: 2px 3px 10px black, 0 0 60px #8a4d0f inset;
  background: lightgoldenrodyellow;
  gap: 15px;
}
</style>
