<template>
	<b-container fluid>
		<b-nav align="right">
			<b-nav-form>
				<b-form-input v-model="artistFilter" size="sm" class="mr-sm-2" placeholder="Artist"></b-form-input>
				<b-form-input v-model="yearFilter" size="sm" class="mr-sm-2" placeholder="Year"></b-form-input>
				<!-- <b-button size="sm" class="my-2 my-sm-0" v-on:click="filterTable()">Search</b-button> -->
			</b-nav-form>
			<b-nav-item
				v-for="display in displays"
				:key="display.displayType"
				:active="display.isActive"
				v-on:click="setDisplay(display.displayType)"
			>
				<font-awesome-icon :icon="display.icon" size="lg"/>
			</b-nav-item>
		</b-nav>
		<b-row v-if="isLoading" class="justify-content-center">
			<span class="h1">
				<font-awesome-icon icon="spinner" class="spin mr-2"/>Loading Artists
			</span>
		</b-row>
		<b-row v-if="isLoadingProgress" class="justify-content-center">
			<b-col>
				<b-progress :max="progressMax" height="1.6em" class="my-2">
					<b-progress-bar :value="progress">
						<span class="mx-auto">
							<strong>{{ progress }} / {{ progressMax }}</strong>
						</span>
					</b-progress-bar>
				</b-progress>
			</b-col>
		</b-row>
		<b-row v-if="isViewActive('grid')">
			<b-col
				v-for="(album, index) in albums"
				:key="index"
				align-content="center"
				class="col-sm-5 col-md-4 col-lg-3 col-xl-2"
			>
				<b-card :img-src="album.images[1]" :img-alt="album.name" img-top class="my-2">
					<b-card-text>{{ album.artist }} - {{ formatReleaseDate(album.releaseDate) }} - {{ album.name }}</b-card-text>
				</b-card>
			</b-col>
		</b-row>
		<b-row v-if="isViewActive('list')">
			<b-table striped hover :items="getTableItems()" :fields="getTableFields()">
				<template slot="images" slot-scope="data">
					<b-img thumbnail fluid :src="data.item.images[2]" :alt="data.item.name"></b-img>
				</template>
			</b-table>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BvTableField } from 'bootstrap-vue';
import { Artist as SpotifyArtist, Album as SpotifyAlbum } from '../../types/spotify-web-api-node';

enum DisplayType {
	Grid = 'grid',
	List = 'list',
}

interface Album {
	readonly name: string;
	readonly artist: string;
	readonly images: [string, string, string];
	readonly releaseDate: Date;
}

const batchSize = 8;

@Component({})
export default class Home extends Vue {
	public isLoading: boolean = false;
	public isLoadingProgress: boolean = false;
	public progress: number = 0;
	public progressMax: number = 0;
	public afterId: string | null = null;
	public artistFilter: string = '';
	public yearFilter: string = '';
	public albums: Array<Album> = [];
	public displays = [
		{
			icon: 'th',
			displayType: DisplayType.Grid,
			isActive: false,
		},
		{
			icon: 'list',
			displayType: DisplayType.List,
			isActive: true,
		},
	];

	public created() {
		this.isLoading = true;
		this.isLoadingProgress = false;
		this.albums = [];
		(async () => {
			this.progress = 0;
			for await (const [total, artists] of this.getAllFollowedArtists()) {
				this.progressMax = total;
				this.isLoadingProgress = true;
				for await (const [artist, albums] of this.batchGetArtistAlbums(artists)) {
					this.progress++;
					this.albums.push(albums);
					this.albums.sort((a, b) => a.artist.localeCompare(b.artist));
				}
			}
		})()
			.catch((error) => {
				console.error('loading artists albums failed', error);
			}).finally(() => {
				this.isLoading = false;
				this.isLoadingProgress = false;
				this.progress = 0;
				this.progressMax = 0;
			});
	}

	public setDisplay(displayType: DisplayType): void {
		this.displays.forEach((display) => (display.isActive = display.displayType === displayType));
	}

	public isViewActive(displayType: DisplayType): boolean {
		const display = this.displays.find((display) => display.displayType === displayType);
		if (!display) {
			throw new Error(`Un-handled displayType: ${displayType}`);
		}
		return display.isActive;
	}

	public getTableFields(): ReadonlyArray<any> {
		return [
			{
				key: 'artist',
				label: 'Artist',
				sortable: true,
				// sortDirection: 'asc',
			},
			{
				key: 'name',
				label: 'Name',
				sortable: true,
			},
			{
				key: 'releaseDate',
				label: 'Release Date',
				sortable: true,
				formatter: (value: Date) => this.formatReleaseDate(value),
			},
			{
				key: 'images',
				label: 'Cover',
				sortable: false,
			},
		];
	}

	public getTableItems(): ReadonlyArray<{readonly [index: string]: any}> {
		return this.albums
			.filter((album) => {
				if (this.artistFilter === '') {
					return true;
				}
				return album.artist.toLowerCase().includes(this.artistFilter.toLowerCase());
			})
			.filter((album) => {
				if (this.yearFilter === '') {
					return true;
				}
				return album.releaseDate.getFullYear().toString().includes(this.yearFilter.toLowerCase());
			});
	}

	public formatReleaseDate(date: Date): string {
		return date.toDateString();
	}

	private async * getAllFollowedArtists(): AsyncIterableIterator<[number, ReadonlyArray<SpotifyArtist>]> {
		let after;
		let next = true;
		while (next) {
			const promise = this.spotify.getFollowedArtists({ type: 'artist', limit: 50, after });
			const data = await promise;
			next = !!data.body.artists.next;
			after = data.body.artists.items[data.body.artists.items.length - 1].id;
			yield [data.body.artists.total, data.body.artists.items];
		}
	}

	private async * batchGetArtistAlbums(artists: ReadonlyArray<SpotifyArtist>): AsyncIterableIterator<[SpotifyArtist, Album]> {
		const remaining = [...artists];
		while (remaining.length > 0) {
			const batch = remaining.splice(0, batchSize);
			const promises = batch.map((artist) =>
				this.spotify.getArtistAlbums(artist.id, { limit: 1, include_groups: 'album' })
					.then((albumData) => ({ artist, albumData }))
			);
			const promisesData = await Promise.all(promises);
			for (const { artist, albumData } of promisesData) {
				if (albumData.body.items.length === 0) {
					continue;
				}
				const albums = albumData.body.items.map((album) => this.createAlbum(album));
				albums.sort((a, b) => a.releaseDate.valueOf() - b.releaseDate.valueOf());
				const album = albums[0];
				yield [artist, album];
			}
		}
	}

	private createAlbum(album: SpotifyAlbum): Album {
		const releaseDate = this.parseReleaseDate(album.release_date, album.release_date_precision);
		return {
			name: album.name,
			artist: album.artists[0].name,
			images: [album.images[0].url, album.images[1].url, album.images[2].url],
			releaseDate,
		};
	}

	private parseReleaseDate(releaseRate: string, releaseDatePrecision: string): Date {
		/* eslint-disable indent */
		switch (releaseDatePrecision) {
			case 'year':
				return new Date(releaseRate);
			case 'month':
				return new Date(releaseRate);
			case 'day':
				return new Date(releaseRate);
			default:
				throw new Error(`Un-hanlded releaseDatePrecision: ${releaseDatePrecision}`);
		}
		/* eslint-enable indent */
	}
}
</script>

<style lang="css" scoped>
.spin {
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>
