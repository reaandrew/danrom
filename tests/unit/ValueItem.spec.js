import { shallowMount } from "@vue/test-utils";
import ValueItem from "@/components/ValueItem.vue";

describe("ValueItem.vue", () => {
  it("displays the value property", () => {
    const expectedValue = "fubar";
    const wrapper = shallowMount(ValueItem, {
      propsData: {
        value: expectedValue
      }
    });
    expect(wrapper.find("div.item").text()).toEqual(expectedValue);
  });

  it("sets the data currentValue from the property", () => {
    const expectedValue = "fubar";
    const wrapper = shallowMount(ValueItem, {
      propsData: {
        value: expectedValue
      }
    });
    expect(wrapper.vm.$data.currentValue).toEqual(expectedValue);
  });

  describe("clicking edit button changes to edit mode", () => {
    const expectedValue = "fubar";
    const wrapper = shallowMount(ValueItem, {
      propsData: {
        value: expectedValue
      }
    });
    wrapper.find("button.btn-edit").trigger("click");

    it("changes to edit mode", () => {
      expect(wrapper.vm.$data.editing).toBe(true);
    });

    it("sets the old value to the current value", () => {
      expect(wrapper.vm.$data.oldValue).toBe(expectedValue);
    });
  });

  it("edit mode is displayed", () => {
    const wrapper = shallowMount(ValueItem, {
      propsData: {
        value: "anything"
      },
      data() {
        return {
          editing: true
        };
      }
    });
    expect(wrapper.find("div.edit-mode").exists()).toBe(true);
    expect(wrapper.find("div.view-mode").exists()).toBe(false);
  });

  describe("clicking update button", () => {
    const oldValue = "old";
    const expectedValue = "fubar";
    const wrapper = shallowMount(ValueItem, {
      propsData: {
        value: oldValue
      },
      data() {
        return {
          editing: true,
          oldValue: oldValue
        };
      }
    });
    wrapper.setData({
      currentValue: expectedValue
    });
    wrapper.find("button.btn-apply").trigger("click");

    it("sets editing to be false", () => {
      expect(wrapper.vm.$data.editing).toBe(false);
    });

    it("emits on-item-updated", () => {
      expect(wrapper.emitted()["on-item-updated"][0]).toEqual([
        {
          new: expectedValue,
          old: oldValue
        }
      ]);
    });
  });

  describe("clicking remove button", () => {
    const expectedValue = "fubar";
    const wrapper = shallowMount(ValueItem, {
      propsData: {
        value: expectedValue
      }
    });
    wrapper.find("button.btn-remove").trigger("click");
    it("emits on-item-removed", () => {
      expect(wrapper.emitted()["on-item-removed"][0]).toEqual([
        {
          item: expectedValue
        }
      ]);
    });
  });
});
