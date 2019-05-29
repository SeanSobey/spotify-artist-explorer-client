import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Store from './store';
import Login from './views/Login.vue';
import Logout from './views/Logout.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export enum RouteNames {
	login = 'Login',
	logout = 'Logout',
	home = 'Home',
}

export const routes: Array<RouteConfig> = [
	{
		path: '/home',
		name: RouteNames.home,
		component: Home,
	},
	{
		path: '/login',
		name: RouteNames.login,
		component: Login,
	},
	{
		path: '/logout',
		name: RouteNames.logout,
		component: Logout,
	},
	// {
	// 	path: '/about',
	// 	name: 'about',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
	// },
];

export default class extends Router {
	constructor(store: Store) {
		super({
			routes,
		});
		this.beforeEach((to, from, next) => {
			if (to.name === RouteNames.login) {
				if (store.state.authentication) {
					return next({ name: RouteNames.home });
				}
			} else {
				if (!store.state.authentication) {
					return next({ name: RouteNames.login });
				}
			}
			return next();
		});
	}
}
