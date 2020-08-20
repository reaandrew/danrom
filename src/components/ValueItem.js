export default{
  name: 'ValueItem',
  props: ["value"],
  data: function(){
    return {
      oldValue: "",
      value: "",
      editing: false
    }
  },
  methods: {
    remove: function(e){
      this.$root.$emit('item-removed', this.value)
    },
    edit: function(e){
      this.oldValue = this.value;
      this.editing = true;
    },
    update: function(e){
      this.editing = false;
      this.$root.$emit('item-updated', {
        new: this.value,
        old: this.oldValue 
      });
    }
  },
  template: `<div class="row m-2" v-if="editing">
          <div class="col-2">
            <button v-on:click="update" class="form-control btn-dark">
              <span class="fas fa-check"></span>
            </button>
          </div>
          <div class="col p-0">
            <input type="text" v-model="value" class="form-control">
          </div>
        </div>
        <div class="row m-2" v-else>
          <div class="col-2">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button v-on:click="edit" class="form-control btn-dark mr-1">
                <span class="fas fa-edit fa-1g"></span>
              </button>
              <button v-on:click="remove" class="form-control btn-dark">
                <span class="fas fa-trash-alt"></span>
              </button>
            </div>
          </div>
          <div class="col border-bottom mt-2" v-on:click="edit">{{ value  }}</div>
        </div>`
};
