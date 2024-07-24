import { ApiIdentifier } from '@types';
import { PrivateArtist } from '../artist.entity';

export interface DeleteArtistParamsDto {
	artist_uid: ApiIdentifier;
}

export interface DeleteArtistResponseDto extends PrivateArtist {}
