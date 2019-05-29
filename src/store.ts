import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface Authentication {
	readonly accessToken: string;
	readonly expiresIn: number;
	readonly refreshToken: string;
	readonly tokenType: string;
	readonly scope: string;
}

interface State {
	authentication: Authentication | null;
}

const store = new Vuex.Store<State>({
	state: {
		authentication: null,
	},
	mutations: {
		authenticate(state: State, authentication: Authentication): void {
			state.authentication = authentication;
		},
	},
	actions: {

	},
});

export default store;
