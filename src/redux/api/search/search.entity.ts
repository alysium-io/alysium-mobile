import { ApiIdentifier } from '@types';

export interface Search {
	readonly uid: ApiIdentifier;
	readonly name: string;
	readonly genres: string[];
	readonly followers: number;
}
