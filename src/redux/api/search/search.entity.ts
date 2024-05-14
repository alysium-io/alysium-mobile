import { ApiIdentifier } from '@types';

export interface Search {
	id: ApiIdentifier;
	name: string;
	genres: string[];
	followers: number;
}
