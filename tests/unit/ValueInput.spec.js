import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/ValueInput.vue";

describe("ValueInput.vue", () => {
  it("submitting a value emits an on-item-submitted event", () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.find("input").exists()).toBe(true);

    wrapper.find("input").setValue("fubar");

    wrapper.find("button").trigger("click");
    expect(wrapper.emitted()["on-item-submitted"][0]).toEqual([
      {
        item: "fubar"
      }
    ]);
  });
  it("submitting a value clears the value", () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.find("input").exists()).toBe(true)

    wrapper.find("input").setValue("fubar");

    wrapper.find("button").trigger("click");

    expect(wrapper.vm.$data.nextItem).toEqual("");
  });
});
