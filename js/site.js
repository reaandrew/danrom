Vue.component('value-item', {
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
  template: `<div class="row" v-if="editing">
          <div class="col">
            <input type="text" v-model="value" class="form-control">
          </div>
          <div class="col-2">
            <button v-on:click="update" class="form-control btn-block">
              Update
            </button>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col" v-on:click="edit">{{ value  }}</div>
          <div class="col-2">
            <button v-on:click="remove" class="form-control btn-block">
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
                  placeholder="next value"
                  class="form-control" >
            </input>
          </div>
          <div class="col-2">
            <button v-on:click="add" class="form-control btn-block" >
              Add
            </button>
          </div>
        </div>`
})

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const router = new VueRouter({})

let v = new Vue({ 
  router,
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
    this.$root.$on('item-updated', (e) => {
      this.items[this.items.findIndex(el => el.value === e.old)].value = e.new;
      console.log(e);
    })
    if (this.$router.history.current.query.data){
      var decodedValues=decodeURI(this.$router.history.current.query.data)
      var json=JSON.parse(decodedValues)
      this.items = json.map(e => {
        return {value: e}
      });

    }
  },
  methods:{
    generate: function(e){
      this.value = "Your random pick is - " + this.items[getRandomInt(this.items.length)].value;
      this.$router.push({ path:"/saved" , query: { data: encodeURI(JSON.stringify(this.items.map(e=>e.value)))  } })
      this.url = "https://danrom.com/#"+this.$router.history.current.fullPath;
      e.stopPropagation();
    }
  },
  data: {
    url:"#",
    title: "INSERT TITLE HERE...",
    value: "Click generate ...",
    items: [{
      value: 'Andy Rea'
    },{
      value: 'Andy Stone'
    }]
  },
})
