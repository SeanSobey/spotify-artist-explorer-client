<template>
	<b-container fluid>
		<b-row class="justify-content-center">
			<b-button variant="primary" v-on:click="loginOnClick()">Login to Spotify</b-button>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Authentication } from '@/store';
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
		const width = 440;
		const height = 660;
		const left = (screen.width / 2) - (width / 2);
		const top = (screen.height / 2) - (height / 2);
		const scopes = [
			'user-follow-read',
		];
		this.authWindow = window.open(
			this.spotify.createAuthorizeURL(scopes),
			'Spotify',
			`menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`
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
		fetch(`${authServer}?code=${code}`, { method: 'POST' })
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
				this.$router.push('home');
			})
			.catch((error) => {
				console.error('fetch failed', error);
			});
	}
}
</script>
