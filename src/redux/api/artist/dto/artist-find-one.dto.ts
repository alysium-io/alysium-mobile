import { ApiIdentifier } from '@types';
import { Artist } from '../artist.entity';

export interface FindOneArtistParamsDto {
	artist_uid: ApiIdentifier;
}

export interface FindOneArtistResponseDto extends Artist {}
