import { ApiIdentifier } from '@types';
import { Artist } from '../artist.entity';

export interface UpdateArtistParamsDto {
	artist_uid: ApiIdentifier;
}

export interface UpdateArtistBodyDto {
	name: string;
}

export interface UpdateArtistResponseDto extends Artist {}
