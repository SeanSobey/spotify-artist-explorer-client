<template>
	<b-container fluid>
		<b-row class="justify-content-center mt-5">
			<b-button variant="primary" v-on:click="loginOnClick()">
				<img src="../assets/Spotify_logo_without_text_white.svg" width="16" height="16" class="mr-1 mb-1" />Login to Spotify
			</b-button>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Authentication } from '@/store';
import { RouteNames } from '@/router';

@Component({})
export default class Login extends Vue {
	private authWindow: Window | null = null;

	constructor() {
		super();
		window.addEventListener('message', this.messageEventListener.bind(this), false);
		this.spotify.setRedirectURI(process.env.VUE_APP_SPOTIFY_REDIRECT_URI);
		this.spotify.setClientId(process.env.VUE_APP_SPOTIFY_CLIENT_ID);
	}

	public loginOnClick(): void {
		const windowWidth = 440;
		const windowHeight = 660;
		const scopes = [
			'user-follow-read',
		];
		const features = [
			'menubar=no',
			'location=no',
			'resizable=no',
			'resizable=no',
			'scrollbars=no',
			'status=no',
			'titlebar=no',
		];
		const popupWindow = this.popupWindowCenter(this.spotify.createAuthorizeURL(scopes), '_blank', features, windowWidth, windowHeight);
		if (popupWindow) {
			popupWindow.document.title = 'Spotify';
			this.authWindow = popupWindow;
		}
	}

	private popupWindowCenter(url: string, target: string, features: ReadonlyArray<string>, windowWidth: number, windowHeight: number): Window | null {
		const dualScreenLeft = window.screenLeft || window.screenX;
		const dualScreenTop = window.screenTop || window.screenY;

		const screenWidth = window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth;// window.screen.width;
		const screenHeight = window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight;// window.screen.height;

		// const systemZoom = screenWidth / window.screen.availWidth;
		// const left = (screenWidth - windowWidth) / 2 / systemZoom + dualScreenLeft;
		// const top = (screenHeight - windowHeight) / 2 / systemZoom + dualScreenTop;
		// const width = windowWidth / systemZoom;
		// const height = windowHeight / systemZoom;
		const left = ((screenWidth - windowWidth) / 2) + dualScreenLeft;
		const top = ((screenHeight - windowHeight) / 2) + dualScreenTop;
		const width = windowWidth;
		const height = windowHeight;

		return window.open(url, target,
			[...features, `width=${width}`, `height=${height}`, `top=${top}`, `left=${left}`].join(', ')
		);
	}

	private messageEventListener(event: MessageEvent): void {
		if (event.origin !== window.origin) {
			return;
		}
		if (!this.authWindow) {
			return;
		}
		this.authWindow.close();
		this.authWindow = null;
		const code = event.data;
		const url = new URL(process.env.VUE_APP_AUTH_SERVER);
		url.searchParams.append('code', code);
		fetch(url.href, { method: 'GET' })
			.then((response) => response.json())
			.then((data) => {
				const authentication: Authentication = {
					accessToken: data.access_token,
					expiresIn: data.expires_in,
					refreshToken: data.refresh_token,
					tokenType: data.token_type,
					scope: data.scope,
				};
				this.spotify.setAccessToken(authentication.accessToken);
				this.spotify.setRefreshToken(authentication.refreshToken);
				this.$store.commit('authenticate', authentication);
				this.$router.push(RouteNames.home);
			});
		// .catch((error) => {
		// 	console.error('fetch failed', error);
		// });
	}
}
</script>
