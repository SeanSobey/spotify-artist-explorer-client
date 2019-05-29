<template>
	<b-navbar type="dark" variant="primary" class="mb-2">
		<b-navbar-brand>
			<img src="../assets/Spotify_logo_without_text_white.svg" width="32" height="32" class="d-inline-block align-top">
			Spotify Artist Explorer
		</b-navbar-brand>
		<b-navbar-nav class="ml-auto">
			<b-nav-item
				v-for="route in getRoutes()"
				:active="isActive(route)"
				:key="route.path"
				:to="route.path"
			>{{ route.name }}
			</b-nav-item>
			<b-nav-item href="https://github.com/SeanSobey/Spotify-Artist-Explorer">
				<font-awesome-icon :icon="['fab', 'github']" size="lg"/>
			</b-nav-item>
		</b-navbar-nav>
	</b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { routes, RouteNames } from '@/router';
import { RouteConfig } from 'vue-router';

@Component({})
export default class Navigation extends Vue {
	public getRoutes(): ReadonlyArray<RouteConfig> {
		const isLoggedIn = !!this.$store.state.authentication;
		return routes.filter((route) => {
			if (route.name === RouteNames.login && isLoggedIn) {
				return false;
			}
			if (route.name === RouteNames.login && isLoggedIn) {
				return false;
			}
			if (route.name === RouteNames.logout && !isLoggedIn) {
				return false;
			}
			return true;
		});
	}

	public isActive(route: RouteConfig): boolean {
		return this.$router.currentRoute.name === route.name;
	}
}
</script>
