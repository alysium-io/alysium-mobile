import { ApiIdentifier } from '@types';

export interface Search {
	readonly id: ApiIdentifier;
	readonly name: string;
	readonly genres: string[];
	readonly followers: number;
}
