<template>
  <div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({})
export default class Authentication extends Vue {
	public mounted(): void {
		// this.$store.
		console.log('mounted');
	}
}
</script>
