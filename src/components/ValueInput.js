export default {
  name: 'ValueInput',
  data: function(){
    return {
      value: "",
    }
  },
  methods: {
    add: function(e){
      console.log("DATA", this.value)
      this.$root.$emit('item-added', this.value)
      this.value = ""
    }
  },
  template: `<div class="row m-2">
          <div class="col p-0">
            <input type="text"
                  v-model="value"
                  placeholder="next value"
                  class="form-control" >
            </input>
          </div>
          <div class="col-2">
            <button v-on:click="add" class="form-control btn-dark" >
              <span class="fas fa-plus"></span>
            </button>
          </div>
        </div>`
};
