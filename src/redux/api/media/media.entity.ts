import { ApiIdentifier } from '@types';

export enum MediaRefType {
	artist = 'artist',
	host = 'host',
	user = 'user',
	venue = 'venue',
	event = 'event'
}

export interface Media {
	media_id: ApiIdentifier;
	url: string;
	filename: string;
	key: string;
	encoding: string;
	mimetype: string;
	size: number;
}
