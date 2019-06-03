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
import { spotify, authServer } from '@/constants';

@Component({})
export default class Login extends Vue {
	private authWindow: Window | null = null;

	constructor() {
		super();
		window.addEventListener('message', this.messageEventListener.bind(this), false);
		this.spotify.setRedirectURI(spotify.redirectURI);
		this.spotify.setClientId(spotify.clientId);
	}

	public loginOnClick(): void {
		const windowWidth = 440;
		const windowHeight = 660;

		const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
		const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
		const screenWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		const screenHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
		const systemZoom = windowWidth / window.screen.availWidth;

		const width = windowWidth / systemZoom;
		const height = windowHeight / systemZoom;
		const top = (screenHeight - windowHeight) / 2 / systemZoom + dualScreenTop;
		const left = (screenWidth - windowWidth) / 2 / systemZoom + dualScreenLeft;
		const scopes = [
			'user-follow-read',
		];
		this.authWindow = window.open(
			this.spotify.createAuthorizeURL(scopes),
			'_blank',
			`menubar=no,location=no,resizable=no,scrollbars=no,status=no,titlebar=no,width=${width},height=${height},top=${top},left=${left}`
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
		const url = new URL(authServer);
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
			})
			.catch((error) => {
				console.error('fetch failed', error);
			});
	}
}
</script>
