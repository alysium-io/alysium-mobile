import { ApiIdentifier } from 'src/types';
import { Artist } from '../artist.entity';

export interface UpdateArtistLocationParamsDto {
	artist_id: ApiIdentifier;
}

export interface UpdateArtistLocationBodyDto {
	location_id: ApiIdentifier;
}

export interface UpdateArtistLocationResponseDto extends Artist {}
