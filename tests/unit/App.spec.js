import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import ValueItem from "@/components/ValueItem.vue";
import ValueInput from "@/components/ValueInput.vue";
import VueRouter from "vue-router";

describe("App.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  describe("displays", () => {
    const wrapper = shallowMount(App, {
      localVue,
      router,
      data() {
        return {
          value: "fubar",
          items: [{ value: "A" }, { value: "B" }, { value: "C" }]
        };
      }
    });

    it("value items", () => {
      expect(wrapper.findAllComponents(ValueItem).length).toBe(3);
    });

    it("a single value input", () => {
      expect(wrapper.findAllComponents(ValueInput).length).toBe(1);
    });
  });
  describe("selects", () => {
    const wrapper = shallowMount(App, {
      localVue,
      router,
      data() {
        return {
          value: "",
          items: [{ value: "A" }, { value: "B" }, { value: "C" }]
        };
      }
    });
    it("sets the value", () => {
      wrapper.find("button.btn-select").trigger("click");
      expect(wrapper.vm.$data.value).not.toEqual("");
    });
  });

  describe("handles", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(App, {
        localVue,
        router,
        data() {
          return {
            value: "",
            items: [{ value: "A" }, { value: "B" }, { value: "C" }]
          };
        }
      });
    });

    it("onItemUpdated events", () => {
      wrapper.findComponent(ValueItem).vm.$emit("on-item-updated", {
        new: "D",
        old: "A"
      });

      expect(wrapper.vm.$data.items).toContainEqual({ value: "D" });
      expect(wrapper.vm.$data.items).not.toContainEqual({ value: "A" });
      expect(wrapper.vm.$data.items.length).toEqual(3);
    });

    it("onItemRemoved events", () => {
      wrapper.findComponent(ValueItem).vm.$emit("on-item-removed", {
        item: "A"
      });

      expect(wrapper.vm.$data.items).not.toContainEqual({ value: "A" });
      expect(wrapper.vm.$data.items).toContainEqual({ value: "B" });
      expect(wrapper.vm.$data.items).toContainEqual({ value: "C" });
      expect(wrapper.vm.$data.items.length).toEqual(2);
    });

    it("onItemSubmitted events", () => {
      wrapper.findComponent(ValueInput).vm.$emit("on-item-submitted", {
        item: "D"
      });

      expect(wrapper.vm.$data.items).toContainEqual({ value: "A" });
      expect(wrapper.vm.$data.items).toContainEqual({ value: "B" });
      expect(wrapper.vm.$data.items).toContainEqual({ value: "C" });
      expect(wrapper.vm.$data.items).toContainEqual({ value: "D" });
      expect(wrapper.vm.$data.items.length).toEqual(4);
    });
  });
});
