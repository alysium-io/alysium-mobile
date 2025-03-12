import { NanoId } from '@types';

export interface DeleteAllEventMediaParamsDto {
	readonly artist_uid: NanoId;
	readonly event_uid: NanoId;
}

export interface DeleteAllEventMediaResponseDto {}
