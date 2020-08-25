<template>
  <div class="row mt-2" v-if="editing">
    <div class="col-4">
      <button v-on:click="update" class="form-control btn-dark">
        <span class="fas fa-check"></span>
      </button>
    </div>
    <div class="col p-0 mr-2">
      <input type="text" v-model="currentValue" class="form-control" />
    </div>
  </div>
  <div class="row mt-2" v-else>
    <div class="col-4">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button v-on:click="edit" class="form-control btn-dark mr-1">
          <span class="fas fa-edit fa-1g"></span>
        </button>
        <button v-on:click="remove" class="form-control btn-dark">
          <span class="fas fa-trash-alt"></span>
        </button>
      </div>
    </div>
    <div class="col border-bottom mt-2 text-left mr-2" v-on:click="edit">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ValueItem",
  props: ["value"],
  data: function() {
    return {
      oldValue: "",
      currentValue: "",
      editing: false
    };
  },
  mounted() {
    this.currentValue = this.value;
  },
  methods: {
    remove: function() {
      this.$root.$emit("item-removed", this.currentValue);
    },
    edit: function() {
      this.oldValue = this.currentValue;
      this.editing = true;
    },
    update: function() {
      this.editing = false;
      this.$root.$emit("item-updated", {
        new: this.currentValue,
        old: this.oldValue
      });
    }
  }
};
</script>

<style></style>
