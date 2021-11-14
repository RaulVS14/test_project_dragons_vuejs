import { mount } from "@vue/test-utils";
import Message from "@/components/Message.vue";

describe("Message.vue", () => {
  it("renders message accept button", async () => {
    const buttonText = "ACCEPT";
    const wrapper = mount(Message);
    const acceptButton = wrapper.find("button");
    expect(acceptButton.text()).toMatch(buttonText);
  });
  it("renders message object to view", async () => {
    const wrapper = mount(Message);
    const sampleMessage = {
      adId: "5aynZ96l",
      expiresIn: 7,
      message: "Hello world!",
      probability: "Usual",
      reward: 14,
      encrypted: 0,
    };
    await wrapper.setProps({
      message: sampleMessage,
      gameId: "x",
    });
    expect(wrapper.text()).toEqual(
      `${sampleMessage.message}Expires in: ${sampleMessage.expiresIn}${sampleMessage.reward} Gold${sampleMessage.probability} ACCEPT`
    );
  });
});
