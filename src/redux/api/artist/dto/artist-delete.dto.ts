import { ApiIdentifier } from '@types';
import { Artist } from '../artist.entity';

export interface DeleteArtistParamsDto {
	artist_id: ApiIdentifier;
}

export interface DeleteArtistResponseDto extends Artist {}
