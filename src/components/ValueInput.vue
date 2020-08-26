<template>
  <div class="row">
    <div class="col">
      <input
        type="text"
        v-model="nextItem"
        placeholder="next value"
        class="form-control pl-3 pr-1"
      />
    </div>
    <div class="col-2 pt-0 px-2 mr-1">
      <button v-on:click="add" class="form-control btn-dark">
        <span class="fas fa-plus"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ValueInput",
  data: function() {
    return {
      nextItem: ""
    };
  },
  methods: {
    add: function() {
      this.$emit("on-item-submitted", { item: this.nextItem });
      this.nextItem = "";
    }
  }
};
</script>

<style></style>
