export enum SearchType {
	ARTIST = 'artist',
	TAG = 'tag'
}

export interface SearchItem {
	readonly uid: string;
	readonly name: string;
	readonly searchType: SearchType;
	readonly rankingScore: number;
}

export interface ArtistSearchItem extends SearchItem {}

export interface TagSearchItem extends SearchItem {
	readonly numArtists: number;
	readonly spotifyFollowersSum: number;
}

export interface SearchResponseDto<T extends SearchItem> {
	readonly hits: T[];
	readonly query: string;
	readonly processingTimeMs: number;
	readonly limit: number;
	readonly offset: number;
	readonly estimatedTotalHits: number;
}
