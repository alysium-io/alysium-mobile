import { ApiIdentifier } from '@types';
import { PrivateArtist } from '../artist.entity';

export interface UpdateArtistParamsDto {
	artist_uid: ApiIdentifier;
}

export interface UpdateArtistBodyDto {
	name: string;
}

export interface UpdateArtistResponseDto extends PrivateArtist {}
