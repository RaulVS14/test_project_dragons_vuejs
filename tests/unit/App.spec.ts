import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import {
  getStateFromStorage,
  setStateToStorage,
} from "@/modules/Storage";

describe("App.vue", () => {
  const testPurchase = {
    gold: 12,
    lives: 1,
    turn: 13,
    shoppingSuccess: false,
  };

  const testConfig = {
    gold: 12,
    lives: 14,
    highScore: 12,
    score: 12,
    turn: 12,
  };

  it("renders start button", () => {
    const buttonText = "Start game";
    const wrapper = mount(App);
    const startButton = wrapper.find("button");
    expect(startButton.text()).toMatch(buttonText);
  });

  it("retrieves data from storage on mount", () => {
    setStateToStorage(testConfig);
    const wrapper = mount(App);
    const instanceData = wrapper.vm.$data;
    expect(instanceData.gameConfig).toEqual(testConfig);
  });

  it("updates config correctly", () => {
    const instance = mountWithConfigAndGetInstance(testConfig);
    const instanceData = instance.$data;
    expect(instanceData.gameConfig).toEqual(testConfig);
  });

  it("clear states when game is lost", () => {
    const config = {
      lives: 0,
    };
    const instance = mountWithConfigAndGetInstance(config);
    const storedState = getStateFromStorage();
    const instanceData = instance.$data;
    expect(instanceData.gameConfig).toEqual(null);
    expect(instanceData.ended).toEqual(true);
    expect(storedState).toEqual(null);
  });

  it("message and success state is updated", () => {
    const config = {
      message: "Test message",
      success: true,
    };
    const instance = mountWithConfigAndGetInstance(config);
    const wrapperData = instance.$data;
    expect(wrapperData.message).toEqual(config.message);
    expect(wrapperData.success).toEqual(config.success);
  });

  it("purchase updates state correctly", () => {
    const successfulPurchase = { ...testPurchase };
    successfulPurchase.shoppingSuccess = true;
    const instance = mountWithConfigAndGetInstance();
    const instanceData = instance.$data;
    instance.purchase(successfulPurchase, {name:"cookie"});
    expect(instanceData.gameConfig).toEqual({ gold: 12, lives: 1, turn: 13 });
  });

  it("purchase failure doesn't update state and updates message", () => {
    const instance = mountWithConfigAndGetInstance();
    const instanceData = instance.$data;
    instance.purchase(testPurchase, {name:"cookie"});
    expect(instanceData.gameConfig).toEqual({});
    expect(instanceData.message).toEqual("Failed to purchase the item");
  });

  it("start game setups everything correctly", () => {
    const instance = mountWithConfigAndGetInstance();
    instance.startGame(testConfig);
    const instanceData = instance.$data;
    expect(instanceData.message).toEqual(null);
    expect(instanceData.success).toEqual(null);
    expect(instanceData.ended).toEqual(false);
    expect(instanceData.gameConfig).toEqual(testConfig);
  });

  it("setConfig sets config correctly", () => {
    const instance = mountWithConfigAndGetInstance();
    instance.setConfig(testConfig);
    const instanceData = instance.$data;
    const storageState = getStateFromStorage();
    expect(instanceData.gameConfig).toEqual(testConfig);
    expect(storageState).toEqual(testConfig);
  });

  it("setConfig doesnt update state if config incorrect", () => {
    const config = {
      gold: 100,
    }
    const instance = mountWithConfigAndGetInstance(config);
    instance.setConfig(null);
    const instanceData = instance.$data;
    const storageState = getStateFromStorage();
    expect(instanceData.gameConfig).toEqual(config);
    expect(storageState).toEqual(config);
  });

  function mountWithConfigAndGetInstance(config: {} = {}) {
    setStateToStorage({});
    const wrapper = mount(App);
    wrapper.vm.updateGameState(config);
    return wrapper.vm;
  }
});
