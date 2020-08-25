export default {
  name: "ValueInput",
  data: function() {
    return {
      value: ""
    };
  },
  methods: {
    add: function() {
      console.log("DATA", this.value);
      this.$root.$emit("item-added", this.value);
      this.value = "";
    }
  }
};
