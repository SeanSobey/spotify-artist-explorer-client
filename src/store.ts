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

export default class extends Vuex.Store<State> {
	constructor() {
		super({
			state: {
				authentication: null,
			},
			mutations: {
				authenticate(state: State, authentication: Authentication): void {
					state.authentication = authentication;
				},
				unauthenticate(state: State): void {
					state.authentication = null;
				},
			},
			actions: {
			},
		});
	}
};
