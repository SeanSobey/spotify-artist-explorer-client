import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
	authentication: null | string;
}

export default new Vuex.Store<State>({
	state: {
		authentication: null,
	},
	mutations: {
		authenticate(state: State, authentication: string): void {
			state.authentication = authentication;
		},
	},
	actions: {

	},
});
