import { ApiIdentifier } from '@types';
import { PrivateArtist, PublicArtist } from '../artist.entity';

export interface PublicFindOneArtistParamsDto {
	artist_uid: ApiIdentifier;
}

export interface PublicFindOneArtistResponseDto extends PublicArtist {}

export interface PrivateFindOneArtistParamsDto {
	artist_uid: ApiIdentifier;
}

export interface PrivateFindOneArtistResponseDto extends PrivateArtist {}
