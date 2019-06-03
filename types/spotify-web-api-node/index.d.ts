/* eslint-disable camelcase, no-dupe-class-members */

export declare interface Credentials {
	readonly accessToken: string;
	readonly refreshToken: string;
	readonly redirectUri: string;
	readonly clientId: string;
	readonly clientSecret: string;
}

export declare type Callback<T> = (data: T) => void;

export declare interface Data<T> {
	readonly body: T;
	readonly headers: { readonly [index: string]: string };
	readonly statusCode: number;
}

// https://developer.spotify.com/documentation/web-api/reference/object-model/#paging-object
export declare interface Pager<T> {
	/**
	 * A link to the Web API endpoint returning the full result of the request.
	 */
	readonly href: string;
	/**
	 * The requested data.
	 */
	readonly items: ReadonlyArray<T>;
	/**
	 * The maximum number of items in the response (as set in the query or by default).
	 */
	readonly limit: number;
	/**
	 * URL to the next page of items. ( null if none)
	 */
	readonly next: string;
	/**
	 * The offset of the items returned (as set in the query or by default).
	 */
	readonly offset: number;
	/**
	 * URL to the previous page of items. ( null if none)
	 */
	readonly previous: string
	/**
	 * The maximum number of items available to return.
	 */
	readonly total: number;
}

// https://developer.spotify.com/documentation/web-api/reference/object-model/#cursor-based-paging-object
export declare interface CursorPager<T> {
	/**
	 * A link to the Web API endpoint returning the full result of the request.
	 */
	readonly href: string;
	/**
	 * The requested data.
	 */
	readonly items: ReadonlyArray<T>;
	/**
	 * The maximum number of items in the response (as set in the query or by default).
	 */
	readonly limit: number;
	/**
	 * URL to the next page of items. ( null if none).
	 */
	readonly next: string;
	/**
	 * The cursors used to find the next set of items.
	 */
	readonly cursors: Cursor;
	/**
	 * The maximum number of items available to return.
	 */
	readonly total: number;
}

// https://developer.spotify.com/documentation/web-api/reference/object-model/#cursor-object
export declare interface Cursor {
	/**
	 * The cursor to use as key to find the next page of items.
	 */
	readonly after: string;
}

export declare type ExternalUrl = { readonly [key: string]: string };

// https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-full
export declare interface Artist {
	/**
	 * Known external URLs for this artist.
	 */
	readonly external_urls: ExternalUrl;
	/**
	 * A link to the Web API endpoint providing full details of the artist.
	 */
	readonly href: string;
	/**
	 * The Spotify ID for the artist.
	 */
	readonly id: string;
	/**
	 * The name of the artist
	 */
	readonly name: string;
	/**
	 * The object type: "artist"
	 */
	readonly type: 'artist';
	/**
	 * The Spotify URI for the artist.
	 */
	readonly uri: string;
}

// https://developer.spotify.com/documentation/web-api/reference/object-model/#album-object-simplified
export declare interface Album {
	/**
	 * The field is present when getting an artist’s albums. Possible values are “album”, “single”, “compilation”, “appears_on”. Compare to album_type this field represents relationship between the artist and the album.
	 */
	readonly album_group?: 'album' | 'single' | 'compilation' | 'appears_on';
	/**
	 * The type of the album: one of “album”, “single”, or “compilation”.
	 */
	readonly album_type: 'album' | 'single' | 'compilation';
	/**
	 * The artists of the album. Each artist object includes a link in href to more detailed information about the artist.
	 */
	readonly artists: ReadonlyArray<Artist>;
	/**
	 * The markets in which the album is available: ISO 3166-1 alpha-2 country codes. Note that an album is considered available in a market when at least 1 of its tracks is available in that market.
	 */
	readonly available_markets: ReadonlyArray<string>;
	/**
	 * Known external URLs for this album.
	 */
	readonly external_urls: ExternalUrl;
	/**
	 * A link to the Web API endpoint providing full details of the album.
	 */
	readonly href: string;
	/**
	 * The [/documentation/web-api/#spotify-uris-and-ids) for the album.
	 */
	readonly id: string;
	/**
	 * The cover art for the album in various sizes, widest first.
	 */
	readonly images: ReadonlyArray<Image>;
	/**
	 * The name of the album. In case of an album takedown, the value may be an empty string.
	 */
	readonly name: string;
	/**
	 * The date the album was first released, for example 1981. Depending on the precision, it might be shown as 1981-12 or 1981-12-15.
	 */
	readonly release_date: string;
	/**
	 * The precision with which release_date value is known: year , month , or day.
	 */
	readonly release_date_precision: 'year' | 'month' | 'day';
	/**
	 * Part of the response when Track Relinking is applied, the original track is not available in the given market, and Spotify did not have any tracks to relink it with. The track response will still contain metadata for the original track, and a restrictions object containing the reason why the track is not available: "restrictions" : {"reason" : "market"}
	 */
	readonly restrictions: any;
	/**
	 * The object type: “album”
	 */
	readonly type: 'album';
	/**
	 * The Spotify URI for the album.
	 */
	readonly uri: string;
}

