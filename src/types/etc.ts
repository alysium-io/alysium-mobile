import { Persona } from './enums';

export type AccountListItem = {
	id: number;
	name: string;
	type: Persona;
	image: string;
	isActive: boolean;
};

export type AccountList = AccountListItem[];
