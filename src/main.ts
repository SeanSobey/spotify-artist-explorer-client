import Vue from 'vue';
import App from './App.vue';
import Router from './router';
import Store from './store';
import BootstrapVue from 'bootstrap-vue';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import './styles/import.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

import Spotify from 'spotify-web-api-node';
import VueSpotify from 'vue-spotify';

Vue.use(VueSpotify, new Spotify());

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

// https://github.com/FortAwesome/vue-fontawesome
// https://fontawesome.com/icons?d=gallery
library.add(faSpinner);
library.add(faGithub);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

const store = new Store();
const router = new Router(store);
const app = new Vue({
	router,
	store,
	render: (createElement) => createElement(App),
}).$mount('#app');
