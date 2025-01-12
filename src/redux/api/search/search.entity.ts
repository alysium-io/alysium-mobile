import { ProfileImage } from '../profile-image';

export enum SearchType {
	artist = 'artist',
	scene = 'scene',
	tag = 'tag'
}

export interface SearchItem {
	readonly uid: string;
	readonly name: string;
	readonly searchType: SearchType;
	readonly rankingScore: number;
	readonly profile_image: ProfileImage | null;
}

export interface ArtistSearchItem extends SearchItem {
	readonly followers: number;
}

export interface SceneSearchItem extends SearchItem {
	readonly followers: number;
}

export interface TagSearchItem extends SearchItem {
	readonly numArtists: number;
	readonly spotifyFollowersSum: number;
}

export interface UserSearchItem extends SearchItem {
	readonly handle: string;
	readonly email: string | null;
	readonly phone_number: string | null;
}

export interface SearchResponseDto<T extends SearchItem> {
	readonly hits: T[];
	readonly query: string;
	readonly processingTimeMs: number;
	readonly limit: number;
	readonly offset: number;
	readonly estimatedTotalHits: number;
}
