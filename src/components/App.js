import Utils from './Utils.js';
const ValueItem = () => import('./ValueItem.js');
const ValueInput = () => import('./ValueInput.js');

export default{
  name: 'App',
	components: {
    ValueItem,
    ValueInput,
  },
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
      this.url = "https://andrewrea.co.uk/danrom/#"+this.$router.history.current.fullPath;
    }
  },
  methods:{
    generate: function(e){
      let randomValue = this.items[Utils.getRandomInt(this.items.length)].value;
      this.value = `Your random pick is -  <strong>${randomValue}</strong>`
      this.$router.push({ path:"/saved" , query: { data: encodeURI(JSON.stringify(this.items.map(e=>e.value)))  } })
      this.url = "https://andrewrea.co.uk/danrom/#"+this.$router.history.current.fullPath;
      e.stopPropagation();
    }
  },
  data: function() {
		return {
			url:"#",
			value: "",
			items: [{
				value: 'Cake'
			},{
				value: 'Crisps'
			},{
				value: 'Chocolate'
			}]
		}
  },
  template: `
		<div class="container">
      <div class="row mb-4">
        <div class="col text-center">
          <h1>Random Selector</h1> 
          <h2>The Randomly Useful Random Selector of Non-Random Data</h1> 
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <h3 class="alert text-center" v-html="value"></h3> 
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <!--<h3 class="alert alert-dark"><a href="#" v-on:click.prevent.stop="generate($event)">Generate</a></h3>-->
                  <button class="form-control btn-dark btn-block" v-on:click.prevent.stop="generate($event)">Pick a random value</button>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col">
                  <value-item
                    v-for="item in items"
                    v-bind:key="item.value"
                    v-bind:value="item.value">
                  </value-item>
                  <value-input class="mt-4"></value-input>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4" v-if="url != '#'">
            <div class="col">
              <p>Add a bookmark to save your random data selector</p>
            </div>
          </div>
        </div>
        <div class="col-2"></div>
      </div>
		</div>
  `
}
