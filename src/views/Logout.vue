<template>
	<div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteNames } from '@/router';

@Component({})
export default class Logout extends Vue {
	public created(): void {
		this.$store.commit('unauthenticate');
		this.$router.push(RouteNames.login);
	}
}
</script>
