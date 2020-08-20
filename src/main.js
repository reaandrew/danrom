import App from './components/App.js';

new Vue({
    router: new VueRouter({}),
    render: h => h(App),
}).$mount(`#app`);
