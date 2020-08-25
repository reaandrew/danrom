import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/ValueInput.vue";

describe("ValueInput.vue", () => {
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.find("input").exists()).to.be.true;

    wrapper.find("input").setValue("fubar");

    wrapper.find("button").trigger("click");
    expect(wrapper.emitted()["on-item-submitted"][0]).to.eql([
      {
        item: "fubar"
      }
    ]);
  });
});
