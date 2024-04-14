import { ApiIdentifier } from 'src/types';
import { Artist } from '../artist.entity';

export interface DeleteArtistParamsDto {
	artist_id: ApiIdentifier;
}

export interface DeleteArtistResponseDto extends Artist {}