// https://developer.spotify.com/documentation/web-api/reference/object-model/#image-object
export declare interface Image {
	/**
	 * The image height in pixels. If unknown: null or not returned.
	 */
	readonly height: number;
	/**
	 * The source URL of the image.
	 */
	readonly url: string;
	/**
	 * The image width in pixels. If unknown: null or not returned.
	 */
	readonly width: number;
}

// https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-albums/
export declare interface ArtistAlbumsOptions {
	/**
	 * A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. Valid values are:
	 * - album
	 * - single
	 * - appears_on
	 * - compilation
	 * For example: include_groups=album,single.
	 */
	readonly include_groups?: string;
	/**
	 * An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string from_token.
	 * Supply this parameter to limit the response to one particular geographical market. For example, for albums available in Sweden: country=SE.
	 * If not given, results will be returned for all countries and you are likely to get duplicate results per album, one for each country in which the album is available!
	 */
	readonly country?: string;
	/**
	 * The number of album objects to return. Default: 20. Minimum: 1. Maximum: 50. For example: limit=2.
	 */
	readonly limit?: number;
	/**
	 * The index of the first album to return. Default: 0 (i.e., the first album). Use with limit to get the next set of albums.
	 */
	readonly offset?: number;
}

export declare interface FollowedArtistsOptions {
	/**
	 * The ID type: currently only artist is supported.
	 */
	readonly type: 'artist';
	/**
	 * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
	 */
	readonly limit?: number;
	/**
	 * The last artist ID retrieved from the previous request.
	 */
	readonly after?: string;
}

export declare class Spotify {
	new(): Spotify;
	setCredentials(credentials: Credentials): void;
	setAccessToken(accessToken: string): void;
	setRefreshToken(refreshToken: string): void;
	setRedirectURI(redirectURI: string): void;
	setClientId(clientId: string): void;
	setClientSecret(clientSecret: string): void;
	resetAccessToken(): void;
	resetRefreshToken(): void;
	resetRedirectURI(): void;
	resetClientId(): void;
	resetClientSecret(): void;
	resetCode(): void;
	resetCredentials(): void;
	createAuthorizeURL(scopes: Array<string>): string;

