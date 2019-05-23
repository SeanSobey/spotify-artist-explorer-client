import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Auth from './views/Auth.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: Login,
		},
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (about.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
		// },
		{
			path: '/auth',
			name: 'auth',
			component: Auth,
		},
	],
});
