import { NanoId } from '@types';

export interface Media {
	readonly media_uid: NanoId;
	readonly filename: string;
	readonly key: string;
	readonly encoding: string;
	readonly mimetype: string;
	readonly size: number;
	readonly height: number | null;
	readonly width: number | null;
}
