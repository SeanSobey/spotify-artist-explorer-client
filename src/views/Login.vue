<template>
	<div class="container">
		<!-- Header -->
		<b-navbar type="dark" variant="primary">
			<b-navbar-brand>
				<!-- <img src="./assets/icon.png" width="32" height="32" class="d-inline-block align-top"> -->
				Spotify Artist Explorer
			</b-navbar-brand>
			<b-navbar-nav class="ml-auto">
				<b-dropdown-item href="https://github.com/SeanSobey/Spotify-Artist-Explorer">
					<font-awesome-icon :icon="['fab', 'github']" size="lg"/>
				</b-dropdown-item>
			</b-navbar-nav>
		</b-navbar>
		<b-button variant="primary" v-on:click="login()">Login to Spotify</b-button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
	private authWindow: Window | null = null;

	public login(): void {
		const width = 440;
		const height = 660;
		const left = (screen.width / 2) - (width / 2);
		const top = (screen.height / 2) - (height / 2);
		const permissions = [
			'playlist-modify-public',
			'playlist-modify-private',
			'playlist-read-private',
			'streaming',
			'user-library-modify',
			'user-library-read',
			'user-read-private',
			'user-read-email',
		];
		const url = new URL('https://accounts.spotify.com/authorize');
		url.searchParams.append('client_id', '46ed660bda484776984c3c614bc14eca');
		url.searchParams.append('response_type', 'code');
		url.searchParams.append('redirect_uri', 'http://localhost:8080/auth');
		url.search += '&scope=' + permissions.join('+');
		// url.searchParams.append('scope', permissions.join('+'));
		this.authWindow = window.open(
			url.href,
			'Spotify',
			`menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`
		);
	}
}
</script>
