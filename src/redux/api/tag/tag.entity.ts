import { ApiIdentifier } from '@types';

export interface Tag {
	readonly tag_uid: ApiIdentifier;
	readonly name: string;
	readonly is_following: boolean;
	readonly num_followers: number;
	readonly num_artists: number;
}
