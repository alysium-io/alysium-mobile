import { ApiIdentifier } from '@types';
import { Artist } from '../artist.entity';

export interface UpdateArtistLocationParamsDto {
	artist_id: ApiIdentifier;
}

export interface UpdateArtistLocationBodyDto {
	location_id: ApiIdentifier;
}

export interface UpdateArtistLocationResponseDto extends Artist {}