	// addToMySavedAlbums(albumIds, callback): void;
	// addToMySavedTracks(trackIds, callback): void;
	// addTracksToPlaylist(playlistId, tracks, options, callback): void;
	// areFollowingPlaylist(userId, playlistId, followerIds, callback): void;
	// changePlaylistDetails(playlistId, options, callback): void;
	// containsMySavedAlbums(albumIds, callback): void;
	// containsMySavedTracks(trackIds, callback): void;
	// createPlaylist(userId, playlistName, options, callback): void;
	// followArtists(artistIds, callback): void;
	// followPlaylist(playlistId, options, callback): void;
	// followUsers(userIds, callback): void;
	// getAccessToken(): void;
	// getAlbum(albumId, options, callback): void;
	// getAlbums(albumIds, options, callback): void;
	// getAlbumTracks(albumId, options, callback): void;
	// getArtist(artistId, callback): void;
	getArtistAlbums(artistId: string, options?: ArtistAlbumsOptions): Promise<Data<Pager<Album>>>;
	getArtistAlbums(artistId: string, options: ArtistAlbumsOptions | undefined, callback: Callback<Data<Pager<Album>>>): void;
	// getArtistRelatedArtists(artistId, callback): void;
	// getArtists(artistIds, callback): void;
	// getArtistTopTracks(artistId, country, callback): void;
	// getAudioAnalysisForTrack(trackId, callback): void;
	// getAudioFeaturesForTrack(trackId, callback): void;
	// getAvailableGenreSeeds(callback): void;
	// getCategories(options, callback): void;
	// getCategory(categoryId, options, callback): void;
	// getClientId(): string;
	// getClientSecret(): string;
	// getCredentials(): Credentials;
	// getFeaturedPlaylists(options, callback): void;
	getFollowedArtists(options: FollowedArtistsOptions | undefined): Promise<Data<{ readonly artists: CursorPager<Artist> }>>;
	getFollowedArtists(options: FollowedArtistsOptions | undefined, callback: Callback<Data<{ readonly artists: CursorPager<Artist> }>>): void;
	// getMe(callback);
	// getMyCurrentPlaybackState(options, callback): void;
	// getMyCurrentPlayingTrack(options, callback): void;
	// getMyDevices(callback);
	// getMyRecentlyPlayedTracks(options, callback): void;
	// getMySavedAlbums(options, callback): void;
	// getMySavedTracks(options, callback): void;
	// getMyTopArtists(options, callback): void;
	// getMyTopTracks(options, callback): void;
	// getNewReleases(options, callback): void;
	// getPlaylist(playlistId, options, callback): void;
	// getPlaylistsForCategory(categoryId, options, callback): void;
	// getPlaylistTracks(playlistId, options, callback): void;
	// getRecommendations(options, callback): void;
	// getRedirectURI(): string;
	// getRefreshToken(): string;
	// getTrack(trackId, options, callback): void;
	// getTracks(trackIds, options, callback): void;
	// getUser(userId, callback): void;
	// getUserPlaylists(userId, options, callback): void;
	// isFollowingArtists(artistIds, callback): void;
	// isFollowingUsers(userIds, callback): void;
	// pause(options, callback): void;
	// play(options, callback): void;
	// removeFromMySavedAlbums(albumIds, callback): void;
	// removeFromMySavedTracks(trackIds, callback): void;
	// removeTracksFromPlaylist(playlistId, tracks, options, callback): void;
	// removeTracksFromPlaylistByPosition(playlistId, positions, snapshotId, callback): void;
	// reorderTracksInPlaylist(playlistId, rangeStart, insertBefore, options, callback): void;
	// replaceTracksInPlaylist(playlistId, uris, callback): void;
	// play(): void;
	// removeFromMySavedAlbums(albumIds, callback): void;
	// removeFromMySavedTracks(trackIds, callback): void;
	// removeTracksFromPlaylist(playlistId, tracks, options, callback): void;
	// removeTracksFromPlaylistByPosition(playlistId, positions, snapshotId, callback): void;
	// reorderTracksInPlaylist(playlistId, rangeStart, insertBefore, options, callback): void;
	// replaceTracksInPlaylist(playlistId, uris, callback): void;
	// search(query, types, options, callback): void;
	// searchAlbums(query, options, callback): void;
	// searchArtists(query, options, callback): void;
	// searchTracks(query, options, callback): void;
	// seek(positionMs, options, callback): void;
	// setRepeat(options, callback): void;
	// setShuffle(options, callback): void;
	// setVolume(volumePercent, options, callback): void;
	// skipToNext(callback): void;
	// skipToPrevious(callback): void;
	// transferMyPlayback(options, callback): void;
	// unfollowArtists(artistIds, callback): void;
	// unfollowPlaylist(playlistId, callback): void;
	// unfollowUsers(userIds, callback): void;
	// uploadCustomPlaylistCoverImage(playlistId, base64URI, callback): void;
}

export default Spotify;
