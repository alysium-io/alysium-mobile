import { NanoId } from '@types';

export interface ReorderEventMediaParamsDto {
	readonly artist_uid: NanoId;
	readonly event_uid: NanoId;
}

export interface ReorderEventMediaItemDto {
	readonly event_media_uid: NanoId;
	readonly order: number;
}

export interface ReorderEventMediaBodyDto {
	readonly items: ReorderEventMediaItemDto[];
}

export interface ReorderEventMediaResponseDto {}
