import { ApiIdentifier } from '@types';
import { Artist } from '../artist.entity';

export interface FindOneArtistParamsDto {
	artist_id: ApiIdentifier;
}

export interface FindOneArtistResponseDto extends Artist {}
