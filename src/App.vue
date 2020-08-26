<template>
  <div id="app">
    <div class="container">
      <div class="row mb-1">
        <div class="col">
          <img
            src="./assets/random-selector-logo.svg"
            alt="Random Selector Logo"
            class="logo"
          />
          <h1>
            Random Selector
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>The Randomly Useful Random Selector of Non-Random Data</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col col-sm-12">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <h3 class="alert text-center" v-html="value"></h3>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <button
                    class="form-control btn-dark btn-block"
                    v-on:click.prevent.stop="generate($event)"
                  >
                    Select a random value
                  </button>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col">
                  <ValueItem
                    v-on:on-item-updated="handleOnItemUpdated"
                    v-on:on-item-removed="handleOnItemRemoved"
                    v-for="item in items"
                    v-bind:key="item.value"
                    v-bind:value="item.value"
                  >
                  </ValueItem>
                  <ValueInput
                    v-on:on-item-submitted="handleOnItemSubmitted"
                    class="mt-4"
                  ></ValueInput>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col text-center">
              <p>
                Share your custom list with your friends, family or colleagues
                below
              </p>
            </div>
          </div>
          <!--
          <div class="row mt-4">
            <div class="col">
              <div class="fb-share-button" data-href="{{url}}" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
            </div>
            <script type="IN/Share" data-url="http://developer.linkedin.com/"></script>
          </div>
          -->
          <div class="row mt-4">
            <div class="col">
              <p>
                Icon created using
                <a href="https://www.blobmaker.app/"
                  >https://www.blobmaker.app/</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "@/components/Utils.js";
import ValueItem from "@/components/ValueItem.vue";
import ValueInput from "@/components/ValueInput.vue";

export default {
  name: "App",
  components: {
    ValueItem,
    ValueInput
  },
  mounted() {
    if (this.$router.history.current.query.data) {
      var decodedValues = decodeURI(this.$router.history.current.query.data);
      var json = JSON.parse(decodedValues);
      this.items = json.map(e => {
        return { value: e };
      });
      this.url =
        "https://andrewrea.co.uk/danrom/#" +
        this.$router.history.current.fullPath;
    }
  },
  methods: {
    handleOnItemUpdated(e) {
      this.items[this.items.findIndex(el => el.value === e.old)].value = e.new;
    },
    handleOnItemRemoved(e) {
      this.items = this.items.filter(item => item.value != e.item);
    },
    handleOnItemSubmitted(e) {
      this.items.push({
        value: e.item
      });
    },
    generate(e) {
      let randomValue = this.items[Utils.getRandomInt(this.items.length)].value;
      this.value = `Your random pick is -  <strong>${randomValue}</strong>`;
      if (
        this.$router.history.current.query.data !=
        encodeURI(JSON.stringify(this.items.map(e => e.value)))
      ) {
        this.$router.push({
          path: "/saved",
          query: {
            data: encodeURI(JSON.stringify(this.items.map(e => e.value)))
          }
        });
        this.url =
          "https://andrewrea.co.uk/danrom/#" +
          this.$router.history.current.fullPath;
      }
      e.stopPropagation();
    }
  },
  data: function() {
    return {
      url: "#",
      value: "",
      items: [
        {
          value: "Cake"
        },
        {
          value: "Crisps"
        },
        {
          value: "Chocolate"
        }
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo {
  width: 40%;
  max-width: 100px;
}

h2 {
  font-size: 1em;
}
</style>
