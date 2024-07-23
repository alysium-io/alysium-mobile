import { ApiIdentifier } from '@types';

export enum SearchType {
	ARTIST = 'artist',
	TAG = 'tag'
}

export interface SearchHit {
	readonly uid: ApiIdentifier;
	readonly name: string;
	readonly searchType: SearchType;
}

export interface SearchResponseDto {
	readonly hits: SearchHit[];
	readonly query: string;
	readonly processingTimeMs: number;
	readonly limit: number;
	readonly offset: number;
	readonly estimatedTotalHits: number;
}
