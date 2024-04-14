import { ApiIdentifier } from 'src/types';
import { Artist } from '../artist.entity';

export interface UpdateArtistParamsDto {
	artist_id: ApiIdentifier;
}

export interface UpdateArtistBodyDto {
	name: string;
}

export interface UpdateArtistResponseDto extends Artist {}
