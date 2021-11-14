import { mount } from "@vue/test-utils";
import GameBoard from "@/components/GameBoard.vue";
import Messages from "@/components/Messages.vue";

describe("GameBoard.vue", () => {
  it("Gameboard renders", async () => {
    const wrapper = mount(GameBoard);
    await wrapper.setProps({ gameId: "foo" });
    expect(wrapper.find(".messages").exists()).toBe(true);
  });
});
