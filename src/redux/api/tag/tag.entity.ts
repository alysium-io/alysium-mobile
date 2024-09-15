import { ApiIdentifier } from '@types';

export interface Tag {
	readonly tag_uid: ApiIdentifier;
	readonly name: string;
	readonly is_following: boolean;
	readonly num_followers: number;
	readonly num_artists: number;
	readonly spotify_followers_sum: number;
	readonly spotify_followers_avg: number;
	readonly spotify_popularity_sum: number;
	readonly spotify_popularity_avg: number;
	readonly tag_rank: number;
}
