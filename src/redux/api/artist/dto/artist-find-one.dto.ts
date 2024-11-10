import { NanoId } from '@types';
import { PrivateArtist, PublicArtist } from '../artist.entity';

export interface PublicFindOneArtistParamsDto {
	artist_uid: NanoId;
}

export interface PublicFindOneArtistResponseDto extends PublicArtist {}

export interface PrivateFindOneArtistParamsDto {
	artist_uid: NanoId;
}

export interface PrivateFindOneArtistResponseDto extends PrivateArtist {}
