import { ApiIdentifier } from '@types';

export interface Tag {
	readonly tag_uid: ApiIdentifier;
	readonly name: string;
	readonly is_following: boolean;
}
