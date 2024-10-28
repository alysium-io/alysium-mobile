import { ApiIdentifier } from '@types';

export interface Media {
	readonly media_uid: ApiIdentifier;
	readonly filename: string;
	readonly key: string;
	readonly encoding: string;
	readonly mimetype: string;
	readonly size: number;
	readonly height: number | null;
	readonly width: number | null;
}
