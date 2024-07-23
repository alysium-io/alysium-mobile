import { ApiIdentifier } from '@types';
import { Artist } from '../artist.entity';

export interface ArtistPageParamsDto {
	artist_uid: ApiIdentifier;
}

export interface ArtistPageResponseDto extends Artist {}
