import { ApiIdentifier } from 'src/types';
import { Artist } from '../artist.entity';

export interface FindOneArtistParamsDto {
	artist_id: ApiIdentifier;
}

export interface FindOneArtistResponseDto extends Artist {}
