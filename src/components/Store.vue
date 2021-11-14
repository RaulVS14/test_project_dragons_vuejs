<template>
  <div id="store">
    <StoreItem
      v-for="item in items"
      :key="item"
      :game-id="gameId"
      :gold="gold"
      :item="item"
      v-on:purchase="purchase"
    />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { getShopListing } from "@/modules/Api";
import StoreItem from "@/components/StoreItem";

export default defineComponent({
  name: "Store",
  props: ["gameId", "gold"],
  components: { StoreItem },
  emits:["purchase"],
  data: function () {
    return {
      items: null,
    };
  },
  async mounted() {
    this.items = await getShopListing(this.gameId);
  },
  methods: {
    purchase: async function (buyEvent, item) {
      this.$emit("purchase", buyEvent, item);
      this.items = await getShopListing(this.gameId);
    },
  },
});
</script>
<style lang="scss">
#store {
  height: 85%;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
  padding: 20px;
}
</style>
