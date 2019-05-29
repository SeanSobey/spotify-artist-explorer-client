import { default as _Vue } from 'vue';
import Spotify from 'spotify-web-api-node';

declare module 'vue/types/vue' {
	interface Vue {
		spotify: Spotify;
	}
	interface VueConstructor<V extends Vue = Vue> {
		spotify: Spotify;
	}
}

export default function VueSpotify(Vue: typeof _Vue, options: Spotify): void;
