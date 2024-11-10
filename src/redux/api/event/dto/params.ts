import { NanoId } from '@types';

export interface PrimitiveArtistEventParamsDto {
	readonly artist_uid: NanoId;
}

export interface ArtistEventParamsDto extends PrimitiveArtistEventParamsDto {
	readonly event_uid: NanoId;
}
