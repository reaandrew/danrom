Vue.component('value-item', {
  props: ["value"],
  methods: {
    remove: function(e){
      this.$root.$emit('item-removed', this.value)
    }
  },
  template: `<div class="row">
          <div class="col">{{ value  }}</div>
          <div class="col">
            <button v-on:click="remove">
              Remove
            </button>
          </div>
        </div>`
})

Vue.component('value-input', {
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
  template: `<div class="row">
          <div class="col">
            <input type="text"
                  v-model="value"
                  placeholder="next value">
            </input>
          </div>
          <div class="col">
            <button v-on:click="add">
              Add
            </button>
          </div>
        </div>`
})

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let v = new Vue({ 
  el: '#app',
  mounted(){
    this.$root.$on('item-removed', (e) => {
      this.items = this.items.filter(item => (item.value != e));
    })
    this.$root.$on('item-added', (e) => {
      this.items.push({
        value: e
      })
    })
  },
  methods:{
    generate: function(){
      this.value = this.items[getRandomInt(this.items.length)].value;
    }
  },
  data: {
    title: "INSERT TITLE HERE...",
    value: "Click generate ...",
    items: [{
      value: 'Andy Rea'
    },{
      value: 'Andy Stone'
    }]
  },
})
