import { ApiIdentifier } from '@types';

export interface PrimitiveArtistEventParamsDto {
	readonly artist_uid: ApiIdentifier;
}

export interface ArtistEventParamsDto extends PrimitiveArtistEventParamsDto {
	readonly event_uid: ApiIdentifier;
}
