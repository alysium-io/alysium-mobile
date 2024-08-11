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

export interface SearchResponseDto {
	readonly hits: SearchItem[];
	readonly query: string;
	readonly processingTimeMs: number;
	readonly limit: number;
	readonly offset: number;
	readonly estimatedTotalHits: number;
}
