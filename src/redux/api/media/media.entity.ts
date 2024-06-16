import { ApiIdentifier } from '@types';

export enum MediaRefType {
	artist = 'artist',
	host = 'host',
	user = 'user',
	venue = 'venue',
	event = 'event'
}

export interface Media {
	readonly media_uid: ApiIdentifier;
	readonly url: string;
	readonly filename: string;
	readonly key: string;
	readonly encoding: string;
	readonly mimetype: string;
	readonly size: number;
}
